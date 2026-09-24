import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { site } from '@/lib/site.config';
import { DiscordButton } from '@/components/community/Discord';

export const metadata: Metadata = pageMeta({
  title: 'Join — verified pest management professionals only',
  description:
    'Membership is free for licensed applicators. We check your licence against the state register before you can post. Reading stays open to everyone, always.',
  path: '/join/',
});

/**
 * Funnel 1 of 3: practitioners. Keep the other two funnels out of this page entirely.
 * The verification form itself is REGISTRY R-10 — this page ships the explanation first,
 * because the explanation is what makes people willing to hand over a licence number.
 */
export default function JoinPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Join', href: '/join/' },
  ];
  const graph = buildGraph({ path: '/join/', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell grid gap-10 pb-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="eyebrow mb-3">Membership</p>
          <h1 className="display mb-6 max-w-[15ch]">Free, if you hold a licence.</h1>
          <p className="prose-bulletin">
            Posting here requires a verified applicator licence. You give us your state, licence
            number and categories; we check them against the state register; your posts carry a
            verified badge from then on. It takes us a day or two and it costs you nothing.
          </p>
          <p className="prose-bulletin">
            Reading is open to everyone and always will be. Threads need to be findable to be
            worth writing.
          </p>

          {/* TODO(R-10): verification form. Server action, no client-side licence handling. */}
          <div className="card mt-8 p-6">
            <p className="eyebrow mb-2">While you wait</p>
            <p className="h3 mb-2">Verification opens with the founding cohort.</p>
            <p className="mb-5 text-sm leading-relaxed text-ink2">
              You don&rsquo;t need to wait to join in. Hop into the {site.discord.name} now &mdash;
              founding members there get first crack at verification when it opens.
            </p>
            <DiscordButton>Join the Discord now</DiscordButton>
          </div>
        </div>

        <LabelBlock
          title="What verification gets you"
          signal="field"
          specs={[
            { label: 'Posting rights', value: 'All 13 technical forums' },
            { label: 'Verified badge', value: 'State and category, on every post' },
            { label: 'Arena entry', value: 'Leagues, tournaments, state leaderboards' },
            { label: 'Sessions', value: 'Live entomologist lectures and the recordings' },
            { label: 'Cost', value: 'Free' },
          ]}
        >
          Your licence number is used for verification and is never published. See{' '}
          <a href="/about/verification/" className="text-field underline underline-offset-2">
            how verification works
          </a>
          .
        </LabelBlock>
      </div>
    </>
  );
}
