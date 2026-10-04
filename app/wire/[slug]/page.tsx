import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { bylineNodes, personRef } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { NEWS_ARTICLES } from '@/lib/content/news';
import { EDITOR } from '@/lib/content/editorial';
import { abs, ID, site } from '@/lib/site.config';

/** /wire/<slug>/ — an industry news write-up. Dated by the news itself; sources listed in full. */

export const dynamicParams = false;
const ADDED = '2026-10-04';

export function generateStaticParams() {
  return NEWS_ARTICLES.map((a) => ({ slug: a.slug }));
}

const TOPIC: Record<string, string> = {
  regulation: 'Regulation',
  invasive: 'Invasive pests',
  business: 'Business',
  industry: 'Industry',
  technology: 'Technology',
};

const fmt = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = NEWS_ARTICLES.find((x) => x.slug === slug);
  if (!a) return {};
  return pageMeta({ title: a.title, description: a.description, path: `/wire/${a.slug}/` });
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = NEWS_ARTICLES.find((x) => x.slug === slug);
  if (!a) notFound();
  const path = `/wire/${a.slug}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Wire', href: '/wire/' },
    { name: a.title, href: path },
  ];
  const url = abs(path);
  const graph = buildGraph({
    path,
    crumbs,
    primary: [
      {
        '@type': 'NewsArticle',
        '@id': `${url}#article`,
        headline: a.title,
        description: a.dek,
        mainEntityOfPage: { '@id': ID.webpage(url) },
        author: personRef(EDITOR),
        publisher: { '@id': ID.organization },
        datePublished: ADDED,
        dateModified: ADDED,
        citation: a.sources.map((s) => s.url),
      },
      ...bylineNodes(EDITOR),
    ],
  });
  const more = NEWS_ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <article className="max-w-[46rem]">
          <p className="eyebrow mb-3">
            Wire &middot; {TOPIC[a.topic] ?? 'News'} &middot; {fmt(a.date)}
          </p>
          <h1 className="display mb-4">{a.title}</h1>
          <p className="lede mb-6">{a.dek}</p>
          <p className="mono mb-8 text-ink3">
            By the{' '}
            <a href={EDITOR.path} className="link">
              {EDITOR.name}
            </a>{' '}
            &middot; written up {fmt(ADDED)}
          </p>
          <div className="prose-bulletin space-y-4 text-[1.0625rem] leading-relaxed text-ink2">
            {a.body.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <aside className="label-panel mt-8" aria-label="What it means for you">
            <div className="label-bar">
              <span>What it means on the route</span>
            </div>
            <p className="py-4 pl-[1.35rem] pr-5 text-ink2">{a.whatItMeans}</p>
          </aside>
          <section className="mt-8" aria-labelledby="sources">
            <h2 id="sources" className="h3 mb-2">
              Sources
            </h2>
            <ul className="space-y-1 text-sm">
              {a.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">
                    {s.name}
                  </a>
                  <span className="sr-only"> (opens in a new tab)</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink3">
              Spotted a mistake? Tell us in the {site.discord.name} and we&rsquo;ll correct it with a dated note.
            </p>
          </section>
        </article>

        <div className="card mt-10 flex max-w-[46rem] flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[40ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Seeing this on your route?</span> Talk it through with the crew.
          </p>
          <DiscordButton>Discuss on Discord</DiscordButton>
        </div>

        {more.length ? (
          <section className="mt-12" aria-labelledby="more-news">
            <h2 id="more-news" className="h2 mb-4">
              More from the Wire
            </h2>
            <ul className="grid gap-4 md:grid-cols-3">
              {more.map((m) => (
                <li key={m.slug}>
                  <a href={`/wire/${m.slug}/`} className="card group block h-full p-5">
                    <p className="mono mb-1 text-ink3">{fmt(m.date)}</p>
                    <p className="font-semibold text-ink group-hover:text-blood">{m.title}</p>
                    <p className="mt-1 text-sm text-ink2">{m.dek}</p>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </>
  );
}
