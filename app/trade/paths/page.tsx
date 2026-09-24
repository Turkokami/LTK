import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { DISCIPLINES, NETWORK_DISCIPLINES } from '@/lib/content/disciplines';
import { abs, ID } from '@/lib/site.config';
import { EDITOR } from '@/lib/content/editorial';

/**
 * The routes through this industry.
 *
 * This hub is the answer to the thing nobody publishes: pest control is not one job, it is
 * fourteen trades that happen to share a customer, and almost nobody entering it is told that.
 * People take a technician job and five years later still do not know that falconry-based bird
 * abatement is a career, or that the exclusion tech on their crew out-earns them.
 *
 * SNIPPET SHAPE: table. Every discipline, the regulator that actually governs it, and the route
 * in — in one scannable grid, because the comparison IS the content. A list of fourteen pretty
 * cards would lose the only thing that makes this useful.
 *
 * CONVERSION: into the community. The specialist lanes at the bottom are the sharpest version
 * of the argument — there are maybe a few dozen people worldwide who genuinely know commercial
 * falconry abatement, and a forum is the only place a curious technician will ever meet one.
 */

const REGIME_LABEL: Record<string, string> = {
  'state-pesticide': 'State pesticide licence',
  'state-wildlife': 'State wildlife permit',
  'federal-and-state-wildlife': 'Federal + state wildlife',
  'trade-certification': 'Third-party certification',
  'contractor-or-trade': 'Contractor / trade',
  'none-or-varies': 'Varies — often none',
};

export const metadata: Metadata = pageMeta({
  title: 'Every job in pest control, and how to get there',
  description:
    'Fourteen trades share this industry: general pest, wildlife, falconry abatement, K9 detection, exclusion and more. What each is, who licenses it, how to get in.',
  path: '/trade/paths/',
});

export default function PathsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade/' },
    { name: 'Routes', href: '/trade/paths/' },
  ];

  const graph = buildGraph({
    path: '/trade/paths/',
    pageType: 'CollectionPage',
    crumbs,
    primary: [
      {
        '@type': 'ItemList',
        '@id': `${abs('/trade/paths/')}#disciplines`,
        name: 'Disciplines in the pest management industry',
        numberOfItems: DISCIPLINES.length,
        itemListElement: DISCIPLINES.map((d, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: d.name,
          url: abs(`/trade/paths/${d.slug}/`),
        })),
      },
      {
        '@type': 'Article',
        '@id': `${abs('/trade/paths/')}#article`,
        headline: 'Every job in pest control, and how to get there',
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
        <p className="eyebrow mb-3">Trade · Routes through the industry</p>
        <h1 className="display mb-6 max-w-[20ch]">Every job in pest control, and how to get there</h1>

        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <QuickAnswer
            question="What jobs are there in pest control?"
            answer={
              <>
                Far more than one. General pest, termite and WDO, wildlife control,
                falconry-based bird abatement, bird exclusion, K9 detection, structural
                exclusion, insulation, fumigation, commercial and food safety, mosquito and
                vector, turf and ornamental, bed bug work, and running a company. They share a
                customer and very little else — different regulators, different skills,
                different pay.
              </>
            }
            fact={`${DISCIPLINES.length} distinct disciplines, governed by at least five different kinds of regulator.`}
            verifiedOn="2026-09-23"
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />

          <LabelBlock title="Why this page exists" signal="warning">
            Almost nobody enters this industry on purpose. People take a technician job and
            nobody ever tells them what else is in here. This is the map that should have been
            handed over on day one.
          </LabelBlock>
        </div>

        {/* SNIPPET SHAPE: table. The comparison is the content. */}
        <h2 className="h2 mb-3 mt-12">The disciplines</h2>
        <div className="overflow-x-auto">
          <table className="w-full border border-ink bg-paper text-sm">
            <caption className="sr-only">
              Disciplines in the pest management industry, the regulator governing each, and the
              usual route in
            </caption>
            <thead>
              <tr className="bg-ink text-stock">
                <th scope="col" className="mono px-3 py-2 text-left uppercase">Discipline</th>
                <th scope="col" className="mono px-3 py-2 text-left uppercase">What it is</th>
                <th scope="col" className="mono px-3 py-2 text-left uppercase">Licensed by</th>
              </tr>
            </thead>
            <tbody>
              {DISCIPLINES.map((d) => (
                <tr key={d.slug} className="rule-t">
                  <th scope="row" className="px-3 py-2 text-left font-semibold">
                    <a href={`/trade/paths/${d.slug}/`} className="text-field underline underline-offset-2">
                      {d.name}
                    </a>
                  </th>
                  <td className="px-3 py-2 text-ink2">{d.summary}</td>
                  <td className="mono px-3 py-2 text-ink3">{REGIME_LABEL[d.licensing]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="h2 mb-3 mt-12">The thing that trips everyone up</h2>
        <div className="prose-bulletin">
          <p>
            A discipline is not the same thing as a licence category, and assuming it is has cost
            people real money. Wildlife control usually runs through a state wildlife agency, not
            the pesticide agency — an entirely different regulator with an entirely different
            application. Falconry abatement is federal <em>and</em> state <em>and</em> needs a
            separate abatement endorsement, with an apprenticeship measured in years. Exclusion,
            insulation and K9 detection frequently need no pesticide licence at all.
          </p>
          <p>
            That mismatch is exactly why this information is so hard to find: no single agency
            website covers it, because no single agency governs it.
          </p>
        </div>

        <h2 className="h2 mb-3 mt-12">Where the community matters most</h2>
        <p className="prose-bulletin">
          Some of these lanes are small enough that the handful of people who genuinely know them
          are the only network that exists. There is no course, no association chapter and no
          trade publication that will introduce you — you meet them or you do not.
        </p>
        <ul className="mt-4 grid gap-px bg-rule md:grid-cols-2">
          {NETWORK_DISCIPLINES.map((d) => (
            <li key={d.slug}>
              <a href={`/trade/paths/${d.slug}/`} className="group block h-full bg-paper p-5 hover:bg-stock2">
                <h3 className="h3 group-hover:text-field">{d.name}</h3>
                <p className="mt-1 text-sm text-ink2">{d.summary}</p>
              </a>
            </li>
          ))}
        </ul>

        <div className="rule-t mt-12 pt-6">
          <a href="/community/" className="btn">
            Meet people doing this work
          </a>
        </div>
      </div>
    </>
  );
}
