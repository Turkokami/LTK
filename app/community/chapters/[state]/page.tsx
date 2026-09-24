import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { STATES, getState } from '@/lib/content/states';

/**
 * Geo layer 3 — state chapters. Brand + geo intent, meetups, regional regulatory news, roster.
 *
 * Deliberately lighter than the Academy layers: this page's job is internal linking density
 * per state and a home for local activity, not search capture. It ships for all 50 because a
 * chapter with no page cannot form, but it carries no regulatory claims so it is not gated on
 * R-14 verification.
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
    title: `${st.name} chapter`.slice(0, 60),
    description:
      `The ${st.name} chapter — local meetups, state association links, regional regulatory ` +
      `updates and the verified members working in your area. Free to join.`,
    path: `/community/chapters/${st.slug}/`,
  });
}

export default async function ChapterPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: slug } = await params;
  const st = getState(slug);
  if (!st) notFound();

  const path = `/community/chapters/${st.slug}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Community', href: '/community/' },
    { name: 'Chapters', href: '/community/chapters/' },
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
          <p className="eyebrow mb-3">Community · Chapter · {st.code}</p>
          <h1 className="display mb-6">{st.name} chapter</h1>
          <p className="prose-bulletin">
            Chapters are where the national community becomes local: who is working near you,
            what changed in {st.name} this quarter, and who is meeting up. Chapters run on
            members, not on staff — if you want one active in your area, the way that happens is
            you.
          </p>

          <h2 className="h2 mb-3 mt-10">Members here</h2>
          <LabelBlock title="Roster opens with the founding cohort" signal="warning" />

          <h2 className="h2 mb-3 mt-10">Meetups</h2>
          <LabelBlock title="Nothing scheduled yet" signal="warning">
            Chapter meetups are member-organised. Tell us you want to run one and we will help
            with the logistics and the invitations.
          </LabelBlock>

          <div className="rule-t mt-10 pt-6">
            <a href="/join/" className="btn">
              Verify my licence
            </a>
          </div>
        </article>

        <aside className="mono space-y-6 pt-10 text-ink3">
          <div>
            <p className="eyebrow mb-2">Also for {st.code}</p>
            <ul className="space-y-1">
              <li><a className="hover:text-ink" href={`/academy/ceu/${st.slug}/`}>CEU requirements</a></li>
              <li><a className="hover:text-ink" href={`/academy/licensing/${st.slug}/`}>Licence requirements</a></li>
              <li><a className="hover:text-ink" href={`/trade/jobs/${st.slug}/`}>Jobs in {st.name}</a></li>
              <li><a className="hover:text-ink" href={`/wire/regulatory/${st.slug}/`}>Regulatory updates</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-2">Issuing agency</p>
            <p className="normal-case">{st.agency ?? 'Being verified'}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
