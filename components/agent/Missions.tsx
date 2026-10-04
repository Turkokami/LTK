'use client';

import { useEffect, useState } from 'react';
import { missionsFor, weekKey, type Mission } from '@/lib/agent/missions';
import { useAgent } from './useAgent';
import { cx } from '@/lib/utils';

/**
 * This week's three missions with live progress. Rendered after mount only: the week (and so
 * the missions) depends on today's date, which a cached server render can't know.
 */

const HREF: Record<Mission['lane'], string> = { daily: '/arena/daily/', study: '/academy/ace/', game: '/arena/' };
const LANE: Record<Mission['lane'], string> = { daily: 'Daily', study: 'Study', game: 'Arena' };

/** Chicago's UTC offset on a given day, e.g. '-05:00' (CDT) or '-06:00' (CST). */
function chicagoOffset(day: string): string {
  const name = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', timeZoneName: 'shortOffset' })
    .formatToParts(new Date(`${day}T12:00:00Z`))
    .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT-6';
  const h = Number(name.replace('GMT', '')) || -6;
  return `${h < 0 ? '-' : '+'}${String(Math.abs(h)).padStart(2, '0')}:00`;
}

function untilMonday(week: string): string {
  const next = new Date(`${week}T12:00:00Z`);
  next.setUTCDate(next.getUTCDate() + 7);
  const day = next.toISOString().slice(0, 10);
  const end = Date.parse(`${day}T00:00:00${chicagoOffset(day)}`); // next Monday, midnight Central
  const ms = Math.max(0, end - Date.now());
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  return d ? `${d}d ${h}h` : `${h}h`;
}

export function Missions({ compact = false }: { compact?: boolean }) {
  const a = useAgent();
  const [week, setWeek] = useState<string | null>(null);
  useEffect(() => setWeek(weekKey()), []);

  if (!week) return <div className={cx('label-panel', compact ? 'min-h-[10rem]' : 'min-h-[14rem]')} aria-busy="true" />;
  const counts = a.week.key === week ? a.week.counts : {};
  const done = a.week.key === week ? a.week.done : {};
  const list = missionsFor(week);
  const finished = list.filter((m) => done[m.id]).length;

  return (
    <section className="label-panel" aria-label="This week's missions">
      <div className="label-bar">
        <span>Weekly missions &middot; {finished}/3</span>
        <span>Resets in {untilMonday(week)}</span>
      </div>
      <ul className={cx('grid gap-3 py-4 pl-[1.35rem] pr-5', !compact && 'md:grid-cols-3')}>
        {list.map((m) => {
          const n = Math.min(counts[m.key] ?? 0, m.target);
          const ok = !!done[m.id];
          return (
            <li key={m.id} className={cx('rounded-md border p-3', ok ? 'border-field bg-fieldTint' : 'border-rule')}>
              <p className="mono mb-1 flex justify-between text-ink3">
                <span>{LANE[m.lane]}</span>
                <span className={ok ? 'text-field' : ''}>+{m.xp} XP</span>
              </p>
              <a href={HREF[m.lane]} className="font-semibold text-ink hover:text-blood">
                {ok ? '✓ ' : ''}
                {m.title}
              </a>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stock2" aria-hidden="true">
                <div className="h-full bg-field transition-[width] duration-500" style={{ width: `${(n / m.target) * 100}%` }} />
              </div>
              <p className="mono mt-1 text-ink3">
                {ok ? 'Done' : `${n} / ${m.target}`}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
