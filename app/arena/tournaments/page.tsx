import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { eventEntities } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { DiscordButton } from '@/components/community/Discord';
import { SponsorStrip } from '@/components/community/Sponsors';
import { EVENTS, statusLabel } from '@/lib/content/events-feed';
import { site } from '@/lib/site.config';

/**
 * Arena → Tournaments: LTK's competitions, running and past, each with its own page.
 *
 * The championship carries the parent brand's name (site.championship); the trademark
 * question is still open under REGISTRY R-01.
 *
 * R-18: skill-based contest rules vary by state and prize promotions can trip lottery
 * statutes. Prize details stay in the Discord and are never promoted here until the contest
 * rules have had legal review.
 */

const PATH = '/arena/tournaments/';

export const metadata: Metadata = pageMeta({
  title: 'LTK tournaments: past events and what’s running',
  description:
    'LTK’s gaming tournaments and leagues for pest control pros: fantasy football, Apex Legends, Halo 3 and the championship, with posters, sponsors and streams.',
  path: PATH,
});

export default function TournamentsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Tournaments', href: PATH },
  ];
  const dated = EVENTS.filter((e) => e.startDate);
  const graph = buildGraph({
    path: PATH,
    pageType: 'CollectionPage',
    crumbs,
    primary: dated.length
      ? eventEntities({
          path: PATH,
          events: dated.map((e) => ({ slug: e.id, name: e.name, description: e.summary, startDate: e.startDate!, online: true })),
        })
      : undefined,
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">Arena · Tournaments</p>
        <h1 className="display mb-6 max-w-[18ch]">Tournaments and leagues</h1>

        <div className="mb-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <p className="prose-bulletin">
            LTK started as a video game group, and competition is still the glue. Tournaments run in the{' '}
            {site.discord.name} on a different game each time, streamed on YouTube, backed by sponsors from the trade
            &mdash; and the fantasy football league runs all season.
          </p>
          <LabelBlock title="The championship" signal="warning" meta="Monthly to quarterly">
            The championship carries the crew&rsquo;s name: the <strong>{site.championship.name}</strong>. It runs on a
            different game each time &mdash; bragging rights, and being the one everybody tags in the pest ID channel.
          </LabelBlock>
        </div>

        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {EVENTS.map((e) => {
            const img = e.image ?? e.updates?.[0]?.image;
            return (
              <li key={e.id} className="card overflow-hidden">
                <a href={`${PATH}${e.id}/`} className="group block">
                  {img ? (
                    <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" className="aspect-[4/3] w-full object-cover object-top" />
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center bg-stock2 p-6 text-center">
                      <span className="h2 text-ink3">{e.game}</span>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="mono mb-1 text-ink3">
                      {statusLabel(e)} &middot; {e.when.split(' · ')[0]}
                    </p>
                    <h2 className="h3 group-hover:text-blood">{e.name}</h2>
                    <p className="mt-1 text-sm text-ink2">{e.summary}</p>
                  </div>
                </a>
                <div className="px-5 pb-5">
                  <SponsorStrip ids={e.sponsors} label="Sponsored by" />
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-8 max-w-[64ch] text-sm text-ink3">
          Brackets, sign-ups and prize details are posted in the Discord. Contest rules differ by state, so prizes are
          never promoted on this site.
        </p>

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Next tournament?</span> Sign-ups go out in the Discord first.
          </p>
          <DiscordButton>Join the Discord</DiscordButton>
        </div>
      </div>
    </>
  );
}
