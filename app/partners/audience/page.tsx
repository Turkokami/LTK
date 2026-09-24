import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';

/**
 * Partners → Audience.
 *
 * This is the single page a sponsor's marketing director will fact-check, and the one page
 * where a flattering estimate is unrecoverable. If a number here is found to be invented,
 * every other number we have ever published becomes suspect — including the regulatory data
 * the whole site is built on.
 *
 * So the rule on this page is stricter than anywhere else on the site: NO NUMBER RENDERS
 * UNTIL IT COMES FROM AN ANALYTICS PROPERTY OR A VERIFIED MEMBER COUNT. Not an estimate, not a
 * projection, not a "expected at launch". The page ships with the table structure visible and
 * the values held behind REGISTRY R-17, which fails the production build.
 *
 * CONVERSION CONTRACT: primary action "Start a conversation"; snippet shape table; citability
 * 3 and 4 (stated position on sponsorship, first-party audience data once it exists).
 */

export const metadata: Metadata = pageMeta({
  title: 'Who you would be reaching',
  description:
    'Audience composition, verification rate and reach for sponsors, from analytics and verified member records, never estimated. Updated quarterly and dated.',
  path: '/partners/audience/',
});

export default function AudiencePage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Partners', href: '/partners/' },
    { name: 'Audience', href: '/partners/audience/' },
  ];
  const graph = buildGraph({ path: '/partners/audience/', crumbs });

  /**
   * NOT a TODO_REGISTRY sentinel, deliberately.
   *
   * The sentinel exists for values that would be WRONG if they shipped — a guessed CEU hour
   * count, a placeholder price in an Offer node. It fails the production build on purpose.
   *
   * "We have not published this yet" is not wrong. It is true, and on this page it is the most
   * credible thing we can say: a sponsor reading an unpublished-yet row learns exactly what
   * they would learn from an empty page, plus the fact that we refuse to estimate. Hard-failing
   * the whole build over it would block every other page on the site for a row that is already
   * telling the truth.
   *
   * Rule of thumb: sentinel when silence would mislead, honest empty state when it would not.
   * R-17 stays open in REGISTRY.md either way.
   */
  const PENDING = null;
  const rows: { label: string; value: string | null; source: string }[] = [
    { label: 'Verified members', value: PENDING, source: 'Membership database — licence-verified only' },
    { label: 'Monthly readers', value: PENDING, source: 'Analytics property, 28-day rolling' },
    { label: 'Verification rate', value: PENDING, source: 'Membership database' },
    { label: 'Owners and decision-makers', value: PENDING, source: 'Self-reported at registration' },
    { label: 'States represented', value: PENDING, source: 'Licence state on the verified record' },
  ];

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Partners · Audience</p>
          <h1 className="display mb-6 max-w-[18ch]">Who you would be reaching</h1>

          <p className="prose-bulletin mb-8">
            Every figure on this page comes from an analytics property or a licence-verified
            membership record. None of it is estimated, projected or rounded up, and the date it
            was last pulled is printed beside it. If you want the raw export before signing
            anything, ask — we will send it.
          </p>

          <LabelBlock title="These figures are not published yet" signal="warning">
            We have not opened membership, so there is nothing real to report. Rather than show
            you a projection, the table below shows you what we will measure and where each
            number will come from. Every row fills in from a system, on a date, or it stays
            empty.
          </LabelBlock>
          <div className="h-8" />

          {/* SNIPPET SHAPE: table. */}
          <div className="overflow-x-auto">
            <table className="w-full border border-ink bg-paper text-sm">
              <caption className="sr-only">
                Audience composition and reach, with the source of each figure
              </caption>
              <thead>
                <tr className="bg-ink text-stock">
                  <th scope="col" className="mono px-3 py-2 text-left uppercase">Measure</th>
                  <th scope="col" className="mono px-3 py-2 text-left uppercase">Figure</th>
                  <th scope="col" className="mono px-3 py-2 text-left uppercase">Source</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label} className="rule-t">
                    <th scope="row" className="px-3 py-2 text-left font-semibold">{r.label}</th>
                    <td className="mono px-3 py-2">
                      {r.value ?? <span className="text-ink3">Not yet published</span>}
                    </td>
                    <td className="px-3 py-2 text-ink2">{r.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="h2 mb-3 mt-12">What we will not sell you</h2>
          <p className="prose-bulletin">
            We do not sell editorial coverage, Lab placement, review scores, forum posts, or the
            appearance of a recommendation. We will not tell you what our members said in a
            thread, and we will not hand over a member list. This is not a negotiating position —
            it is the reason the audience is worth reaching at all, and the first time we sold
            any of it, it would stop being worth reaching.
          </p>
          <p className="prose-bulletin">
            What you can buy is clearly-labelled sponsorship, a presence at events, job postings,
            and a research partnership where the questions are ours and the data is published
            whichever way it comes out.
          </p>

          <div className="rule-t mt-12 pt-6">
            <a href="/about/contact/" className="btn">Start a conversation</a>
            <a href="/about/sponsorship-policy/" className="btn-ghost ml-3">
              Read the sponsorship policy
            </a>
          </div>
        </article>

        <aside className="space-y-6 pt-10">
          <LabelBlock
            title="How these numbers are produced"
            signal="danger"
            specs={[
              { label: 'Estimates', value: 'Never published' },
              { label: 'Refresh', value: 'Quarterly, dated' },
              { label: 'Raw export', value: 'Available on request' },
            ]}
          >
            A sponsor who catches one invented number on this page is right to disbelieve every
            number on the site. That is why the figures above are held until they come from a
            real source, rather than filled with something plausible.
          </LabelBlock>
        </aside>
      </div>
    </>
  );
}
