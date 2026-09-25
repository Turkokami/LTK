import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { StateGrid } from '@/components/site/StateGrid';
import { DiscordButton } from '@/components/community/Discord';
import { PayHighlight } from '@/components/ui/PayHighlight';
import { STATES } from '@/lib/content/states';
import { JOBS } from '@/lib/content/jobs';
import { site } from '@/lib/site.config';
import { JOB_LEADS } from '@/lib/content/community';

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

/**
 * /trade/jobs/ — index for geo layer 4. No JobPosting markup here: postings live on the state
 * pages, and there are none yet (lib/content/jobs.ts). The industry pay benchmark is sourced
 * BLS data, shown so the page is useful before the board fills.
 */

const PATH = '/trade/jobs/';

export const metadata: Metadata = pageMeta({
  title: 'Pest control jobs by state, with real pay ranges',
  description: `Pest control jobs by state, every posting with a pay range, plus national BLS pay data for the trade. Job leads are also shared in the ${site.discord.name}.`,
  path: PATH,
});

export default function JobsIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade/' },
    { name: 'Jobs', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, pageType: 'CollectionPage', crumbs });
  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Trade &middot; Jobs</p>
        <h1 className="display mb-4 max-w-[18ch]">Pest control jobs, with the pay up front</h1>
        <p className="lede mb-8">
          Every posting on this board shows a pay range &mdash; no &ldquo;competitive
          salary&rdquo;.{' '}
          {JOBS.length
            ? 'Pick your state below.'
            : `The board opens with its first operators; until it fills, job leads get shared in the ${site.discord.name}.`}
        </p>
        <div className="mb-12 flex flex-wrap gap-2">
          <DiscordButton size="lg">See job leads on Discord</DiscordButton>
          <a href="/partners/" className="btn btn--ghost btn--lg">
            Post a role
          </a>
        </div>

        {JOB_LEADS.length ? (
          <section aria-labelledby="leads" className="mb-14">
            <h2 id="leads" className="h2 mb-1">
              Job leads from the Discord
            </h2>
            <p className="mb-5 max-w-[62ch] text-sm text-ink3">
              Roles employers and members posted in #job-board, as posted. These are leads, not
              verified listings &mdash; confirm the role is still open with the poster before you apply.
            </p>
            <ul className="grid gap-3 md:grid-cols-2">
              {JOB_LEADS.map((j) => (
                <li key={j.posted + j.role} className="card flex h-full flex-col p-5">
                  <p className="mono mb-1 text-ink3">Posted {dateFmt.format(new Date(j.posted))}</p>
                  <p className="h3">{j.role}</p>
                  <p className="mt-1 text-sm font-semibold text-ink2">{j.where}</p>
                  <p className="mb-4 mt-2 text-sm leading-relaxed text-ink2">{j.details}</p>
                  <p className="mt-auto text-sm">
                    {j.link ? (
                      <a href={j.link} target="_blank" rel="noopener noreferrer nofollow" className="link">
                        {j.contact}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="text-ink">{j.contact}</span>
                    )}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-ink3">
              More pay talk:{' '}
              <a href="/trade/pay-and-pricing/" className="link">
                what members report about pay and pricing
              </a>
              .
            </p>
          </section>
        ) : null}

        <PayHighlight fieldName="pest control" industry className="mb-14" />

        <h2 className="h2 mb-5">Jobs by state</h2>
        <StateGrid states={STATES} hrefFor={(s) => `${PATH}${s.slug}/`} verifiedLabel="Rules verified" />
      </div>
    </>
  );
}
