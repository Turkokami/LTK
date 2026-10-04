'use client';

import { useEffect, useState } from 'react';
import { DAILY_TZ } from '@/lib/agent/config';

/** Live h:mm:ss countdown to the next Daily Drop (midnight US Central). Renders nothing until mounted. */
function msToNextDrop(): number {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: DAILY_TZ, hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return 86_400_000 - (get('hour') * 3600 + get('minute') * 60 + get('second')) * 1000;
}

export function DropCountdown({ className = '' }: { className?: string }) {
  const [ms, setMs] = useState<number | null>(null);
  useEffect(() => {
    const tick = () => setMs(msToNextDrop());
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, []);
  if (ms === null) return <span className={className} aria-hidden="true">&nbsp;</span>;
  const s = Math.floor(ms / 1000);
  const hh = Math.floor(s / 3600);
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return (
    <span className={className} aria-label={`Next Daily Drop in ${hh} hours ${mm} minutes`}>
      {hh}:{mm}:{ss}
    </span>
  );
}
