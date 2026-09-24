import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { DiscordButton } from '@/components/community/Discord';
import { AceNav } from '@/components/ace/AceNav';
import {
  ACE_MODULES,
  ACE_OVERVIEW,
  ACE_UPDATED,
  ACE_PATH,
  ALL_QUESTIONS,
  PODCASTS,
  SLIDE_DECKS,
  VIDEOS,
  aceExamTips,
  aceGlossaryTerms,
  mediaUrl,
  storedProductFlashcards,
} from '@/lib/content/ace';
import { abs, ID, site } from '@/lib/site.config';
import { EDITOR } from '@/lib/content/editorial';

/**
 * Academy → ACE Prep. The study track for ESA's Associate Certified Entomologist exam,
 * ported from the owner's standalone ACE Prep app into the site so every module is a real,
 * server-rendered page. Heavy media stays on the ACE app's deployment (lib/content/ace).
 *
 * CONVERSION CONTRACT: primary action "Start module 1"; secondary "Join the study group"
 * (Discord). Snippet shape: list (the modules). Citability: outbound primary authority
 * (entocert.org), stated position.
 */

const OFFICIAL = { name: 'ESA Certification — ACE program', url: 'https://entocert.org/ace' };

export const metadata: Metadata = pageMeta({
  title: 'ACE exam prep: study guide, practice test, flashcards',
  description:
    'Free ACE exam prep for pest pros: 11 study modules, a full practice test, flashcards, a glossary, podcast episodes and slide decks, plus a Discord study group.',
  path: ACE_PATH,
});

export default function AcePrepPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'ACE Prep', href: ACE_PATH },
  ];

  const graph = buildGraph({
    path: ACE_PATH,
    pageType: 'CollectionPage',
    crumbs,
    primary: [
      {
        '@type': 'ItemList',
        '@id': `${abs(ACE_PATH)}#modules`,
        name: 'ACE exam study modules',
        numberOfItems: ACE_MODULES.length,
        itemListElement: ACE_MODULES.map((m) => ({
          '@type': 'ListItem',
          position: m.n,
          name: m.name,
          url: abs(`${ACE_PATH}${m.slug}/`),
        })),
      },
      {
        '@type': 'Course',
        '@id': `${abs(ACE_PATH)}#course`,
        name: 'ACE exam prep',
        description:
          'Self-paced preparation for the Associate Certified Entomologist exam: study modules, practice questions, flashcards and reference media.',
        provider: { '@id': ID.organization },
        isAccessibleForFree: true,
      },
    ],
  });

  const tools = [
    { href: `${ACE_PATH}practice-test/`, title: 'Practice test', stat: `${ALL_QUESTIONS.length} questions`, body: 'Take the full exam or drill one module. Graded instantly, with the reasoning behind every answer.' },
    { href: `${ACE_PATH}flashcards/`, title: 'Flashcards', stat: `${aceGlossaryTerms.length + storedProductFlashcards.length} cards`, body: 'Flip through ACE terms and the stored-product deck. Shuffle them for the truck.' },
    { href: `${ACE_PATH}glossary/`, title: 'Glossary', stat: `${aceGlossaryTerms.length} terms`, body: 'Every term with what it means and how it shows up in the field.' },
    { href: `${ACE_PATH}library/`, title: 'Podcast, videos & decks', stat: `${PODCASTS.length} episodes · ${VIDEOS.length} videos · ${SLIDE_DECKS.length} decks`, body: 'Listen on the route, watch the ID walkthroughs, open the full slide decks.' },
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-8">
        <p className="eyebrow mb-3">Academy &middot; ACE Prep</p>
        <h1 className="display mb-6 max-w-[18ch]">Get your ACE. Study with the crew.</h1>
        <AceNav current="overview" />

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <QuickAnswer
            question="What is on the ACE exam?"
            answer={
              <>
                The Associate Certified Entomologist (ACE) credential from the Entomological
                Society of America tests structural pest knowledge: insect biology, IPM principles
                and tools, toxicology, safety and law, and the major pest groups &mdash;
                cockroaches, ants, flies, biting and stinging arthropods, occasional invaders,
                stored product pests and wood-destroying insects.
              </>
            }
            fact={
              <>
                Official requirements and registration:{' '}
                <a href={OFFICIAL.url} target="_blank" rel="noopener noreferrer" className="link">
                  {OFFICIAL.name}
                </a>
                .
              </>
            }
            verifiedOn={ACE_UPDATED}
            stampLabel="Updated"
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />

          <div className="card flex flex-col p-6">
            <p className="h3 mb-2">Nobody should study for this alone.</p>
            <p className="mb-5 text-sm leading-relaxed text-ink2">
              Group training is one of the things the {site.discord.name} is for. Bring the
              question that stumped you on the practice test and work through it with people
              who&rsquo;ve sat the exam.
            </p>
            <div className="mt-auto flex flex-wrap gap-2">
              <a href={`${ACE_PATH}${ACE_MODULES[0]!.slug}/`} className="btn">
                Start module 1
              </a>
              <DiscordButton variant="ghost">Join the study group</DiscordButton>
            </div>
          </div>
        </div>
      </div>

      <section className="shell py-8" aria-labelledby="ace-modules">
        <div className="scope-rule mb-8" />
        <h2 id="ace-modules" className="h2 mb-2">
          The eleven study modules
        </h2>
        <p className="mb-6 max-w-[62ch] text-ink2">
          Each module has the must-know facts, what the exam likes to ask, field takeaways and a
          quiz. Exam weights are approximate, from our study guide &mdash; check{' '}
          <a href={OFFICIAL.url} target="_blank" rel="noopener noreferrer" className="link">
            the official ACE program
          </a>{' '}
          for the current exam outline.
        </p>
        <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {ACE_MODULES.map((m) => (
            <li key={m.slug}>
              <a href={`${ACE_PATH}${m.slug}/`} className="card group flex h-full flex-col p-5">
                <span className="mb-2 flex items-center justify-between gap-3">
                  <span className="mono text-blood">Module {m.n}</span>
                  <span className="mono rounded-full border border-ruleStrong px-2 py-0.5 text-ink3">
                    {m.examWeight}
                  </span>
                </span>
                <span className="h3 mb-2 group-hover:text-blood">{m.name}</span>
                <span className="mt-auto text-xs text-ink3">
                  {m.mustKnow.length} must-know facts &middot; {m.questions.length} quiz questions
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell py-8" aria-labelledby="ace-tools">
        <div className="scope-rule mb-8" />
        <h2 id="ace-tools" className="h2 mb-6">
          Study tools
        </h2>
        <ul className="grid gap-3 md:grid-cols-2">
          {tools.map((t) => (
            <li key={t.href}>
              <a href={t.href} className="card group flex h-full flex-col p-6">
                <span className="mono mb-2 text-ink3">{t.stat}</span>
                <span className="h3 mb-2 group-hover:text-blood">{t.title}</span>
                <span className="text-sm leading-relaxed text-ink2">{t.body}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell py-8" aria-labelledby="ace-tips">
        <div className="scope-rule mb-8" />
        <h2 id="ace-tips" className="h2 mb-6">
          How to think on exam day
        </h2>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {aceExamTips.map((tip) => (
            <li key={tip.id} className="card p-5">
              <p className="h3 mb-2">{tip.title}</p>
              <p className="text-sm leading-relaxed text-ink2">{tip.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="shell py-8" aria-labelledby="ace-start">
        <div className="scope-rule mb-8" />
        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <p className="eyebrow mb-2">Start with the big picture</p>
            <h2 id="ace-start" className="h3 mb-2">
              {ACE_OVERVIEW.podcast.title}
            </h2>
            <p className="mb-4 text-sm text-ink2">{ACE_OVERVIEW.podcast.desc}</p>
            <audio
              controls
              preload="none"
              src={mediaUrl('audio', ACE_OVERVIEW.podcast.file)}
              className="w-full"
            >
              <a href={mediaUrl('audio', ACE_OVERVIEW.podcast.file)} className="link">
                Download the episode
              </a>
            </audio>
          </div>
          <div className="card flex flex-col p-6">
            <p className="eyebrow mb-2">Slide deck</p>
            <p className="h3 mb-2">{ACE_OVERVIEW.deck.title}</p>
            <p className="mb-4 text-sm text-ink2">
              {ACE_OVERVIEW.deck.pages} slides covering what the certification is and how the
              exam is built.
            </p>
            <a
              href={mediaUrl('reference-pdfs', ACE_OVERVIEW.deck.file)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost mt-auto self-start"
            >
              Open the deck (PDF)
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
