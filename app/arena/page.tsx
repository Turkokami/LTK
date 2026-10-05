import type { Metadata } from 'next';
import { Missions } from '@/components/agent/Missions';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';
import { HubSpokes } from '@/components/site/HubSpokes';
import { ALL_QUESTIONS } from '@/lib/content/ace';

const HUB = getHub('arena');

export const metadata: Metadata = pageMeta({
  title: 'Competition and leaderboards',
  description:
    'Identification speed runs, inspection challenges and the Licensed to Kill championship. Competition built to sharpen the skills the job actually needs.',
  path: HUB.path,
});

export default function Page() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: HUB.eyebrow, href: HUB.path },
  ];
  const graph = buildGraph({ path: HUB.path, pageType: 'CollectionPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">{HUB.eyebrow}</p>
        <h1 className="display mb-5 max-w-[18ch]">{HUB.title}</h1>
        <p className="lede mb-10">{HUB.blurb}</p>

        {/* The daily habit and the profile it feeds. */}
        <div className="mb-12 grid gap-4 md:grid-cols-[2fr_1fr]">
          <a href="/arena/daily/" className="discord-band group block">
            <div className="flex h-full flex-col justify-between gap-4 p-6 sm:p-8">
              <div>
                <p className="eyebrow mb-2">New every day &middot; 2 minutes</p>
                <p className="h2 mb-2 group-hover:text-blood">Daily Drop</p>
                <p className="max-w-[56ch] text-ink2">
                  One photo from a real job, one ACE question. Same drop for everyone. Keep your streak
                  alive and post your result in the Discord.
                </p>
              </div>
              <span className="btn btn--lg self-start">Play today&rsquo;s drop</span>
            </div>
          </a>
          <a href="/arena/agent/" className="card group flex flex-col justify-between gap-4 p-6">
            <span>
              <span className="eyebrow mb-1 block">Your Agent file</span>
              <span className="h3 block group-hover:text-blood">Recruit to Licensed to Kill</span>
              <span className="mt-1 block text-sm text-ink2">
                Every exam, game, guide and drop earns XP. Rank up and unlock achievements.
              </span>
            </span>
            <span className="btn btn--ghost self-start">See your rank</span>
          </a>
        </div>

        <div className="mb-12">
          <Missions />
        </div>

        {/* Featured: the first playable game. */}
        <a href="/arena/games/speed-round/" className="discord-band group mb-12 block">
          <div className="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow mb-2">Now playing &middot; Game 1</p>
              <p className="h2 mb-2 group-hover:text-blood">ACE Speed Round</p>
              <p className="max-w-[60ch] text-ink2">
                Sixty seconds, {ALL_QUESTIONS.length} ACE-style practice questions, one streak. Beat your best,
                then post your score in the Discord and call out your crew.
              </p>
            </div>
            <span className="btn btn--lg">Play now</span>
          </div>
        </a>

        <a href="/arena/games/photo-id-sprint/" className="card group mb-12 flex flex-wrap items-center justify-between gap-4 p-6">
          <span>
            <span className="eyebrow mb-1">Game 2</span>
            <span className="h2 block group-hover:text-blood">Photo ID Sprint</span>
            <span className="mt-1 block max-w-[60ch] text-ink2">Real job photos from the crew. Name the pest group before the clock runs out.</span>
          </span>
          <span className="btn btn--ghost btn--lg">Play</span>
        </a>

        <div className="mb-12 grid gap-4 md:grid-cols-2">
          <a href="/arena/games/inspection-hunt/" className="card group flex flex-col justify-between gap-3 p-6">
            <span>
              <span className="eyebrow mb-1 block">Game 3 &middot; New</span>
              <span className="h2 block group-hover:text-blood">Inspection Hunt</span>
              <span className="mt-1 block text-ink2">Six pest problems hidden on a house. Find them in 75 seconds.</span>
            </span>
            <span className="btn btn--ghost self-start">Inspect</span>
          </a>
          <a href="/arena/games/lookalike-showdown/" className="card group flex flex-col justify-between gap-3 p-6">
            <span>
              <span className="eyebrow mb-1 block">Game 4 &middot; New</span>
              <span className="h2 block group-hover:text-blood">Lookalike Showdown</span>
              <span className="mt-1 block text-ink2">Termite swarmer or flying ant? One clue, two lookalikes, ten seconds.</span>
            </span>
            <span className="btn btn--ghost self-start">Play</span>
          </a>
        </div>

        <HubSpokes hub={HUB} />
      </div>
    </>
  );
}
