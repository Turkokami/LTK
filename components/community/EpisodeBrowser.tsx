'use client';

import { useMemo, useState } from 'react';
import { VideoEmbed } from '@/components/ace/VideoEmbed';
import { cx } from '@/lib/utils';
import type { LtkEpisode, LtkSeries } from '@/lib/content/podcast';

/**
 * Every LTK episode, filterable by series and searchable by title, guest or topic. Players are
 * click-to-load (VideoEmbed), so a page of 28 episodes doesn't load 28 YouTube players.
 */

const fmtDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

function length(s: number) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}` : `${m}:${String(sec).padStart(2, '0')}`;
}

export function EpisodeBrowser({
  episodes,
  series,
}: {
  episodes: LtkEpisode[];
  series: { id: LtkSeries; name: string; blurb: string }[];
}) {
  const [active, setActive] = useState<LtkSeries | 'all'>('all');
  const [q, setQ] = useState('');
  const [showAll, setShowAll] = useState(false);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return episodes.filter(
      (e) =>
        (active === 'all' || e.series === active) &&
        (!needle || `${e.title} ${e.guests.join(' ')} ${e.summary}`.toLowerCase().includes(needle)),
    );
  }, [episodes, active, q]);
  const limit = showAll || active !== 'all' || q ? shown.length : 9;
  const nameOf = (id: LtkSeries) => series.find((s) => s.id === id)?.name ?? id;
  const blurb = active === 'all' ? null : series.find((s) => s.id === active)?.blurb;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by series">
        <Chip on={active === 'all'} onClick={() => setActive('all')}>
          All ({episodes.length})
        </Chip>
        {series
          .filter((s) => episodes.some((e) => e.series === s.id))
          .map((s) => (
            <Chip key={s.id} on={active === s.id} onClick={() => setActive(s.id)}>
              {s.name} ({episodes.filter((e) => e.series === s.id).length})
            </Chip>
          ))}
        <label className="ml-auto min-w-[12rem] flex-1 sm:max-w-xs">
          <span className="sr-only">Search episodes</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by guest or topic"
            className="w-full rounded-md border border-ruleStrong bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink3"
          />
        </label>
      </div>
      {blurb ? <p className="mb-5 text-sm text-ink3">{blurb}</p> : null}

      {shown.length === 0 ? (
        <p className="text-ink2">No episodes match.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.slice(0, limit).map((e) => (
            <li key={e.youtubeId} className="flex flex-col">
              <VideoEmbed id={e.youtubeId} title={e.title} duration={length(e.lengthSeconds)} />
              <div className="px-1 pt-3">
                <p className="mono mb-1 text-ink3">
                  {nameOf(e.series)} &middot; {fmtDate.format(new Date(e.published))}
                </p>
                <p className="text-sm leading-relaxed text-ink2">{e.summary}</p>
                {e.alsoAt?.map((a) => (
                  <a key={a.url} href={a.url} target="_blank" rel="noopener noreferrer" className="link mt-1 inline-block text-xs">
                    {a.label}
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
      {limit < shown.length ? (
        <div className="mt-8 text-center">
          <button type="button" className="btn btn--ghost" onClick={() => setShowAll(true)}>
            Show all {shown.length} episodes
          </button>
        </div>
      ) : null}
    </div>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cx(
        'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
        on ? 'border-blood bg-danger text-ink' : 'border-ruleStrong text-ink2 hover:text-ink',
      )}
    >
      {children}
    </button>
  );
}
