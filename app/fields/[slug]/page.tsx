import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, fitTitle, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { DiscordButton } from '@/components/community/Discord';
import {
  DISCIPLINES,
  FIELD_GROUPS,
  REGIME_LABEL,
  getDiscipline,
  routesInto,
  type Discipline,
} from '@/lib/content/disciplines';
import { PUBLISHED_STATES, getRegulatory } from '@/lib/content/states';
import { NATIONAL_BASELINE, PEST_CONTROL_WORKERS } from '@/lib/content/salary';
import { PayHighlight } from '@/components/ui/PayHighlight';
import { Photo } from '@/components/ui/Photo';
import { WildlifeRules, hasWildlifeRules } from '@/components/fields/WildlifeRules';
import { CommunityGallery } from '@/components/community/CommunityGallery';
import { FIELD_GUIDES_UPDATED, getFieldGuide } from '@/lib/content/field-guides';
import {
  GuideCareerPath,
  GuideDuties,
  GuideEnvironment,
  GuideFaq,
  GuideGoodHard,
  GuideNav,
  GuidePayBenefits,
  GuideSkillsTools,
  GuideSources,
  GuideTraining,
} from '@/components/fields/FieldGuide';
import { K9Specialties } from '@/components/fields/K9Specialties';
import { RelatedEpisodes } from '@/components/community/RelatedEpisodes';
import { episodesFor } from '@/lib/content/podcast';
import { photosFor } from '@/lib/content/community-photos';
import { PEST_ID_PATH } from '@/lib/content/pest-library';
import { fieldPhotos } from '@/lib/content/photos';
import { abs, ID, site } from '@/lib/site.config';
import { EDITOR } from '@/lib/content/editorial';

/**
 * One field guide: Pest control → Fields → this field.
 *
 * What the job is, what it's like day to day, how people get in, who licenses it — then the
 * state-by-state layer and the people in the Discord who do the work.
 *
 * STATE-BY-STATE: for fields licensed through the state pesticide agency, each verified state
 * record is shown with the state's OWN category names that match this field (categoryPattern
 * in disciplines.ts). Nothing is inferred beyond a name match against verified data. For
 * fields governed elsewhere (wildlife agencies, trade licensing, certification bodies) we say
 * so plainly rather than pointing at a pesticide licence that does not apply.
 *
 * DELIBERATELY NOT HERE:
 *   - Invented pay per field. BLS publishes pest control worker figures (SOC 37-2021); fields
 *     counted there show them as their own, every other field shows them labelled as the
 *     nearest benchmark. Every number links to its BLS source.
 *   - Occupation schema. It needs real regional salary data; emitting it without that is
 *     fabrication with a schema wrapper around it.
 */

/** Which Discord photo-pack sections illustrate each field. */
const FIELD_PHOTO_SECTIONS: Record<string, string[]> = {
  'general-pest': ['ants', 'cockroaches', 'spiders-scorpions', 'stinging-insects'],
  'termite-wdo': ['termites-wdo'],
  'wildlife-control': ['wildlife'],
  'bird-abatement': ['bats-birds'],
  exclusion: ['exclusion'],
  insulation: ['crawlspace'],
  fumigation: ['fumigation'],
  'commercial-food-safety': ['commercial-monitoring', 'stored-product-pests', 'sanitation-conducive'],
  'mosquito-vector': ['mosquito-vector', 'flies-gnats'],
  'bed-bugs': ['bed-bugs'],
};

export function generateStaticParams() {
  return DISCIPLINES.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = getDiscipline(slug);
  if (!d) return {};

  return pageMeta({
    // Names run from 10 to 37 characters, so the decorated form does not fit all fourteen.
    title: fitTitle([
      `${d.name}: the job, licensing and how to start`,
      `${d.name}: the job and the route in`,
      `${d.name}: the route in`,
      `${d.name} careers`,
      d.name,
    ]),
    description: pickDescription(
      `${d.name}: the daily work, training and licensing, pay and benefits, and how people get in.`,
      [
        `A career guide with state rules and a crew to ask in the ${site.discord.name}.`,
        'A career guide with state rules, national pay data and where it leads next.',
        'A career guide with state rules and national pay data.',
        'Plus state-by-state licensing, national pay data and where it leads next.',
        'Plus state-by-state licensing and national pay data.',
        'Plus state licensing and national pay data.',
        'Plus licensing and pay data.',
        'A career guide.',
      ],
    ),
    path: `/fields/${d.slug}/`,
  });
}

/** Verified states, each with its own category names that match this field. */
function stateMatches(d: Discipline) {
  return PUBLISHED_STATES.map((s) => {
    const reg = getRegulatory(s.code);
    const cats = reg?.licenseCategories ?? [];
    const matched = d.categoryPattern ? cats.filter((c) => d.categoryPattern!.test(c.name)) : [];
    return { state: s, agency: s.agency, matched };
  });
}

export default async function FieldPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDiscipline(slug);
  if (!d) notFound();

  const path = `/fields/${d.slug}/`;
  const group = FIELD_GROUPS.find((g) => g.id === d.group);
  const from = routesInto(d.slug);
  const to = d.movesTo.map(getDiscipline).filter(Boolean) as Discipline[];
  const photos = fieldPhotos(d.slug);
  const guide = getFieldGuide(d.slug);
  const crewPhotos = photosFor(...(FIELD_PHOTO_SECTIONS[d.slug] ?? []));
  const isPesticide = d.licensing === 'state-pesticide';
  const wildlifeView =
    d.slug === 'wildlife-control'
      ? ('wildlife' as const)
      : d.slug === 'bird-abatement'
        ? ('birds' as const)
        : d.slug === 'falconry-abatement'
          ? ('falconry' as const)
          : null;
  const states = isPesticide ? stateMatches(d) : [];

  // BLS counts this field under pest control workers only where the SOC code says so.
  const paysAsPestControl = d.socCode === PEST_CONTROL_WORKERS.socCode;

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Fields', href: '/fields/' },
    { name: d.name, href: path },
  ];

  const graph = buildGraph({
    path,
    crumbs,
    primary: [
      {
        '@type': 'Article',
        '@id': `${abs(path)}#article`,
        headline: `${d.name}: the job, the licence, and how people get in`,
        about: d.name,
        author: { '@id': ID.organization },
        publisher: { '@id': ID.organization },
        ...(guide ? { dateModified: FIELD_GUIDES_UPDATED, citation: guide.sources.map((s) => s.url) } : {}),
      },
      ...(guide
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${abs(path)}#faq`,
              mainEntity: guide.faq.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]
        : []),
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
          <p className="eyebrow mb-3">
            Fields &middot; {group?.name ?? 'Pest control'}
          </p>
          <h1 className="display mb-6 max-w-[22ch]">{d.name}</h1>

          {photos ? <Photo photo={photos.hero} priority className="mb-8" /> : null}

          <QuickAnswer
            question={`What is ${d.name.toLowerCase()} work?`}
            answer={<>{d.summary}</>}
            fact={d.licensingNote}
            verifiedOn={NATIONAL_BASELINE.verifiedOn}
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />

          {/* Early nudge: the fastest way to learn a field is to ask someone in it. */}
          <div className="card mt-8 flex flex-wrap items-center justify-between gap-4 p-5">
            <p className="max-w-[46ch] text-ink2">
              <span className="font-semibold text-ink">Thinking about {d.name.toLowerCase()}?</span>{' '}
              Ask the people doing it every day in the {site.discord.name}.
            </p>
            <DiscordButton>Ask on Discord</DiscordButton>
          </div>

          {guide ? <GuideNav /> : null}

          <h2 id="the-job" className="h2 mb-3 mt-12 scroll-mt-24">What the job is really like</h2>
          <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-start">
            <div className="prose-bulletin">
              {guide ? (
                <>
                  <p>{guide.intro}</p>
                  {guide.dayInTheLife.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </>
              ) : (
                <p>{d.dayToDay}</p>
              )}
            </div>
            {photos ? (
              <Photo photo={photos.work} aspect="aspect-[4/3]" caption="On the job." className="md:sticky md:top-24" />
            ) : null}
          </div>

          {d.slug === 'k9-detection' ? <K9Specialties /> : null}

          {guide ? (
            <>
              <GuideDuties g={guide} />
              <GuideEnvironment g={guide} />
            </>
          ) : null}

          <h2 className="h2 mb-3 mt-12">How people get in</h2>
          <p className="prose-bulletin">{d.routeIn}</p>
          {guide ? <GuideTraining g={guide} /> : null}

          <LabelBlock
            className="mt-8"
            title="Who licenses it"
            signal={d.licensing === 'federal-and-state-wildlife' ? 'danger' : 'warning'}
            meta={REGIME_LABEL[d.licensing]}
            specs={[
              { label: 'In plain words', value: d.licensingNote },
              {
                label: 'Government pay data',
                value: paysAsPestControl
                  ? 'Counted as pest control workers by the Bureau of Labor Statistics'
                  : 'Not tracked as its own job by the Bureau of Labor Statistics',
              },
            ]}
          />
          {d.group === 'business' ? (
            <p className="mt-3 text-sm text-ink2">
              State-by-state business licence, insurance and fee rules are in{' '}
              <a href="/trade/start/" className="link">
                Starting a pest control company
              </a>
              ; hiring, insurance, OSHA and selling are in{' '}
              <a href="/trade/owners/" className="link">
                Running the business
              </a>
              .
            </p>
          ) : null}

          {/* Pay: this field's own BLS figures where it is counted as pest control workers,
              otherwise the same figures clearly labelled as the nearest benchmark. */}
          {guide ? (
            <>
              <GuideSkillsTools g={guide} />
              <GuideCareerPath g={guide} />
              <h2 id="pay" className="h2 mb-3 mt-12 scroll-mt-24">Pay and benefits</h2>
            </>
          ) : null}
          <PayHighlight className="mt-6" fieldName={d.name} benchmark={!paysAsPestControl} />
          {guide ? <GuidePayBenefits g={guide} /> : null}

          {/* State by state. */}
          <h2 className="h2 mb-3 mt-12">State-by-state licensing</h2>
          {isPesticide ? (
            <>
              <p className="prose-bulletin">
                This field runs through each state&rsquo;s pesticide licensing programme, and every
                state names and splits its categories differently. Here&rsquo;s what it&rsquo;s
                called in the states we&rsquo;ve verified so far.
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {states.map(({ state, agency, matched }) => (
                  <li key={state.code}>
                    <a href={`/academy/licensing/${state.slug}/`} className="card group block h-full p-5">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="h3 group-hover:text-blood">{state.name}</span>
                        <span className="mono text-ink3">{state.code}</span>
                      </span>
                      {agency ? <span className="mt-1 block text-xs text-ink3">{agency}</span> : null}
                      <span className="mt-3 block text-sm text-ink2">
                        {matched.length
                          ? matched.map((c) => `${c.code} — ${c.name}`).join(' · ')
                          : 'See the full list of licence categories'}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink3">
                Your state not here yet? We add states only after checking them against the state
                agency.{' '}
                <a href={site.discord.invite} target="_blank" rel="noopener noreferrer" className="link">
                  Ask in the Discord
                </a>{' '}
                &mdash; someone there has licensed in it.
              </p>
            </>
          ) : wildlifeView && hasWildlifeRules() ? (
            <>
              <p className="prose-bulletin">
                Wildlife and bird work is regulated mainly by each state&rsquo;s wildlife agency, and
                bird work also falls under federal law. But the line with pest control licensing
                moves by state: in Texas, Florida and California the structural pest control law
                reaches parts of this work even without pesticides. Each state card below says
                where the line falls.
              </p>
              <div className="mt-5">
                <WildlifeRules show={wildlifeView} />
              </div>
              <p className="mt-4 text-sm text-ink3">
                Your state not here yet?{' '}
                <a href={site.discord.invite} target="_blank" rel="noopener noreferrer" className="link">
                  Ask in the Discord
                </a>{' '}
                &mdash; someone there already holds the permit.
              </p>
            </>
          ) : (
            <p className="prose-bulletin">
              {d.licensing === 'state-wildlife' || d.licensing === 'federal-and-state-wildlife'
                ? 'This field is not licensed through the pesticide programme. Permits come from state wildlife agencies (and federal rules where birds of prey or protected species are involved), and every state runs its own. A state-by-state guide is in the works — until then, the fastest route to your state’s rules is someone in the Discord who already holds the permit.'
                : 'There is no single state pesticide licence for this field. Depending on where you work it can fall under contractor or trade licensing, a third-party certification, or nothing formal at all. A state-by-state guide is in the works — until then, ask in the Discord and someone in your state will point you the right way.'}
            </p>
          )}

          {guide ? <GuideGoodHard g={guide} /> : null}

          {d.communityIsTheNetwork ? (
            <LabelBlock title="This one is small" signal="danger" className="mt-8">
              Few enough people do this work that no course, association chapter or magazine will
              introduce you to them. You meet them or you don&rsquo;t &mdash; and the{' '}
              {site.discord.name} is where you meet them.
            </LabelBlock>
          ) : null}

          {crewPhotos.length ? (
            <section aria-labelledby="crew-photos" className="mt-12">
              <h2 id="crew-photos" className="h2 mb-1">
                From the crew
              </h2>
              <p className="mb-5 text-sm text-ink3">
                Photos members posted in the {site.discord.name}, shared with the community’s okay.{' '}
                <a href={PEST_ID_PATH} className="link">
                  Browse the pest ID library
                </a>
                .
              </p>
              <CommunityGallery photos={crewPhotos} limit={8} className="lg:grid-cols-4" />
            </section>
          ) : null}

          <RelatedEpisodes episodes={episodesFor(d.slug)} />

          {from.length || to.length ? (
            <>
              <h2 className="h2 mb-3 mt-12">Where it fits in a career</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {from.length ? (
                  <div>
                    <h3 className="h3 mb-3">People usually arrive from</h3>
                    <ul className="space-y-2">
                      {from.map((x) => (
                        <li key={x.slug}>
                          <a href={`/fields/${x.slug}/`} className="link">
                            {x.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {to.length ? (
                  <div>
                    <h3 className="h3 mb-3">People often move on to</h3>
                    <ul className="space-y-2">
                      {to.map((x) => (
                        <li key={x.slug}>
                          <a href={`/fields/${x.slug}/`} className="link">
                            {x.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}

          {guide ? (
            <>
              <GuideFaq g={guide} />
              <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
                <p className="max-w-[46ch] text-ink2">
                  <span className="font-semibold text-ink">Still deciding?</span> Ask the people doing
                  {' '}{d.name.toLowerCase()} every day in the {site.discord.name}.
                </p>
                <DiscordButton>Ask on Discord</DiscordButton>
              </div>
              <GuideSources g={guide} updated={FIELD_GUIDES_UPDATED} />
            </>
          ) : null}
        </article>

        <aside className="space-y-6 pt-10">
          <div className="card p-5">
            <p className="eyebrow mb-2">Talk to the crew</p>
            <p className="mb-4 text-sm leading-relaxed text-ink2">
              Pest ID help, group training and people who&rsquo;ve done this job for years.
            </p>
            <DiscordButton variant="ghost" className="w-full">
              Join the Discord
            </DiscordButton>
          </div>
          <nav aria-label="All fields">
            <p className="eyebrow mb-3">Other fields</p>
            <ul className="space-y-1.5">
              {DISCIPLINES.filter((x) => x.slug !== d.slug).map((x) => (
                <li key={x.slug}>
                  <a href={`/fields/${x.slug}/`} className="text-sm text-ink2 hover:text-blood">
                    {x.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
