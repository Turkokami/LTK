import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';

export const metadata: Metadata = pageMeta({
  title: 'How licence verification works',
  description:
    'We check every posting member’s applicator licence against the issuing state register. What we ask for, what we store, what we publish, and what we never do with it.',
  path: '/about/verification/',
});

/**
 * This page does more work than its traffic suggests. It is read by: prospective members
 * deciding whether to hand over a licence number, entomologists deciding whether to lecture
 * here, sponsors evaluating audience quality, and investors evaluating the data asset.
 *
 * Write it for the member. The other three are convinced by a page that is convincing to the
 * member, and unconvinced by one that reads like it was written for them.
 */
export default function VerificationPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: '/about/' },
    { name: 'Verification', href: '/about/verification/' },
  ];
  const graph = buildGraph({ path: '/about/verification/', pageType: 'AboutPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trust</p>
          <h1 className="display mb-6 max-w-[15ch]">How licence verification works</h1>

          <div className="prose-bulletin">
            <p>
              Anyone can read this site. Only verified licence holders can post. That single rule
              is the difference between this and every open forum and social group in the trade,
              and it is the reason a board-certified entomologist will spend an hour lecturing to
              this audience instead of a general one.
            </p>

            <h2 className="h2 mt-10 mb-3">What we ask for</h2>
            <p>
              Your issuing state, your licence or certification number, and the categories you
              hold. Nothing else. We do not ask for your employer, your route, your revenue or a
              copy of your ID.
            </p>

            <h2 className="h2 mt-10 mb-3">What we do with it</h2>
            <p>
              We check the number against the issuing agency&rsquo;s public register, confirm the
              status is active, and record the state, the categories and the date we checked.
              Most states publish a searchable applicator register; where one is not published,
              we confirm directly with the agency. It usually takes a day or two, and there is no
              charge.
            </p>

            <h2 className="h2 mt-10 mb-3">What appears publicly</h2>
            <p>
              Your state and your categories, as a badge on your posts. <strong>Your licence
              number is never published, never shown to other members, and never included in any
              export, dataset or sponsor report.</strong> It exists to answer one question — are
              you actually licensed — and it does not travel further than that.
            </p>

            <h2 className="h2 mt-10 mb-3">Re-verification</h2>
            <p>
              Licences lapse. We re-check active status on your renewal cycle. If a licence lapses,
              posting rights pause and the badge comes off — your existing posts stay up, because
              deleting them would break links other people have cited. Re-verify and the badge
              returns.
            </p>

            <h2 className="h2 mt-10 mb-3">Why reading stays open</h2>
            <p>
              A thread nobody can find is a thread nobody benefits from. Ten years of hard-won
              practical knowledge in this trade is currently locked inside closed platforms where
              it cannot be searched, cited or even retrieved by the people who wrote it. We are
              not adding another one. Posting is gated; reading never will be.
            </p>
          </div>
        </article>

        <aside className="space-y-6 pt-10">
          <LabelBlock
            title="At a glance"
            signal="field"
            specs={[
              { label: 'You provide', value: 'State, licence number, categories' },
              { label: 'We publish', value: 'State and categories only' },
              { label: 'We never publish', value: 'Your licence number' },
              { label: 'Turnaround', value: 'Usually 1–2 days' },
              { label: 'Cost', value: 'Free' },
              { label: 'Re-checked', value: 'Each renewal cycle' },
            ]}
          />
          <p className="mono text-ink3">
            Related:{' '}
            <a className="text-field underline underline-offset-2" href="/about/code-of-conduct/">
              code of conduct
            </a>
          </p>
        </aside>
      </div>
    </>
  );
}
