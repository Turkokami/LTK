import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { OWNER_TOPICS } from '@/lib/content/owner-topics';
import { abs, site } from '@/lib/site.config';

/** /trade/owners/ — index of owner topics. */

const PATH = '/trade/owners/';

export const metadata: Metadata = pageMeta({
  title: 'Running a pest control company',
  description:
    'Plain answers for owners and managers: hiring, insurance, vehicles and hazmat, records, OSHA, and buying or selling a company, sourced to the rules that apply.',
  path: PATH,
});

export default function OwnersIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade/' },
    { name: 'Running a company', href: PATH },
  ];
  const graph = buildGraph({
    path: PATH,
    pageType: 'CollectionPage',
    crumbs,
    primary: [
      {
        '@type': 'ItemList',
        '@id': `${abs(PATH)}#topics`,
        name: 'Running a pest control company',
        numberOfItems: OWNER_TOPICS.length,
        itemListElement: OWNER_TOPICS.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.title,
          url: abs(`/trade/owners/${t.slug}/`),
        })),
      },
    ],
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Trade &middot; Running a company</p>
        <h1 className="display mb-4 max-w-[18ch]">Running the business</h1>
        <p className="lede mb-10 max-w-[60ch]">
          The parts of owning a pest control company nobody teaches on the route. Each one is
          sourced to the agency or rule that applies. For licences, insurance minimums and fees by
          state, start with{' '}
          <a href="/trade/start/" className="link">
            Starting a company
          </a>
          .
        </p>

        <ul className="grid gap-4 md:grid-cols-2">
          {OWNER_TOPICS.map((t) => (
            <li key={t.slug}>
              <a href={`/trade/owners/${t.slug}/`} className="card group block h-full p-5">
                <h2 className="h3 mb-2 group-hover:text-blood">{t.title}</h2>
                <p className="text-sm leading-relaxed text-ink2">{t.question}</p>
              </a>
            </li>
          ))}
        </ul>

        <div className="card mt-12 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[48ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Owners make up a big part of LTK.</span> Ask the
            ones who&rsquo;ve done it in the {site.discord.name}.
          </p>
          <DiscordButton>Ask owners in the Discord</DiscordButton>
        </div>
      </div>
    </>
  );
}
