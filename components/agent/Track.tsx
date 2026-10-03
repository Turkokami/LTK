'use client';

import { useEffect, useRef } from 'react';
import { award } from '@/lib/agent/store';
import type { AgentEvent, StatKey } from '@/lib/agent/config';

/**
 * Pays out XP once when this marker scrolls into view (e.g. the end of a field guide), or
 * shortly after mount with `onMount`. Renders an invisible 1px marker.
 */
export function TrackXp({
  once,
  xp,
  label,
  stat,
  kind,
  onMount = false,
}: {
  once: string;
  xp: number;
  label: string;
  stat?: StatKey;
  kind: AgentEvent['kind'];
  onMount?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const pay = () => award({ xp, label, once, stats: stat ? { [stat]: 1 } : undefined, event: { kind } });
    if (onMount) {
      const t = window.setTimeout(pay, 1500);
      return () => window.clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        pay();
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [once, xp, label, stat, kind, onMount]);
  return <span ref={ref} aria-hidden="true" className="block h-px w-px" />;
}
