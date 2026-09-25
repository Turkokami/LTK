import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { DiscordButton } from '@/components/community/Discord';
import { CommunityGallery } from '@/components/community/CommunityGallery';
import { CHEM_TALK, CREW_PICKS } from '@/lib/content/community';
import { photosFor } from '@/lib/content/community-photos';
import { site } from '@/lib/site.config';

/**
 * Lab → Crew picks. What LTK Discord members say about the gear they run. These are member
 * reports, not Lab reviews: no testing claim, no scores, no Review/AggregateRating schema.
 * The page says so up top (review-methodology rule).
 */

const PATH = '/lab/crew-picks/';

export const metadata: Metadata = pageMeta({
  title: 'Crew picks: the gear pest pros actually run',
  description: `Backpack sprayers, foggers, exclusion hardware, traps, apps and boots: what pest control pros in the ${site.discord.name} say about the gear on their trucks.`,
  path: PATH,
});

export default function CrewPicksPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Lab', href: '/lab/' },
    { name: 'Crew picks', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, pageType: 'CollectionPage', crumbs });
  const gear = photosFor('gear');

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Lab &middot; Crew picks</p>
        <h1 className="display mb-4 max-w-[18ch]">The gear the crew actually runs.</h1>
        <p className="lede mb-6">
          What members of the {site.discord.name} say about the tools on their trucks &mdash; the
          sprayers they swear by, the ones that burned up in three weeks, and the cheap fixes that
          save a day.
        </p>

        <LabelBlock title="Member reports, not Lab reviews" signal="warning" meta="Credited and dated" className="mb-10 max-w-[52rem]">
          Everything below is what a member posted, credited by Discord handle with the month they
          said it. Prices are what they paid or quoted at the time. Nothing here has been tested by
          the Lab &mdash; when it has, it moves to a review with published criteria.{' '}
          <a href="/about/review-methodology/" className="link">
            How Lab reviews work
          </a>
          .
        </LabelBlock>

        <nav aria-label="Jump to a category" className="mb-10 flex flex-wrap gap-2">
          {CREW_PICKS.map((g) => (
            <a key={g.id} href={`#${g.id}`} className="rounded-full border border-ruleStrong px-3 py-1.5 text-sm font-semibold text-ink2 hover:text-ink">
              {g.name}
            </a>
          ))}
          <a href="#chemistry" className="rounded-full border border-ruleStrong px-3 py-1.5 text-sm font-semibold text-ink2 hover:text-ink">
            Chemistry talk
          </a>
        </nav>

        {CREW_PICKS.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} className="mb-14 scroll-mt-24">
            <h2 id={`${g.id}-h`} className="h2 mb-1">
              {g.name}
            </h2>
            <p className="mb-5 text-ink2">{g.blurb}</p>
            <ul className="grid gap-3 md:grid-cols-2">
              {g.picks.map((p) => (
                <li key={p.product} className="card flex h-full flex-col p-5">
                  <p className="h3 mb-2">{p.product}</p>
                  <p className="mb-4 text-[0.9375rem] leading-relaxed text-ink2">{p.said}</p>
                  <p className="mt-auto flex flex-wrap items-center justify-between gap-2 text-xs text-ink3">
                    <span>
                      {p.who} &middot; {p.when}
                    </span>
                    {p.link ? (
                      <a href={p.link} target="_blank" rel="noopener noreferrer nofollow" className="link">
                        Link a member shared<span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section id="chemistry" aria-labelledby="chem-h" className="mb-14 scroll-mt-24">
          <h2 id="chem-h" className="h2 mb-1">
            Chemistry talk
          </h2>
          <p className="mb-5 max-w-[62ch] text-ink2">
            What the crew reaches for, pest by pest. This is technique talk between licensed pros,
            not a treatment recommendation.
          </p>
          <LabelBlock title="The label is the law" signal="danger" className="mb-5 max-w-[52rem]">
            Every product here is only legal to use as its label directs, on the sites and pests it
            lists, in your state. Check the label and your state registration before you use
            anything a member mentions.
          </LabelBlock>
          <ul className="grid gap-3 md:grid-cols-2">
            {CHEM_TALK.map((c) => (
              <li key={c.pest} className="card p-5">
                <p className="h3 mb-2">{c.pest}</p>
                <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink2">
                  {c.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                <p className="mt-3 text-xs text-ink3">
                  {c.who} &middot; {c.when}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {gear.length ? (
          <section aria-labelledby="gear-photos" className="mb-10">
            <h2 id="gear-photos" className="h2 mb-5">
              On the trucks
            </h2>
            <CommunityGallery photos={gear} />
          </section>
        ) : null}

        <div className="discord-band p-6 sm:p-8">
          <p className="eyebrow mb-2">#the-arsenal</p>
          <p className="h2 mb-2">Got an opinion on your sprayer?</p>
          <p className="mb-5 max-w-[60ch] text-ink2">
            The best gear advice on this page started as an argument in the Discord. Add yours.
          </p>
          <DiscordButton size="lg">Join the gear talk</DiscordButton>
        </div>
      </div>
    </>
  );
}
