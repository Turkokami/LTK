import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { sponsorTierEntities } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { TIERS } from '@/lib/content/partners';

/**
 * Partners → Sponsorship tiers.
 *
 * Offer nodes ship WITHOUT price until R-16 resolves. sponsorTierEntities() omits the price
 * field entirely rather than emitting a placeholder, because a wrong price in structured data
 * is worse than no price: it gets cached, quoted back at you, and shown in results.
 *
 * Pricing anchor (R-16): a company sponsoring an NPMA event without exhibiting commits ≥$7,500
 * for one-time attendee-list access at a ~3,500-attendee show. We are selling 365 days and a
 * behavioural relationship, not four days and a list. Price against the exhibit-plus-sponsorship
 * line, never against a banner ad.
 */

export const metadata: Metadata = pageMeta({
  title: 'Sponsorship',
  description:
    'How sponsorship works here — what it buys, what it never buys, and how each placement is labelled. Editorial, Lab scores and forum content are not for sale.',
  path: '/partners/sponsorship/',
});

export default function SponsorshipPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Partners', href: '/partners/' },
    { name: 'Sponsorship', href: '/partners/sponsorship/' },
  ];
  const graph = buildGraph({
    path: '/partners/sponsorship/',
    crumbs,
    primary: sponsorTierEntities(
      TIERS.map((t) => ({ path: '/partners/sponsorship/', name: t.name, description: t.summary })),
    ),
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">Partners · Sponsorship</p>
        <h1 className="display mb-6 max-w-[16ch]">Sponsorship</h1>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <p className="prose-bulletin">
            Sponsorship here is visible, labelled and bounded. You get a clearly-marked presence
            in front of an audience of licence-verified professionals. You do not get editorial
            coverage, Lab placement, a review score, a forum presence, or anything shaped to look
            like a recommendation from us.
          </p>
          <LabelBlock title="What sponsorship never buys" signal="danger">
            Editorial coverage · Lab placement or scores · Forum posts or member data · Search
            ranking within the site · Removal of a negative finding.{' '}
            <a href="/about/sponsorship-policy/" className="text-field underline underline-offset-2">
              Full policy
            </a>
          </LabelBlock>
        </div>

        <h2 className="h2 mb-4 mt-12">Tiers</h2>
        <ul className="grid gap-px bg-rule md:grid-cols-3">
          {TIERS.map((t) => (
            <li key={t.name} className="bg-paper p-5">
              <p className="eyebrow mb-2">{t.name}</p>
              <p className="mb-3 text-sm text-ink2">{t.summary}</p>
              <ul className="space-y-1 text-sm">
                {t.includes.map((inc) => (
                  <li key={inc} className="rule-t pt-1">{inc}</li>
                ))}
              </ul>
              {/* R-16: price intentionally absent from page AND schema. */}
              <p className="mono rule-t mt-3 pt-2 text-ink3">Pricing on request</p>
            </li>
          ))}
        </ul>

        <div className="rule-t mt-12 pt-6">
          <a href="/about/contact/" className="btn">Start a conversation</a>
          <a href="/partners/audience/" className="btn-ghost ml-3">See the audience</a>
        </div>
      </div>
    </>
  );
}
