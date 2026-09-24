import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';

export const metadata: Metadata = pageMeta({
  title: 'Sponsorship policy',
  description:
    'What sponsors can and cannot buy here, how sponsored content is labelled, what member data is never sold, and which parts of the site money cannot reach.',
  path: '/about/sponsorship-policy/',
});

export default function SponsorshipPolicyPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: '/about/' },
    { name: 'Sponsorship policy', href: '/about/sponsorship-policy/' },
  ];
  const graph = buildGraph({
    path: '/about/sponsorship-policy/',
    pageType: 'AboutPage',
    crumbs,
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trust</p>
          <h1 className="display mb-6 max-w-[13ch]">Sponsorship policy</h1>

          <p className="prose-bulletin">
            This site is funded by sponsorship. That is not a secret and it is not a problem, as
            long as the boundaries are written down and visible to everyone on both sides of them.
            Here they are.
          </p>

          <div className="grid gap-6 md:grid-cols-2 mt-8">
            <LabelBlock
              title="What a sponsor can buy"
              signal="field"
              specs={[
                { label: 'Arena', value: 'League and tournament title rights' },
                { label: 'Academy', value: 'Course and lecture-series underwriting' },
                { label: 'Wire', value: 'Clearly labelled newsletter placement' },
                { label: 'Chapters', value: 'State-level placement and meetup support' },
                { label: 'Trade', value: 'Jobs board and employer brand pages' },
                { label: 'Partners', value: 'A permanent partner page' },
              ]}
            />
            <LabelBlock
              title="What no amount of money buys"
              signal="danger"
              specs={[
                { label: 'Reviews', value: 'Scores, placement, pre-publication sight, removal' },
                { label: 'Comparisons', value: 'Inclusion, order, or criteria' },
                { label: 'Forums', value: 'Moderation outcomes or thread removal' },
                { label: 'Member data', value: 'Names, emails, licence numbers — not for sale' },
                { label: 'Wire coverage', value: 'Editorial news decisions' },
              ]}
            />
          </div>

          <div className="prose-bulletin mt-10">
            <h2 className="h2 mt-10 mb-3">Labelling</h2>
            <p>
              Sponsored content is labelled at the top of the page, in the same label system as
              everything else, naming the sponsor. Not a grey line at the bottom, not the word
              &ldquo;partner&rdquo; doing quiet work. If a reader has to hunt for the disclosure,
              the disclosure has failed.
            </p>

            <h2 className="h2 mt-10 mb-3">Underwriting is not editing</h2>
            <p>
              An underwritten course or lecture carries the underwriter&rsquo;s name and nothing
              else of theirs. They do not select the instructor, review the curriculum, approve
              slides, or see the material before it runs. An entomologist who agrees to teach here
              is teaching, not presenting a sponsor&rsquo;s deck, and we will not put them in a
              position where anyone could think otherwise.
            </p>

            <h2 className="h2 mt-10 mb-3">Member data</h2>
            <p>
              Sponsors receive <strong>aggregate</strong> audience data: how many verified members,
              in which states, holding which categories, at what tenure. They never receive
              individual member records, contact details or licence numbers, and there is no tier
              that unlocks them. Members gave us a licence number to prove they are real, not to
              be sold.
            </p>
            <p>
              Where a member opts in to being contacted — for a job, a field trial, a research
              panel — that opt-in is specific, revocable, and initiated by the member.
            </p>

            <h2 className="h2 mt-10 mb-3">Category exclusivity</h2>
            <p>
              A founding partner may hold category exclusivity. Exclusivity covers sponsorship
              inventory only. It does not extend to editorial coverage, and a competitor&rsquo;s
              product will still be reviewed, compared and, if it is better, said to be better.
            </p>

            <h2 className="h2 mt-10 mb-3">If we get this wrong</h2>
            <p>
              Tell us. Breaches of this policy get corrected publicly, on the page where they
              happened, with a date. A quietly fixed disclosure is worse than the original error.
            </p>
          </div>
        </article>

        <aside className="space-y-6 pt-10">
          <p className="mono text-ink3">
            For sponsors:{' '}
            <a className="text-field underline underline-offset-2" href="/partners/">
              partnership overview
            </a>
            <br />
            <a className="text-field underline underline-offset-2" href="/partners/audience/">
              who our members are
            </a>
          </p>
          <p className="mono text-ink3">
            Related:{' '}
            <a className="text-field underline underline-offset-2" href="/about/review-methodology/">
              review methodology
            </a>
          </p>
        </aside>
      </div>
    </>
  );
}
