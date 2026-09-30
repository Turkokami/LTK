import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { DiscordButton } from '@/components/community/Discord';
import { site } from '@/lib/site.config';

export const metadata: Metadata = pageMeta({
  title: 'House rules',
  description:
    'How the LTK Discord actually runs: the written handbook, who moderates, what gets someone removed, and the line on unsafe or off-label advice. Written plainly.',
  path: '/about/code-of-conduct/',
});

/**
 * Summarises how LTK actually operates, from the owner questionnaire (2026-09-29, Section 8).
 * The handbook in the Discord is the rule of record; this page must never contradict it or
 * invent process (named moderators, appeal boards, licence checks) that LTK does not run.
 * Moderators are not named publicly — owner boundary.
 */
export default function CodeOfConductPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trust', href: '/about/' },
    { name: 'House rules', href: '/about/code-of-conduct/' },
  ];
  const graph = buildGraph({ path: '/about/code-of-conduct/', pageType: 'AboutPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell datasheet pb-16">
        <article>
          <p className="eyebrow mb-3">Trust</p>
          <h1 className="display mb-6 max-w-[13ch]">House rules</h1>

          <p className="prose-bulletin">
            LTK is an informal hangout full of professionals &mdash; competitors included. The rules
            are written down in {site.community.rulesLiveIn}, and that handbook is the one that
            counts. This page is the short version.
          </p>

          <LabelBlock
            title="Unsafe or off-label advice"
            signal="danger"
            meta="Called out, removed if needed"
            className="mt-8"
          >
            Advice that could be unsafe or illegal &mdash; off-label use, unlicensed work &mdash; gets
            called out, and removed when it needs to be. The label is the law. Someone acting on bad
            advice can lose their licence or hurt somebody.
          </LabelBlock>

          <div className="prose-bulletin mt-8">
            <h2 className="h2 mt-10 mb-3">Who moderates</h2>
            <p>
              The owner, the admins and the mods &mdash; working pros who put real hours into it on
              top of their day jobs.
            </p>

            <h2 className="h2 mt-10 mb-3">Disagreements</h2>
            <p>
              Technical arguments are welcome &mdash; debate it and talk it through. If it turns
              personal, the people involved get separated, and a reprimand follows if it keeps going.
            </p>

            <h2 className="h2 mt-10 mb-3">Selling, recruiting and self-promotion</h2>
            <p>Industry-related only. Job posts go in the job board channel.</p>

            <h2 className="h2 mt-10 mb-3">What gets someone removed</h2>
            <p>Illicit, illegal, or overtly controversial behaviour. It has happened, rarely.</p>

            <h2 className="h2 mt-10 mb-3">Privacy</h2>
            <p>
              What gets said in the Discord stays there. This site never quotes Discord
              conversations word for word, and never names a member unless they&rsquo;ve chosen to
              be named.
            </p>
          </div>

          <div className="mt-10">
            <DiscordButton>Read the handbook in the Discord</DiscordButton>
          </div>
        </article>

        <aside className="space-y-6 pt-10">
          <LabelBlock
            title="At a glance"
            signal="warning"
            specs={[
              { label: 'Rules of record', value: 'The handbook in the Discord' },
              { label: 'Moderators', value: 'Owner, admins and mods' },
              { label: 'Unsafe advice', value: 'Called out, removed if needed' },
              { label: 'Promotion', value: 'Industry-related only' },
              { label: 'Competitors', value: 'Welcome' },
            ]}
          />
        </aside>
      </div>
    </>
  );
}
