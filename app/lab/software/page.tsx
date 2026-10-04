import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { SOFTWARE_GUIDES } from '@/lib/content/software';
import { site } from '@/lib/site.config';

/** /lab/software/ — the software guides side by side. Facts only; no scores, no winner. */

const PATH = '/lab/software/';

export const metadata: Metadata = pageMeta({
  title: 'Pest control software: PestPac, FieldRoutes and more',
  description:
    'Researched guides to pest control business software: who each platform is built for, pest-specific features, published pricing and what to ask in a demo.',
  path: PATH,
  ogTemplate: 'lab',
});

export default function SoftwareIndex() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Lab', href: '/lab/' },
    { name: 'Software', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, pageType: 'CollectionPage', crumbs });
  const sorted = [...SOFTWARE_GUIDES].sort((a, b) => Number(b.pestSpecific) - Number(a.pestSpecific) || a.name.localeCompare(b.name));

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Lab &middot; Software</p>
        <h1 className="display mb-4 max-w-[20ch]">Pest control software, side by side</h1>
        <p className="lede mb-6 max-w-[62ch]">
          Routing, scheduling, chemical records, WDO reports, billing. What the main platforms are built for, what they
          publish about price, and the questions to ask before you sign.
        </p>
        <p className="mb-10 max-w-[62ch] text-sm text-ink3">
          These are researched guides, not hands-on reviews &mdash; no scores and no &ldquo;best&rdquo;. If you run one of
          these, the {site.discord.name} wants your take.
        </p>

        <div className="overflow-x-auto rounded-[var(--radius)] border border-rule">
          <table className="w-full min-w-[44rem] text-left text-sm">
            <thead className="bg-stock2 text-ink">
              <tr>
                <th className="px-4 py-3">Software</th>
                <th className="px-4 py-3">Built for</th>
                <th className="px-4 py-3">Pest-specific</th>
                <th className="px-4 py-3">Pricing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rule text-ink2">
              {sorted.map((g) => (
                <tr key={g.slug}>
                  <td className="px-4 py-3">
                    <a href={`/lab/software/${g.slug}/`} className="link font-semibold">
                      {g.name}
                    </a>
                    <span className="block text-xs text-ink3">{g.maker}</span>
                  </td>
                  <td className="px-4 py-3">{g.builtFor}</td>
                  <td className="px-4 py-3">{g.pestSpecific ? 'Yes' : 'General'}</td>
                  <td className="px-4 py-3">{g.pricing}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Switching software?</span> Ask the owners in the Discord what they moved
            from, and why.
          </p>
          <DiscordButton>Ask the crew</DiscordButton>
        </div>
      </div>
    </>
  );
}
