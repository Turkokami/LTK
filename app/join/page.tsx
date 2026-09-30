import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { site } from '@/lib/site.config';
import { DiscordButton } from '@/components/community/Discord';

export const metadata: Metadata = pageMeta({
  title: 'Join LTK: free, and open to the whole trade',
  description:
    'LTK is a free Discord for people in pest control: techs, managers, owners, entomologists, sales reps and office staff. No licence check, just an open invite.',
  path: '/join/',
});

/**
 * Funnel 1 of 3: practitioners. Keep the other two funnels out of this page entirely.
 * Facts are from the owner questionnaire (2026-09-29): open public invite, no verification
 * ("people interested in pest control wanting to join is fine"), roles picked by the mod team
 * or owner. There is no licence verification — do not reintroduce one on this page.
 */
export default function JoinPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Join', href: '/join/' },
  ];
  const graph = buildGraph({ path: '/join/', crumbs });
  const c = site.community;

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell grid gap-10 pb-16 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="eyebrow mb-3">Membership</p>
          <h1 className="display mb-6 max-w-[15ch]">Free, and one click away.</h1>
          <p className="prose-bulletin">
            LTK lives in the {site.discord.name}. Joining is an open invite &mdash; no application,
            no licence check, no fee. It&rsquo;s built for people who work in pest control, and
            anyone seriously interested in getting into the trade is welcome too.
          </p>
          <p className="prose-bulletin">
            {c.difference} Bug ID, treatment talk, gear reviews and job leads happen alongside game
            nights, podcasts and meetups.
          </p>

          <div className="card mt-8 p-6">
            <p className="eyebrow mb-2">
              {c.members} members &middot; {c.membersAsOf}
            </p>
            <p className="h3 mb-2">Pull up a chair.</p>
            <p className="mb-5 text-sm leading-relaxed text-ink2">
              Say hi, post the bug you can&rsquo;t place, or lurk for a week. Read the handbook in
              the Discord first &mdash; it&rsquo;s short.
            </p>
            <DiscordButton>Join the Discord</DiscordButton>
          </div>
        </div>

        <LabelBlock
          title="Who you'll find in there"
          signal="field"
          specs={[
            { label: 'In the room', value: 'Technicians, managers, owners, entomologists, sales reps and office staff' },
            { label: 'Experience', value: 'A real mix, from first-year techs to veterans' },
            { label: 'Busiest', value: 'Weekday working hours' },
            { label: 'Roles', value: 'Members, mods and admins; mods are picked by the mod team or the owner' },
            { label: 'Cost', value: 'Free' },
          ]}
        >
          Competitors share the room &mdash; it&rsquo;s an informal hangout for professionals, and
          it works. See the{' '}
          <a href="/about/code-of-conduct/" className="text-field underline underline-offset-2">
            house rules
          </a>{' '}
          and{' '}
          <a href="/community/events/" className="text-field underline underline-offset-2">
            what&rsquo;s on
          </a>
          .
        </LabelBlock>
      </div>
    </>
  );
}
