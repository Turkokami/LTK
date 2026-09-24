import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { AceNav } from '@/components/ace/AceNav';
import { ACE_PATH, aceGlossaryTerms, storedProductFlashcards, type TrainingGlossaryTerm } from '@/lib/content/ace';
import { abs } from '@/lib/site.config';

/**
 * The ACE glossary, server-rendered in full as a real <dl> so every term is indexable and
 * linkable (#term-id). The flashcards page is the interactive version of the same data.
 */

const PATH = `${ACE_PATH}glossary/`;

export const metadata: Metadata = pageMeta({
  title: 'ACE glossary: entomology and pest management terms',
  description:
    'Plain-language definitions of the entomology, IPM and stored-product pest terms on the ACE exam, each with how the term shows up in real pest management work.',
  path: PATH,
});

const GROUPS: { id: string; name: string; terms: TrainingGlossaryTerm[] }[] = [
  { id: 'ace-terms', name: 'ACE terms', terms: aceGlossaryTerms },
  { id: 'stored-product', name: 'Stored product pests', terms: storedProductFlashcards },
];

export default function GlossaryPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'ACE Prep', href: ACE_PATH },
    { name: 'Glossary', href: PATH },
  ];
  const graph = buildGraph({
    path: PATH,
    crumbs,
    primary: [
      {
        '@type': 'DefinedTermSet',
        '@id': `${abs(PATH)}#terms`,
        name: 'ACE exam glossary',
        hasDefinedTerm: GROUPS.flatMap((g) =>
          g.terms.map((t) => ({
            '@type': 'DefinedTerm',
            name: t.term,
            description: t.definition,
            url: abs(`${PATH}#${t.id}`),
          })),
        ),
      },
    ],
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell max-w-[56rem] pb-8">
        <p className="eyebrow mb-3">ACE Prep &middot; Glossary</p>
        <h1 className="display mb-6">ACE glossary</h1>
        <AceNav current="glossary" />
        <p className="lede mb-8">
          Every term, what it means, and where it shows up on the job. Want to drill them instead?{' '}
          <a href={`${ACE_PATH}flashcards/`} className="link">
            Use the flashcards
          </a>
          .
        </p>

        {GROUPS.map((g) => (
          <section key={g.id} aria-labelledby={g.id} className="mb-12">
            <h2 id={g.id} className="h2 mb-5">
              {g.name}
            </h2>
            <dl className="space-y-3">
              {g.terms.map((t) => (
                <div key={t.id} id={t.id} className="card scroll-mt-24 p-5">
                  <dt className="h3 mb-2">{t.term}</dt>
                  <dd className="m-0 text-[0.9375rem] leading-relaxed text-ink">{t.definition}</dd>
                  <dd className="m-0 mt-3 text-sm leading-relaxed text-ink2">
                    <span className="mr-2 font-semibold uppercase tracking-wide text-blood">
                      In the field
                    </span>
                    {t.fieldUse}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </>
  );
}
