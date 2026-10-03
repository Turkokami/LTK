import { RANKS } from '@/lib/agent/config';

/**
 * Rank insignia: the LTK scope reticle. One tick lights up per rank above Recruit; the top
 * rank closes the ring. Decorative — the rank name always sits next to it in text.
 */
export function Insignia({ index, size = 28 }: { index: number; size?: number }) {
  const ticks = RANKS.length - 1;
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true" className="shrink-0">
      <circle cx="20" cy="20" r="17" fill="none" stroke="var(--rule-strong)" strokeWidth="2" />
      {Array.from({ length: ticks }, (_, i) => {
        const a = (i / ticks) * Math.PI * 2 - Math.PI / 2;
        return (
          <line
            key={i}
            x1={20 + Math.cos(a) * 13}
            y1={20 + Math.sin(a) * 13}
            x2={20 + Math.cos(a) * 18}
            y2={20 + Math.sin(a) * 18}
            strokeWidth="3"
            strokeLinecap="round"
            stroke={i < index ? 'var(--field)' : 'var(--rule-strong)'}
          />
        );
      })}
      {index >= ticks ? <circle cx="20" cy="20" r="17" fill="none" stroke="var(--field)" strokeWidth="2" /> : null}
      <line x1="20" y1="9" x2="20" y2="16" stroke="var(--ink-2)" strokeWidth="1.5" />
      <line x1="20" y1="24" x2="20" y2="31" stroke="var(--ink-2)" strokeWidth="1.5" />
      <line x1="9" y1="20" x2="16" y2="20" stroke="var(--ink-2)" strokeWidth="1.5" />
      <line x1="24" y1="20" x2="31" y2="20" stroke="var(--ink-2)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2.2" fill="var(--signal-danger)" />
    </svg>
  );
}
