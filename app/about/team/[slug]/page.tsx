import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { personNode } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { PEOPLE, getPerson } from '@/lib/content/people';

/**
 * One URL per named human. Not a modal, not an anchor on a grid page — a real, linkable,
 * indexable Person entity that every article they author or review points at by @id.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return PEOPLE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getPerson(slug);
  if (!p) return {};
  return pageMeta({
    title: `${p.name} — ${p.jobTitle}`.slice(0, 60),
    description:
      `${p.name} is ${p.jobTitle}${p.affiliation ? ` at ${p.affiliation}` : ''}. ` +
      `${p.bio}`.slice(0, 158),
    path: `/about/team/${p.slug}/`,
  });
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPerson(slug);
  if (!p) notFound();

  const path = `/about/team/${p.slug}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: '/about/' },
    { name: p.name, href: path },
  ];

  const graph = buildGraph({
    path,
    pageType: 'ProfilePage',
    crumbs,
    primary: [
      personNode({
        name: p.name,
        path,
        jobTitle: p.jobTitle,
        affiliation: p.affiliation,
        sameAs: p.sameAs,
        credential: p.credential
          ? {
              category: p.credential.category,
              identifier: p.credential.identifier,
              issuedBy: p.credential.issuedBy,
            }
          : undefined,
      }),
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
          <p className="eyebrow mb-3">Trust · {p.role}</p>
          <h1 className="display mb-2">{p.name}</h1>
          <p className="mono mb-8 text-ink3">
            {p.jobTitle}
            {p.affiliation ? ` · ${p.affiliation}` : ''}
          </p>
          <p className="prose-bulletin">{p.bio}</p>

          {p.covers?.length ? (
            <>
              <h2 className="h2 mt-10 mb-3">What they cover here</h2>
              <ul className="prose-bulletin">
                {p.covers.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          ) : null}
        </article>

        <aside className="space-y-6 pt-10">
          <LabelBlock
            title="Credentials"
            signal="field"
            specs={[
              { label: 'Credential', value: p.credential?.category ?? null },
              { label: 'Number', value: p.credential?.identifier ?? null },
              { label: 'Issued by', value: p.credential?.issuedBy ?? null },
              { label: 'Affiliation', value: p.affiliation ?? null },
            ]}
          />
          {p.sameAs?.length ? (
            <div className="mono space-y-1 text-ink3">
              <p className="eyebrow mb-2">Elsewhere</p>
              {p.sameAs.map((u) => (
                <p key={u}>
                  <a className="hover:text-ink" href={u} rel="noopener">
                    {new URL(u).hostname.replace('www.', '')}
                  </a>
                </p>
              ))}
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}
