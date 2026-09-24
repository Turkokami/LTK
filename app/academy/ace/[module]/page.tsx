import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, fitTitle, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { DiscordButton } from '@/components/community/Discord';
import { AceNav } from '@/components/ace/AceNav';
import { Quiz } from '@/components/ace/Quiz';
import { VideoEmbed } from '@/components/ace/VideoEmbed';
import { ACE_MODULES, ACE_PATH, ACE_UPDATED, getAceModule, mediaUrl } from '@/lib/content/ace';
import { abs, ID, site } from '@/lib/site.config';
import { EDITOR } from '@/lib/content/editorial';

/**
 * One ACE study module. The notes are server-rendered (the indexable part); the quiz is a
 * client leaf layered on top. Paired media (podcast, deck, videos) comes from MODULE_MEDIA.
 *
 * CONVERSION CONTRACT: primary action "Grade my answers" (the quiz); secondary "Ask the study
 * group" (Discord). Snippet shape: list (must-know facts in a real <ul>).
 */

export function generateStaticParams() {
  return ACE_MODULES.map((m) => ({ module: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module } = await params;
  const m = getAceModule(module);
  if (!m) return {};
  // "&" is written as &amp; in the <title>, which counts against the 60-char budget.
  const name = m.name.replace(/&/g, 'and');
  return pageMeta({
    title: fitTitle([
      `ACE ${name}: study guide and quiz`,
      `ACE ${name} study guide`,
      `ACE module ${m.n}: ${name}`,
      `ACE module ${m.n} study guide`,
    ]),
    description: pickDescription(
      `Free ACE study guide for module ${m.n}, ${name}: must-know facts, what the exam asks and field takeaways.`,
      [
        `Plus a ${m.questions.length}-question practice quiz with explanations.`,
        `Plus a ${m.questions.length}-question practice quiz.`,
        'Plus a practice quiz with explanations.',
        'Plus a practice quiz.',
        'Plus a quiz.',
      ],
    ),
    path: `${ACE_PATH}${m.slug}/`,
  });
}

export default async function AceModulePage({
  params,
}: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  const m = getAceModule(module);
  if (!m) notFound();

  const path = `${ACE_PATH}${m.slug}/`;
  const prev = ACE_MODULES[m.n - 2];
  const next = ACE_MODULES[m.n];

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'ACE Prep', href: ACE_PATH },
    { name: `Module ${m.n}`, href: path },
  ];

  const graph = buildGraph({
    path,
    crumbs,
    primary: [
      {
        '@type': 'LearningResource',
        '@id': `${abs(path)}#module`,
        name: `ACE Module ${m.n}: ${m.name}`,
        description: m.summary,
        learningResourceType: 'Study guide',
        educationalLevel: 'Professional certification',
        isPartOf: { '@id': `${abs(ACE_PATH)}#course` },
        publisher: { '@id': ID.organization },
        isAccessibleForFree: true,
      },
    ],
  });

  const sections = [
    { id: 'must-know', title: 'Must-know facts', items: m.mustKnow },
    { id: 'exam-triggers', title: 'What the exam likes to ask', items: m.testTriggers },
    { id: 'field', title: 'Field takeaways', items: m.fieldTakeaways },
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-8">
        <article>
          <p className="eyebrow mb-3">
            ACE Prep &middot; Module {m.n} of {ACE_MODULES.length}
          </p>
          <h1 className="display mb-6 max-w-[20ch]">{m.name}</h1>
          <AceNav current="module" />

          <QuickAnswer
            question={`What does ACE module ${m.n} cover?`}
            answer={<>{m.summary}</>}
            fact={<>Approximate exam weight: {m.examWeight}.</>}
            verifiedOn={ACE_UPDATED}
            stampLabel="Updated"
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />

          {sections.map((sec) => (
            <section key={sec.id} aria-labelledby={sec.id} className="mt-12">
              <h2 id={sec.id} className="h2 mb-4">
                {sec.title}
              </h2>
              <ul className="space-y-2.5">
                {sec.items.map((item) => (
                  <li key={item} className="card flex gap-3 p-4 text-[0.9375rem] leading-relaxed text-ink">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blood" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {m.podcasts.length || m.decks.length || m.videos.length ? (
            <section aria-labelledby="media" className="mt-12">
              <h2 id="media" className="h2 mb-4">
                Listen, watch, read
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {m.podcasts.map((p) => (
                  <div key={p.file} className="card p-5">
                    <p className="eyebrow mb-2">Podcast</p>
                    <p className="h3 mb-1">{p.title}</p>
                    <p className="mb-3 text-sm text-ink2">{p.desc}</p>
                    <audio controls preload="none" src={mediaUrl('audio', p.file)} className="w-full">
                      <a href={mediaUrl('audio', p.file)} className="link">
                        Download the episode
                      </a>
                    </audio>
                  </div>
                ))}
                {m.decks.map((d) => (
                  <div key={d.file} className="card flex flex-col p-5">
                    <p className="eyebrow mb-2">Slide deck &middot; {d.pages} slides</p>
                    <p className="h3 mb-3">{d.title}</p>
                    <a
                      href={mediaUrl('reference-pdfs', d.file)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--ghost mt-auto self-start"
                    >
                      Open the deck (PDF)
                    </a>
                  </div>
                ))}
              </div>
              {m.videos.length ? (
                <div className="mt-3 grid gap-3 md:grid-cols-2">
                  {m.videos.map((v) => (
                    <VideoEmbed key={v.id} id={v.id} title={v.title} duration={v.duration} />
                  ))}
                </div>
              ) : null}
            </section>
          ) : null}

          <section aria-labelledby="quiz" className="mt-12">
            <h2 id="quiz" className="h2 mb-2">
              Module {m.n} quiz
            </h2>
            <p className="mb-6 text-ink2">
              {m.questions.length} questions. Answer them all, then grade to see the reasoning.
            </p>
            <Quiz questions={m.questions} />
          </section>

          <nav aria-label="Module navigation" className="mt-12 grid gap-3 sm:grid-cols-2">
            {prev ? (
              <a href={`${ACE_PATH}${prev.slug}/`} className="card group p-5">
                <span className="mono text-ink3">&larr; Module {prev.n}</span>
                <span className="h3 mt-1 block group-hover:text-blood">{prev.name}</span>
              </a>
            ) : (
              <span />
            )}
            {next ? (
              <a href={`${ACE_PATH}${next.slug}/`} className="card group p-5 text-right">
                <span className="mono text-ink3">Module {next.n} &rarr;</span>
                <span className="h3 mt-1 block group-hover:text-blood">{next.name}</span>
              </a>
            ) : (
              <a href={`${ACE_PATH}practice-test/`} className="card group p-5 text-right">
                <span className="mono text-ink3">You finished the modules &rarr;</span>
                <span className="h3 mt-1 block group-hover:text-blood">Take the full practice test</span>
              </a>
            )}
          </nav>
        </article>

        <aside className="space-y-6 pt-10">
          <div className="card p-5">
            <p className="eyebrow mb-2">Stuck on this one?</p>
            <p className="mb-4 text-sm leading-relaxed text-ink2">
              Post the question in the {site.discord.name} and work it through with the group.
            </p>
            <DiscordButton variant="ghost" className="w-full">
              Ask the study group
            </DiscordButton>
          </div>
          <nav aria-label="All modules">
            <p className="eyebrow mb-3">All modules</p>
            <ol className="space-y-1.5">
              {ACE_MODULES.map((x) => (
                <li key={x.slug}>
                  <a
                    href={`${ACE_PATH}${x.slug}/`}
                    aria-current={x.slug === m.slug ? 'page' : undefined}
                    className={
                      x.slug === m.slug
                        ? 'text-sm font-semibold text-blood'
                        : 'text-sm text-ink2 hover:text-blood'
                    }
                  >
                    {x.n}. {x.name}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>
    </>
  );
}
