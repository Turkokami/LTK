import { K9_SPECIALTIES } from '@/lib/content/k9';

/**
 * "Kinds of K9 work" on the K9 field guide. One card per specialty; the detail opens in a
 * native <details> so the section scans quickly and works without JavaScript.
 */
export function K9Specialties() {
  return (
    <section id="kinds-of-k9" className="mt-12 scroll-mt-24">
      <h2 className="h2 mb-2">Kinds of K9 work</h2>
      <p className="mb-5 max-w-[62ch] text-ink2">
        Dogs earn their place in pest control in five different ways. Each has its own training,
        its own evidence and its own rules.
      </p>
      <nav aria-label="Kinds of K9 work" className="mb-6 flex flex-wrap gap-2">
        {K9_SPECIALTIES.map((k) => (
          <a
            key={k.slug}
            href={`#k9-${k.slug}`}
            className="rounded-full border border-ruleStrong px-3 py-1.5 text-xs font-semibold text-ink2 hover:border-blood hover:text-ink"
          >
            {k.name}
          </a>
        ))}
      </nav>
      <ul className="space-y-4">
        {K9_SPECIALTIES.map((k) => (
          <li key={k.slug} id={`k9-${k.slug}`} className="label-panel scroll-mt-24">
            <div className="label-bar">
              <span>{k.name}</span>
            </div>
            <div className="py-4 pl-[1.35rem] pr-5">
              <p className="mb-3 text-[0.9375rem] leading-relaxed text-ink">{k.summary}</p>
              <details className="group">
                <summary className="cursor-pointer list-none text-sm font-semibold text-blood [&::-webkit-details-marker]:hidden">
                  <span className="group-open:hidden">How it works, the evidence and the rules +</span>
                  <span className="hidden group-open:inline">Hide details &minus;</span>
                </summary>
                <div className="mt-4 space-y-4 text-[0.9375rem] leading-relaxed text-ink2">
                  <div>
                    <h3 className="h3 mb-2 text-base">How it works</h3>
                    {k.howItWorks.map((p) => (
                      <p key={p.slice(0, 40)} className="mb-2">
                        {p}
                      </p>
                    ))}
                  </div>
                  <div>
                    <h3 className="h3 mb-2 text-base">What the evidence says</h3>
                    <p>{k.evidence}</p>
                  </div>
                  <div className="rounded-md border border-ruleStrong bg-stock p-3">
                    <h3 className="mb-1 text-sm font-semibold uppercase tracking-wide text-blood">Rules</h3>
                    <p className="text-sm">{k.rules}</p>
                  </div>
                  <ul className="space-y-1 text-xs">
                    {k.sources.map((s) => (
                      <li key={s.url}>
                        <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
