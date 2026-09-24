'use client';

import { useEffect, useMemo, useState } from 'react';

/**
 * Site search. A client leaf over an index the server page builds at render time — no
 * external service, no network call. /search/ is noindex (and disallowed in robots once the
 * site is indexable), so client-side rendering is fine here; nothing indexable lives in it.
 */

export interface SearchItem {
  title: string;
  text: string;
  href: string;
  kind: string;
}

function score(item: SearchItem, terms: string[]): number {
  const t = item.title.toLowerCase();
  const x = item.text.toLowerCase();
  let s = 0;
  for (const term of terms) {
    const inTitle = t.includes(term);
    const inText = x.includes(term);
    if (!inTitle && !inText) return 0; // every term must match somewhere
    s += inTitle ? (t.startsWith(term) ? 6 : 4) : 1;
  }
  return s;
}

export function SiteSearch({ index }: { index: SearchItem[] }) {
  const [q, setQ] = useState('');

  // Read ?q= once on load so searches are linkable.
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get('q');
    if (initial) setQ(initial);
  }, []);

  // Keep the URL in step without adding history entries.
  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url);
  }, [q]);

  const results = useMemo(() => {
    const terms = q.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    if (!terms.length) return [];
    return index
      .map((item) => ({ item, s: score(item, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 40)
      .map((r) => r.item);
  }, [q, index]);

  return (
    <div>
      <label htmlFor="site-search" className="sr-only">
        Search the site
      </label>
      <input
        id="site-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Try “termite”, “ants”, “Texas” or “bed bugs”"
        autoFocus
        autoComplete="off"
        className="w-full rounded-[var(--radius)] border border-ruleStrong bg-paper px-5 py-4 text-lg text-ink placeholder:text-ink3 focus:border-blood"
      />

      <p className="mt-3 text-sm text-ink3" aria-live="polite">
        {q.trim().length > 1
          ? results.length
            ? `${results.length} result${results.length === 1 ? '' : 's'}`
            : 'Nothing matched. Try a shorter word, or ask in the Discord.'
          : `Searching ${index.length} pages, modules and glossary terms.`}
      </p>

      {results.length ? (
        <ul className="mt-6 space-y-2">
          {results.map((r) => (
            <li key={r.href + r.title}>
              <a href={r.href} className="card group block p-4">
                <span className="mb-1 flex items-center justify-between gap-3">
                  <span className="font-semibold text-ink group-hover:text-blood">{r.title}</span>
                  <span className="mono shrink-0 rounded-full border border-ruleStrong px-2 py-0.5 text-ink3">
                    {r.kind}
                  </span>
                </span>
                <span className="line-clamp-2 block text-sm text-ink2">{r.text}</span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
