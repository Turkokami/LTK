import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';
import { HubSpokes } from '@/components/site/HubSpokes';

const HUB = getHub('arena');

export const metadata: Metadata = pageMeta({
  title: 'Competition and leaderboards',
  description:
    'Identification speed runs, inspection challenges and the annual Licensed to Kill championship. Competition built to sharpen the skills the job actually needs.',
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

        <HubSpokes hub={HUB} />
      </div>
    </>
  );
}
