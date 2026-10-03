'use client';

import { rankFor } from '@/lib/agent/config';
import { useAgent } from './useAgent';
import { Insignia } from './Insignia';

/** Header pill (or mobile-menu card): rank insignia, rank and XP bar. Links to the Agent file. */
export function HeaderAgent({ variant = 'pill' }: { variant?: 'pill' | 'card' }) {
  const a = useAgent();
  const { rank, index, next, progress } = rankFor(a.xp);
  const xp = a.xp.toLocaleString('en-US');
  const label = `Your Agent file: ${rank.name}, ${xp} XP${next ? `, ${(next.minXp - a.xp).toLocaleString('en-US')} to ${next.name}` : ''}`;

  if (variant === 'card') {
    return (
      <a href="/arena/agent/" className="mb-3 flex items-center gap-3 rounded-md border border-ruleStrong p-3" aria-label={label}>
        <Insignia index={index} size={34} />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-ink">{rank.name}</span>
          <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-stock2">
            <span className="block h-full bg-field" style={{ width: `${progress * 100}%` }} />
          </span>
          <span className="mono mt-1 block text-ink3">{xp} XP &middot; Agent file</span>
        </span>
      </a>
    );
  }

  return (
    <a
      href="/arena/agent/"
      aria-label={label}
      title={label}
      className="hidden items-center gap-2 rounded-[8px] border border-ruleStrong px-2 py-1.5 transition-colors hover:border-field lg:inline-flex"
    >
      <Insignia index={index} size={26} />
      {/* Rank name lives in the tooltip and the Agent file; the header has no room for it. */}
      <span className="block w-12">
        <span className="mono block text-[0.6875rem] font-bold leading-none text-ink">{xp} XP</span>
        <span className="mt-1 block h-1 overflow-hidden rounded-full bg-stock2">
          <span className="block h-full bg-field transition-[width] duration-700" style={{ width: `${progress * 100}%` }} />
        </span>
      </span>
    </a>
  );
}
