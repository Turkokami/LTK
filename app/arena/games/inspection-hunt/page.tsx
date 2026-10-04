import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { InspectionHunt } from '@/components/arena/InspectionHunt';
import { INSPECTION_SPOTS } from '@/lib/content/inspection-spots';
import { abs, ID, site } from '@/lib/site.config';

/**
 * Arena → Games → Inspection Hunt. An exterior inspection as a 75-second game: six real
 * conducive conditions and entry points hidden among six things that are fine. The full
 * checklist is server-rendered under the game as study material.
 */

const PATH = '/arena/games/inspection-hunt/';

export const metadata: Metadata = pageMeta({
  title: 'Inspection Hunt: find the pest problems on a house',
  description:
    'A 75-second exterior inspection game: spot the conducive conditions and entry points on a house, from mulch on the foundation to gaps under the door. Free.',
  path: PATH,
});

export default function InspectionHuntPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Inspection Hunt', href: PATH },
  ];
  const graph = buildGraph({
    path: PATH,
    crumbs,
    primary: [
      {
        '@type': 'Game',
        '@id': `${abs(PATH)}#game`,
        name: 'Inspection Hunt',
        description: 'A timed exterior inspection game: find the pest-conducive conditions and entry points on a house.',
        publisher: { '@id': ID.organization },
        isAccessibleForFree: true,
      },
    ],
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell max-w-[60rem] pb-8">
        <p className="eyebrow mb-3">Arena &middot; Game</p>
        <h1 className="display mb-4">Inspection Hunt</h1>
        <p className="lede mb-8">
          Walk the house like it&rsquo;s your first stop of the day. Six things on it are pest problems waiting to
          happen &mdash; find them before the clock runs out. Every round mixes them up.
        </p>

        <InspectionHunt discordInvite={site.discord.invite} />

        <h2 className="h2 mb-4 mt-12">The exterior checklist</h2>
        <p className="mb-5 max-w-[60ch] text-ink2">Everything the game can throw at you, and what to tell the customer.</p>
        <ul className="grid gap-3 md:grid-cols-2">
          {INSPECTION_SPOTS.map((s) => (
            <li key={s.id} className="card p-4">
              <p className="font-semibold text-ink">{s.issue}</p>
              <p className="mt-1 text-sm text-ink2">{s.why}</p>
              <p className="mt-1 text-sm text-ink2">
                <span className="font-semibold text-ink">Fix:</span> {s.fix}
              </p>
            </li>
          ))}
        </ul>

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Seen something on a job that belongs in here?</span> Post it in the{' '}
            {site.discord.name}.
          </p>
          <DiscordButton>Suggest a spot</DiscordButton>
        </div>
      </div>
    </>
  );
}
