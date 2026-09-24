import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { stateReferenceEntities } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { STATES, PUBLISHED_STATES, getState, getRegulatory } from '@/lib/content/states';
import { formatVerified } from '@/lib/utils';
import { EDITOR } from '@/lib/content/editorial';

/**
 * REFERENCE TEMPLATE — copy this shape for every other geo layer.
 *
 * This is the highest-value template on the site. It captures the largest unclaimed evergreen
 * search demand in the vertical, it converts at high rates (anyone researching their CEU
 * requirement is a licensed professional by definition), and it is the fastest route from
 * Local 1 to Local 4 on the scorecard.
 *
 * It is also the easiest template to ruin. Fifty near-identical pages with the state name
 * swapped is doorway spam. Every page must carry real state-specific substance and be signed
 * by a named human. If the regulatory record is unverified, this route 404s in production
 * rather than publishing a guess.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED_STATES.map((s) => ({ state: s.slug }));
}

/** REGISTRY R-06. Replace with the real editorial lead; do not leave this as a placeholder. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const st = getState(slug);
  if (!st) return {};
  return pageMeta({
    title: `${st.name} pest control CEU requirements`,
    description: pickDescription(
      `How many continuing education units ${st.name} applicators need, which formats count, and when the renewal deadline falls.`,
      [
        'Each figure verified against the issuing agency and dated.',
        'Verified against the issuing agency and dated.',
        'Verified with the agency.',
      ],
    ),
    path: `/academy/ceu/${st.slug}/`,
    ogTemplate: 'state',
  });
}

export default async function StateCeuPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const st = getState(slug);
  if (!st) notFound();

  const reg = getRegulatory(st.code);
  // Production gate: no verified record, no page. REGISTRY R-14.
  if (process.env.NODE_ENV === 'production' && !st.verified) notFound();

  const path = `/academy/ceu/${st.slug}/`;
  const verifiedOn = reg?.verifiedOn ?? new Date().toISOString().slice(0, 10);

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'CEU requirements', href: '/academy/ceu/' },
    { name: st.name, href: path },
  ];

  const faq = [
    {
      question: `How many CEUs does ${st.name} require for pest control licence renewal?`,
      answer: reg?.recertByTier?.length
        ? reg.recertByTier.map((t) => `${t.tier}: ${t.requirement}.`).join(' ')
        : reg?.ceuHoursPerCycle
          ? `${st.name} requires ${reg.ceuHoursPerCycle} continuing education units per renewal cycle.`
          : `We are verifying the current requirement with ${st.agency ?? 'the issuing agency'} and will publish it with its source.`,
    },
    {
      question: `Who issues pest control licences in ${st.name}?`,
      answer: st.agency ?? 'Verification of the issuing agency is in progress.',
    },
    {
      question: `Do online courses count toward ${st.name} CEU requirements?`,
      answer: reg?.acceptedFormats?.length
        ? `Accepted formats: ${reg.acceptedFormats.join(', ')}.`
        : 'Accepted formats are being verified with the agency.',
    },
  ];

  const graph = buildGraph({
    path,
    crumbs,
    primary: stateReferenceEntities({
      path,
      headline: `${st.name} pest control CEU requirements`,
      stateName: st.name,
      dateModified: verifiedOn,
      author: EDITOR,
      about: 'Pesticide applicator continuing education',
      faq,
    }),
  });

  return (
    <>
      <JsonLd graph={graph} />

      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">
            Academy · CEU requirements · {st.code}
          </p>
          <h1 className="display mb-6">{st.name} pest control CEU requirements</h1>

          <QuickAnswer
            question={`How many CEUs does ${st.name} require for pest control licence renewal?`}
            answer={
              reg?.recertByTier?.length ? (
                <>
                  It depends which licence you hold — {st.name} sets a different obligation for
                  each tier, and they are not even measured the same way.{' '}
                  {reg.recertByTier.map((t) => `${t.tier} owe ${t.requirement.toLowerCase()}`).join('; ')}.
                  There is no single pooled number, which is the most common reason somebody
                  arrives at renewal short.
                </>
              ) : reg?.ceuHoursPerCycle ? (
                <>
                  {st.name} applicators need {reg.ceuHoursPerCycle} continuing education units per
                  renewal cycle, issued by {st.agency}. Hours are counted by licence category
                  rather than as a single pooled total, so holding two categories does not
                  automatically mean double the hours. Approved-provider courses are the only
                  ones that count.
                </>
              ) : (
                <>
                  We publish {st.name} CEU requirements only once every figure has been checked
                  against {st.agency ?? 'the issuing agency'} and dated. That verification is in
                  progress for this state. The structure below shows exactly what will be
                  published, and nothing is filled in with an estimate.
                </>
              )
            }
            fact={
              st.agency ? <>Issuing agency: {st.agency}</> : undefined
            }
            verifiedOn={verifiedOn}
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <LabelBlock
              title="Renewal requirements"
              signal="warning"
              meta={st.code}
              specs={[
                {
                  label: 'Requirement',
                  value: reg?.recertByTier?.length
                    ? `Set per licence tier — see the table below`
                    : (reg?.ceuHoursPerCycle ?? null),
                },
                { label: 'Cycle length', value: reg?.renewalCycleMonths ? `${reg.renewalCycleMonths} months` : null },
                { label: 'Deadline', value: reg?.renewalDeadline ?? null },
                { label: 'Accepted formats', value: reg?.acceptedFormats?.join(', ') || null },
              ]}
            />
            <LabelBlock
              title="Issuing agency"
              meta="Source of record"
              specs={[
                { label: 'Agency', value: st.agency },
                {
                  label: 'Agency site',
                  value: st.agencyUrl ? (
                    <a href={st.agencyUrl} className="text-field underline underline-offset-2">
                      {st.agencyUrl}
                    </a>
                  ) : null,
                },
                { label: 'Application fee', value: reg?.applicationFeeUsd ? `$${reg.applicationFeeUsd}` : null },
                { label: 'Exam structure', value: reg?.examStructure ?? null },
              ]}
            />
          </div>

          <h2 className="h2 mt-12 mb-3">What each licence tier owes</h2>
          {reg?.recertByTier?.length ? (
            <>
              {/*
                SNIPPET SHAPE: table (lib/content/conversion.ts). Real semantic markup.

                This table is the page. Most states do NOT publish one pooled number, and the
                tiers are frequently not even the same KIND of obligation — Texas technicians owe
                "hours of verifiable training" while certified applicators owe "CEUs", with
                different rules, different records and different names. Flattening that into one
                figure is the single most common way a licence lapses.
              */}
              <div className="overflow-x-auto">
                <table className="w-full border border-ink bg-paper text-sm">
                  <caption className="sr-only">
                    {`Recertification requirement by licence tier in ${st.name}`}
                  </caption>
                  <thead>
                    <tr className="bg-ink text-stock">
                      <th scope="col" className="mono px-3 py-2 text-left uppercase">Licence tier</th>
                      <th scope="col" className="mono px-3 py-2 text-left uppercase">Requirement</th>
                      <th scope="col" className="mono px-3 py-2 text-left uppercase">Detail that catches people out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reg.recertByTier.map((t) => (
                      <tr key={t.tier} className="rule-t">
                        <th scope="row" className="px-3 py-2 text-left font-semibold">{t.tier}</th>
                        <td className="px-3 py-2">{t.requirement}</td>
                        <td className="px-3 py-2 text-ink2">
                          {t.note ?? <span className="mono text-ink3">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {reg.renewalDeadline ? (
                <LabelBlock title="When these have to be done by" signal="danger" className="mt-6">
                  {reg.renewalDeadline}
                </LabelBlock>
              ) : null}
            </>
          ) : reg?.ceuHoursByCategory?.length ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-ink bg-paper text-sm">
                <caption className="sr-only">{`CEU hours required per licence category in ${st.name}`}</caption>
                <thead>
                  <tr className="bg-ink text-stock">
                    <th scope="col" className="mono px-3 py-2 text-left uppercase">Category</th>
                    <th scope="col" className="mono px-3 py-2 text-left uppercase">Hours per cycle</th>
                  </tr>
                </thead>
                <tbody>
                  {reg.ceuHoursByCategory.map((c) => (
                    <tr key={c.category} className="rule-t">
                      <th scope="row" className="px-3 py-2 text-left font-semibold">{c.category}</th>
                      <td className="mono px-3 py-2">{c.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="prose-bulletin">
              Requirements for {st.name} are being verified. We publish them per licence tier
              rather than as a single total, because that is how the rules are actually written
              and a pooled number is the most common way technicians end up short at renewal.
            </p>
          )}

          {reg?.sourceUrls?.length ? (
            <>
              <h2 className="h2 mt-12 mb-3">Sources</h2>
              <ul className="prose-bulletin">
                {reg.sourceUrls.map((u) => (
                  <li key={u}>
                    <a href={u} rel="noopener">{u}</a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <h2 className="h2 mt-12 mb-3">Common questions</h2>
          <dl className="prose-bulletin">
            {faq.map((q) => (
              <div key={q.question} className="mb-4">
                <dt className="font-sans font-semibold text-ink">{q.question}</dt>
                <dd className="m-0">{q.answer}</dd>
              </div>
            ))}
          </dl>

          <div className="rule-t mt-12 pt-6">
            <p className="mono text-ink3">
              Something here out of date? Members report rule changes faster than agencies publish
              them.{' '}
              <a href="/join/" className="text-field underline underline-offset-2">
                Tell us what changed
              </a>
            </p>
          </div>
        </article>

        {/* The spec gutter. Persistent, mono, datasheet-style. */}
        <aside className="mono space-y-6 pt-10 text-ink3">
          <div>
            <p className="eyebrow mb-2">Record</p>
            <p>State: {st.name} ({st.code})</p>
            <p>Verified: {formatVerified(verifiedOn)}</p>
            <p>Status: {st.verified ? 'Verified' : 'In verification'}</p>
            <p>Build wave: {st.wave}</p>
          </div>

          <div>
            <p className="eyebrow mb-2">Also for {st.code}</p>
            <ul className="space-y-1">
              <li><a className="hover:text-ink" href={`/academy/licensing/${st.slug}/`}>Licensing requirements</a></li>
              <li><a className="hover:text-ink" href={`/community/chapters/${st.slug}/`}>{st.name} chapter</a></li>
              <li><a className="hover:text-ink" href={`/trade/jobs/${st.slug}/`}>Jobs in {st.name}</a></li>
              <li><a className="hover:text-ink" href={`/wire/regulatory/${st.slug}/`}>Regulatory updates</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-2">Nearby states</p>
            <ul className="space-y-1">
              {STATES.filter((s) => s.wave === st.wave && s.code !== st.code)
                .slice(0, 5)
                .map((s) => (
                  <li key={s.code}>
                    <a className="hover:text-ink" href={`/academy/ceu/${s.slug}/`}>
                      {s.name}
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
