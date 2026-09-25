import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { SiteSearch, type SearchItem } from '@/components/site/SiteSearch';
import { HUBS } from '@/lib/content/hubs';
import { DISCIPLINES } from '@/lib/content/disciplines';
import { ACE_MODULES, ACE_PATH, aceGlossaryTerms, storedProductFlashcards } from '@/lib/content/ace';
import { PUBLISHED_STATES } from '@/lib/content/states';
import { EPISODES, PODCAST_PATH } from '@/lib/content/podcast';
import { site } from '@/lib/site.config';
import { PEST_GROUPS, PEST_ID_PATH } from '@/lib/content/pest-library';
import { CREW_PICKS } from '@/lib/content/community';

/**
 * /search/ — noindex utility. The index is assembled here from the content registries, so a
 * new field, module or state shows up in search the moment it ships.
 */

export const metadata: Metadata = pageMeta({
  title: 'Search',
  description:
    'Search every field guide, ACE study module, glossary term, state licensing page and podcast episode on the site. Can’t find it? Ask the crew in the Discord.',
  path: '/search/',
  noindex: true,
});

function buildIndex(): SearchItem[] {
  return [
    ...HUBS.map((h) => ({ title: h.title, text: h.blurb, href: h.path, kind: h.eyebrow })),
    ...DISCIPLINES.map((d) => ({
      title: d.name,
      text: `${d.summary} ${d.licensingNote}`,
      href: `/fields/${d.slug}/`,
      kind: 'Field',
    })),
    ...ACE_MODULES.map((m) => ({
      title: `ACE module ${m.n}: ${m.name}`,
      text: `${m.summary} ${m.mustKnow.join(' ')}`,
      href: `${ACE_PATH}${m.slug}/`,
      kind: 'ACE',
    })),
    { title: 'ACE practice test', text: 'Full-length ACE practice exam with explanations.', href: `${ACE_PATH}practice-test/`, kind: 'ACE' },
    { title: 'ACE flashcards', text: 'Flip-card study decks for ACE terms and stored product pests.', href: `${ACE_PATH}flashcards/`, kind: 'ACE' },
    { title: 'ACE study library', text: 'Podcast episodes, videos and slide decks for the ACE exam.', href: `${ACE_PATH}library/`, kind: 'ACE' },
    ...[...aceGlossaryTerms, ...storedProductFlashcards].map((t) => ({
      title: t.term,
      text: t.definition,
      href: `${ACE_PATH}glossary/#${t.id}`,
      kind: 'Glossary',
    })),
    ...PUBLISHED_STATES.flatMap((s) => [
      { title: `${s.name} pest control licensing`, text: `Licence categories, exams and the agency in ${s.name} (${s.code}).`, href: `/academy/licensing/${s.slug}/`, kind: 'State' },
      { title: `${s.name} CEU requirements`, text: `Continuing education hours and renewal rules in ${s.name} (${s.code}).`, href: `/academy/ceu/${s.slug}/`, kind: 'State' },
    ]),
    ...PEST_GROUPS.map((g) => ({ title: `${g.name} — pest ID photos`, text: g.blurb, href: `${PEST_ID_PATH}${g.slug}/`, kind: 'Pest ID' })),
    ...CREW_PICKS.flatMap((g) => g.picks.map((p) => ({ title: p.product, text: p.said, href: `/lab/crew-picks/#${g.id}`, kind: 'Crew pick' }))),
    { title: 'Pay and pricing talk', text: 'What members report about technician pay and pricing specialty work.', href: '/trade/pay-and-pricing/', kind: 'Trade' },
    { title: 'Field challenges', text: 'Photo hunts from real routes: conducive conditions, harborage, monitoring placement.', href: '/arena/field-challenges/', kind: 'Arena' },
    ...EPISODES.map((e) => ({ title: e.title, text: e.summary, href: PODCAST_PATH, kind: 'Podcast' })),
    { title: 'ACE Speed Round', text: 'A 60-second ACE quiz game. Build a streak and beat your best.', href: '/arena/games/speed-round/', kind: 'Game' },
    { title: `Join the ${site.discord.name}`, text: 'Shop talk, pest ID help, the podcast and group training.', href: site.discord.invite, kind: 'Discord' },
  ];
}

export default function SearchPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Search', href: '/search/' },
  ];
  const graph = buildGraph({ path: '/search/', crumbs });
  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell max-w-[48rem] pb-8">
        <h1 className="display mb-6">Search</h1>
        <SiteSearch index={buildIndex()} />
      </div>
    </>
  );
}
