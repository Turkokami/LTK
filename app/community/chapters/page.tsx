import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { StateGrid } from '@/components/site/StateGrid';
import { DiscordButton } from '@/components/community/Discord';
import { STATES } from '@/lib/content/states';
import { site } from '@/lib/site.config';

const PATH = '/community/chapters/';

export const metadata: Metadata = pageMeta({
  title: 'State chapters: find pest control pros near you',
  description: `LTK state chapters: local meetups, regional regulatory updates and the pest control pros working near you. Start your state’s chapter in the ${site.discord.name}.`,
  path: PATH,
});

export default function ChaptersIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Community', href: '/community/' },
    { name: 'Chapters', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, pageType: 'CollectionPage', crumbs });
  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Community &middot; Chapters</p>
        <h1 className="display mb-4 max-w-[16ch]">Your state. Your crew.</h1>
        <p className="lede mb-8">
          Chapters are where the national community goes local: who&rsquo;s working near you, what
          changed in your state and who&rsquo;s getting together. They run on members, not staff
          &mdash; if you want one near you, say so in the {site.discord.name} and we&rsquo;ll help
          you start it.
        </p>
        <div className="mb-10">
          <DiscordButton size="lg">Start your state&rsquo;s chapter</DiscordButton>
        </div>
        <StateGrid states={STATES} hrefFor={(s) => `${PATH}${s.slug}/`} verifiedLabel="Rules verified" />
      </div>
    </>
  );
}
