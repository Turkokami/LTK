import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { DiscordButton } from '@/components/community/Discord';
import { PayHighlight } from '@/components/ui/PayHighlight';
import {
  DISCIPLINES,
  FIELD_GROUPS,
  REGIME_LABEL,
  fieldsInGroup,
} from '@/lib/content/disciplines';
import { getHub } from '@/lib/content/hubs';
import { abs, ID, site } from '@/lib/site.config';
import { EDITOR } from '@/lib/content/editorial';

/**
 * Pest control → the fields.
 *
 * The top of the site's structure: the industry as a whole, split into the fields inside it.
 * Each field card opens a field guide (/fields/:field/) — what the job is, who licenses it,
 * state-by-state licensing where we have verified records, and the people in the Discord who
 * do it. Grouped so a newcomer can see the shape of the industry at a glance.
 *
 * Replaces /trade/paths/ (301 in next.config.mjs).
 */

const HUB = getHub('fields');

export const metadata: Metadata = pageMeta({
  title: 'Every field in pest control, explained',
  description:
    'Pest control is fourteen trades: general pest, termite, wildlife, exclusion, insulation, K9 detection and more. What each job is, who licenses it, how to start.',
  path: HUB.path,
});

export default function FieldsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Fields', href: HUB.path },
  ];

  const graph = buildGraph({
    path: HUB.path,
    pageType: 'CollectionPage',
    crumbs,
    primary: [
      {
        '@type': 'ItemList',
        '@id': `${abs(HUB.path)}#fields`,
        name: 'Fields in the pest management industry',
        numberOfItems: DISCIPLINES.length,
        itemListElement: DISCIPLINES.map((d, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: d.name,
          url: abs(`/fields/${d.slug}/`),
        })),
      },
      {
        '@type': 'Article',
        '@id': `${abs(HUB.path)}#article`,
        headline: 'Every field in pest control, explained',
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

      <div className="shell pb-8">
        <p className="eyebrow mb-3">Pest control, field by field</p>
        <h1 className="display mb-6 max-w-[18ch]">Pest control is a lot bigger than bugs.</h1>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <QuickAnswer
            question="What jobs are there in pest control?"
            answer={
              <>
                Far more than one. General pest, termite and WDO, wildlife control,
                falconry-based bird abatement, bird exclusion, K9 detection, structural
                exclusion, insulation, fumigation, commercial and food safety, mosquito and
                vector, turf and ornamental, bed bug work, and running a company. They share a
                customer and very little else &mdash; different regulators, different skills,
                different pay.
              </>
            }
            fact={`${DISCIPLINES.length} distinct fields, governed by at least five different kinds of regulator.`}
            verifiedOn="2026-09-23"
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />

          <div className="card p-6">
            <p className="h3 mb-2">Nobody hands you this map on day one.</p>
            <p className="mb-5 text-sm leading-relaxed text-ink2">
              Most people fall into this industry sideways and find out years later that bird
              work with a trained hawk is a real job. Pick a field below to see what it&rsquo;s
              really like &mdash; then come ask the people doing it.
            </p>
            <DiscordButton variant="ghost">Ask the crew on Discord</DiscordButton>
          </div>
        </div>
      </div>

      {FIELD_GROUPS.map((g) => {
        const fields = fieldsInGroup(g.id);
        if (!fields.length) return null;
        return (
          <section key={g.id} className="shell py-8" aria-labelledby={`group-${g.id}`}>
            <div className="scope-rule mb-8" />
            <div className="mb-5">
              <h2 id={`group-${g.id}`} className="h2 mb-1">
                {g.name}
              </h2>
              <p className="max-w-[60ch] text-ink2">{g.blurb}</p>
            </div>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {fields.map((d) => (
                <li key={d.slug}>
                  <a href={`/fields/${d.slug}/`} className="card group flex h-full flex-col p-5">
                    <span className="h3 mb-2 group-hover:text-blood">{d.name}</span>
                    <span className="mb-4 text-sm leading-relaxed text-ink2">{d.summary}</span>
                    <span className="mt-auto flex items-center justify-between gap-3">
                      <span className="mono text-ink3">{REGIME_LABEL[d.licensing]}</span>
                      <span aria-hidden="true" className="text-blood">
                        &rarr;
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        );
      })}

      <section className="shell py-8" aria-label="Industry pay and outlook">
        <div className="scope-rule mb-8" />
        <PayHighlight fieldName="pest control" industry />
      </section>

      <div className="shell pt-4">
        <p className="text-sm text-ink3">
          Work in a field we haven&rsquo;t covered yet?{' '}
          <a href={site.discord.invite} target="_blank" rel="noopener noreferrer" className="link">
            Tell us about it in the Discord
          </a>{' '}
          and help us write it up.
        </p>
      </div>
    </>
  );
}
