import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';
import { HubSpokes } from '@/components/site/HubSpokes';
import { ACE_MODULES, ACE_PATH, ALL_QUESTIONS } from '@/lib/content/ace';
import { ASSETS } from '@/lib/brand';

const HUB = getHub('academy');

export const metadata: Metadata = pageMeta({
  title: 'Licensing, CEUs and training',
  description:
    'Licensing requirements and CEU rules for every state, exam prep by category, on-demand courses, and live sessions with certified entomologists.',
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

        {/* Featured: ACE Prep, the Academy's flagship study track. */}
        <a href={ACE_PATH} className="discord-band group mb-12 block">
          <div className="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto]">
            <img src={ASSETS.mark} alt="" width={88} height={88} className="hidden rounded-full md:block" />
            <div>
              <p className="eyebrow mb-2">New &middot; ACE Prep</p>
              <p className="h2 mb-2 group-hover:text-blood">Study for the ACE exam, free.</p>
              <p className="max-w-[60ch] text-ink2">
                {ACE_MODULES.length} study modules, a {ALL_QUESTIONS.length}-question practice test,
                flashcards, a glossary, podcast episodes and slide decks &mdash; plus a study group
                in the Discord.
              </p>
            </div>
            <span className="btn btn--lg">Start studying</span>
          </div>
        </a>

        <HubSpokes hub={HUB} />
      </div>
    </>
  );
}
