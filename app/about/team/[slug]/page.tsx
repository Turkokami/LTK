import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, fitTitle } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { personNode } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { DiscordButton } from '@/components/community/Discord';
import { VideoEmbed } from '@/components/ace/VideoEmbed';
import { EPISODES, LTK_SHOW, formatLength } from '@/lib/content/podcast';
import { site } from '@/lib/site.config';

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
    title: fitTitle([`${p.name}, ${p.jobTitle}`, p.name]),
    description: p.metaDescription,
    path: `/about/team/${p.slug}/`,
  });
}

export default async function PersonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getPerson(slug);
  if (!p) notFound();

  const path = `/about/team/${p.slug}/`;
  const appearances = EPISODES.filter((e) => e.guests.includes(p.name));
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
          <p className="eyebrow mb-3">{p.role === 'founder' ? 'Founder' : 'Team'}</p>
          <h1 className="display mb-2">{p.name}</h1>
          <p className="mb-8 text-lg font-semibold text-ink2">
            {p.jobTitle}
            {p.affiliation ? ` · ${p.affiliation}` : ''}
          </p>
          <p className="lede">{p.bio}</p>

          {appearances.length ? (
            <section aria-labelledby="appearances" className="mt-12">
              <h2 id="appearances" className="h2 mb-5">
                Hear {p.name.split(' ')[0]} talk shop
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {appearances.map((e) => (
                  <li key={e.slug}>
                    <VideoEmbed id={e.youtubeId} title={e.title} duration={formatLength(e.lengthSeconds)} />
                    <p className="mt-2 px-1 text-xs text-ink3">On {e.show}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {p.role === 'founder' ? (
            <div className="discord-band mt-12 p-6">
              <p className="h3 mb-2">Say hi in the Discord</p>
              <p className="mb-4 text-sm text-ink2">
                {p.name.split(' ')[0]} runs the {site.discord.name} and the podcast. The quickest way to reach
                him is the server.
              </p>
              <div className="flex flex-wrap gap-2">
                <DiscordButton>Join the Discord</DiscordButton>
                <a href={LTK_SHOW.spotifyUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  {LTK_SHOW.name}
                  <span className="sr-only"> (opens Spotify in a new tab)</span>
                </a>
              </div>
            </div>
          ) : null}
        </article>

        <aside className="space-y-6 pt-10">
          {p.credential ? (
            <LabelBlock
              title="Credentials"
              signal="field"
              specs={[
                { label: 'Credential', value: p.credential.category },
                { label: 'Number', value: p.credential.identifier ?? null },
                { label: 'Issued by', value: p.credential.issuedBy },
                { label: 'Affiliation', value: p.affiliation ?? null },
              ]}
            />
          ) : null}
          {p.sameAs?.length ? (
            <div className="space-y-1 text-sm text-ink3">
              <p className="eyebrow mb-2">Elsewhere</p>
              {p.sameAs.map((u) => (
                <p key={u}>
                  <a className="link" href={u} rel="noopener">
                    {new URL(u).hostname.replace('www.', '')}
                  </a>
                </p>
              ))}
            </div>
          ) : null}
          <div className="card p-5">
            <p className="eyebrow mb-2">About LTK</p>
            <p className="mb-3 text-sm leading-relaxed text-ink2">{site.mission[0]}</p>
            <a href="/about/" className="link text-sm">
              How LTK works
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
