'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { cx } from '@/lib/utils';

/**
 * Community up/down votes. <VotesProvider> fetches every tally on the page in one request;
 * <VoteButtons> reads from it. One vote per device (a random id kept in localStorage), which
 * the server hashes. If voting is unavailable the buttons render nothing — the page is
 * complete without them.
 */

type Tally = { up: number; down: number };
type Ctx = {
  ready: boolean;
  counts: Record<string, Tally>;
  mine: Record<string, number>;
  cast: (id: string, vote: 1 | -1 | 0) => void;
};

const VotesCtx = createContext<Ctx | null>(null);
const DEVICE_KEY = 'ltk-voter-id';

function deviceId(): string | null {
  try {
    let id = window.localStorage.getItem(DEVICE_KEY);
    if (!id) {
      id = crypto.randomUUID();
      window.localStorage.setItem(DEVICE_KEY, id);
    }
    return id;
  } catch {
    return null; // storage blocked: voting stays off rather than allowing unlimited votes
  }
}

export function VotesProvider({ ids, children }: { ids: string[]; children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [counts, setCounts] = useState<Record<string, Tally>>({});
  const [mine, setMine] = useState<Record<string, number>>({});
  const [device, setDevice] = useState<string | null>(null);

  useEffect(() => {
    const d = deviceId();
    setDevice(d);
    if (!d) return;
    const q = new URLSearchParams({ ids: ids.join(','), device: d });
    fetch(`/api/votes/?${q}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: { counts: Record<string, Tally>; mine: Record<string, number> }) => {
        setCounts(data.counts);
        setMine(data.mine);
        setReady(true);
      })
      .catch(() => setReady(false));
  }, [ids]);

  const cast = useCallback(
    (id: string, vote: 1 | -1 | 0) => {
      if (!device) return;
      // Optimistic update, reconciled with the server's tally.
      const prev = mine[id] ?? 0;
      setMine((m) => ({ ...m, [id]: vote }));
      setCounts((c) => {
        const t = { ...(c[id] ?? { up: 0, down: 0 }) };
        if (prev === 1) t.up--;
        if (prev === -1) t.down--;
        if (vote === 1) t.up++;
        if (vote === -1) t.down++;
        return { ...c, [id]: t };
      });
      fetch('/api/votes/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, device, vote }),
      })
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((t: Tally & { mine: number }) => {
          setCounts((c) => ({ ...c, [id]: { up: t.up, down: t.down } }));
        })
        .catch(() => {
          setMine((m) => ({ ...m, [id]: prev }));
        });
    },
    [device, mine],
  );

  return <VotesCtx.Provider value={{ ready, counts, mine, cast }}>{children}</VotesCtx.Provider>;
}

function Thumb({ down = false }: { down?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" fill="currentColor" className={down ? 'rotate-180' : undefined}>
      <path d="M2 21h4V9H2v12Zm20-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L13.17 1 6.59 7.59C6.22 7.95 6 8.45 6 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2Z" />
    </svg>
  );
}

export function VoteButtons({ id, label }: { id: string; label: string }) {
  const ctx = useContext(VotesCtx);
  if (!ctx?.ready) return null;
  const t = ctx.counts[id] ?? { up: 0, down: 0 };
  const my = ctx.mine[id] ?? 0;
  const total = t.up + t.down;
  const pct = total ? Math.round((t.up / total) * 100) : null;

  const btn = (dir: 1 | -1) => (
    <button
      type="button"
      aria-pressed={my === dir}
      aria-label={`${dir === 1 ? 'Thumbs up' : 'Thumbs down'} for ${label}${my === dir ? ' (your vote — press to remove)' : ''}`}
      onClick={() => ctx.cast(id, my === dir ? 0 : dir)}
      className={cx(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-bold tabular-nums transition-colors',
        my === dir
          ? dir === 1
            ? 'border-field bg-fieldTint text-field'
            : 'border-blood bg-stock2 text-blood'
          : 'border-ruleStrong text-ink2 hover:border-ink3 hover:text-ink',
      )}
    >
      <Thumb down={dir === -1} />
      {dir === 1 ? t.up : t.down}
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-2" aria-live="polite">
      {btn(1)}
      {btn(-1)}
      <span className="text-xs text-ink3">
        {pct === null ? 'Be the first to vote' : `${pct}% thumbs up · ${total} vote${total === 1 ? '' : 's'}`}
      </span>
    </div>
  );
}
