import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, fitTitle, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { DiscordButton } from '@/components/community/Discord';
import { EXAM_CATEGORIES, EXAM_PREP_PATH, getExamCategory } from '@/lib/content/exam-prep';
import { getDiscipline } from '@/lib/content/disciplines';
import { PUBLISHED_STATES, getRegulatory } from '@/lib/content/states';
import { ACE_PATH, getAceModule, type AceModule } from '@/lib/content/ace';
import { abs, ID, site } from '@/lib/site.config';
import { EDITOR } from '@/lib/content/editorial';

/**
 * One licence category. Assembled from verified data only (see lib/content/exam-prep.ts):
 * the state cards quote each verified state's own category name and exam structure and link
 * to the full state page. No pass marks, question counts or fees are stated here.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return EXAM_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const c = getExamCategory(category);
  if (!c) return {};
  const name = c.name.replace(/&/g, 'and');
  return pageMeta({
    title: fitTitle([
      `${name} licence exam prep and practice`,
      `${name} licence exam prep`,
      `${name} exam prep`,
    ]),
    description: pickDescription(
      `How to study for the ${name.toLowerCase()} licence exam: what to drill, which study modules to use and how verified states name the category.`,
      ['Free practice tests and a study group included.', 'Free practice tests included.', 'Free practice included.', 'Free.'],
    ),
    path: `${EXAM_PREP_PATH}${c.slug}/`,
  });
}

export default async function ExamCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const c = getExamCategory(category);
  if (!c) notFound();

  const field = getDiscipline(c.field);
  const modules = c.aceModules.map(getAceModule).filter(Boolean) as AceModule[];
  const states = PUBLISHED_STATES.map((s) => {
    const reg = getRegulatory(s.code);
    const cats = reg?.licenseCategories ?? [];
    const matched = field?.categoryPattern ? cats.filter((x) => field.categoryPattern!.test(x.name)) : [];
    return { state: s, matched, examStructure: reg?.examStructure ?? null };
  });
  const path = `${EXAM_PREP_PATH}${c.slug}/`;

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'Exam prep', href: EXAM_PREP_PATH },
    { name: c.name, href: path },
  ];
  const graph = buildGraph({
    path,
    crumbs,
    primary: [
      {
        '@type': 'LearningResource',
        '@id': `${abs(path)}#guide`,
        name: `${c.name} licence exam prep`,
        learningResourceType: 'Study guide',
        educationalLevel: 'Professional licensing',
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

      <div className="shell datasheet pb-8">
        <article>
          <p className="eyebrow mb-3">Academy &middot; Exam prep</p>
          <h1 className="display mb-6 max-w-[20ch]">{c.name} exam prep</h1>

          <QuickAnswer
            question={`How do you study for the ${c.name.toLowerCase()} licence exam?`}
            answer={
              <>
                {field?.summary} Where a state licenses it as its own category, the exam goes
                deeper than general knowledge: study the pests, the label and the control methods
                for this work specifically, then drill timed practice questions before booking the
                exam with your state agency.
              </>
            }
            fact={field?.licensingNote}
            verifiedOn="2026-09-25"
            stampLabel="Updated"
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />

          <h2 className="h2 mb-4 mt-12">What to drill hardest</h2>
          <ul className="space-y-2.5">
            {c.focus.map((f) => (
              <li key={f} className="card flex gap-3 p-4 text-[0.9375rem] leading-relaxed text-ink">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blood" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <h2 className="h2 mb-2 mt-12">Study modules for this category</h2>
          <p className="mb-5 text-ink2">
            Our pairing of the ACE study modules that overlap this category&rsquo;s science. Each has
            must-know facts, exam triggers and a quiz.
          </p>
          <ol className="grid gap-3 sm:grid-cols-2">
            {modules.map((m) => (
              <li key={m.slug}>
                <a href={`${ACE_PATH}${m.slug}/`} className="card group block h-full p-5">
                  <span className="mono text-blood">Module {m.n}</span>
                  <span className="h3 mt-1 block group-hover:text-blood">{m.name}</span>
                  <span className="mt-1 block text-xs text-ink3">{m.questions.length} quiz questions</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={`${ACE_PATH}practice-test/`} className="btn">
              Take a practice test
            </a>
            <a href="/arena/games/speed-round/" className="btn btn--ghost">
              Play the Speed Round
            </a>
          </div>

          <h2 className="h2 mb-2 mt-12">How verified states name it</h2>
          <p className="mb-5 text-ink2">
            Each state&rsquo;s own category name and exam structure, from the verified state record.
            Open a state for fees, renewal and CEU rules.
          </p>
          <ul className="space-y-3">
            {states.map(({ state, matched, examStructure }) => (
              <li key={state.code}>
                <a href={`/academy/licensing/${state.slug}/`} className="card group block p-5">
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="h3 group-hover:text-blood">{state.name}</span>
                    <span className="mono text-ink3">{state.code}</span>
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-ink">
                    {matched.length
                      ? matched.map((x) => `${x.code} — ${x.name}`).join(' · ')
                      : 'Category name not matched — see the state page'}
                  </span>
                  {examStructure ? (
                    <span className="mt-2 block text-sm leading-relaxed text-ink2">{examStructure}</span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </article>

        <aside className="space-y-6 pt-10">
          <div className="card p-5">
            <p className="eyebrow mb-2">Study together</p>
            <p className="mb-4 text-sm leading-relaxed text-ink2">
              Group training runs in the {site.discord.name}. Bring the question you keep missing.
            </p>
            <DiscordButton variant="ghost" className="w-full">
              Find a study group
            </DiscordButton>
          </div>
          <nav aria-label="Other categories">
            <p className="eyebrow mb-3">Other categories</p>
            <ul className="space-y-1.5">
              {EXAM_CATEGORIES.filter((x) => x.slug !== c.slug).map((x) => (
                <li key={x.slug}>
                  <a href={`${EXAM_PREP_PATH}${x.slug}/`} className="text-sm text-ink2 hover:text-blood">
                    {x.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {field ? (
            <p className="text-sm text-ink3">
              About the work itself:{' '}
              <a href={`/fields/${field.slug}/`} className="link">
                {field.name} field guide
              </a>
            </p>
          ) : null}
        </aside>
      </div>
    </>
  );
}
