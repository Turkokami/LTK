import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { Leaderboard } from '@/components/arena/Leaderboard';
import { AgentBoards } from '@/components/agent/AgentBoards';
import { site } from '@/lib/site.config';

/**
 * /arena/leaderboards/ — both Arena boards on one page. Honour system: scores are
 * self-reported and capped (app/api/leaderboard/route.ts). Names are whatever a player types
 * for themselves, which is self-identification — the only way a member name appears on this
 * site (owner questionnaire, 2026-09-29). Play-for-fun, no prizes (REGISTRY R-18).
 * No state boards: the Arena doesn't ask where anyone lives, and shouldn't.
 */

const PATH = '/arena/leaderboards/';

export const metadata: Metadata = pageMeta({
  title: 'Arena leaderboards',
  description:
    'The top scores in the ACE Speed Round and the Photo ID Sprint, best score per device. Honour system, play for fun, and the names are whatever players picked.',
  path: PATH,
});

const GAMES = [
  { game: 'speed-round', name: 'ACE Speed Round', href: '/arena/games/speed-round/' },
  { game: 'photo-id-sprint', name: 'Photo ID Sprint', href: '/arena/games/photo-id-sprint/' },
];

export default function LeaderboardsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Leaderboards', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Arena &middot; Leaderboards</p>
        <h1 className="display mb-4 max-w-[16ch]">Who&rsquo;s on top</h1>
        <p className="lede mb-4 max-w-[60ch]">
          Best score per device, top 20 per game. Finish a round to post yours.
        </p>

        {/* Agent XP, streaks and the Daily Drop: signed-in Discord accounts, graded on the server. */}
        <div className="mb-8 mt-8">
          <AgentBoards />
        </div>

        <div className="grid gap-x-8 lg:grid-cols-2">
          {GAMES.map((g) => (
            <div key={g.game}>
              <Leaderboard
                game={g.game}
                title={g.name}
                offline={
                  <div className="card mt-8 p-5">
                    <p className="h3 mb-2">{g.name}</p>
                    <p className="text-sm text-ink2">
                      The board isn&rsquo;t switched on yet. Your personal best still saves in your
                      browser.
                    </p>
                  </div>
                }
              />
              <a href={g.href} className="btn btn--ghost mt-4">
                Play {g.name}
              </a>
            </div>
          ))}
        </div>

        <div className="card mt-12 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[48ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Want a real match?</span> The championship runs
            in the {site.discord.name} on a different game each time.
          </p>
          <DiscordButton>Join the Discord</DiscordButton>
        </div>
      </div>
    </>
  );
}
