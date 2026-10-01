import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fitTitle, pageMeta, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { DeckViewer } from '@/components/ace/DeckViewer';
import { ACE_PATH, SLIDE_DECKS, deckPath, deckSlug, getDeck, mediaUrl, modulesForDeck } from '@/lib/content/ace';
import { abs, ID, site } from '@/lib/site.config';

/**
 * /academy/ace/decks/:deck/ — one ACE slide deck, viewable in the page. The PDFs live on the
 * ACE Prep app (ace-prep-app.vercel.app), which serves them with CORS and byte ranges.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return SLIDE_DECKS.map((d) => ({ deck: deckSlug(d.file) }));
}

export async function generateMetadata({ params }: { params: Promise<{ deck: string }> }): Promise<Metadata> {
  const { deck } = await params;
  const d = getDeck(deck);
  if (!d) return {};
  return pageMeta({
    title: fitTitle([`${d.title}: ACE exam slides`, d.title]),
    description: pickDescription(`${d.title}: all ${d.pages} slides from the free LTK ACE exam prep, viewable right on the page.`, [
      'Flip through on your phone between stops, or go full screen at home.',
      'Flip through on your phone, or go full screen at home.',
      'Free for pest management pros.',
    ]),
    path: deckPath(d.file),
  });
}

export default async function DeckPage({ params }: { params: Promise<{ deck: string }> }) {
  const { deck } = await params;
  const d = getDeck(deck);
  if (!d) notFound();
  const path = deckPath(d.file);
  const mods = modulesForDeck(d.file);
  const others = SLIDE_DECKS.filter((x) => x.file !== d.file);
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'ACE prep', href: ACE_PATH },
    { name: 'Library', href: `${ACE_PATH}library/` },
    { name: d.title, href: path },
  ];
  const graph = buildGraph({
    path,
    crumbs,
    primary: [
      {
        '@type': 'PresentationDigitalDocument',
        '@id': `${abs(path)}#deck`,
        name: d.title,
        url: mediaUrl('reference-pdfs', d.file),
        encodingFormat: 'application/pdf',
        isAccessibleForFree: true,
        educationalUse: 'ACE exam preparation',
        publisher: { '@id': ID.organization },
      },
    ],
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">
          ACE prep &middot; {d.category} &middot; {d.pages} slides
        </p>
        <h1 className="display mb-4 max-w-[22ch]">{d.title}</h1>
        <p className="mb-6 max-w-[62ch] text-ink2">
          Use the arrows, your keyboard, or swipe on a phone. Full screen works best on a laptop or
          tablet. We&rsquo;ll remember where you left off on this device.
        </p>

        <DeckViewer url={mediaUrl('reference-pdfs', d.file)} title={d.title} pages={d.pages} storageKey={`ltk-deck-${deckSlug(d.file)}`} />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {mods.length ? (
            <div className="card p-5">
              <p className="eyebrow mb-2">Goes with</p>
              <ul className="space-y-1.5">
                {mods.map((m) => (
                  <li key={m.slug}>
                    <a href={`${ACE_PATH}${m.slug}/`} className="link">
                      Module {m.n}: {m.name}
                    </a>
                  </li>
                ))}
              </ul>
              <a href={`${ACE_PATH}practice-test/`} className="btn btn--ace mt-4">
                Take a practice test
              </a>
            </div>
          ) : null}
          <div className="card p-5">
            <p className="eyebrow mb-2">Studying for the ACE?</p>
            <p className="mb-4 text-sm text-ink2">
              Study groups and exam questions get answered every day in the {site.discord.name}.
            </p>
            <DiscordButton>Join the study crew</DiscordButton>
          </div>
        </div>

        <h2 className="h2 mb-4 mt-12">More slide decks</h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((x) => (
            <li key={x.file}>
              <a href={deckPath(x.file)} className="card group block h-full p-4">
                <span className="mono mb-1 block text-ink3">
                  {x.category} &middot; {x.pages} slides
                </span>
                <span className="font-semibold group-hover:text-blood">{x.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
