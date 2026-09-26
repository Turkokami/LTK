import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { StateGrid } from '@/components/site/StateGrid';
import { DiscordButton } from '@/components/community/Discord';
import { STATES } from '@/lib/content/states';
import { START_COMPANY } from '@/lib/content/start-company';
import { abs, site } from '@/lib/site.config';

/** /trade/start/ — index for the starting-a-company geo layer. Researched states only. */

const PATH = '/trade/start/';

export const metadata: Metadata = pageMeta({
  title: 'How to start a pest control company, by state',
  description:
    'The business licence, qualifying applicator, insurance minimums and fees to open a pest control company, state by state, each sourced to the state agency.',
  path: PATH,
});

export default function StartIndexPage() {
  const done = STATES.filter((s) => START_COMPANY.some((r) => r.code === s.code));
  const pending = STATES.filter((s) => !done.includes(s));
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade/' },
    { name: 'Starting a company', href: PATH },
  ];
  const graph = buildGraph({
    path: PATH,
    pageType: 'CollectionPage',
    crumbs,
    primary: [
      {
        '@type': 'ItemList',
        '@id': `${abs(PATH)}#states`,
        name: 'Starting a pest control company by state',
        numberOfItems: done.length,
        itemListElement: done.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `Start a pest control company in ${s.name}`,
          url: abs(`/trade/start/${s.slug}/`),
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
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Trade &middot; Starting a company</p>
        <h1 className="display mb-4 max-w-[20ch]">Going out on your own</h1>
        <p className="lede mb-10 max-w-[60ch]">
          Every state licenses the company separately from the tech. You&rsquo;ll need a business
          licence, a qualified applicator or operator on the paperwork, and proof of insurance
          &mdash; the minimums and the experience rules are what change from state to state.
        </p>

        <h2 className="h2 mb-5">Researched states</h2>
        <StateGrid states={done} hrefFor={(s) => `/trade/start/${s.slug}/`} verifiedLabel="Sourced" />

        <h2 className="h2 mb-2 mt-14">Not written up yet</h2>
        <p className="mb-5 max-w-[62ch] text-ink2">
          We add a state once every fee and insurance figure is checked against its regulator. Until
          yours is here, ask in the {site.discord.name} &mdash; plenty of members have done it.
        </p>
        <ul className="mb-6 flex flex-wrap gap-2">
          {pending.map((s) => (
            <li key={s.code} className="mono rounded-full border border-ruleStrong px-2.5 py-1 text-ink3">
              {s.name}
            </li>
          ))}
        </ul>
        <DiscordButton variant="ghost">Ask about your state</DiscordButton>
      </div>
    </>
  );
}
