import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { SponsorStrip } from '@/components/community/Sponsors';
import { FeaturedIn } from '@/components/community/Timeline';
import { EVENTS } from '@/lib/content/events-feed';
import { INVENTORY } from '@/lib/content/inventory';
import { LTK_EPISODES } from '@/lib/content/podcast';
import { discordStats } from '@/lib/server/discord-stats';
import { site } from '@/lib/site.config';

/**
 * /partners/media-kit/ — the one page a sponsor forwards to their boss. Live Discord numbers
 * (hourly), counted site facts, the press feature, current sponsors and the inventory, plus a
 * PDF snapshot (public/ltk-media-kit.pdf — regenerate from docs/media-kit.html when it ages).
 */

export const revalidate = 3600;

const PATH = '/partners/media-kit/';

export const metadata: Metadata = pageMeta({
  title: 'LTK media kit for sponsors',
  description:
    'The LTK media kit: who the community is, live Discord numbers, press coverage, current sponsors, past events and what you can sponsor, with a PDF to download.',
  path: PATH,
  ogTemplate: 'partners',
});

export default async function MediaKitPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Partners', href: '/partners/' },
    { name: 'Media kit', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs });
  const stats = await discordStats();
  const facts: [string, string, string][] = [
    [stats.members.toLocaleString('en-US'), 'Discord members', stats.live ? 'Live from Discord' : `Owner-reported, ${site.community.membersAsOf}`],
    [stats.online ? stats.online.toLocaleString('en-US') : site.community.weeklyActive, stats.online ? 'Online right now' : 'Active in a typical week', stats.online ? 'Live from Discord' : 'Owner-reported'],
    [String(LTK_EPISODES.length), 'Podcast episodes and streams', 'LTK YouTube channel'],
    ['Jan 2025', 'Founded', 'by Marcus Scruggs'],
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Partners &middot; Media kit</p>
        <h1 className="display mb-4 max-w-[18ch]">LTK media kit</h1>
        <p className="lede mb-6 max-w-[62ch]">{site.community.origin}</p>
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <a href="/ltk-media-kit.pdf" className="btn" download>
            Download the PDF
          </a>
          <FeaturedIn />
        </div>

        <h2 className="h2 mb-4">The numbers</h2>
        <div className="mb-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {facts.map(([v, l, n]) => (
            <div key={l} className="card p-4">
              <p className="font-sans text-3xl font-extrabold text-ink">{v}</p>
              <p className="mt-1 font-semibold text-ink">{l}</p>
              <p className="mono mt-1 text-ink3">{n}</p>
            </div>
          ))}
        </div>
        <p className="mb-12 max-w-[64ch] text-sm text-ink3">
          We publish only numbers we can show. Detailed audience breakdowns (states, roles, company size) aren&rsquo;t
          published yet &mdash; ask and we&rsquo;ll share what we have.
        </p>

        <div className="mb-12 grid gap-6 lg:grid-cols-2">
          <section className="label-panel" aria-labelledby="who">
            <div className="label-bar">
              <span id="who">Who&rsquo;s here</span>
            </div>
            <ul className="list-disc space-y-1 py-4 pl-[2.6rem] pr-5 text-[0.9375rem] text-ink2">
              <li>Pest control technicians, owners and specialists from across the US</li>
              <li>All corners of the trade: general pest, termite, wildlife, exclusion and every field in between</li>
              <li>Gamers: tournaments, game nights and a fantasy football league</li>
              <li>An open public invite &mdash; no licence check to join</li>
            </ul>
          </section>
          <section className="label-panel" aria-labelledby="where">
            <div className="label-bar">
              <span id="where">Where we show up</span>
            </div>
            <ul className="list-disc space-y-1 py-4 pl-[2.6rem] pr-5 text-[0.9375rem] text-ink2">
              <li>The LTK Discord &mdash; where the community lives day to day</li>
              <li>YouTube &mdash; the podcast, interviews and tournament streams</li>
              <li>The LTK Facebook group and LinkedIn</li>
              <li>This site &mdash; field guides, state licensing, ACE prep and the Arena</li>
              <li>In person &mdash; meetups and trade shows, including PestWorld</li>
            </ul>
          </section>
        </div>

        <h2 className="h2 mb-4">Sponsors and the events they backed</h2>
        <SponsorStrip label="Current sponsors" className="mb-6" />
        <ul className="mb-12 grid gap-3 md:grid-cols-3">
          {EVENTS.map((e) => (
            <li key={e.id}>
              <a href={`/arena/tournaments/${e.id}/`} className="card group block h-full p-4">
                <p className="mono text-ink3">{e.when.split(' · ')[0]}</p>
                <p className="font-semibold text-ink group-hover:text-blood">{e.name}</p>
                <p className="mt-1 text-xs text-ink3">{e.sponsors.length} sponsors</p>
              </a>
            </li>
          ))}
        </ul>

        <h2 className="h2 mb-4">What you can sponsor</h2>
        <ul className="mb-4 grid gap-2 text-sm text-ink2 md:grid-cols-2">
          {INVENTORY.map((it) => (
            <li key={it.id} className="flex items-baseline gap-2">
              <span className={it.status === 'running' ? 'text-field' : 'text-warning'}>●</span>
              <span>
                <span className="font-semibold text-ink">{it.name}</span> &mdash; {it.what}
              </span>
            </li>
          ))}
        </ul>
        <a href="/partners/inventory/" className="link">
          Full details
        </a>

        <div className="discord-band mt-12 p-6 sm:p-8">
          <h2 className="h2 mb-2">Talk to us</h2>
          <p className="mb-4 max-w-[58ch] text-ink2">Message Marcus in the {site.discord.name} or on LinkedIn.</p>
          <div className="flex flex-wrap gap-3">
            <DiscordButton>Message us on Discord</DiscordButton>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
