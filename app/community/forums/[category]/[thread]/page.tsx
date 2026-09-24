import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { threadEntities } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { VerifiedBadge } from '@/components/ui/VerifiedBadge';
import { FORUM_CATEGORIES } from '@/lib/content/hubs';

/**
 * REFERENCE TEMPLATE — the compounding engine.
 *
 * Threads are the highest-leverage indexable asset on this property and they produce
 * themselves. The entire strategic thesis rests on this template: the living professional
 * conversation in this trade currently sits in Facebook groups, where it is invisible to search
 * and structurally uncitable by answer engines. Every thread rendered here with clean
 * DiscussionForumPosting markup and verified-practitioner authorship is a citation candidate in
 * a space whose primary competitor cannot be cited at all.
 *
 * HARD REQUIREMENTS:
 *   - Thread bodies render server-side. Read access is fully open so content indexes.
 *     Only POSTING is gated behind licence verification. REGISTRY R-09, R-10.
 *   - Thread URLs are permanent. No slug regeneration, ever. CLAUDE.md 2.7.
 *   - Author credentials come from the verification record, never from self-report.
 *
 * DATA SOURCE: currently a typed fixture so the template can be reviewed and the schema
 * validated. Swap `getThread` for the real backend once R-09 resolves — the component below
 * should not need to change.
 */

interface ThreadPost {
  authorHandle: string;
  authorStateCode: string;
  authorCategory?: string;
  body: string;
  datePublished: string;
}

interface Thread {
  slug: string;
  category: string;
  title: string;
  opening: ThreadPost;
  replies: ThreadPost[];
  likes: number;
}

/** TODO(R-09): replace with the forum backend. Keep the return shape. */
async function getThread(category: string, slug: string): Promise<Thread | null> {
  void category;
  void slug;
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; thread: string }>;
}): Promise<Metadata> {
  const { category, thread } = await params;
  const t = await getThread(category, thread);
  if (!t) return {};
  return pageMeta({
    title: t.title.slice(0, 60),
    description: t.opening.body.slice(0, 155),
    path: `/community/forums/${category}/${thread}/`,
    ogTemplate: 'thread',
  });
}

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ category: string; thread: string }>;
}) {
  const { category, thread: slug } = await params;
  const cat = FORUM_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const t = await getThread(category, slug);
  if (!t) notFound();

  const path = `/community/forums/${category}/${slug}/`;
  const forumPath = `/community/forums/${category}/`;

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Community', href: '/community/' },
    { name: cat.name, href: forumPath },
    { name: t.title, href: path },
  ];

  const graph = buildGraph({
    path,
    crumbs,
    primary: threadEntities({
      path,
      headline: t.title,
      body: t.opening.body,
      datePublished: t.opening.datePublished,
      author: {
        name: t.opening.authorHandle,
        path: `/community/members/${t.opening.authorHandle}/`,
        credential: {
          category: 'Pesticide Applicator Licence',
          issuedBy: `${t.opening.authorStateCode} state pesticide authority`,
        },
      },
      forumPath,
      replies: t.replies.length,
      likes: t.likes,
      comments: t.replies.map((r) => ({
        authorName: r.authorHandle,
        authorPath: `/community/members/${r.authorHandle}/`,
        text: r.body,
        datePublished: r.datePublished,
      })),
    }),
  });

  return (
    <>
      <JsonLd graph={graph} />

      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">Community · {cat.name}</p>
        <h1 className="h2 mb-6 max-w-[28ch]">{t.title}</h1>

        <Post post={t.opening} opening />
        {t.replies.map((r, i) => (
          <Post key={`${r.authorHandle}-${i}`} post={r} />
        ))}

        <div className="rule-t mt-10 pt-6">
          <p className="text-sm text-ink2">
            Posting is open to members with a verified applicator licence. Reading is open to
            everyone.
          </p>
          <a href="/join/" className="btn mt-3">
            Verify my licence
          </a>
        </div>
      </div>
    </>
  );
}

function Post({ post, opening = false }: { post: ThreadPost; opening?: boolean }) {
  return (
    <article className={opening ? 'label-panel mb-4' : 'rule-t py-5'}>
      <header
        className={
          opening
            ? 'label-bar label-bar--field'
            : 'mb-2 flex flex-wrap items-center gap-3'
        }
      >
        <a
          href={`/community/members/${post.authorHandle}/`}
          className={opening ? 'underline underline-offset-2' : 'text-sm font-semibold'}
        >
          {post.authorHandle}
        </a>
        <time className="mono opacity-80" dateTime={post.datePublished}>
          {post.datePublished.slice(0, 10)}
        </time>
      </header>

      <div className={opening ? 'px-4 py-4' : ''}>
        {!opening ? (
          <div className="mb-2">
            <VerifiedBadge stateCode={post.authorStateCode} category={post.authorCategory} />
          </div>
        ) : null}
        <div className="prose-bulletin">{post.body}</div>
      </div>

      {opening ? (
        <div className="rule-t px-4 py-2">
          <VerifiedBadge stateCode={post.authorStateCode} category={post.authorCategory} />
        </div>
      ) : null}
    </article>
  );
}
