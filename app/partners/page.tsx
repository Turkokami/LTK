import type { Metadata } from 'next';
import { FeaturedIn } from '@/components/community/Timeline';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';
import { HubSpokes } from '@/components/site/HubSpokes';
import { SponsorWall } from '@/components/community/Sponsors';
import { DiscordButton } from '@/components/community/Discord';
import { SPONSORS } from '@/lib/content/sponsors';
import { EVENTS } from '@/lib/content/events-feed';
import { LTK_EPISODES } from '@/lib/content/podcast';
import { discordStats } from '@/lib/server/discord-stats';
import { site } from '@/lib/site.config';

/**
 * /partners/ — sponsors first: who backs LTK, what they get, and the numbers behind it, so a
 * company thinking about sponsoring sees the value in one page. Every figure is either live
 * (Discord's public count, hourly) or counted from the site's own content.
 */

export const revalidate = 3600;

const HUB = getHub('partners');

export const metadata: Metadata = pageMeta({
  title: 'Sponsor LTK: our sponsors and what you get',
  description:
    'Meet the companies backing LTK and see what sponsors get: tournament posters, stream shout-outs, league graphics and site placement in front of pest pros.',
  path: HUB.path,
});

const PLACEMENTS: { what: string; detail: string }[] = [
  { what: 'Tournament posters', detail: 'Your logo on the poster for every event you back, shared in the Discord and on this site.' },
  { what: 'Live streams', detail: 'Shout-outs during tournament streams on the LTK YouTube channel, plus your name in the stream title and description.' },
  { what: 'League graphics', detail: '“Sponsored by” on the weekly fantasy football updates the whole league checks.' },
  { what: '#our-sponsors in the Discord', detail: 'A standing post introducing your company to every member.' },
  { what: 'This website', detail: 'Your logo on the home page, the events page and this page, and in the sponsor row at the foot of every page.' },
  { what: 'Giveaways', detail: 'Put your product in the prize pool and in front of the techs who use it.' },
];

export default async function Page() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: HUB.eyebrow, href: HUB.path },
  ];
  const graph = buildGraph({ path: HUB.path, pageType: 'CollectionPage', crumbs });
  const stats = await discordStats();
  const backedEvents = EVENTS.filter((e) => e.sponsors.length).length;
  const posters = EVENTS.flatMap((e) => (e.image ? [e.image] : e.updates?.[0]?.image ? [e.updates[0].image] : []));

  const FIGURES: { value: string; label: string; note: string }[] = [
    { value: stats.members.toLocaleString('en-US'), label: 'Discord members', note: stats.live ? 'Live count from Discord' : `Owner-reported, ${site.community.membersAsOf}` },
    stats.online
      ? { value: stats.online.toLocaleString('en-US'), label: 'Online right now', note: 'Live from Discord' }
      : { value: site.community.weeklyActive, label: 'Active in a typical week', note: 'Owner-reported' },
    { value: String(LTK_EPISODES.length), label: 'Podcast episodes and streams', note: 'On the LTK YouTube channel' },
    { value: String(backedEvents), label: 'Sponsored events', note: 'Since 2025, and counting' },
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">{HUB.eyebrow}</p>
        <h1 className="display mb-5 max-w-[20ch]">Backed by companies who back the trade</h1>
        <p className="lede mb-10 max-w-[62ch]">
          LTK is where pest control techs, owners and specialists hang out &mdash; gaming, talking shop and getting
          better at the job. These companies make the tournaments, leagues and giveaways happen.
        </p>

        <h2 className="h2 mb-5">Our sponsors</h2>
        <SponsorWall />

        <section className="mt-16" aria-labelledby="why">
          <p className="eyebrow mb-2">For companies thinking about it</p>
          <h2 id="why" className="h2 mb-3">Why sponsor LTK</h2>
          <p className="mb-6 max-w-[64ch] text-ink2">
            Techs don&rsquo;t read ads. They show up for game night, argue about fantasy football and ask each other
            which product actually works. A sponsor here isn&rsquo;t a banner &mdash; it&rsquo;s the company that put
            on the tournament.
          </p>
          <FeaturedIn className="mb-6" />
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {FIGURES.map((f) => (
              <div key={f.label} className="card p-4">
                <p className="font-sans text-3xl font-extrabold text-ink">{f.value}</p>
                <p className="mt-1 font-semibold text-ink">{f.label}</p>
                <p className="mono mt-1 text-ink3">{f.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="get">
          <h2 id="get" className="h2 mb-5">Where your brand shows up</h2>
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PLACEMENTS.map((p) => (
              <li key={p.what} className="card p-5">
                <h3 className="h3 mb-2">{p.what}</h3>
                <p className="text-sm text-ink2">{p.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        {posters.length ? (
          <section className="mt-14" aria-labelledby="proof">
            <h2 id="proof" className="h2 mb-2">The real thing</h2>
            <p className="mb-5 max-w-[60ch] text-ink2">Recent event graphics, sponsor logos and all.</p>
            <div className="grid items-start gap-4 md:grid-cols-[2fr_1fr]">
              {posters.map((p) => (
                <img key={p.src} src={p.src} alt={p.alt} width={p.width} height={p.height} loading="lazy" className="w-full rounded-md ring-1 ring-ruleStrong" />
              ))}
            </div>
            <a href="/community/events/" className="link mt-4 inline-block">
              See every event
            </a>
          </section>
        ) : null}

        <section className="discord-band mt-14 p-6 sm:p-8" aria-labelledby="sponsor-cta">
          <h2 id="sponsor-cta" className="h2 mb-2">Get your company in front of the crew</h2>
          <p className="mb-5 max-w-[60ch] text-ink2">
            Back a tournament, a fantasy season or a giveaway. Message Marcus in the Discord or on LinkedIn and
            we&rsquo;ll work out what fits. {SPONSORS.length} companies already have.
          </p>
          <div className="flex flex-wrap gap-3">
            <DiscordButton>Message us on Discord</DiscordButton>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
              LinkedIn<span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="/about/sponsorship-policy/" className="btn btn--ghost">
              Sponsorship policy
            </a>
          </div>
          <p className="mt-4 text-sm text-ink3">
            Sponsors get labelled placement. Editorial, Lab results and pest ID answers are never for sale.
          </p>
        </section>

        <div className="mt-14">
          <HubSpokes hub={HUB} />
        </div>
      </div>
    </>
  );
}
