import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { SpeedRound } from '@/components/arena/SpeedRound';
import { ACE_MODULES, ACE_PATH } from '@/lib/content/ace';
import { abs, ID, site } from '@/lib/site.config';

/**
 * Arena → Games → ACE Speed Round. Game 1, built on the ACE question bank so it doubles as
 * exam practice. Play-for-fun, no prize, so REGISTRY R-18 does not gate it.
 *
 * CONVERSION CONTRACT: primary action "Start the clock"; secondary "Post your score on Discord".
 */

const PATH = '/arena/games/speed-round/';

export const metadata: Metadata = pageMeta({
  title: 'ACE Speed Round: a 60-second pest control quiz game',
  description:
    `Sixty seconds, as many ACE exam questions as you can answer. Build a streak, beat your best, then post your score in the ${site.discord.name}. Free for pest pros.`,
  path: PATH,
});

export default function SpeedRoundPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'ACE Speed Round', href: PATH },
  ];
  const graph = buildGraph({
    path: PATH,
    crumbs,
    primary: [
      {
        '@type': 'Game',
        '@id': `${abs(PATH)}#game`,
        name: 'ACE Speed Round',
        description:
          'A 60-second timed quiz on ACE exam material: insect biology, IPM, safety and the major structural pest groups.',
        publisher: { '@id': ID.organization },
        isAccessibleForFree: true,
      },
    ],
  });

  const questions = ACE_MODULES.flatMap((m) =>
    m.questions.map((q) => ({
      ...q,
      moduleN: m.n,
      moduleName: m.name,
      moduleSlug: m.slug,
    })),
  );

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell max-w-[56rem] pb-8">
        <p className="eyebrow mb-3">Arena &middot; Game 1</p>
        <h1 className="display mb-4">ACE Speed Round</h1>
        <p className="lede mb-8">
          Sixty seconds on the clock. Every right answer is 100 points, and every answer in your
          streak adds 10 more. Miss one and the streak resets. It runs on the same questions as the{' '}
          <a href={ACE_PATH} className="link">
            ACE Prep
          </a>{' '}
          track, so every round is exam practice.
        </p>

        <SpeedRound
          questions={questions}
          modules={ACE_MODULES.map((m) => ({ n: m.n, name: m.name }))}
          discordInvite={site.discord.invite}
          acePath={ACE_PATH}
        />

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Think you&rsquo;re the sharpest on your crew?</span>{' '}
            Post your score in the {site.discord.name} and call someone out. Leaderboards and
            tournaments come next.
          </p>
          <DiscordButton>Post your score</DiscordButton>
        </div>
      </div>
    </>
  );
}
