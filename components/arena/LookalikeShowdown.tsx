'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/utils';
import { award } from '@/lib/agent/store';
import { XP } from '@/lib/agent/config';
import { Leaderboard } from '@/components/arena/Leaderboard';
import type { LookalikePair } from '@/lib/content/lookalikes';

/**
 * Lookalike Showdown — Arena game. Twelve rounds: one field-ID clue, two commonly confused
 * pests, ten seconds. Fast right answers score more, streaks score more, and every answer
 * shows why. Keyboard: 1 / 2 (or ← / →) to answer, Enter to start.
 */

const ROUNDS = 12;
const SECONDS = 10;
const REVEAL_MS = 1700;
const BEST_KEY = 'ltk-lookalike-best';
type Phase = 'ready' | 'playing' | 'done';

interface Round {
  clue: string;
  why: string;
  options: [string, string];
  right: 0 | 1;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

/** Twelve clues, spread across as many different pairs as possible, sides randomised. */
function deal(pairs: LookalikePair[]): Round[] {
  const byPair = shuffle(pairs).map((p) => shuffle(p.clues).map((c) => ({ p, c })));
  const out: Round[] = [];
  for (let i = 0; out.length < ROUNDS && byPair.some((l) => l.length); i = (i + 1) % byPair.length) {
    const next = byPair[i]!.shift();
    if (!next) continue;
    const flip = Math.random() < 0.5;
    const names: [string, string] = flip ? [next.p.b, next.p.a] : [next.p.a, next.p.b];
    const rightName = next.c.answer === 'a' ? next.p.a : next.p.b;
    out.push({ clue: next.c.clue, why: next.c.why, options: names, right: names[0] === rightName ? 0 : 1 });
  }
  return out;
}

export function LookalikeShowdown({ pairs, discordInvite }: { pairs: LookalikePair[]; discordInvite: string }) {
  const [phase, setPhase] = useState<Phase>('ready');
  const [rounds, setRounds] = useState<Round[]>([]);
  const [i, setI] = useState(0);
  const [left, setLeft] = useState(SECONDS);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    try {
      setBest(Number(window.localStorage.getItem(BEST_KEY)) || 0);
    } catch {
      /* ignore */
    }
  }, []);

  const start = useCallback(() => {
    setRounds(deal(pairs));
    setI(0);
    setLeft(SECONDS);
    setPicked(null);
    setScore(0);
    setCorrect(0);
    setStreak(0);
    setPhase('playing');
  }, [pairs]);

  const r = rounds[i];

  const answer = useCallback(
    (choice: number) => {
      if (phase !== 'playing' || picked !== null || !r) return;
      setPicked(choice);
      if (choice === r.right) {
        setScore((s) => s + 100 + left * 10 + streak * 20);
        setCorrect((c) => c + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }
    },
    [phase, picked, r, left, streak],
  );

  // Round clock; running out counts as a miss.
  useEffect(() => {
    if (phase !== 'playing' || picked !== null) return;
    if (left <= 0) {
      setPicked(-1);
      setStreak(0);
      return;
    }
    timer.current = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [phase, picked, left]);

  // After the reveal, move on (or finish).
  useEffect(() => {
    if (phase !== 'playing' || picked === null) return;
    const t = window.setTimeout(() => {
      if (i + 1 >= rounds.length) setPhase('done');
      else {
        setI(i + 1);
        setLeft(SECONDS);
        setPicked(null);
      }
    }, REVEAL_MS);
    return () => window.clearTimeout(t);
  }, [phase, picked, i, rounds.length]);

  // Pay out once at the end.
  useEffect(() => {
    if (phase !== 'done') return;
    award({
      xp: Math.min(XP.gameCap, score / XP.gameScoreDivisor),
      label: `Lookalike Showdown: ${correct}/${ROUNDS}`,
      max: { bestLookalike: score },
      event: { kind: 'lookalike', score, correct, total: ROUNDS },
    });
    if (score > best) {
      setBest(score);
      try {
        window.localStorage.setItem(BEST_KEY, String(score));
      } catch {
        /* ignore */
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== 'playing' && e.key === 'Enter') start();
      if (phase !== 'playing') return;
      if (e.key === '1' || e.key === 'ArrowLeft') answer(0);
      if (e.key === '2' || e.key === 'ArrowRight') answer(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, start, answer]);

  if (phase === 'ready') {
    return (
      <div className="label-panel">
        <div className="label-bar">
          <span>Lookalike Showdown</span>
          <span>{ROUNDS} rounds · {SECONDS}s each</span>
        </div>
        <div className="py-6 pl-[1.35rem] pr-5">
          <p className="mb-4 max-w-[58ch] text-ink2">
            One clue, two pests that get mixed up on the job. Pick the one the clue describes. Faster answers and
            streaks score more.
          </p>
          <button type="button" className="btn btn--lg" onClick={start}>
            Start
          </button>
          {best ? <p className="mono mt-3 text-ink3">Your best: {best.toLocaleString('en-US')}</p> : null}
        </div>
      </div>
    );
  }

  if (phase === 'done') {
    const text = `I scored ${score.toLocaleString('en-US')} (${correct}/${ROUNDS}) in LTK Lookalike Showdown. Beat that.`;
    return (
      <div>
        <div className="label-panel" aria-live="polite">
          <div className="label-bar">
            <span>Final score</span>
            <span>{correct}/{ROUNDS} right</span>
          </div>
          <div className="py-6 pl-[1.35rem] pr-5">
            <p className="display mb-2">{score.toLocaleString('en-US')}</p>
            <p className="mb-5 text-ink2">{score >= best && score > 0 ? 'New personal best.' : `Your best: ${best.toLocaleString('en-US')}`}</p>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn btn--lg" onClick={start}>
                Play again
              </button>
              <a
                href={discordInvite}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost btn--lg"
                onClick={() => navigator.clipboard?.writeText(text).catch(() => undefined)}
              >
                Post your score on Discord<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
        <Leaderboard game="lookalike" finalScore={score} />
      </div>
    );
  }

  if (!r) return null;
  return (
    <div className="label-panel">
      <div className="label-bar">
        <span>
          Round {i + 1} of {rounds.length}
        </span>
        <span>
          {score.toLocaleString('en-US')} pts · streak {streak}
        </span>
      </div>
      <div className="py-6 pl-[1.35rem] pr-5">
        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-stock2" aria-hidden="true">
          <div className={cx('h-full transition-[width] duration-1000 ease-linear', left <= 3 ? 'bg-blood' : 'bg-field')} style={{ width: `${(left / SECONDS) * 100}%` }} />
        </div>
        <p className="eyebrow mb-2">The clue</p>
        <p className="h2 mb-6 min-h-[4.5rem]">{r.clue}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {r.options.map((name, k) => {
            const isRight = picked !== null && k === r.right;
            const isWrong = picked === k && k !== r.right;
            return (
              <button
                key={name}
                type="button"
                disabled={picked !== null}
                onClick={() => answer(k)}
                className={cx(
                  'rounded-lg border px-5 py-5 text-left text-lg font-semibold transition-colors disabled:cursor-default',
                  'border-ruleStrong hover:border-ink3',
                  isRight && '!border-field bg-fieldTint',
                  isWrong && '!border-blood bg-stock2',
                )}
              >
                <span className="mono mr-2 text-ink3">{k + 1}</span>
                {name}
              </button>
            );
          })}
        </div>
        <p className="mt-4 min-h-[3rem] text-sm text-ink2" aria-live="polite">
          {picked === null ? (
            `${left}s`
          ) : (
            <>
              <span className={cx('mr-2 font-bold uppercase', picked === r.right ? 'text-field' : 'text-blood')}>
                {picked === r.right ? 'Correct' : picked === -1 ? 'Time' : 'Miss'}
              </span>
              {r.why}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
