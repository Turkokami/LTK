import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';

const HUB = getHub('lab');

export const metadata: Metadata = pageMeta({
  title: 'Equipment, software and field trials',
  description:
    'Independent reviews and head-to-head comparisons of the gear and software you actually buy, plus member-run field trials with published data.',
  path: HUB.path,
});

export default function Page() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: HUB.eyebrow, href: HUB.path },
  ];
  const graph = buildGraph({ path: HUB.path, pageType: 'CollectionPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">{HUB.eyebrow}</p>
        <h1 className="display mb-5 max-w-[18ch]">{HUB.title}</h1>
        <p className="prose-bulletin mb-10">{HUB.blurb}</p>

        <p className="eyebrow mb-4">What lives here</p>
        <ul className="grid gap-px bg-rule md:grid-cols-2">
          {HUB.spokes.map((s) => (
            <li key={s.pattern} className="bg-paper p-4">
              <p className="h3 mb-1">{s.label}</p>
              <p className="mono text-ink3">
                {s.pattern}
                {s.count ? ` \u00b7 ${s.count === 'open' ? 'open-ended' : s.count + ' pages'}` : ''}
              </p>
            </li>
          ))}
        </ul>

        {/* TODO: replace the route inventory above with real spoke listings as each ships.
            The inventory is deliberately visible during the build so gaps stay obvious. */}
      </div>
    </>
  );
}
