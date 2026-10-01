'use client';

import { useState, type ReactNode } from 'react';
import { cx } from '@/lib/utils';

/**
 * Filter chips over server-rendered update cards. Cards arrive pre-rendered with their scope
 * code; this leaf only decides which to show. Works without JS: everything renders, unfiltered.
 */
export function WireFeed({
  items,
  scopes,
}: {
  items: { scope: string; node: ReactNode; key: string }[];
  /** [code, label] pairs, in display order. */
  scopes: [string, string][];
}) {
  const [scope, setScope] = useState<string>('all');
  const shown = scope === 'all' ? items : items.filter((i) => i.scope === scope);
  const count = (c: string) => items.filter((i) => i.scope === c).length;

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter updates">
        {[['all', 'Everything'] as [string, string], ...scopes].map(([c, label]) => (
          <button
            key={c}
            type="button"
            aria-pressed={scope === c}
            onClick={() => setScope(c)}
            className={cx(
              'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
              scope === c ? 'border-blood bg-danger text-ink' : 'border-ruleStrong text-ink2 hover:text-ink',
            )}
          >
            {label} ({c === 'all' ? items.length : count(c)})
          </button>
        ))}
      </div>
      <ul className="grid gap-4 md:grid-cols-2" aria-live="polite">
        {shown.map((i) => (
          <li key={i.key}>{i.node}</li>
        ))}
      </ul>
    </>
  );
}
