'use client';

import { useEffect, useRef } from 'react';
import { track, type EventName, type EventProps } from '@/lib/analytics/events';

/**
 * The ONLY client component permitted inside an indexable page, and it renders nothing.
 *
 * CLAUDE.md 2.1: pages are server components. This is a leaf that fires one view event and
 * returns null — it adds no content, so it cannot change what a crawler sees.
 *
 * Fires once per mount. The ref guard matters because React strict mode double-invokes effects
 * in development, and you do not want to debug a 2x traffic number three months from now.
 */
export function TrackView({ event, ...props }: { event: EventName } & EventProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    track(event, props);
    // Intentionally mount-only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
