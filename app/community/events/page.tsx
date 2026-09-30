import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { site } from '@/lib/site.config';

/**
 * /community/events/ — what LTK runs, from the owner questionnaire (2026-09-29, Section 5).
 * No Event schema: nothing here has a fixed date yet, and Event markup without a real
 * startDate is a false claim. Add dated events (with Event JSON-LD) as they are scheduled.
 * Prizes exist in practice but are NOT promoted here — prize contests can trip state lottery
 * and skill-contest rules (REGISTRY R-18) until reviewed.
 * CONVERSION CONTRACT: primary action "Join the Discord".
 */

const PATH = '/community/events/';

export const metadata: Metadata = pageMeta({
  title: 'LTK events: game nights, meetups and the championship',
  description:
    'What LTK runs: daily field talk, the podcast, game nights, a championship on a rotating game, specialist sessions, quarterly meetups and trade show appearances.',
  path: PATH,
});

const REGULAR: { name: string; when: string; body: string; href?: string }[] = [
  {
    name: 'Daily field talk',
    when: 'Every day',
    body: 'The running conversation from the route: what people found, what worked, and the odd thing that crawled out of a wall. Busiest on weekdays during working hours.',
  },
  {
    name: 'The Licensed to Kill Podcast',
    when: 'Episodes on Spotify',
    body: 'Marcus talks with people across the trade. Past episodes are the one thing LTK archives.',
    href: '/community/podcast/',
  },
  {
    name: 'Game nights',
    when: 'Regular',
    body: 'LTK started as a video game group, and game nights are still a big part of it.',
  },
  {
    name: 'The championship',
    when: 'Monthly to quarterly',
    body: `The ${site.championship.name} runs on a different game each time, so nobody gets too comfortable.`,
    href: '/arena/tournaments/',
  },
  {
    name: 'Specialist sessions',
    when: 'As scheduled',
    body: 'Sessions with entomologists and other specialists. The ones run so far have gone well.',
  },
  {
    name: 'Group chats',
    when: 'Ongoing',
    body: 'Smaller group conversations running alongside the main channels.',
  },
];

const IN_PERSON: { name: string; body: string }[] = [
  { name: 'Quarterly meetups', body: 'Beer and wings, arcades, and whatever gets people in a room together.' },
  { name: 'Trade shows and PestWorld', body: 'LTK shows up at trade shows, including an LTK house at PestWorld.' },
  { name: 'Job fairs and career days', body: 'Members go as advocates for the trade and talk to people deciding whether to get into it.' },
];

export default function EventsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Community', href: '/community/' },
    { name: 'Events', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Community &middot; Events</p>
        <h1 className="display mb-4 max-w-[18ch]">What&rsquo;s on</h1>
        <p className="lede mb-10 max-w-[60ch]">
          {site.community.difference} Most of it happens in the {site.discord.name}, and the
          schedule lives there too.
        </p>

        <h2 className="h2 mb-5">In the Discord</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          {REGULAR.map((e) => (
            <li key={e.name} className="label-panel">
              <div className="label-bar">
                <span>{e.name}</span>
                <span>{e.when}</span>
              </div>
              <div className="py-4 pl-[1.35rem] pr-5 text-[0.9375rem] leading-relaxed text-ink2">
                <p>{e.body}</p>
                {e.href ? (
                  <a href={e.href} className="link mt-2 inline-block text-sm">
                    More
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>

        <h2 className="h2 mb-5 mt-14">In person</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {IN_PERSON.map((e) => (
            <li key={e.name} className="card p-5">
              <h3 className="h3 mb-2">{e.name}</h3>
              <p className="text-sm leading-relaxed text-ink2">{e.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-5 max-w-[62ch] text-sm text-ink3">
          Turnout runs from about 6 to 35. The best-attended so far was an in-person Warhammer 40K
          event.
        </p>

        <div className="card mt-12 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[48ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Dates and invites go out in the Discord.</span>{' '}
            Join to see what&rsquo;s coming up next.
          </p>
          <DiscordButton>Join the Discord</DiscordButton>
        </div>
      </div>
    </>
  );
}
