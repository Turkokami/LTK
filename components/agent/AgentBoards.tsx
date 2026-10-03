'use client';

import { useEffect, useState } from 'react';
import { cx } from '@/lib/utils';
import { useAgent, useAgentSession } from './useAgent';
import { signInHref } from './AgentAccount';

/**
 * Agent leaderboards: this month's XP (the season), all-time XP, live Daily Drop streaks and
 * today's drop. Signed-in Discord accounts only — the server grades and prices every entry.
 * Names show only for members who switched them on; everyone else is a codename.
 */

interface Row {
  name: string;
  avatar: string | null;
  value: number;
  rank: string;
  mine: boolean;
}
interface Boards {
  season: { month: string; rows: Row[] };
  allTime: Row[];
  streaks: Row[];
  today: { number: number; rows: Row[] };
}

type Tab = 'season' | 'today' | 'streaks' | 'allTime';

const monthName = (m: string) => new Date(`${m}-15T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export function AgentBoards({ only, title, next = '/arena/leaderboards/' }: { only?: Tab; title?: string; next?: string }) {
  const session = useAgentSession();
  // Refetch when this Agent's XP changes, so a just-finished drop shows up on the board.
  const xp = useAgent().xp;
  const [data, setData] = useState<Boards | null>(null);
  const [off, setOff] = useState(false);
  const [tab, setTab] = useState<Tab>(only ?? 'season');

  useEffect(() => {
    let live = true;
    fetch('/api/agent/boards/', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: Boards) => live && setData(d))
      .catch(() => live && setOff(true));
    return () => {
      live = false;
    };
  }, [session.user?.id, xp]);

  const tabs: { id: Tab; label: string; unit: string }[] = [
    { id: 'season', label: data ? monthName(data.season.month) : 'This month', unit: 'XP' },
    { id: 'today', label: data ? `Daily Drop #${data.today.number}` : 'Today', unit: 'of 2' },
    { id: 'streaks', label: 'Streaks', unit: 'days' },
    { id: 'allTime', label: 'All time', unit: 'XP' },
  ];
  const cur = tabs.find((t) => t.id === tab)!;
  const rows: Row[] = !data ? [] : tab === 'season' ? data.season.rows : tab === 'today' ? data.today.rows : tab === 'streaks' ? data.streaks : data.allTime;

  // Boards need Discord sign-in; until it's set up on this deploy, show nothing.
  if (!session.ready || !session.configured) return null;

  return (
    <section className="label-panel" aria-label={title ?? 'Agent leaderboards'}>
      <div className="label-bar">
        <span>{title ?? 'Agent leaderboards'}</span>
        <span>Discord sign-in</span>
      </div>
      <div className="py-4 pl-[1.35rem] pr-5">
        {!only ? (
          <div className="mb-4 flex flex-wrap gap-2" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cx('rounded-full border px-3 py-1 text-sm', tab === t.id ? 'border-field bg-fieldTint text-ink' : 'border-rule text-ink2 hover:border-ink3')}
              >
                {t.label}
              </button>
            ))}
          </div>
        ) : null}

        {off ? (
          <p className="text-sm text-ink3">Leaderboards are offline right now.</p>
        ) : !data ? (
          <p className="text-sm text-ink3">Loading&hellip;</p>
        ) : rows.length === 0 ? (
          <p className="text-sm text-ink2">
            Nobody on this board yet.{' '}
            {session.user ? 'Play and take the top spot.' : (
              <>
                <a href={signInHref(next)} className="link" rel="nofollow">Sign in with Discord</a> and take the top spot.
              </>
            )}
          </p>
        ) : (
          <ol className="divide-y divide-rule">
            {rows.map((r, i) => (
              <li key={`${r.name}-${i}`} className={cx('flex items-center gap-3 py-2', r.mine && 'font-semibold')}>
                <span className="mono w-6 text-right text-ink3">{i + 1}</span>
                {r.avatar ? (
                  <img src={r.avatar} alt="" width={24} height={24} className="h-6 w-6 rounded-full" />
                ) : (
                  <span aria-hidden="true" className="h-6 w-6 rounded-full bg-stock2" />
                )}
                <span className="min-w-0 flex-1 truncate text-ink">
                  {r.name}
                  {r.mine ? <span className="ml-2 text-xs text-field">you</span> : null}
                  <span className="mono ml-2 hidden text-ink3 sm:inline">{r.rank}</span>
                </span>
                <span className="mono text-ink">
                  {r.value.toLocaleString('en-US')} <span className="text-ink3">{cur.unit}</span>
                </span>
              </li>
            ))}
          </ol>
        )}
        <p className="mt-3 text-xs text-ink3">
          Names appear only for members who switch them on in their Agent file; everyone else shows as a codename.
          Play for fun &mdash; no prizes.
        </p>
      </div>
    </section>
  );
}
