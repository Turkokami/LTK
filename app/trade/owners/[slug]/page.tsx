import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fitTitle, pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { QuickAnswer } from '@/components/ui/QuickAnswer';
import { DiscordButton } from '@/components/community/Discord';
import { OWNER_TOPICS, getOwnerTopic } from '@/lib/content/owner-topics';
import { abs, ID, site } from '@/lib/site.config';
import { EDITOR } from '@/lib/content/editorial';

/**
 * /trade/owners/:slug/ — running a pest control company, one topic per page. Every claim is
 * sourced to an agency, statute, court or SEC filing (lib/content/owner-topics.ts).
 * CONVERSION CONTRACT: primary action "Ask owners in the Discord".
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return OWNER_TOPICS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getOwnerTopic(slug);
  if (!t) return {};
  return pageMeta({
    title: fitTitle([`${t.title} for pest control owners`, t.title]),
    description: t.metaDescription,
    path: `/trade/owners/${t.slug}/`,
  });
}

export default async function OwnerTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = getOwnerTopic(slug);
  if (!t) notFound();
  const path = `/trade/owners/${t.slug}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade/' },
    { name: 'Running a company', href: '/trade/owners/' },
    { name: t.title, href: path },
  ];
  const graph = buildGraph({
    path,
    crumbs,
    primary: [
      {
        '@type': 'Article',
        '@id': `${abs(path)}#article`,
        headline: t.title,
        dateModified: t.verifiedOn,
        author: { '@id': ID.organization },
        publisher: { '@id': ID.organization },
        citation: t.sources.map((s) => s.url),
      },
    ],
  });
  const others = OWNER_TOPICS.filter((o) => o.slug !== t.slug);

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trade &middot; Running a company</p>
          <h1 className="display mb-6">{t.title}</h1>

          <QuickAnswer
            question={t.question}
            answer={t.answer}
            fact={t.keyFact}
            verifiedOn={t.verifiedOn}
            reviewer={{ name: EDITOR.name, href: EDITOR.path }}
          />

          <div className="prose-bulletin mt-10">
            {t.sections.map((s) => (
              <section key={s.heading}>
                <h2 className="h2 mb-3 mt-10">{s.heading}</h2>
                {s.body.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </section>
            ))}
          </div>

          <section className="label-panel mt-12">
            <div className="label-bar">
              <span>Checklist</span>
              <span>{t.checklist.length} items</span>
            </div>
            <ol className="space-y-2 py-4 pl-[1.35rem] pr-5 text-[0.9375rem] text-ink2">
              {t.checklist.map((c, i) => (
                <li key={c} className="flex gap-3">
                  <span className="mono shrink-0 text-blood">{String(i + 1).padStart(2, '0')}</span>
                  <span>{c}</span>
                </li>
              ))}
            </ol>
          </section>

          <div className="card mt-12 flex flex-wrap items-center justify-between gap-4 p-5">
            <p className="max-w-[48ch] text-sm text-ink2">
              <span className="font-semibold text-ink">Been through this already?</span> Owners in the{' '}
              {site.discord.name} compare notes on exactly this.
            </p>
            <DiscordButton>Ask owners in the Discord</DiscordButton>
          </div>

          <h2 className="h2 mb-3 mt-12">Sources</h2>
          <ul className="space-y-1.5 text-sm">
            {t.sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} className="link" target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink3">
            A plain-language summary of published rules, not legal, tax or insurance advice.
          </p>
        </article>

        <aside className="mono space-y-6 pt-10 text-ink3">
          <div>
            <p className="eyebrow mb-2">More on running a company</p>
            <ul className="space-y-1">
              {others.map((o) => (
                <li key={o.slug}>
                  <a className="hover:text-ink" href={`/trade/owners/${o.slug}/`}>
                    {o.title}
                  </a>
                </li>
              ))}
              <li>
                <a className="hover:text-ink" href="/trade/start/">
                  Starting a company, by state
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
