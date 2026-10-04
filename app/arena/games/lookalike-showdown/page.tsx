import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { LookalikeShowdown } from '@/components/arena/LookalikeShowdown';
import { LOOKALIKES } from '@/lib/content/lookalikes';
import { PEST_ID_PATH } from '@/lib/content/pest-library';
import { abs, ID, site } from '@/lib/site.config';

/**
 * Arena → Games → Lookalike Showdown. Termite swarmer or flying ant? Norway or roof rat?
 * One clue, two lookalikes, ten seconds. The pairs list is server-rendered below the game so
 * the study material is readable (and indexable) without playing.
 */

const PATH = '/arena/games/lookalike-showdown/';

export const metadata: Metadata = pageMeta({
  title: 'Lookalike Showdown: tell confused pests apart',
  description:
    'Termite swarmer or flying ant? Norway or roof rat? Recluse or wolf spider? One field-ID clue, two lookalikes, ten seconds. Free pest ID game for techs.',
  path: PATH,
});

export default function LookalikePage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Lookalike Showdown', href: PATH },
  ];
  const graph = buildGraph({
    path: PATH,
    crumbs,
    primary: [
      {
        '@type': 'Game',
        '@id': `${abs(PATH)}#game`,
        name: 'Lookalike Showdown',
        description: 'A pest identification game: pick which of two commonly confused pests matches a field-ID clue.',
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
      <div className="shell max-w-[56rem] pb-8">
        <p className="eyebrow mb-3">Arena &middot; Game</p>
        <h1 className="display mb-4">Lookalike Showdown</h1>
        <p className="lede mb-8">
          Half of pest ID is telling two things apart that look the same from three feet away. One clue, two
          lookalikes, ten seconds a round.
        </p>

        <LookalikeShowdown pairs={LOOKALIKES} discordInvite={site.discord.invite} />

        <h2 className="h2 mb-4 mt-12">The pairs</h2>
        <p className="mb-5 max-w-[60ch] text-ink2">Study up first. Every clue in the game comes from this list.</p>
        <div className="grid gap-4 md:grid-cols-2">
          {LOOKALIKES.map((p) => (
            <section key={p.id} className="card p-5" aria-labelledby={`pair-${p.id}`}>
              <h3 id={`pair-${p.id}`} className="h3 mb-3">
                {p.a} <span className="text-ink3">vs</span> {p.b}
              </h3>
              <ul className="space-y-2 text-sm text-ink2">
                {p.clues.map((c) => (
                  <li key={c.clue}>
                    <span className="font-semibold text-ink">{c.answer === 'a' ? p.a : p.b}:</span> {c.clue.charAt(0).toLowerCase() + c.clue.slice(1)}.
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Got a lookalike that fooled you on a job?</span> Post it in the{' '}
            {site.discord.name} and we&rsquo;ll add it.
          </p>
          <DiscordButton>Suggest a pair</DiscordButton>
        </div>
        <p className="mt-6 text-sm text-ink3">
          More in the{' '}
          <a href={PEST_ID_PATH} className="link">
            Pest ID library
          </a>
          , or try{' '}
          <a href="/arena/games/photo-id-sprint/" className="link">
            Photo ID Sprint
          </a>
          .
        </p>
      </div>
    </>
  );
}
