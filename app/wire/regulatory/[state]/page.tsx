import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { STATES, getState } from '@/lib/content/states';
import { updatesForState } from '@/lib/content/wire';
import { formatVerified } from '@/lib/utils';

/**
 * Geo layer 5 — regulatory updates by state.
 *
 * The highest-frequency reason a professional returns to a site like this: a label changed, a
 * product got restricted, a rule moved. This page is the standing answer to "did anything
 * change in my state".
 *
 * Every item requires a source URL to an agency or registrant document. A regulatory claim
 * without a primary source is the one category of error that can cost a reader their licence,
 * so the type makes sourceUrl non-optional and the renderer prints the source in visible text
 * beside every item — which is also Keystone 6.5 citability signal 2.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return STATES.map((s) => ({ state: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: slug } = await params;
  const st = getState(slug);
  if (!st) return {};
  return pageMeta({
    title: `${st.name} regulatory updates`.slice(0, 60),
    description:
      `Label changes, product restrictions and rule updates affecting pest management ` +
      `professionals in ${st.name}. Every item linked to the agency document it came from.`,
    path: `/wire/regulatory/${st.slug}/`,
  });
}

export default async function StateRegulatoryPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: slug } = await params;
  const st = getState(slug);
  if (!st) notFound();

  const path = `/wire/regulatory/${st.slug}/`;
  const updates = updatesForState(st.code);
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Wire', href: '/wire/' },
    { name: 'Regulatory', href: '/wire/regulatory/' },
    { name: st.name, href: path },
  ];
  const graph = buildGraph({ path, pageType: 'CollectionPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Wire · Regulatory · {st.code}</p>
          <h1 className="display mb-6 max-w-[18ch]">{st.name} regulatory updates</h1>

          <p className="prose-bulletin mb-8">
            Label changes, cancellations, restricted-use changes and rule updates that affect how
            you work in {st.name}. Every item links to the agency or registrant document it came
            from. If an item here disagrees with the label in your hand, the label in your hand
            wins — tell us and we will correct this page.
          </p>

          {updates.length === 0 ? (
            <LabelBlock title={`Nothing logged for ${st.name} yet`} signal="warning">
              We publish an item when there is a sourced document behind it, not on a schedule.
              An empty page here means nothing has been logged, not that nothing has happened —
              always check with {st.agency ?? 'your state agency'} directly for anything
              time-critical.
            </LabelBlock>
          ) : (
            <ul className="grid gap-px bg-rule">
              {updates.map((u) => (
                <li key={u.slug} className="bg-paper p-5">
                  <p className="mono mb-1 text-ink3">{formatVerified(u.effectiveOn)}</p>
                  <h2 className="h3 mb-2">{u.headline}</h2>
                  <p className="text-sm text-ink2">{u.summary}</p>
                  <p className="mono mt-3">
                    <a href={u.sourceUrl} rel="noopener" className="text-field underline underline-offset-2">
                      {u.sourceLabel}
                    </a>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </article>

        <aside className="mono space-y-6 pt-10 text-ink3">
          <div>
            <p className="eyebrow mb-2">Also for {st.code}</p>
            <ul className="space-y-1">
              <li><a className="hover:text-ink" href={`/academy/licensing/${st.slug}/`}>Licence requirements</a></li>
              <li><a className="hover:text-ink" href={`/academy/ceu/${st.slug}/`}>CEU requirements</a></li>
              <li><a className="hover:text-ink" href={`/community/chapters/${st.slug}/`}>{st.name} chapter</a></li>
              <li><a className="hover:text-ink" href={`/trade/jobs/${st.slug}/`}>Jobs</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-2">Primary source</p>
            <p className="normal-case">{st.agency ?? 'Being verified'}</p>
            {st.agencyUrl ? (
              <a href={st.agencyUrl} rel="noopener" className="normal-case hover:text-ink">
                Agency site
              </a>
            ) : null}
          </div>
        </aside>
      </div>
    </>
  );
}
