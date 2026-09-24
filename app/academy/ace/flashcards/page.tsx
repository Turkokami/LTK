import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { AceNav } from '@/components/ace/AceNav';
import { Flashcards } from '@/components/ace/Flashcards';
import { ACE_PATH, aceGlossaryTerms, storedProductFlashcards } from '@/lib/content/ace';

const PATH = `${ACE_PATH}flashcards/`;

export const metadata: Metadata = pageMeta({
  title: 'ACE flashcards: key terms and stored product pests',
  description:
    'Free ACE exam flashcards: core entomology and IPM terms plus a stored-product pest deck, each with what it means in the field. Shuffle and study anywhere.',
  path: PATH,
});

export default function FlashcardsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'ACE Prep', href: ACE_PATH },
    { name: 'Flashcards', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell max-w-[52rem] pb-8">
        <p className="eyebrow mb-3">ACE Prep &middot; Flashcards</p>
        <h1 className="display mb-6">Flashcards</h1>
        <AceNav current="flashcards" />
        <p className="lede mb-8">
          Two decks: the core ACE terms and a stored-product pest deck. Tap a card to flip it.
          Every card has the definition and how it matters on the job.
        </p>

        <Flashcards
          decks={[
            { id: 'ace', name: 'ACE terms', cards: aceGlossaryTerms },
            { id: 'stored', name: 'Stored product pests', cards: storedProductFlashcards },
          ]}
        />

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[44ch] text-sm text-ink2">
            Want a term added to the deck? Suggest it in the Discord study group.
          </p>
          <DiscordButton variant="ghost">Suggest a card</DiscordButton>
        </div>

        <p className="mt-6 text-sm text-ink3">
          Prefer to read them all at once? See the{' '}
          <a href={`${ACE_PATH}glossary/`} className="link">
            full ACE glossary
          </a>
          .
        </p>
      </div>
    </>
  );
}
