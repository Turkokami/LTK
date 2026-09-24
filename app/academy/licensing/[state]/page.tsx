import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { stateReferenceEntities } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { PUBLISHED_STATES, getState, getRegulatory } from '@/lib/content/states';
import { formatVerified } from '@/lib/utils';
import { EDITOR } from '@/lib/content/editorial';

/** Geo layer 1. Same shape as the CEU template — keep them structurally parallel. */

export const dynamicParams = false;

export function generateStaticParams() {
  return PUBLISHED_STATES.map((s) => ({ state: s.slug }));
}

/** REGISTRY R-06. */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const st = getState(slug);
  if (!st) return {};
  return pageMeta({
    title: `${st.name} pest control licence requirements`,
    description: pickDescription(
      `Which licence categories ${st.name} issues, how the exam is structured, what it costs, and how long the cycle runs.`,
      [
        'Reciprocity included, and every figure verified with the agency.',
        'Plus reciprocity, verified with the agency.',
        'Verified with the agency.',
      ],
    ),
    path: `/academy/licensing/${st.slug}/`,
    ogTemplate: 'state',
  });
}

export default async function StateLicensingPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const st = getState(slug);
  if (!st) notFound();
  if (process.env.NODE_ENV === 'production' && !st.verified) notFound();

  const reg = getRegulatory(st.code);
  const path = `/academy/licensing/${st.slug}/`;
  const verifiedOn = reg?.verifiedOn ?? new Date().toISOString().slice(0, 10);

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'Licensing', href: '/academy/licensing/' },
    { name: st.name, href: path },
  ];

  const faq = [
    {
      question: `Who issues pest control licences in ${st.name}?`,
      answer: st.agency ?? 'Verification of the issuing agency is in progress.',
    },
    {
      question: `What licence categories does ${st.name} offer?`,
      answer: reg?.licenseCategories?.length
        ? reg.licenseCategories.map((c) => `${c.code} — ${c.name}`).join('; ')
        : 'Category codes and names are being verified with the agency.',
    },
  ];

  const graph = buildGraph({
    path,
    crumbs,
    primary: stateReferenceEntities({
      path,
      headline: `${st.name} pest control licence requirements`,
      stateName: st.name,
      dateModified: verifiedOn,
      author: EDITOR,
      about: 'Pesticide applicator licensing',
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
          <p className="eyebrow mb-3">Academy · Licensing · {st.code}</p>
          <h1 className="display mb-6">{st.name} pest control licence requirements</h1>

          <QuickAnswer
            question={`How do you get a pest control licence in ${st.name}?`}
            answer={
              <>
                {st.agency
                  ? `${st.name} applicator licences are issued by ${st.agency}.`
                  : `We are verifying which agency issues ${st.name} applicator licences.`}{' '}
                Requirements are set per category rather than as a single general licence, so the
                exam you sit and the hours you carry depend on which categories you intend to
                work. Details below are published only once verified against the agency.
              </>
            }
            verifiedOn={verifiedOn}
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <LabelBlock
              title="Licence basics"
              signal="warning"
              meta={st.code}
              specs={[
                { label: 'Issuing agency', value: st.agency },
                { label: 'Exam structure', value: reg?.examStructure ?? null },
                { label: 'Application fee', value: reg?.applicationFeeUsd ? `$${reg.applicationFeeUsd}` : null },
                { label: 'Cycle length', value: reg?.renewalCycleMonths ? `${reg.renewalCycleMonths} months` : null },
              ]}
            />
            <LabelBlock
              title="Reciprocity"
              specs={[
                {
                  label: 'Agreements',
                  value: reg?.reciprocity?.length ? reg.reciprocity.join(', ') : null,
                },
              ]}
            >
              Reciprocity is the most commonly misunderstood part of moving states. We publish
              only agreements confirmed by the agency, never inferred ones.
            </LabelBlock>
          </div>

          <h2 className="h2 mt-12 mb-3">Licence categories</h2>
          {reg?.licenseCategories?.length ? (
            <table className="w-full border border-ink bg-paper text-sm">
              {/* A11Y-01: data tables need an accessible name. Visually hidden is fine. */}
              <caption className="sr-only">{`Licence categories issued in ${st.name}`}</caption>
              <thead>
                <tr className="bg-ink text-stock">
                  <th className="mono px-3 py-2 text-left uppercase">Code</th>
                  <th className="mono px-3 py-2 text-left uppercase">Category</th>
                </tr>
              </thead>
              <tbody>
                {reg.licenseCategories.map((c) => (
                  <tr key={c.code} className="rule-t">
                    <td className="mono px-3 py-2">{c.code}</td>
                    <td className="px-3 py-2">{c.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="prose-bulletin">
              Category codes for {st.name} are being verified. We publish the agency&rsquo;s own
              codes rather than paraphrasing them, because the code is what appears on the
              application and on the licence.
            </p>
          )}
        </article>

        <aside className="mono space-y-6 pt-10 text-ink3">
          <div>
            <p className="eyebrow mb-2">Record</p>
            <p>State: {st.name} ({st.code})</p>
            <p>Verified: {formatVerified(verifiedOn)}</p>
            <p>Status: {st.verified ? 'Verified' : 'In verification'}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Also for {st.code}</p>
            <ul className="space-y-1">
              <li><a className="hover:text-ink" href={`/academy/ceu/${st.slug}/`}>CEU requirements</a></li>
              <li><a className="hover:text-ink" href={`/community/chapters/${st.slug}/`}>{st.name} chapter</a></li>
              <li><a className="hover:text-ink" href={`/trade/jobs/${st.slug}/`}>Jobs in {st.name}</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
