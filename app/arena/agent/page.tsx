import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { AgentProfile } from '@/components/agent/AgentProfile';
import { Insignia } from '@/components/agent/Insignia';
import { RANKS, XP } from '@/lib/agent/config';
import { site } from '@/lib/site.config';

/**
 * /arena/agent/ — your Agent file. The profile itself is client-only (localStorage); the rank
 * ladder and the XP table are server-rendered so the page explains itself to everyone.
 */

const PATH = '/arena/agent/';

export const metadata: Metadata = pageMeta({
  title: 'Your Agent file: ranks, XP and achievements',
  description:
    'Every visitor is an LTK Agent. Earn XP from the Daily Drop, ACE exams, Arena games and field guides, rank up to Licensed to Kill and unlock achievements.',
  path: PATH,
});

export default function AgentPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Agent file', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs });
  const ways: [string, string][] = [
    ['Daily Drop', `${XP.dailyComplete} to finish, ${XP.dailyCorrect} per right answer, plus a streak bonus`],
    ['ACE practice exams', `${XP.examPerCorrect.recall}/${XP.examPerCorrect.id}/${XP.examPerCorrect.applied} per right answer (easy/medium/hard), more when timed`],
    ['Speed Round and Photo Sprint', `Your score ÷ ${XP.gameScoreDivisor}, up to ${XP.gameCap} a round`],
    ['Field guides', `${XP.fieldGuideRead} for reading each one to the end`],
    ['ACE slide decks', `${XP.deckFinished} for reaching the last slide`],
    ['Glossary cards', `${XP.glossaryKnown} for each card you mark as known`],
    ['State licensing pages', `${XP.stateViewed} for each state you open`],
    ['Podcast and videos', `${XP.videoPlayed} for each episode you play`],
    ['Gear votes', `${XP.vote} for each product you vote on`],
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Arena &middot; Agent file</p>
        <h1 className="display mb-4 max-w-[18ch]">Your Agent file</h1>
        <p className="lede mb-8 max-w-[60ch]">
          Every visitor is an LTK Agent. Learn the trade here and you rank up &mdash; from Recruit
          to Licensed to Kill.
        </p>

        <AgentProfile />

        <h2 className="h2 mb-4 mt-12">The ranks</h2>
        <ol className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {RANKS.map((r, i) => (
            <li key={r.id} className="card flex items-center gap-4 p-4">
              <Insignia index={i} size={44} />
              <span>
                <span className="block font-semibold text-ink">{r.name}</span>
                <span className="mono block text-ink3">{r.minXp.toLocaleString('en-US')} XP</span>
                <span className="block text-sm text-ink2">{r.blurb}</span>
              </span>
            </li>
          ))}
        </ol>

        <h2 className="h2 mb-4">How to earn XP</h2>
        <dl className="mb-12 divide-y divide-rule rounded-[var(--radius)] border border-rule">
          {ways.map(([k, v]) => (
            <div key={k} className="flex flex-wrap justify-between gap-2 px-4 py-3">
              <dt className="font-semibold text-ink">{k}</dt>
              <dd className="m-0 text-sm text-ink2">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[48ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Show off your rank.</span> Post your Agent file
            and your Daily Drop streak in the {site.discord.name}.
          </p>
          <DiscordButton>Join the Discord</DiscordButton>
        </div>
      </div>
    </>
  );
}
