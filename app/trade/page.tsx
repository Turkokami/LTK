import type { Metadata } from 'next';
import { PhotoStrip } from '@/components/ui/PhotoStrip';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';
import { HubSpokes } from '@/components/site/HubSpokes';

const HUB = getHub('trade');

export const metadata: Metadata = pageMeta({
  title: 'Jobs, pay and ownership',
  description:
    'Pest control jobs with pay ranges shown, original salary survey data by role and region, and honest discussion of what running a branch or a company involves.',
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

        <PhotoStrip
          eyebrow="Why it’s a great career"
          title="What we tell students at career day"
          srcs={['/gallery/careerday-cool-jobs.webp', '/gallery/careerday-pays.webp', '/gallery/careerday-what-is.webp', '/gallery/route-ready.webp']}
          className="mb-12"
        />

        <HubSpokes hub={HUB} />
      </div>
    </>
  );
}
