import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, fitTitle, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { DISCIPLINES, getDiscipline, routesInto } from '@/lib/content/disciplines';
import { NATIONAL_BASELINE } from '@/lib/content/salary';
import { abs, ID } from '@/lib/site.config';
import { EDITOR } from '@/lib/content/editorial';

/**
 * One discipline. What it is, who licenses it, how people actually get in, and what it is
 * really like.
 *
 * SNIPPET SHAPE: paragraph + list. The lead answer is "what is this job and can I do it",
 * which resolves in prose; the route in resolves as steps.
 *
 * CITABILITY: the licensing regime is the citable fact. It is also the fact that is most
 * often wrong elsewhere — wildlife and falconry get filed under the pesticide agency on nearly
 * every careers page that mentions them at all, because whoever wrote it assumed one industry
 * means one regulator.
 *
 * DELIBERATELY NOT HERE:
 *   - Pay per discipline. We have BLS national figures for two SOC codes and nothing credible
 *     for the other twelve. Inventing a range for falconry abatement would be the exact kind
 *     of confident nonsense this site exists to replace. Pay shows only where a SOC code
 *     genuinely applies, and is labelled as national, not local.
 *   - Occupation schema. Occupation requires real salary data tied to a real region. Emitting
 *     it without that is fabrication with a schema wrapper around it.
 */

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
      `${d.name}: the job and the route in`,
      `${d.name}: the route in`,
      `${d.name} careers`,
      d.name,
    ]),
    description: pickDescription(d.summary, [
      d.licensingNote,
      'What the work involves, who licenses it, and the realistic route in from where you are now.',
      'Who licenses it, and the realistic route in.',
      'Plus where it leads next.',
    ]),
    path: `/trade/paths/${d.slug}/`,
  });
}

export default async function DisciplinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = getDiscipline(slug);
  if (!d) notFound();

  const path = `/trade/paths/${d.slug}/`;
  const from = routesInto(d.slug);
  const to = d.movesTo.map(getDiscipline).filter(Boolean) as typeof DISCIPLINES;

  // Pay only where a SOC code genuinely maps. Most of these have no clean mapping and we say so.
  const pay = d.socCode
    ? NATIONAL_BASELINE.occupations.find(
        (o) => o.socCode === d.socCode && o.medianAnnualUsd !== null,
      )
    : undefined;

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade/' },
    { name: 'Routes', href: '/trade/paths/' },
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
        author: { '@type': 'Person', name: EDITOR.name, url: abs(EDITOR.path) },
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

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trade · Routes · {d.name}</p>
          <h1 className="display mb-6 max-w-[22ch]">{d.name}</h1>

          <QuickAnswer
            question={`What is ${d.name.toLowerCase()} work?`}
            answer={<>{d.summary}</>}
            fact={d.licensingNote}
            verifiedOn={NATIONAL_BASELINE.verifiedOn}
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />

          <h2 className="h2 mb-3 mt-12">What the work is actually like</h2>
          <p className="prose-bulletin">{d.dayToDay}</p>

          <h2 className="h2 mb-3 mt-12">How people get in</h2>
          <p className="prose-bulletin">{d.routeIn}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <LabelBlock
              title="Licensing"
              signal={d.licensing === 'federal-and-state-wildlife' ? 'danger' : 'warning'}
              meta="Who governs this"
              specs={[
                { label: 'Regime', value: d.licensingNote },
                { label: 'SOC code', value: d.socCode ?? 'No clean BLS mapping' },
              ]}
            />

            {pay ? (
              <LabelBlock
                title="National pay"
                meta={`BLS ${NATIONAL_BASELINE.referencePeriod}`}
                specs={[
                  {
                    label: 'Median annual',
                    value: `$${pay.medianAnnualUsd!.toLocaleString()} (national)`,
                  },
                  {
                    label: 'All occupations',
                    value:
                      'allOccupationMedianUsd' in pay && pay.allOccupationMedianUsd
                        ? `$${pay.allOccupationMedianUsd.toLocaleString()}`
                        : null,
                  },
                  { label: 'Excludes', value: NATIONAL_BASELINE.excludes.join('; ') },
                ]}
              />
            ) : (
              <LabelBlock title="Pay" meta="Not published">
                We do not have credible pay data for this discipline. It has no clean BLS
                mapping, and we would rather say nothing than publish a range somebody quotes at
                a job interview. Members with real numbers are the route to fixing that.
              </LabelBlock>
            )}
          </div>

          {d.communityIsTheNetwork ? (
            <LabelBlock title="This one is small" signal="danger" className="mt-6">
              There are few enough people doing this work that there is no course, association
              chapter or publication that will introduce you to them. You meet them or you do
              not. That is the whole argument for the community.
            </LabelBlock>
          ) : null}

          {from.length || to.length ? (
            <>
              <h2 className="h2 mb-3 mt-12">Where this sits in a career</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {from.length ? (
                  <div>
                    <h3 className="h3 mb-2">People usually arrive from</h3>
                    <ul className="prose-bulletin">
                      {from.map((x) => (
                        <li key={x.slug}>
                          <a href={`/trade/paths/${x.slug}/`}>{x.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {to.length ? (
                  <div>
                    <h3 className="h3 mb-2">People commonly move on to</h3>
                    <ul className="prose-bulletin">
                      {to.map((x) => (
                        <li key={x.slug}>
                          <a href={`/trade/paths/${x.slug}/`}>{x.name}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </>
          ) : null}

          <div className="rule-t mt-12 pt-6">
            <p className="prose-bulletin">
              Doing this work already, or trying to get into it? The people who can answer the
              specific version of your question are in the community, not on a careers page.
            </p>
            <a href="/community/" className="btn mt-4">
              Find people doing this
            </a>
          </div>
        </article>

        <aside className="mono space-y-6 pt-10 text-ink3">
          <div>
            <p className="uppercase tracking-wide text-ink2">Discipline</p>
            <p>{d.name}</p>
          </div>
          <div>
            <p className="uppercase tracking-wide text-ink2">Regulator type</p>
            <p>{d.licensing}</p>
          </div>
          {d.socCode ? (
            <div>
              <p className="uppercase tracking-wide text-ink2">SOC</p>
              <p>{d.socCode}</p>
            </div>
          ) : null}
          <div className="rule-t pt-4">
            <p className="uppercase tracking-wide text-ink2">All routes</p>
            <ul className="mt-2 space-y-1">
              {DISCIPLINES.filter((x) => x.slug !== d.slug).map((x) => (
                <li key={x.slug}>
                  <a href={`/trade/paths/${x.slug}/`} className="hover:text-field">
                    {x.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
