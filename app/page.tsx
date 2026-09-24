import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { HUBS } from '@/lib/content/hubs';
import { WAVE_1, WAVE_2 } from '@/lib/content/states';
import { LabelBlock } from '@/components/label/LabelBlock';
import { site } from '@/lib/site.config';

export const metadata: Metadata = pageMeta({
  title: 'Pest pros: forums, state CEU guides, tech reviews',
  description:
    'Licensing and CEU requirements for all 50 states, independent field reviews of the gear you actually use, and a private forum for working pest control pros.',
  path: '/',
});

export default function HomePage() {
  const graph = buildGraph({
    path: '/',
    pageType: 'WebPage',
    crumbs: [{ name: 'Home', href: '/' }],
  });

  return (
    <>
      <JsonLd graph={graph} />

      {/* Hero. The thesis is the label: this is a regulated trade, and we treat it like one. */}
      <section className="rule-b bg-paper">
        <div className="shell grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <div>
            <p className="eyebrow mb-4">For licensed applicators only</p>
            <h1 className="display max-w-[16ch]">
              The community for people who actually do this work.
            </h1>

            {/* Answer-first. CLAUDE.md 2.3 — this paragraph must stand alone out of context. */}
            <p className="prose-bulletin mt-6">
              {site.name} is a professional community for licensed pest management technicians,
              route managers and owner-operators. Members get state-by-state licensing and CEU
              guidance, independent field reviews of equipment and software, live sessions with
              board-certified entomologists, and a competitive league built for people who take
              the craft seriously. Membership is free for verified working professionals.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/join/" className="btn">
                Verify my licence
              </a>
              <a href="/academy/" className="btn btn--ghost">
                Find my state&rsquo;s rules
              </a>
            </div>

            <p className="mono mt-6 text-ink3">
              Connect, compete, level up &mdash; in that order.
            </p>
          </div>

          {/* Proof strip as a label panel. Nulls render honestly until REGISTRY R-17 lands. */}
          <LabelBlock
            title="Membership at a glance"
            signal="field"
            meta="Updated monthly"
            specs={[
              { label: 'Verified members', value: null },
              { label: 'States covered', value: '50 · licensing and CEU' },
              { label: 'Advisory board', value: null },
              { label: 'CEU hours delivered', value: null },
              { label: 'Cost to join', value: 'Free for verified professionals' },
            ]}
          >
            Every posting member&rsquo;s licence is checked against the state register before they
            can post. That is the whole difference between this and a Facebook group.{' '}
            <a href="/about/verification/" className="text-field underline underline-offset-2">
              How verification works
            </a>
          </LabelBlock>
        </div>
      </section>

      {/* The single most useful control on the site: pick your state. */}
      <section className="rule-b">
        <div className="shell py-12">
          <p className="eyebrow mb-2">Start here</p>
          <h2 className="h2 mb-1">Licensing and CEU rules for your state</h2>
          <p className="prose-bulletin mb-6">
            Every state runs its own applicator scheme &mdash; different categories, different
            exams, different renewal cycles, different accepted CEU formats. We publish each one
            separately, verify it against the issuing agency, and date it.
          </p>

          <ul className="grid grid-cols-2 gap-px bg-rule sm:grid-cols-3 lg:grid-cols-5">
            {[...WAVE_1, ...WAVE_2].map((s) => (
              <li key={s.code}>
                <a
                  href={`/academy/ceu/${s.slug}/`}
                  className="flex items-baseline justify-between bg-paper px-3 py-3 hover:bg-fieldTint"
                >
                  <span className="text-sm">{s.name}</span>
                  <span className="mono text-ink3">{s.code}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mono mt-4 text-ink3">
            Remaining states publish as each record is verified. See{' '}
            <a href="/academy/" className="text-field underline underline-offset-2">
              the Academy
            </a>
            .
          </p>
        </div>
      </section>

      {/* Hub grid. Each card states the hub's job, not a slogan. */}
      <section>
        <div className="shell py-12">
          <p className="eyebrow mb-6">Eight places to go</p>
          <ul className="grid gap-px bg-rule md:grid-cols-2">
            {HUBS.map((hub) => (
              <li key={hub.id}>
                <a href={hub.path} className="group block h-full bg-paper p-5 hover:bg-stock2">
                  <p className="eyebrow mb-2">{hub.eyebrow}</p>
                  <h3 className="h3 mb-2 group-hover:text-field">{hub.title}</h3>
                  <p className="text-sm leading-relaxed text-ink2">{hub.blurb}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
