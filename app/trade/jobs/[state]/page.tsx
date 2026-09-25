import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, fitDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { jobEntities } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { STATES, getState } from '@/lib/content/states';
import { JOBS, jobsForState } from '@/lib/content/jobs';
import { site } from '@/lib/site.config';

/**
 * Geo layer 4 — jobs by state. The only page type on this site eligible for Google for Jobs,
 * which is a separate surface with its own rules and its own traffic.
 *
 * CONVERSION CONTRACT: primary action "Post a role" (this is a revenue line, not a favour);
 * snippet shape list, backed by a real <ul>; citability 4 (first-party — these postings are
 * ours).
 *
 * THREE RULES THAT ARE NOT NEGOTIABLE, because breaking any of them gets the whole domain
 * removed from Google for Jobs, not just the offending page:
 *
 *   1. An expired posting must return 404 or 410, or be removed from the sitemap the same day.
 *      A stale JobPosting is the single most common cause of a manual action here.
 *   2. validThrough is REQUIRED. A posting with no expiry is treated as never expiring, which
 *      is how rule 1 gets broken by accident.
 *   3. The posting must be visible on the page to anyone, with no login and no email wall.
 *      Gating a posting behind a form while marking it up is cloaking.
 *
 * Empty states render an honest empty state. We never render a "no jobs" page with JobPosting
 * markup attached to nothing.
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
  const n = jobsForState(st.code).length;
  return pageMeta({
    title: `Pest control jobs in ${st.name}`.slice(0, 60),
    description: fitDescription(
      `${n > 0 ? `${n} open pest control ` : 'Pest control '}roles in ${st.name} — technician, ` +
        `service manager, branch and sales.`,
      ['Posted by operators who are hiring.', 'Every posting shows its pay range.'],
    ),
    path: `/trade/jobs/${st.slug}/`,
  });
}

export default async function StateJobsPage({ params }: { params: Promise<{ state: string }> }) {
  const { state: slug } = await params;
  const st = getState(slug);
  if (!st) notFound();

  const path = `/trade/jobs/${st.slug}/`;
  const jobs = jobsForState(st.code);
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade/' },
    { name: 'Jobs', href: '/trade/jobs/' },
    { name: st.name, href: path },
  ];

  const graph = buildGraph({
    path,
    pageType: 'CollectionPage',
    crumbs,
    // Rule: no postings, no JobPosting markup. Never mark up an empty list.
    primary: jobs.length ? jobEntities({ path, jobs }) : undefined,
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trade · Jobs · {st.code}</p>
          <h1 className="display mb-6 max-w-[18ch]">Pest control jobs in {st.name}</h1>

          <p className="prose-bulletin mb-8">
            Roles posted by operators who are hiring. Every posting on this board shows a pay
            range — we do not accept postings that hide compensation, because the whole reason
            technicians distrust job boards is that the pay turns out to be different at the
            interview.
          </p>

          {jobs.length === 0 ? (
            <LabelBlock title={`No open roles in ${st.name} right now`} signal="warning">
              Nothing is posted here today. We do not pad the board with aggregator scrapes to
              look busy — an empty board is more useful than a board full of roles that closed
              three months ago.
              <br />
              <br />
              Hiring or looking? Job leads get shared in the{' '}
              <a href={site.discord.invite} target="_blank" rel="noopener noreferrer" className="link">
                {site.discord.name}
              </a>{' '}
              today, or{' '}
              <a href="/partners/" className="link">
                post a role
              </a>{' '}
              here.
            </LabelBlock>
          ) : (
            /* SNIPPET SHAPE: list. Real <ul>, one <li> per posting. */
            <ul className="grid gap-px bg-rule">
              {jobs.map((j) => (
                <li key={j.slug} className="bg-paper p-5">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="h3">{j.title}</h2>
                    <p className="mono text-field">{j.salaryDisplay}</p>
                  </div>
                  <p className="mono mt-1 text-ink3">
                    {j.employer} · {j.city}, {st.code} · {j.employmentType}
                  </p>
                  <p className="mt-2 text-sm text-ink2">{j.summary}</p>
                  <p className="mono mt-3 text-ink3">Closes {j.validThrough}</p>
                </li>
              ))}
            </ul>
          )}

          <div className="rule-t mt-10 pt-6">
            <a href="/partners/" className="btn">
              Post a role
            </a>
            <a href="/join/" className="btn-ghost ml-3">
              Verify my licence
            </a>
          </div>
        </article>

        <aside className="mono space-y-6 pt-10 text-ink3">
          <div>
            <p className="eyebrow mb-2">Also for {st.code}</p>
            <ul className="space-y-1">
              <li><a className="hover:text-ink" href={`/academy/licensing/${st.slug}/`}>Licence requirements</a></li>
              <li><a className="hover:text-ink" href={`/academy/ceu/${st.slug}/`}>CEU requirements</a></li>
              <li><a className="hover:text-ink" href={`/community/chapters/${st.slug}/`}>{st.name} chapter</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-2">Board policy</p>
            <ul className="space-y-1 normal-case">
              <li>Pay range required on every posting</li>
              <li>Expired roles removed, not archived</li>
              <li>No aggregator scrapes</li>
            </ul>
          </div>
        </aside>
      </div>
    </>
  );
}
