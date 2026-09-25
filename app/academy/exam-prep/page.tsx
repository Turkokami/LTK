import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { DiscordButton } from '@/components/community/Discord';
import { EXAM_CATEGORIES, EXAM_PREP_PATH } from '@/lib/content/exam-prep';
import { ACE_PATH } from '@/lib/content/ace';
import { abs } from '@/lib/site.config';
import { EDITOR } from '@/lib/content/editorial';

export const metadata: Metadata = pageMeta({
  title: 'Pest control licence exam prep by category',
  description:
    'Study for your pest control licence exam by category: general pest, termite, fumigation, mosquito and lawn, with free practice tests and study groups.',
  path: EXAM_PREP_PATH,
});

export default function ExamPrepIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'Exam prep', href: EXAM_PREP_PATH },
  ];
  const graph = buildGraph({
    path: EXAM_PREP_PATH,
    pageType: 'CollectionPage',
    crumbs,
    primary: [
      {
        '@type': 'ItemList',
        '@id': `${abs(EXAM_PREP_PATH)}#categories`,
        name: 'Pest control licence exam prep by category',
        numberOfItems: EXAM_CATEGORIES.length,
        itemListElement: EXAM_CATEGORIES.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: `${c.name} exam prep`,
          url: abs(`${EXAM_PREP_PATH}${c.slug}/`),
        })),
      },
    ],
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Academy &middot; Exam prep</p>
        <h1 className="display mb-6 max-w-[16ch]">Pass the category exam.</h1>

        <div className="mb-12 max-w-[52rem]">
          <QuickAnswer
            question="How do you study for a pest control licence exam?"
            answer={
              <>
                Find out which categories your state licenses and what each exam covers, then study
                category by category: pest identification and biology, the label and pesticide
                safety, and the control methods for that category. Finish with timed practice
                questions, and check the exam outline on your state agency&rsquo;s site first.
              </>
            }
            fact="Every state names and splits its categories differently — each page below shows the verified states' own names."
            verifiedOn="2026-09-25"
            stampLabel="Updated"
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />
        </div>

        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {EXAM_CATEGORIES.map((c) => (
            <li key={c.slug}>
              <a href={`${EXAM_PREP_PATH}${c.slug}/`} className="card group flex h-full flex-col p-6">
                <span className="h3 mb-2 group-hover:text-blood">{c.name}</span>
                <span className="mb-4 text-sm leading-relaxed text-ink2">{c.blurb}</span>
                <span className="mono mt-auto text-ink3">{c.aceModules.length} study modules paired</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[48ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Going for the ACE instead?</span> The full study
            track, practice test and flashcards are in{' '}
            <a href={ACE_PATH} className="link">
              ACE Prep
            </a>
            .
          </p>
          <DiscordButton variant="ghost">Find a study group</DiscordButton>
        </div>
      </div>
    </>
  );
}
