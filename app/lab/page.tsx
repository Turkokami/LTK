import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';
import { HubSpokes } from '@/components/site/HubSpokes';

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
        <p className="lede mb-10">{HUB.blurb}</p>

        <a href="/lab/crew-picks/" className="discord-band group mb-12 block">
          <div className="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow mb-2">From the Discord</p>
              <p className="h2 mb-2 group-hover:text-blood">Crew picks: the gear members run</p>
              <p className="max-w-[60ch] text-ink2">
                Sprayers ranked by people who have burned through six of them, foggers, exclusion
                hardware, traps and boots &mdash; credited and dated, straight from #the-arsenal.
              </p>
            </div>
            <span className="btn btn--lg">See the picks</span>
          </div>
        </a>

        <HubSpokes hub={HUB} />
      </div>
    </>
  );
}
