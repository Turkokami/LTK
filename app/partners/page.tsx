import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';
import { HubSpokes } from '@/components/site/HubSpokes';
import { SponsorWall } from '@/components/community/Sponsors';

const HUB = getHub('partners');

export const metadata: Metadata = pageMeta({
  title: 'Sponsorship and partnership',
  description:
    'Sponsorship for companies selling into pest management. Clearly labelled placement in front of working pros. Editorial and Lab scores are never for sale.',
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

        <h2 className="h2 mb-2">Current sponsors</h2>
        <p className="mb-5 max-w-[62ch] text-ink2">
          The companies backing LTK&rsquo;s tournaments and leagues right now. Thank you. Sponsors get labelled
          placement; they never buy editorial, Lab results or pest ID answers (
          <a href="/about/sponsorship-policy/" className="link">sponsorship policy</a>).
        </p>
        <div className="mb-14">
          <SponsorWall />
        </div>

        <HubSpokes hub={HUB} />
      </div>
    </>
  );
}
