import type { Metadata } from 'next';
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
    'Identification speed runs, inspection challenges and the annual Licensed to Kill championship. Competition built to sharpen the skills the job actually needs.',
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

        {/* Featured: the first playable game. */}
        <a href="/arena/games/speed-round/" className="discord-band group mb-12 block">
          <div className="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="eyebrow mb-2">Now playing &middot; Game 1</p>
              <p className="h2 mb-2 group-hover:text-blood">ACE Speed Round</p>
              <p className="max-w-[60ch] text-ink2">
                Sixty seconds, {ALL_QUESTIONS.length} ACE exam questions, one streak. Beat your best,
                then post your score in the Discord and call out your crew.
              </p>
            </div>
            <span className="btn btn--lg">Play now</span>
          </div>
        </a>

        <HubSpokes hub={HUB} />
      </div>
    </>
  );
}
