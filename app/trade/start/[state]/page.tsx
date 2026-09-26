import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { DiscordButton } from '@/components/community/Discord';
import { STATES } from '@/lib/content/states';
import { START_COMPANY, START_VERIFIED_ON, getStart } from '@/lib/content/start-company';
import { abs, site } from '@/lib/site.config';
import { formatVerified } from '@/lib/utils';
import { EDITOR } from '@/lib/content/editorial';

/**
 * /trade/start/:state/ — opening a structural pest control company. Only states with a
 * researched record in lib/content/start-company.ts render; every figure carries its citation.
 * CONVERSION CONTRACT: primary action "Ask owners in the Discord".
 */

export const dynamicParams = false;

const stateFor = (slug: string) => {
  const st = STATES.find((s) => s.slug === slug);
  const rec = st ? getStart(st.code) : undefined;
  return st && rec ? { st, rec } : null;
};

export function generateStaticParams() {
  return START_COMPANY.flatMap((r) => {
    const st = STATES.find((s) => s.code === r.code);
    return st ? [{ state: st.slug }] : [];
  });
}

export async function generateMetadata({ params }: { params: Promise<{ state: string }> }): Promise<Metadata> {
  const { state } = await params;
  const hit = stateFor(state);
  if (!hit) return {};
  return pageMeta({
    title: `Start a pest control company in ${hit.st.name}`,
    description: pickDescription(
      `The business licence, qualifying person, insurance minimums and fees to open a pest control company in ${hit.st.name}.`,
      ['Every figure is sourced to the state agency.', 'Sourced to the state agency.', 'Sourced.'],
    ),
    path: `/trade/start/${hit.st.slug}/`,
    ogTemplate: 'state',
  });
}

export default async function StartStatePage({ params }: { params: Promise<{ state: string }> }) {
  const { state } = await params;
  const hit = stateFor(state);
  if (!hit) notFound();
  const { st, rec } = hit;
  const path = `/trade/start/${st.slug}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade/' },
    { name: 'Starting a company', href: '/trade/start/' },
    { name: st.name, href: path },
  ];
  const graph = buildGraph({
    path,
    crumbs,
    primary: [
      {
        '@type': 'HowTo',
        '@id': `${abs(path)}#howto`,
        name: `How to start a pest control company in ${st.name}`,
        step: rec.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, text: s })),
      },
    ],
  });

  const blocks: { title: string; body: string }[] = [
    { title: 'Business licence', body: rec.businessLicence },
    { title: 'Fees', body: rec.fee },
    { title: 'Who has to qualify', body: rec.qualifyingPerson },
    { title: 'Insurance and bonding', body: rec.insurance },
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trade &middot; Starting a company &middot; {st.code}</p>
          <h1 className="display mb-6">Start a pest control company in {st.name}</h1>

          <QuickAnswer
            question={`What do you need to open a pest control company in ${st.name}?`}
            answer={<>{rec.steps[0]} Then: {rec.steps.slice(1, 3).join(' ')}</>}
            fact={rec.fee.split(/(?<=\.)\s/)[0]}
            verifiedOn={START_VERIFIED_ON}
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />
          <p className="mt-5 max-w-[62ch] border-l-2 border-blood pl-4 text-sm text-ink2">{rec.readerNote}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {blocks.map((b) => (
              <section key={b.title} className="label-panel">
                <div className="label-bar">
                  <span>{b.title}</span>
                  <span>{st.code}</span>
                </div>
                <p className="py-4 pl-[1.35rem] pr-5 text-[0.9375rem] text-ink2">{b.body}</p>
              </section>
            ))}
          </div>

          <h2 className="h2 mb-4 mt-12">Step by step</h2>
          <ol className="space-y-3">
            {rec.steps.map((s, i) => (
              <li key={i} className="card flex gap-4 p-4">
                <span className="mono shrink-0 text-blood">{String(i + 1).padStart(2, '0')}</span>
                <span className="text-ink2">{s}</span>
              </li>
            ))}
          </ol>

          <h2 className="h2 mb-4 mt-12">Also on the list</h2>
          <ul className="prose-bulletin list-disc space-y-2 pl-5">
            {rec.otherRequirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <div className="card mt-12 flex flex-wrap items-center justify-between gap-4 p-5">
            <p className="max-w-[48ch] text-sm text-ink2">
              <span className="font-semibold text-ink">Opened a shop in {st.name}?</span> Owners in the{' '}
              {site.discord.name} trade notes on insurance brokers, routing software and first hires.
            </p>
            <DiscordButton>Ask owners in the Discord</DiscordButton>
          </div>

          <h2 className="h2 mb-3 mt-12">Sources</h2>
          <ul className="space-y-1.5 text-sm">
            {rec.citations.map((c) => (
              <li key={c.url}>
                <a href={c.url} className="link" target="_blank" rel="noopener noreferrer">
                  {c.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink3">
            Fees and forms change. This is a summary of the state&rsquo;s published rules, not legal
            advice &mdash; confirm with the agency before you file.
          </p>
        </article>

        <aside className="mono space-y-6 pt-10 text-ink3">
          <div>
            <p className="eyebrow mb-2">Record</p>
            <p>State: {st.name} ({st.code})</p>
            <p>Checked: {formatVerified(START_VERIFIED_ON)}</p>
          </div>
          <div>
            <p className="eyebrow mb-2">Also for {st.code}</p>
            <ul className="space-y-1">
              <li><a className="hover:text-ink" href={`/academy/licensing/${st.slug}/`}>Licensing</a></li>
              <li><a className="hover:text-ink" href={`/academy/ceu/${st.slug}/`}>CEU requirements</a></li>
              <li><a className="hover:text-ink" href={`/trade/jobs/${st.slug}/`}>Jobs in {st.name}</a></li>
              <li><a className="hover:text-ink" href="/trade/pay-and-pricing/">Pay and pricing</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
