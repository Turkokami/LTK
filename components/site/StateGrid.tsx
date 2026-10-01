import type { StateRecord } from '@/lib/content/states';
import { cx } from '@/lib/utils';

/**
 * 50-state grid for geo-layer index pages. Verified states lead and are marked; the rest are
 * listed alphabetically so every state page is one click from its index.
 */
export function StateGrid({
  states,
  hrefFor,
  verifiedLabel = 'Verified',
  badgeFor,
}: {
  states: StateRecord[];
  hrefFor: (s: StateRecord) => string;
  verifiedLabel?: string;
  /** Overrides the verified badge: return a label to highlight a state, or null for none. */
  badgeFor?: (s: StateRecord) => string | null;
}) {
  const marked = (s: StateRecord) => (badgeFor ? badgeFor(s) !== null : s.verified);
  const sorted = [...states].sort(
    (a, b) => Number(marked(b)) - Number(marked(a)) || a.name.localeCompare(b.name),
  );
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
      {sorted.map((s) => (
        <li key={s.code}>
          <a
            href={hrefFor(s)}
            className={cx('card flex h-full items-center justify-between gap-2 px-4 py-3', marked(s) && 'border-field2')}
          >
            <span className="text-sm font-medium">{s.name}</span>
            {marked(s) ? (
              <span className="badge-verified shrink-0">{badgeFor ? badgeFor(s) : verifiedLabel}</span>
            ) : (
              <span className="mono text-ink3">{s.code}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
