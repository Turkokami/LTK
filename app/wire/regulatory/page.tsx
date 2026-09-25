import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { StateGrid } from '@/components/site/StateGrid';
import { DiscordButton } from '@/components/community/Discord';
import { STATES } from '@/lib/content/states';
import { site } from '@/lib/site.config';

const PATH = '/wire/regulatory/';

export const metadata: Metadata = pageMeta({
  title: 'Pest control regulatory updates by state',
  description:
    'State-by-state pest control regulatory updates: label changes, restricted products and rule changes, every item linked to its agency source. Pick your state.',
  path: PATH,
});

export default function RegulatoryIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Wire', href: '/wire/' },
    { name: 'Regulatory', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, pageType: 'CollectionPage', crumbs });
  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Wire &middot; Regulatory</p>
        <h1 className="display mb-4 max-w-[18ch]">Did anything change in my state?</h1>
        <p className="lede mb-8">
          Label changes, restricted products and rule changes, filed by state. Every item links to
          the agency or registrant document it came from &mdash; no source, no post. Spotted a
          change? Flag it in the {site.discord.name} and we&rsquo;ll run it down.
        </p>
        <div className="mb-10">
          <DiscordButton size="lg">Flag a rule change</DiscordButton>
        </div>
        <StateGrid states={STATES} hrefFor={(s) => `${PATH}${s.slug}/`} verifiedLabel="Agency verified" />
      </div>
    </>
  );
}
