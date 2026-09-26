'use client';

import { useCallback, useEffect, useState } from 'react';
import { cx } from '@/lib/utils';

/**
 * Arena leaderboard. Renders nothing until the API answers (storage not configured → hidden).
 * `finalScore` set = a round just ended: offer to post it. The device id and chosen name are
 * per-browser conveniences in localStorage.
 */

type Row = { name: string; score: number; mine: boolean };
const DEVICE_KEY = 'ltk-voter-id';
const NAME_KEY = 'ltk-arena-name';

function device(): string | null {
  try {
    let id = window.localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return null;
  }
}

export function Leaderboard({ game, finalScore }: { game: string; finalScore?: number | null }) {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [best, setBest] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [posted, setPosted] = useState(false);

  const load = useCallback(() => {
    const d = device();
    const q = new URLSearchParams({ game, ...(d ? { device: d } : {}) });
    fetch(`/api/leaderboard/?${q}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { top: Row[]; best: number | null }) => {
        setRows(data.top);
        setBest(data.best);
      })
      .catch(() => setRows(null));
  }, [game]);

  useEffect(() => {
    load();
    try {
      setName(window.localStorage.getItem(NAME_KEY) ?? '');
    } catch {
      /* ignore */
    }
  }, [load]);

  useEffect(() => setPosted(false), [finalScore]);

  if (rows === null) return null;

  const canPost = !!finalScore && finalScore > 0 && !posted && (best === null || finalScore > best);

  async function post(e: React.FormEvent) {
    e.preventDefault();
    const d = device();
    if (!d || !finalScore) return;
    setStatus('Posting…');
    try {
      window.localStorage.setItem(NAME_KEY, name);
    } catch {
      /* ignore */
    }
    const r = await fetch('/api/leaderboard/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ game, device: d, name, score: finalScore }),
    });
    const data = await r.json().catch(() => ({}));
    if (r.ok) {
      setRows(data.top);
      setBest(data.best);
      setPosted(true);
      setStatus(data.rank ? `You're #${data.rank} on the board.` : 'Posted.');
    } else {
      setStatus(data.message ?? (r.status === 429 ? 'Slow down a moment, then try again.' : 'Could not post that score.'));
    }
  }

  return (
    <section aria-labelledby={`lb-${game}`} className="label-panel mt-8">
      <div className="label-bar">
        <span id={`lb-${game}`}>Leaderboard</span>
        <span>Honour system</span>
      </div>
      <div className="py-4 pl-[1.35rem] pr-5">
        {canPost ? (
          <form onSubmit={post} className="mb-5 flex flex-wrap items-end gap-2">
            <label className="flex-1 text-sm text-ink2">
              <span className="mb-1 block font-semibold text-ink">Post your {finalScore!.toLocaleString('en-US')}</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Discord handle"
                maxLength={20}
                required
                className="w-full rounded-md border border-ruleStrong bg-stock px-3 py-2 text-ink placeholder:text-ink3 focus:border-blood"
              />
            </label>
            <button type="submit" className="btn">
              Post score
            </button>
          </form>
        ) : null}
        {status ? (
          <p className="mb-3 text-sm text-ink2" aria-live="polite">
            {status}
          </p>
        ) : null}
        {rows.length ? (
          <ol className="space-y-1">
            {rows.map((r, i) => (
              <li
                key={`${r.name}-${i}`}
                className={cx('flex items-baseline justify-between gap-3 rounded px-2 py-1.5 text-sm', r.mine && 'bg-stock2')}
              >
                <span className="flex items-baseline gap-3">
                  <span className="mono w-6 text-ink3">{i + 1}</span>
                  <span className={cx('font-semibold', r.mine ? 'text-blood' : 'text-ink')}>{r.name}</span>
                </span>
                <span className="mono tabular-nums text-ink2">{r.score.toLocaleString('en-US')}</span>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-sm text-ink3">No scores yet. Finish a round and claim the top spot.</p>
        )}
        <p className="mt-3 text-xs text-ink3">
          Best score per device. Scores are self-reported — play fair, and keep names clean or they come down.
        </p>
      </div>
    </section>
  );
}
