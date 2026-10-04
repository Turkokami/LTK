'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Sponsor } from '@/lib/content/sponsors';
import { cx } from '@/lib/utils';

/**
 * Rotating "Sponsored by" strip near the top of the home page. One sponsor at a time, a
 * digital glitch-in every few seconds; pauses on hover/focus and when the tab is hidden.
 * Reduced motion: no animation, slower swap. Links are rel="sponsored" (sponsorship policy).
 */

const INTERVAL = 4500;

export function SponsorRotator({ sponsors }: { sponsors: Sponsor[] }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tick, setTick] = useState(0); // remounts the slide so the animation replays
  const timer = useRef<number | null>(null);

  const go = useCallback(
    (n: number) => {
      setI(((n % sponsors.length) + sponsors.length) % sponsors.length);
      setTick((t) => t + 1);
    },
    [sponsors.length],
  );

  useEffect(() => {
    if (paused || sponsors.length < 2) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    timer.current = window.setTimeout(() => {
      if (document.visibilityState === 'visible') go(i + 1);
      else setTick((t) => t + 1);
    }, reduce ? INTERVAL * 2 : INTERVAL);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [i, paused, tick, go, sponsors.length]);

  const s = sponsors[i];
  if (!s) return null;

  return (
    <section
      className="sponsor-rotator"
      aria-label="Our sponsors"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="shell flex items-center gap-4 py-2.5 sm:gap-6">
        <p className="sponsor-rotator__label">
          <span className="live-dot" aria-hidden="true" />
          Sponsored by
        </p>

        <div className="relative min-w-0 flex-1">
          <a
            key={`${s.id}-${tick}`}
            href={s.url ?? `/partners/${s.id}/`}
            {...(s.url ? { target: '_blank', rel: 'sponsored noopener' } : {})}
            className="sponsor-rotator__slide"
          >
            <span className={cx('sponsor-rotator__plate', s.plate === 'dark' && 'sponsor-rotator__plate--dark')}>
              <img src={s.logo.src} alt="" width={s.logo.width} height={s.logo.height} />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-bold text-ink">{s.name}</span>
              <span className="hidden truncate text-xs text-ink3 md:block">{s.what}</span>
            </span>
            <span className="sponsor-rotator__visit">
              Visit<span className="sr-only"> {s.name}{s.url ? ' (opens in a new tab)' : ''}</span> ›
            </span>
          </a>
        </div>

        <div className="hidden items-center gap-1.5 sm:flex" role="group" aria-label="Choose a sponsor">
          {sponsors.map((sp, k) => (
            <button
              key={sp.id}
              type="button"
              onClick={() => go(k)}
              aria-label={`Show ${sp.name}`}
              aria-current={k === i ? 'true' : undefined}
              className={cx('sponsor-rotator__dot', k === i && 'is-on')}
            />
          ))}
        </div>
        <a href="/partners/" className="hidden text-xs font-semibold uppercase tracking-wide text-ink3 hover:text-field lg:inline">
          Sponsor LTK
        </a>
      </div>
    </section>
  );
}
