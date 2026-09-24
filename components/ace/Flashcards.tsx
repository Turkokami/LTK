'use client';

import { useState } from 'react';
import { cx } from '@/lib/utils';

/**
 * Flip-card study deck. Client leaf — the same terms are server-rendered on the glossary page,
 * so nothing here is content a crawler needs. Keyboard: the card is a button (Space/Enter to
 * flip); prev/next are buttons too.
 */

export interface Card {
  id: string;
  term: string;
  definition: string;
  fieldUse: string;
}

export function Flashcards({ decks }: { decks: { id: string; name: string; cards: Card[] }[] }) {
  const [deckId, setDeckId] = useState(decks[0]?.id ?? '');
  const [order, setOrder] = useState<number[] | null>(null);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const deck = (decks.find((d) => d.id === deckId) ?? decks[0])!;
  const indexes = order ?? deck.cards.map((_, n) => n);
  const card = deck.cards[indexes[i] ?? 0]!;

  function go(delta: number) {
    setFlipped(false);
    setI((cur) => (cur + delta + indexes.length) % indexes.length);
  }
  function chooseDeck(id: string) {
    setDeckId(id);
    setOrder(null);
    setI(0);
    setFlipped(false);
  }
  function shuffle() {
    const next = deck.cards.map((_, n) => n);
    for (let a = next.length - 1; a > 0; a--) {
      const b = Math.floor(Math.random() * (a + 1));
      [next[a], next[b]] = [next[b]!, next[a]!];
    }
    setOrder(next);
    setI(0);
    setFlipped(false);
  }

  return (
    <div>
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Choose a deck">
        {decks.map((d) => (
          <button
            key={d.id}
            type="button"
            aria-pressed={d.id === deck.id}
            onClick={() => chooseDeck(d.id)}
            className={cx(
              'rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
              d.id === deck.id
                ? 'border-blood bg-danger text-ink'
                : 'border-ruleStrong text-ink2 hover:text-ink',
            )}
          >
            {d.name} ({d.cards.length})
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? `Showing definition of ${card.term}. Press to show the term.` : `${card.term}. Press to reveal the definition.`}
        className={cx(
          'label-panel block min-h-[16rem] w-full p-8 text-left transition-colors',
          flipped && 'bg-stock2',
        )}
      >
        <span className="mono mb-4 block text-ink3" aria-live="polite">
          {flipped ? 'Definition' : 'Term'} · {i + 1} / {indexes.length}
        </span>
        {!flipped ? (
          <span className="display block text-[clamp(1.75rem,5vw,2.75rem)]">{card.term}</span>
        ) : (
          <span className="block">
            <span className="block text-lg leading-relaxed text-ink">{card.definition}</span>
            <span className="mt-4 block rounded-md border border-ruleStrong bg-stock px-4 py-3 text-sm text-ink2">
              <span className="mr-2 font-semibold uppercase tracking-wide text-blood">In the field</span>
              {card.fieldUse}
            </span>
          </span>
        )}
        <span className="mt-6 block text-xs text-ink3">Tap the card to flip it</span>
      </button>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button type="button" className="btn btn--ghost" onClick={() => go(-1)}>
            &larr; Previous
          </button>
          <button type="button" className="btn" onClick={() => go(1)}>
            Next &rarr;
          </button>
        </div>
        <button type="button" className="btn btn--ghost" onClick={shuffle}>
          Shuffle
        </button>
      </div>
    </div>
  );
}
