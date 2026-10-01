import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { StateGrid } from '@/components/site/StateGrid';
import { DiscordButton } from '@/components/community/Discord';
import { UpdateCard } from '@/components/wire/UpdateCard';
import { WireFeed } from '@/components/wire/WireFeed';
import { STATES } from '@/lib/content/states';
import { ALL_UPDATES, STATES_WITH_UPDATES, WIRE_UPDATED, updatesForState } from '@/lib/content/wire';
import { abs, site } from '@/lib/site.config';
import { formatVerified } from '@/lib/utils';

/**
 * /wire/regulatory/ — the regulatory log: every sourced change, newest first, filterable by
 * federal or state, plus the 50-state grid. Items live in lib/content/wire.ts and need a
 * primary-source document; no source, no item.
 * CONVERSION CONTRACT: primary action "Flag a rule change" (Discord).
 */

const PATH = '/wire/regulatory/';

export const metadata: Metadata = pageMeta({
  title: 'Pest control regulatory updates by state',
  description:
    'Federal and state pest control rule changes: label changes, restricted products, licensing and records rules, each linked to the agency document it came from.',
  path: PATH,
});

export default function RegulatoryIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Wire', href: '/wire/' },
    { name: 'Regulatory', href: PATH },
  ];
  const nameOf = (code: string) => (code === 'US' ? 'Federal' : STATES.find((s) => s.code === code)?.name ?? code);
  const today = new Date().toISOString().slice(0, 10);
  const graph = buildGraph({
    path: PATH,
    pageType: 'CollectionPage',
    crumbs,
    primary: ALL_UPDATES.length
      ? [
          {
            '@type': 'ItemList',
            '@id': `${abs(PATH)}#updates`,
            name: 'Pest control regulatory updates',
            numberOfItems: ALL_UPDATES.length,
            itemListElement: ALL_UPDATES.map((u, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: `${nameOf(u.stateCode)}: ${u.headline}`,
              url: u.sourceUrl,
            })),
          },
        ]
      : undefined,
  });

  const scopes: [string, string][] = [
    ...(ALL_UPDATES.some((u) => u.stateCode === 'US') ? [['US', 'Federal'] as [string, string]] : []),
    ...STATES_WITH_UPDATES.map((c) => [c, nameOf(c)] as [string, string]).sort((a, b) => a[1].localeCompare(b[1])),
  ];
  const upcoming = ALL_UPDATES.filter((u) => u.effectiveOn > today);

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Wire &middot; Regulatory</p>
        <h1 className="display mb-4 max-w-[18ch]">Did anything change in my state?</h1>
        <p className="lede mb-6 max-w-[62ch]">
          Label changes, restricted products, licensing and recordkeeping rules, federal and by
          state. Every item links to the agency document it came from &mdash; no source, no post.
          If an item here disagrees with the label in your hand, the label wins.
        </p>
        <div className="mb-12 flex flex-wrap items-center gap-4">
          <DiscordButton size="lg">Flag a rule change</DiscordButton>
          {WIRE_UPDATED ? (
            <p className="mono text-ink3">
              {ALL_UPDATES.length} items &middot; latest {formatVerified(WIRE_UPDATED)}
            </p>
          ) : null}
        </div>

        {upcoming.length ? (
          <section className="mb-12" aria-labelledby="upcoming">
            <h2 id="upcoming" className="h2 mb-5">
              Coming up
            </h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {upcoming.map((u) => (
                <li key={u.slug}>
                  <UpdateCard u={u} stateName={nameOf(u.stateCode)} today={today} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <h2 className="h2 mb-5">The log</h2>
        {ALL_UPDATES.length ? (
          <WireFeed
            scopes={scopes}
            items={ALL_UPDATES.map((u) => ({
              key: u.slug,
              scope: u.stateCode,
              node: <UpdateCard u={u} stateName={nameOf(u.stateCode)} today={today} />,
            }))}
          />
        ) : (
          <p className="text-ink2">Nothing logged yet.</p>
        )}

        <h2 className="h2 mb-2 mt-16">By state</h2>
        <p className="mb-5 max-w-[62ch] text-ink2">
          Each state page shows that state&rsquo;s changes plus the federal ones that apply
          everywhere. States without a logged item still link to their agency.
        </p>
        <StateGrid
          states={STATES}
          hrefFor={(s) => `${PATH}${s.slug}/`}
          badgeFor={(s) => {
            const n = updatesForState(s.code).length;
            return n ? `${n} logged` : null;
          }}
        />

        <div className="card mt-12 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[48ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Seen a change we haven&rsquo;t?</span> Drop the
            agency notice in the {site.discord.name} and we&rsquo;ll run it down and log it.
          </p>
          <DiscordButton>Flag a rule change</DiscordButton>
        </div>
      </div>
    </>
  );
}
