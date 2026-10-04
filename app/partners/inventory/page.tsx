import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { INVENTORY } from '@/lib/content/inventory';
import { site } from '@/lib/site.config';
import { cx } from '@/lib/utils';

/** /partners/inventory/ — everything a sponsor can back, marked running or new. No prices (R-16). */

const PATH = '/partners/inventory/';

export const metadata: Metadata = pageMeta({
  title: 'What you can sponsor at LTK',
  description:
    'Tournaments, the fantasy football league, giveaways, the Daily Drop, Arena games, monthly seasons and meetups: every LTK sponsorship and what it includes.',
  path: PATH,
  ogTemplate: 'partners',
});

export default function InventoryPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Partners', href: '/partners/' },
    { name: 'What you can sponsor', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Partners &middot; Inventory</p>
        <h1 className="display mb-4 max-w-[18ch]">What you can sponsor</h1>
        <p className="lede mb-4 max-w-[62ch]">
          Pick a moment the crew already shows up for. <strong>Running</strong> means sponsors back it today;{' '}
          <strong>New</strong> means it&rsquo;s open and you&rsquo;d be first.
        </p>
        <p className="mb-10 max-w-[62ch] text-sm text-ink3">
          Pricing is worked out with you. Everything is labelled as sponsored, and editorial, Lab results and pest ID answers
          are never part of a package (
          <a href="/about/sponsorship-policy/" className="link">
            sponsorship policy
          </a>
          ).
        </p>

        <ul className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {INVENTORY.map((it) => (
            <li key={it.id} className="label-panel flex flex-col">
              <div className="label-bar">
                <span>{it.name}</span>
                <span className={cx('rounded-full px-2', it.status === 'running' ? 'text-field' : 'text-warning')}>
                  {it.status === 'running' ? 'Running' : 'New'}
                </span>
              </div>
              <div className="flex flex-1 flex-col py-4 pl-[1.35rem] pr-5">
                <p className="mb-3 text-ink2">{it.what}</p>
                <ul className="mb-3 list-disc space-y-1 pl-5 text-sm text-ink2">
                  {it.includes.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                {it.example ? (
                  <a href={it.example.href} className="link mt-auto text-sm">
                    See it: {it.example.label}
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <div className="discord-band mt-12 p-6 sm:p-8">
          <h2 className="h2 mb-2">Let&rsquo;s build something</h2>
          <p className="mb-4 max-w-[58ch] text-ink2">
            Tell us what you want to put in front of pest pros. Message Marcus in the {site.discord.name} or on LinkedIn.
          </p>
          <div className="flex flex-wrap gap-3">
            <DiscordButton>Message us on Discord</DiscordButton>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="/partners/media-kit/" className="btn btn--ghost">
              Media kit
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
