import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { eventEntities } from '@/lib/schema/entities';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { TOURNAMENTS } from '@/lib/content/arena';
import { site } from '@/lib/site.config';

/**
 * Arena → Tournaments.
 *
 * The championship carries the parent brand's name (site.championship). The owner chose
 * Licensed to Kill as the parent brand on 2026-09-24; the trademark collisions flagged in the
 * audit (an operating NM pest company, the LikeToKnow.it "LTK" brand, the Bond franchise) are
 * still open under REGISTRY R-01.
 *
 * R-18 BLOCKS THE FIRST REAL TOURNAMENT. Skill-based contest rules vary by state and prize
 * promotions can trip lottery statutes where consideration, chance and prize all coincide.
 * Needs legal review before any prize of value is offered. Play-for-fun ladders do not.
 */

export const metadata: Metadata = pageMeta({
  title: 'Tournaments',
  description:
    'Competitive events for pest management professionals — identification speed runs, inspection challenges and the annual championship. Open to verified members.',
  path: '/arena/tournaments/',
});

export default function TournamentsPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Tournaments', href: '/arena/tournaments/' },
  ];
  const graph = buildGraph({
    path: '/arena/tournaments/',
    pageType: 'CollectionPage',
    crumbs,
    primary: TOURNAMENTS.length
      ? eventEntities({ path: '/arena/tournaments/', events: TOURNAMENTS })
      : undefined,
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">Arena · Tournaments</p>
        <h1 className="display mb-6 max-w-[16ch]">Tournaments</h1>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <p className="prose-bulletin">
            Competition is the fastest way to make people practise identification, and
            identification is the skill that separates a technician who solves a problem from one
            who treats a symptom. The events here are built to be genuinely hard and genuinely
            fun, in that order.
          </p>
          <LabelBlock title="The championship" signal="warning" meta="Annual">
            The annual championship carries the crew&rsquo;s name: the{' '}
            <strong>{site.championship.name}</strong>. Bragging rights, a belt-worthy title, and
            a year of being the one everybody tags in the pest ID channel.
          </LabelBlock>
        </div>

        {TOURNAMENTS.length === 0 ? (
          <div className="mt-10">
            {/* R-18 gate. Do not remove until legal review of contest rules is complete. */}
            <LabelBlock title="No tournaments scheduled yet" signal="warning">
              Skill-based contest rules vary by state, and prize promotions need legal review
              before the first one runs. Ladders and practice runs open first; the championship
              follows once the rules are cleared.
            </LabelBlock>
          </div>
        ) : (
          <ul className="mt-10 grid gap-px bg-rule md:grid-cols-2">
            {TOURNAMENTS.map((t) => (
              <li key={t.slug} className="bg-paper p-5">
                <p className="mono mb-1 text-ink3">{t.startDate}</p>
                <h2 className="h3 mb-2">{t.name}</h2>
                <p className="text-sm text-ink2">{t.description}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="rule-t mt-12 pt-6">
          <a href="/join/" className="btn">Verify my licence</a>
        </div>
      </div>
    </>
  );
}
