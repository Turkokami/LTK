'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/utils';

/**
 * ACE Speed Round — Arena game 1. A client leaf: 60 seconds, as many ACE questions as you can,
 * points plus a streak bonus. Play-for-fun, no prize (REGISTRY R-18 does not apply until a
 * prize of value is offered). The personal best is a per-browser convenience in localStorage,
 * wrapped in try/catch — nothing indexable or shared depends on it.
 *
 * Keyboard: 1 / 2 / 3 (or A / B / C) answer; Enter starts and restarts.
 */

export interface RoundQuestion {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  answerText: string;
  moduleN: number;
  moduleName: string;
  moduleSlug: string;
}

const ROUND_SECONDS = 60;
const BEST_KEY = 'ltk-speed-round-best';
const FEEDBACK_MS = 850;

type Phase = 'ready' | 'playing' | 'done';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

function readBest(): number {
  try {
    return Number(window.localStorage.getItem(BEST_KEY)) || 0;
  } catch {
    return 0;
  }
}
function writeBest(n: number) {
  try {
    window.localStorage.setItem(BEST_KEY, String(n));
  } catch {
    /* private mode / blocked storage — the round still works */
  }
}

export function SpeedRound({
  questions,
  modules,
  discordInvite,
  acePath,
}: {
  questions: RoundQuestion[];
  modules: { n: number; name: string }[];
  discordInvite: string;
  acePath: string;
}) {
  const [phase, setPhase] = useState<Phase>('ready');
  const [filter, setFilter] = useState<number | 'all'>('all');
  const [deck, setDeck] = useState<RoundQuestion[]>([]);
  const [i, setI] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [missed, setMissed] = useState<RoundQuestion[]>([]);
  const [picked, setPicked] = useState<string | null>(null);
  const [best, setBest] = useState(0);
  const [newBest, setNewBest] = useState(false);
  const lock = useRef(false);

  useEffect(() => setBest(readBest()), []);

  const pool = filter === 'all' ? questions : questions.filter((q) => q.moduleN === filter);
  const q = deck[i];

  const start = useCallback(() => {
    setDeck(shuffle(pool));
    setI(0);
    setTimeLeft(ROUND_SECONDS);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswered(0);
    setCorrect(0);
    setMissed([]);
    setPicked(null);
    setNewBest(false);
    lock.current = false;
    setPhase('playing');
  }, [pool]);

  // Clock.
  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) {
      setPhase('done');
      return;
    }
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, timeLeft]);

  // Record the personal best once, when the round ends.
  useEffect(() => {
    if (phase !== 'done') return;
    if (score > best) {
      writeBest(score);
      setBest(score);
      setNewBest(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const answer = useCallback(
    (optionId: string) => {
      if (phase !== 'playing' || !q || lock.current) return;
      lock.current = true;
      setPicked(optionId);
      const right = optionId === q.correctOptionId;
      setAnswered((n) => n + 1);
      if (right) {
        const nextStreak = streak + 1;
        setStreak(nextStreak);
        setBestStreak((b) => Math.max(b, nextStreak));
        setCorrect((n) => n + 1);
        setScore((s) => s + 100 + 10 * streak);
      } else {
        setStreak(0);
        setMissed((m) => [...m, q]);
      }
      window.setTimeout(() => {
        setPicked(null);
        lock.current = false;
        setI((n) => {
          if (n + 1 >= deck.length) {
            setPhase('done');
            return n;
          }
          return n + 1;
        });
      }, right ? FEEDBACK_MS / 2 : FEEDBACK_MS);
    },
    [phase, q, streak, deck.length],
  );

  // Keyboard.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (phase === 'playing' && q) {
        const map: Record<string, number> = { '1': 0, '2': 1, '3': 2, a: 0, b: 1, c: 2 };
        const idx = map[e.key.toLowerCase()];
        const opt = idx !== undefined ? q.options[idx] : undefined;
        if (opt) {
          e.preventDefault();
          answer(opt.id);
        }
      } else if (e.key === 'Enter' && phase !== 'playing') {
        const el = document.activeElement;
        if (el && el.tagName === 'BUTTON') return; // let the focused button handle it
        e.preventDefault();
        start();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, q, answer, start]);

  // ---------------------------------------------------------------- ready
  if (phase === 'ready') {
    return (
      <div className="label-panel p-6 sm:p-8">
        <p className="eyebrow mb-3">Pick your round</p>
        <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Choose questions">
          <Chip active={filter === 'all'} onClick={() => setFilter('all')}>
            Everything ({questions.length})
          </Chip>
          {modules.map((m) => (
            <Chip key={m.n} active={filter === m.n} onClick={() => setFilter(m.n)}>
              {m.name}
            </Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" className="btn btn--lg" onClick={start}>
            Start the clock
          </button>
          <p className="text-sm text-ink3">
            {ROUND_SECONDS} seconds &middot; 100 points a hit, +10 for every answer in your streak
            {best ? <> &middot; your best: <strong className="text-ink">{best}</strong></> : null}
          </p>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------- done
  if (phase === 'done') {
    const accuracy = answered ? Math.round((correct / answered) * 100) : 0;
    return (
      <div className="label-panel p-6 sm:p-8" aria-live="polite">
        <p className="eyebrow mb-2">{newBest ? 'New personal best' : 'Time'}</p>
        <p className="display mb-2">{score.toLocaleString('en-US')}</p>
        <p className="mb-6 text-ink2">
          {correct} of {answered} right ({accuracy}%) &middot; best streak {bestStreak}
          {!newBest && best ? <> &middot; your best is {best.toLocaleString('en-US')}</> : null}
        </p>
        <div className="mb-8 flex flex-wrap gap-2">
          <button type="button" className="btn btn--lg" onClick={start}>
            Run it again
          </button>
          <a href={discordInvite} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">
            Post your score on Discord
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <button type="button" className="btn btn--ghost btn--lg" onClick={() => setPhase('ready')}>
            Change round
          </button>
        </div>

        {missed.length ? (
          <div>
            <h3 className="h3 mb-3">What you missed</h3>
            <ul className="space-y-3">
              {missed.map((m) => (
                <li key={m.id} className="rounded-md border border-ruleStrong bg-stock p-4 text-sm">
                  <p className="mb-1 font-semibold text-ink">{m.prompt}</p>
                  <p className="mb-2 text-ink2">
                    <span className="mr-2 font-semibold uppercase tracking-wide text-field">Answer</span>
                    {m.options.find((o) => o.id === m.correctOptionId)?.text}
                  </p>
                  <a href={`${acePath}${m.moduleSlug}/`} className="link text-xs">
                    Study module {m.moduleN}: {m.moduleName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : answered ? (
          <p className="text-sm text-field">Clean round &mdash; nothing missed.</p>
        ) : null}
      </div>
    );
  }

  // ---------------------------------------------------------------- playing
  if (!q) return null;
  const urgent = timeLeft <= 10;
  return (
    <div className="label-panel p-6 sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-baseline gap-4">
          <span
            className={cx('text-3xl font-extrabold tabular-nums', urgent ? 'text-blood' : 'text-ink')}
            aria-label={`${timeLeft} seconds left`}
          >
            0:{String(timeLeft).padStart(2, '0')}
          </span>
          <span className="mono text-ink3">
            {score.toLocaleString('en-US')} pts &middot; streak {streak}
          </span>
        </div>
        <span className="mono text-ink3">{q.moduleName}</span>
      </div>

      {/* Timer bar. Decorative — the number above carries the time. */}
      <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-stock2" aria-hidden="true">
        <div
          className={cx('h-full transition-[width] duration-1000 ease-linear', urgent ? 'bg-danger' : 'bg-field')}
          style={{ width: `${(timeLeft / ROUND_SECONDS) * 100}%` }}
        />
      </div>

      <p className="h2 mb-6" aria-live="polite">
        {q.prompt}
      </p>
      <div className="grid gap-2">
        {q.options.map((o, n) => {
          const isPicked = picked === o.id;
          const showRight = picked !== null && o.id === q.correctOptionId;
          const showWrong = isPicked && o.id !== q.correctOptionId;
          return (
            <button
              key={o.id}
              type="button"
              disabled={picked !== null}
              onClick={() => answer(o.id)}
              className={cx(
                'flex items-start gap-3 rounded-lg border px-4 py-3.5 text-left text-[0.9375rem] transition-colors',
                'border-rule hover:border-ink3 disabled:cursor-default',
                showRight && '!border-field bg-fieldTint',
                showWrong && '!border-blood bg-stock2',
              )}
            >
              <kbd className="mono shrink-0 rounded border border-ruleStrong px-1.5 text-ink3">{n + 1}</kbd>
              <span className="text-ink">
                {o.text}
                {showRight ? <span className="ml-2 text-xs font-bold uppercase text-field">Correct</span> : null}
                {showWrong ? <span className="ml-2 text-xs font-bold uppercase text-blood">Miss</span> : null}
              </span>
            </button>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-ink3">Tip: press 1, 2 or 3 to answer.</p>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cx(
        'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
        active ? 'border-blood bg-danger text-ink' : 'border-ruleStrong text-ink2 hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}
