import type { Crumb } from '@/lib/schema/types';

/** Visible breadcrumbs. The BreadcrumbList node is emitted separately by buildGraph(). */
export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mono py-3 text-ink3">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => (
          <li key={c.href} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {i === crumbs.length - 1 ? (
              <span className="text-ink" aria-current="page">{c.name}</span>
            ) : (
              <a href={c.href} className="hover:text-ink">{c.name}</a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
