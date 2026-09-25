import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { DiscordButton } from '@/components/community/Discord';
import { FORUM_CATEGORIES } from '@/lib/content/hubs';
import { abs, ID, site } from '@/lib/site.config';

/**
 * Forum category index. The parent node every thread's DiscussionForumPosting references via
 * isPartOf, and the internal-link hub that keeps threads from being orphans.
 *
 * Thread listing is TODO(R-09) — it comes from the forum backend. The category page ships
 * first so the URL and the schema anchor exist before the first thread does.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return FORUM_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = FORUM_CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return pageMeta({
    title: `${cat.name} — forum`.slice(0, 60),
    // "&" is written as &amp; in the meta tag and counts against the 160-char budget.
    description: pickDescription(
      `${cat.name.replace(/&/g, 'and')} discussion between licence-verified pest management professionals.`,
      [
        'Free to read; verified applicators post. Field experience and real answers, never marketing.',
        'Free to read, and only verified applicators can post. Field experience, not marketing copy.',
        'Free to read; only verified applicators post. Field experience, never marketing.',
        'Free to read, verified applicators post. Field experience, not marketing copy.',
        'Free to read, verified applicators post. Field experience, not marketing.',
        'Free to read; verified applicators post. Real field experience.',
      ],
    ),
    path: `/community/forums/${cat.slug}/`,
    ogTemplate: 'thread',
  });
}

export default async function ForumCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = FORUM_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const path = `/community/forums/${cat.slug}/`;
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Community', href: '/community/' },
    { name: cat.name, href: path },
  ];

  const graph = buildGraph({
    path,
    pageType: 'CollectionPage',
    crumbs,
    primary: [
      {
        // The anchor every thread in this category references by @id.
        '@type': 'DiscussionForumPosting',
        '@id': `${abs(path)}#forum`,
        name: cat.name,
        url: abs(path),
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

      <div className="shell pb-16">
        <p className="eyebrow mb-3">Community · Forum</p>
        <h1 className="display mb-6">{cat.name}</h1>

        {/* TODO(R-09): thread listing from the forum backend. Verify the backend renders thread
            bodies server-side BEFORE selecting it — several community SaaS products noindex
            threads by default, which would destroy the highest-leverage asset on the site. */}
        <LabelBlock title="No threads yet" signal="warning">
          This forum opens with the founding cohort. We do not open empty forums publicly — a
          room with nobody in it teaches the first twenty people that nobody is here.
        </LabelBlock>

        <div className="card mt-8 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-ink2">
            <span className="font-semibold text-ink">Got a {cat.name.toLowerCase()} question today?</span>{' '}
            The same conversation is already running in the {site.discord.name}.
          </p>
          <DiscordButton>Ask it on Discord</DiscordButton>
        </div>

        <div className="rule-t mt-10 pt-6">
          <p className="text-sm text-ink2">
            Reading is open to everyone. Posting needs a verified applicator licence.
          </p>
          <a href="/join/" className="btn btn--ghost mt-3">
            Verify my licence
          </a>
        </div>

        <nav aria-label="Other forums" className="rule-t mt-10 pt-6">
          <p className="eyebrow mb-3">Other forums</p>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-1 md:grid-cols-3">
            {FORUM_CATEGORIES.filter((c) => c.slug !== cat.slug).map((c) => (
              <li key={c.slug}>
                <a href={`/community/forums/${c.slug}/`} className="text-sm text-ink2 hover:text-ink">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
