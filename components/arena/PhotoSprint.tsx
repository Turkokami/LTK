'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cx } from '@/lib/utils';
import { Leaderboard } from '@/components/arena/Leaderboard';

/**
 * Photo ID Sprint — Arena game 2. Real member photos from the LTK Discord; name the pest group
 * in 60 seconds. The answer key is the group the photo was sorted into during human review
 * (lib/content/pest-library.ts), not a machine guess at species. Alt text stays neutral while
 * a question is open so it doesn't give the answer away; the caption and credit show after.
 * Keyboard: 1–4 answer; Enter starts and restarts.
 */

export interface SprintPhoto {
  src: string;
  width: number;
  height: number;
  group: string;
  groupName: string;
  caption: string;
  credit: string;
}

const ROUND_SECONDS = 60;
const BEST_KEY = 'ltk-photo-sprint-best';
type Phase = 'ready' | 'playing' | 'done';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export function PhotoSprint({
  photos,
  groups,
  discordInvite,
  libraryPath,
}: {
  photos: SprintPhoto[];
  groups: { slug: string; name: string }[];
  discordInvite: string;
  libraryPath: string;
}) {
  const [phase, setPhase] = useState<Phase>('ready');
  const [deck, setDeck] = useState<SprintPhoto[]>([]);
  const [choices, setChoices] = useState<{ slug: string; name: string }[]>([]);
  const [i, setI] = useState(0);
  const [timeLeft, setTimeLeft] = useState(ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [missed, setMissed] = useState<SprintPhoto[]>([]);
  const [best, setBest] = useState(0);
  const lock = useRef(false);

  useEffect(() => {
    try {
      setBest(Number(window.localStorage.getItem(BEST_KEY)) || 0);
    } catch {
      /* ignore */
    }
  }, []);

  const q = deck[i];

  const makeChoices = useCallback(
    (p: SprintPhoto) => {
      const others = shuffle(groups.filter((g) => g.slug !== p.group)).slice(0, 3);
      return shuffle([{ slug: p.group, name: p.groupName }, ...others]);
    },
    [groups],
  );

  const start = useCallback(() => {
    const d = shuffle(photos);
    setDeck(d);
    setI(0);
    setChoices(d[0] ? makeChoices(d[0]) : []);
    setTimeLeft(ROUND_SECONDS);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAnswered(0);
    setCorrect(0);
    setPicked(null);
    setMissed([]);
    lock.current = false;
    setPhase('playing');
  }, [photos, makeChoices]);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (timeLeft <= 0) {
      setPhase('done');
      return;
    }
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase !== 'done') return;
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

  const answer = useCallback(
    (slug: string) => {
      if (phase !== 'playing' || !q || lock.current) return;
      lock.current = true;
      setPicked(slug);
      const right = slug === q.group;
      setAnswered((n) => n + 1);
      if (right) {
        const next = streak + 1;
        setStreak(next);
        setBestStreak((b) => Math.max(b, next));
        setScore((sc) => sc + 100 + 10 * streak);
        setCorrect((n) => n + 1);
      } else {
        setStreak(0);
        setMissed((m) => [...m, q]);
      }
      window.setTimeout(() => {
        lock.current = false;
        setPicked(null);
        setI((n) => {
          const next = n + 1;
          if (next >= deck.length) {
            setPhase('done');
            return n;
          }
          setChoices(makeChoices(deck[next]!));
          return next;
        });
      }, right ? 700 : 1400);
    },
    [phase, q, deck, makeChoices, streak],
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLElement && ['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (phase === 'playing') {
        const n = Number(e.key);
        const c = n >= 1 && n <= 4 ? choices[n - 1] : undefined;
        if (c) {
          e.preventDefault();
          answer(c.slug);
        }
      } else if (e.key === 'Enter' && document.activeElement?.tagName !== 'BUTTON') {
        e.preventDefault();
        start();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, choices, answer, start]);

  if (phase === 'ready') {
    return (
      <>
        <div className="label-panel p-6 sm:p-8">
          <p className="mb-5 max-w-[56ch] text-ink2">
            {photos.length} photos from real jobs. Each one is a pest, a nest, a sign or the damage it
            left &mdash; name the group before the clock runs out.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className="btn btn--lg" onClick={start}>
              Start the clock
            </button>
            <p className="text-sm text-ink3">
              {ROUND_SECONDS} seconds &middot; 100 a hit, +10 per answer in your streak
              {best ? <> &middot; your best: <strong className="text-ink">{best}</strong></> : null}
            </p>
          </div>
        </div>
        <Leaderboard game="photo-id-sprint" />
      </>
    );
  }

  if (phase === 'done') {
    const acc = answered ? Math.round((correct / answered) * 100) : 0;
    return (
      <>
        <div className="label-panel p-6 sm:p-8" aria-live="polite">
          <p className="eyebrow mb-2">Time</p>
          <p className="display mb-2">{score.toLocaleString('en-US')}</p>
          <p className="mb-6 text-ink2">
            {correct} of {answered} right ({acc}%) &middot; best streak {bestStreak}
          </p>
          <div className="mb-8 flex flex-wrap gap-2">
            <button type="button" className="btn btn--lg" onClick={start}>
              Run it again
            </button>
            <a href={discordInvite} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">
              Post your score on Discord<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          {missed.length ? (
            <div>
              <h3 className="h3 mb-3">What you missed</h3>
              <ul className="grid gap-3 sm:grid-cols-2">
                {missed.map((m) => (
                  <li key={m.src} className="flex gap-3 rounded-md border border-ruleStrong bg-stock p-3 text-sm">
                    <img src={m.src} alt={m.caption} width={80} height={60} className="h-16 w-20 shrink-0 rounded object-cover" />
                    <span>
                      <span className="block font-semibold text-ink">{m.caption}</span>
                      <a href={`${libraryPath}${m.group}/`} className="link text-xs">
                        {m.groupName}
                      </a>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <Leaderboard game="photo-id-sprint" finalScore={score} />
      </>
    );
  }

  if (!q) return null;
  const urgent = timeLeft <= 10;
  return (
    <div className="label-panel p-4 sm:p-6">
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <span className={cx('text-3xl font-extrabold tabular-nums', urgent ? 'text-blood' : 'text-ink')} aria-label={`${timeLeft} seconds left`}>
          0:{String(timeLeft).padStart(2, '0')}
        </span>
        <span className="mono text-ink3">
          {score.toLocaleString('en-US')} pts &middot; streak {streak}
        </span>
      </div>
      <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-stock2" aria-hidden="true">
        <div className={cx('h-full transition-[width] duration-1000 ease-linear', urgent ? 'bg-danger' : 'bg-field')} style={{ width: `${(timeLeft / ROUND_SECONDS) * 100}%` }} />
      </div>
      <figure className="m-0 mb-4">
        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-black">
          <img
            src={q.src}
            alt={picked ? q.caption : 'Mystery photo from a member’s job — name the pest group'}
            width={q.width}
            height={q.height}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <figcaption className="mt-2 min-h-[1.25rem] text-xs text-ink3" aria-live="polite">
          {picked ? (
            <>
              <span className="font-semibold text-ink2">{q.caption}</span> &middot; {q.credit}
            </>
          ) : (
            'What are you looking at?'
          )}
        </figcaption>
      </figure>
      <div className="grid gap-2 sm:grid-cols-2">
        {choices.map((c, n) => {
          const showRight = picked !== null && c.slug === q.group;
          const showWrong = picked === c.slug && c.slug !== q.group;
          return (
            <button
              key={c.slug}
              type="button"
              disabled={picked !== null}
              onClick={() => answer(c.slug)}
              className={cx(
                'flex items-center gap-3 rounded-lg border px-4 py-3 text-left text-[0.9375rem] transition-colors',
                'border-rule hover:border-ink3 disabled:cursor-default',
                showRight && '!border-field bg-fieldTint',
                showWrong && '!border-blood bg-stock2',
              )}
            >
              <kbd className="mono shrink-0 rounded border border-ruleStrong px-1.5 text-ink3">{n + 1}</kbd>
              <span className="text-ink">{c.name}</span>
            </button>
          );
        })}
      </div>
      {/* Preload the next photo so the swap is instant. */}
      {deck[i + 1] ? <link rel="preload" as="image" href={deck[i + 1]!.src} /> : null}
    </div>
  );
}
