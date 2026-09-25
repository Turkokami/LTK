import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { FORUM_CATEGORIES } from '@/lib/content/hubs';
import { site } from '@/lib/site.config';

/**
 * /community/forums/ — the 13 categories. The forum backend is REGISTRY R-09, so today the
 * conversation lives in the Discord; each category page says so and points there.
 */

const PATH = '/community/forums/';

export const metadata: Metadata = pageMeta({
  title: 'Pest control forums: 13 categories for working pros',
  description: `Thirteen forum categories for pest control pros, from termite and rodents to sales and rookies. The talk lives in the ${site.discord.name} while forums are built.`,
  path: PATH,
});

export default function ForumsIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Community', href: '/community/' },
    { name: 'Forums', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, pageType: 'CollectionPage', crumbs });
  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Community &middot; Forums</p>
        <h1 className="display mb-4 max-w-[16ch]">Pick a topic. Pull up a chair.</h1>
        <p className="lede mb-8">
          Thirteen categories, one for every corner of the trade. The threads on this site open
          with the founding cohort &mdash; until then, the same conversations are happening every
          day in the {site.discord.name}.
        </p>
        <div className="mb-10">
          <DiscordButton size="lg">Talk shop on Discord now</DiscordButton>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FORUM_CATEGORIES.map((c) => (
            <li key={c.slug}>
              <a href={`${PATH}${c.slug}/`} className="card group flex h-full items-center justify-between gap-4 p-5">
                <span className="h3 group-hover:text-blood">{c.name}</span>
                <span aria-hidden="true" className="text-blood">
                  &rarr;
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
