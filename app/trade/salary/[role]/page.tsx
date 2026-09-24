import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { ROLES, getRole } from '@/lib/content/salary';
import { abs, ID } from '@/lib/site.config';

/**
 * Trade → Salary by role.
 *
 * The strongest link magnet available in this vertical, and the clearest citability play on the
 * site: original survey data that exists nowhere else, marked up as a Dataset.
 *
 * Dataset is a CONDITIONAL node under Keystone v3.2 and this is one of the two legitimate uses
 * of it on this property. It requires real collected responses — a Dataset node describing
 * numbers we estimated would be a fabrication with machine-readable packaging, which is worse
 * than a fabrication in prose because it is designed to be ingested without a human reading it.
 *
 * So: no responses, no page. ROLES is empty until the survey runs.
 *
 * CONVERSION CONTRACT: primary action "Add your numbers"; snippet shape table; citability 1, 3
 * and 4.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return ROLES.map((r) => ({ role: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ role: string }>;
}): Promise<Metadata> {
  const { role } = await params;
  const r = getRole(role);
  if (!r) return {};
  return pageMeta({
    title: `${r.name} salary — what the job actually pays`.slice(0, 60),
    description:
      `What ${r.name.toLowerCase()}s actually earn, by region and years in the trade, reported ` +
      `by working professionals. Original survey data, sample size shown, updated annually.`,
    path: `/trade/salary/${r.slug}/`,
  });
}

export default async function SalaryPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  const r = getRole(role);
  if (!r) notFound();

  const path = `/trade/salary/${r.slug}/`;
  const url = abs(path);
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade/' },
    { name: 'Salary', href: '/trade/salary/' },
    { name: r.name, href: path },
  ];

  const graph = buildGraph({
    path,
    crumbs,
    primary: [
      {
        // CONDITIONAL node. Legitimate here only because these are real collected responses.
        '@type': 'Dataset',
        '@id': `${url}#dataset`,
        name: `${r.name} compensation, ${r.surveyYear}`,
        description:
          `Self-reported compensation for ${r.name.toLowerCase()}s in the US pest management ` +
          `industry, collected ${r.surveyWindow} from ${r.sampleSize} verified respondents.`,
        creator: { '@id': ID.organization },
        temporalCoverage: String(r.surveyYear),
        spatialCoverage: { '@type': 'Place', name: 'United States' },
        variableMeasured: ['Base pay', 'Total compensation', 'Years in trade', 'Region'],
        license: 'https://creativecommons.org/licenses/by/4.0/',
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

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trade · Salary</p>
          <h1 className="display mb-6 max-w-[18ch]">What a {r.name.toLowerCase()} actually earns</h1>

          <QuickAnswer
            question={`How much does a ${r.name.toLowerCase()} make?`}
            answer={r.answer}
            fact={`Based on ${r.sampleSize} verified responses collected ${r.surveyWindow}.`}
            verifiedOn={r.publishedOn}
            reviewer={{ name: r.reviewer.name, credential: r.reviewer.credential, href: r.reviewer.path }}
          />

          <h2 className="h2 mb-3 mt-10">By region and tenure</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-ink bg-paper text-sm">
              <caption className="sr-only">
                {r.name} compensation by region and years in the trade, {r.surveyYear}
              </caption>
              <thead>
                <tr className="bg-ink text-stock">
                  <th scope="col" className="mono px-3 py-2 text-left uppercase">Region</th>
                  {r.tenureBands.map((b) => (
                    <th scope="col" key={b} className="mono px-3 py-2 text-left uppercase">{b}</th>
                  ))}
                  <th scope="col" className="mono px-3 py-2 text-left uppercase">n</th>
                </tr>
              </thead>
              <tbody>
                {r.rows.map((row) => (
                  <tr key={row.region} className="rule-t">
                    <th scope="row" className="px-3 py-2 text-left font-semibold">{row.region}</th>
                    {r.tenureBands.map((b) => (
                      <td key={b} className="mono px-3 py-2">
                        {/* A band with too few responses is suppressed, not estimated. */}
                        {row.byTenure[b] ?? <span className="text-ink3">n&lt;5 — suppressed</span>}
                      </td>
                    ))}
                    <td className="mono px-3 py-2 text-ink3">{row.n}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="rule-t mt-12 pt-6">
            <a href="/join/" className="btn">Add your numbers</a>
          </div>
        </article>

        <aside className="space-y-6 pt-10">
          <LabelBlock
            title="How this survey works"
            signal="warning"
            specs={[
              { label: 'Respondents', value: String(r.sampleSize) },
              { label: 'Collected', value: r.surveyWindow },
              { label: 'Minimum cell', value: '5 responses' },
            ]}
          >
            Responses come from licence-verified members only. Any region-and-tenure cell with
            fewer than five responses is suppressed rather than published — a median of two
            people is a rumour with a decimal point.
          </LabelBlock>
        </aside>
      </div>
    </>
  );
}
