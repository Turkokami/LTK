'use client';

import { useEffect, useMemo, useState } from 'react';
import { cx } from '@/lib/utils';

/**
 * The ACE glossary as a grid of flip cards. Both faces are in the server HTML (the back face is
 * only rotated out of view), so every definition stays crawlable and readable without JS.
 * Click, Enter or Space flips a card. "Got it" marks are a per-browser convenience in
 * localStorage — nothing depends on them.
 */

export interface GlossaryCard {
  id: string;
  term: string;
  definition: string;
  fieldUse: string;
}

const KNOWN_KEY = 'ltk-ace-glossary-known';

export function GlossaryCards({ groups }: { groups: { id: string; name: string; terms: GlossaryCard[] }[] }) {
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [showAll, setShowAll] = useState(false);
  const [query, setQuery] = useState('');
  const [order, setOrder] = useState<Record<string, string[]> | null>(null);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [hideKnown, setHideKnown] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KNOWN_KEY);
      if (raw) setKnown(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* ignore */
    }
  }, []);

  const total = groups.reduce((n, g) => n + g.terms.length, 0);

  function toggle(id: string) {
    setFlipped((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleKnown(id: string) {
    setKnown((cur) => {
      const next = new Set(cur);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        window.localStorage.setItem(KNOWN_KEY, JSON.stringify([...next]));
      } catch {
        /* ignore */
      }
      return next;
    });
  }

  function shuffle() {
    const next: Record<string, string[]> = {};
    for (const g of groups) {
      const ids = g.terms.map((t) => t.id);
      for (let i = ids.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ids[i], ids[j]] = [ids[j]!, ids[i]!];
      }
      next[g.id] = ids;
    }
    setOrder(next);
    setFlipped(new Set());
    setShowAll(false);
  }

  const q = query.trim().toLowerCase();
  const visible = useMemo(
    () =>
      groups.map((g) => {
        const byId = new Map(g.terms.map((t) => [t.id, t]));
        const ids = order?.[g.id] ?? g.terms.map((t) => t.id);
        const terms = ids
          .map((id) => byId.get(id)!)
          .filter((t) => !q || `${t.term} ${t.definition} ${t.fieldUse}`.toLowerCase().includes(q))
          .filter((t) => !hideKnown || !known.has(t.id));
        return { ...g, terms };
      }),
    [groups, order, q, hideKnown, known],
  );

  return (
    <div>
      <div className="sticky top-[5.5rem] z-10 -mx-2 mb-6 rounded-[var(--radius)] border border-rule bg-stock/95 p-3 backdrop-blur">
        <div className="flex flex-wrap items-center gap-2">
          <label className="min-w-[12rem] flex-1">
            <span className="sr-only">Search the glossary</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${total} terms`}
              className="w-full rounded-md border border-ruleStrong bg-paper px-3 py-2 text-sm text-ink placeholder:text-ink3"
            />
          </label>
          <button type="button" className="btn btn--ghost !py-2" aria-pressed={showAll} onClick={() => setShowAll((s) => !s)}>
            {showAll ? 'Hide answers' : 'Show all answers'}
          </button>
          <button type="button" className="btn btn--ghost !py-2" onClick={shuffle}>
            Shuffle
          </button>
          <button type="button" className="btn btn--ghost !py-2" aria-pressed={hideKnown} onClick={() => setHideKnown((s) => !s)}>
            {hideKnown ? 'Show known' : 'Hide known'}
          </button>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stock2" aria-hidden="true">
            <div className="h-full bg-field transition-[width]" style={{ width: `${(known.size / total) * 100}%` }} />
          </div>
          <span className="mono shrink-0 text-ink3">
            {known.size} / {total} known
          </span>
        </div>
      </div>

      {visible.map((g) => (
        <section key={g.id} aria-labelledby={g.id} className="mb-12">
          <h2 id={g.id} className="h2 mb-2">
            {g.name}
          </h2>
          <p className="mb-5 text-sm text-ink3">Tap a card to flip it.</p>
          {g.terms.length === 0 ? (
            <p className="text-ink2">No terms match.</p>
          ) : (
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.terms.map((t) => {
                const isFlipped = showAll || flipped.has(t.id);
                const isKnown = known.has(t.id);
                return (
                  <div key={t.id} id={t.id} className="flip scroll-mt-28">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-pressed={isFlipped}
                      aria-label={`${t.term}: ${isFlipped ? 'showing definition' : 'flip to see the definition'}`}
                      onClick={() => toggle(t.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          toggle(t.id);
                        }
                      }}
                      className={cx('flip-inner cursor-pointer rounded-[var(--radius)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blood', isFlipped && 'is-flipped')}
                    >
                      {/* Front: the term. */}
                      <div className={cx('flip-face card flex min-h-[11rem] flex-col items-center justify-center p-5 text-center', isKnown && 'border-field2')}>
                        <dt className="h3">{t.term}</dt>
                        <span className="mono mt-3 text-ink3">Tap to flip</span>
                      </div>
                      {/* Back: definition and field use. */}
                      <div className="flip-face flip-back card flex min-h-[11rem] flex-col p-5">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink3">{t.term}</p>
                        <dd className="m-0 text-[0.9375rem] leading-relaxed text-ink">{t.definition}</dd>
                        <dd className="m-0 mt-3 text-sm leading-relaxed text-ink2">
                          <span className="mr-2 font-semibold uppercase tracking-wide text-blood">In the field</span>
                          {t.fieldUse}
                        </dd>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => toggleKnown(t.id)}
                      aria-pressed={isKnown}
                      className={cx(
                        'mt-2 w-full rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors',
                        isKnown ? 'border-field bg-fieldTint text-ink' : 'border-ruleStrong text-ink3 hover:text-ink',
                      )}
                    >
                      {isKnown ? '✓ Got it' : 'Mark as known'}
                    </button>
                  </div>
                );
              })}
            </dl>
          )}
        </section>
      ))}
    </div>
  );
}
