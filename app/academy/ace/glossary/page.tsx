import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { AceNav } from '@/components/ace/AceNav';
import { GlossaryCards } from '@/components/ace/GlossaryCards';
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

      <div className="shell max-w-[72rem] pb-8">
        <p className="eyebrow mb-3">ACE Prep &middot; Glossary</p>
        <h1 className="display mb-6">ACE glossary</h1>
        <AceNav current="glossary" />
        <p className="lede mb-8">
          Every term on a flip card: the term on the front, what it means and where it shows up
          on the job on the back. Mark the ones you know and hide them to focus on the rest. Prefer
          one card at a time?{' '}
          <a href={`${ACE_PATH}flashcards/`} className="link">
            Use the flashcard deck
          </a>
          .
        </p>

        <GlossaryCards groups={GROUPS} />
      </div>
    </>
  );
}
