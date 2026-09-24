import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { HUBS } from '@/lib/content/hubs';
import { WAVE_1, WAVE_2 } from '@/lib/content/states';
import { site } from '@/lib/site.config';
import { ASSETS } from '@/lib/brand';
import { DiscordButton, DiscordChannels } from '@/components/community/Discord';
import { FIELD_GROUPS, fieldsInGroup } from '@/lib/content/disciplines';
import { FIELD_GALLERY, fieldPhotos } from '@/lib/content/photos';

export const metadata: Metadata = pageMeta({
  title: 'Every field in pest control, plus the LTK Discord',
  description:
    `Explore every field in pest control, from termite to wildlife to exclusion, with state licensing guides, then join the ${site.discord.name} for help and training.`,
  path: '/',
});

const STEPS = [
  {
    n: '01',
    title: 'Pull up a chair on Discord',
    body: 'Say hi, post the bug you can’t place, or just lurk for a week. Nobody checks your licence to join the conversation.',
  },
  {
    n: '02',
    title: 'Get your licence verified',
    body: 'Verified members get a badge on every post, Arena entry, and a seat in the live training sessions.',
  },
  {
    n: '03',
    title: 'Level up with the crew',
    body: 'Study groups for the exam, CEU nights, gear reviews from people who run it daily, and a league to see who’s sharpest.',
  },
];

export default function HomePage() {
  const graph = buildGraph({
    path: '/',
    pageType: 'WebPage',
    crumbs: [{ name: 'Home', href: '/' }],
  });

  return (
    <>
      <JsonLd graph={graph} />

      {/* Hero. The badge leads — this is a crew with an identity, not a directory. */}
      <section className="rule-b">
        <div className="shell grid items-center gap-12 py-14 lg:grid-cols-[1.25fr_1fr] lg:py-20">
          <div>
            <p className="eyebrow mb-5">Pest pros helping pest pros</p>
            <h1 className="display max-w-[15ch]">
              Every field in pest control. One crew.
            </h1>

            {/* Answer-first. CLAUDE.md 2.3 — this paragraph must stand alone out of context. */}
            <p className="lede mt-6">
              {site.name} is a community for the whole pest control industry &mdash; general
              pest, termite, wildlife, exclusion, insulation and every field in between. Learn what
              each job really involves and what your state requires, then join the conversation
              in our Discord: shop talk, pest ID help, the podcast and group training.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <DiscordButton size="lg">Join the Discord &mdash; it&rsquo;s free</DiscordButton>
              <a href="/fields/" className="btn btn--ghost btn--lg">
                Explore the fields
              </a>
            </div>

            <p className="mt-6 text-sm text-ink3">
              Already hanging out with us?{' '}
              <a href="/join/" className="link">
                Get your licence verified
              </a>{' '}
              to unlock posting and the Arena.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[22rem]">
            {/* Soft red glow behind the badge, like the dot in the scope. */}
            <div
              aria-hidden="true"
              className="absolute inset-6 rounded-full bg-danger opacity-25 blur-3xl"
            />
            <img
              src={ASSETS.mark}
              alt={`${site.name} badge: a rat framed in a rifle scope above a ribbon reading Licensed to Kill`}
              width={396}
              height={396}
              className="relative w-full rounded-full ring-1 ring-ruleStrong"
            />
          </div>
        </div>
      </section>

      {/* The industry map: Pest control → fields. The spine of the site. */}
      <section className="rule-b">
        <div className="shell py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Pest control, field by field</p>
              <h2 className="h2 mb-2 max-w-[26ch]">It&rsquo;s not one job. It&rsquo;s fourteen.</h2>
              <p className="max-w-[60ch] text-ink2">
                Each field has its own regulator, its own skills and its own route in. Pick one to
                see what the work is really like and what it takes to get licensed.
              </p>
            </div>
            <a href="/fields/" className="btn btn--ghost">
              See every field
            </a>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FIELD_GROUPS.map((g) => {
              const lead = fieldsInGroup(g.id)[0];
              const photo = lead ? fieldPhotos(lead.slug)?.hero : undefined;
              return (
              <div key={g.id} className="card overflow-hidden">
                {photo ? (
                  <div className="aspect-[16/8] overflow-hidden border-b border-rule bg-stock2">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover opacity-90"
                      style={photo.position ? { objectPosition: photo.position } : undefined}
                    />
                  </div>
                ) : null}
                <div className="p-5">
                <h3 className="eyebrow mb-3">{g.name}</h3>
                <ul className="space-y-1.5">
                  {fieldsInGroup(g.id).map((d) => (
                    <li key={d.slug}>
                      <a
                        href={`/fields/${d.slug}/`}
                        className="group flex items-center justify-between gap-3 font-semibold hover:text-blood"
                      >
                        <span>{d.name}</span>
                        <span aria-hidden="true" className="text-blood opacity-60 group-hover:opacity-100">
                          &rarr;
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-ink3">
            Some photos are placeholders from Wikimedia Commons &mdash;{' '}
            <a href="/fields/#photo-credits" className="underline-offset-2 hover:text-ink hover:underline">
              photo credits
            </a>
            .
          </p>
        </div>
      </section>

      {/* From the field — real jobs from the crew. */}
      <section className="rule-b" aria-labelledby="from-the-field">
        <div className="shell py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">From the field</p>
              <h2 id="from-the-field" className="h2 mb-2 max-w-[26ch]">
                This is what the work actually looks like.
              </h2>
              <p className="max-w-[60ch] text-ink2">
                Crawlspaces, wasp nests, swarm calls and a trailer full of traps &mdash; shots
                from real jobs by the crew.
              </p>
            </div>
            <DiscordButton variant="ghost">Share your shots on Discord</DiscordButton>
          </div>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {FIELD_GALLERY.map((p) => (
              <li key={p.src}>
                <figure className="group relative m-0 h-full overflow-hidden rounded-[var(--radius)] border border-rule bg-stock2">
                  <img
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] h-full w-full object-cover transition duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    style={p.position ? { objectPosition: p.position } : undefined}
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2.5 pt-8 text-sm font-semibold text-ink">
                    {p.caption}
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What the Discord is actually for. The community's centre of gravity. */}
      <section className="rule-b">
        <div className="shell py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Inside the {site.discord.name}</p>
              <h2 className="h2 max-w-[24ch]">Where the crew hangs out between stops.</h2>
            </div>
            <DiscordButton variant="ghost">Take a look inside</DiscordButton>
          </div>
          <DiscordChannels />
        </div>
      </section>

      {/* How it works — three plain steps instead of a feature matrix. */}
      <section className="rule-b">
        <div className="shell py-14">
          <p className="eyebrow mb-2">How it works</p>
          <h2 className="h2 mb-8">Show up, get verified, get better.</h2>
          <ol className="grid gap-3 md:grid-cols-3">
            {STEPS.map((s) => (
              <li key={s.n} className="card p-6">
                <p className="mono mb-3 text-blood">{s.n}</p>
                <p className="h3 mb-2">{s.title}</p>
                <p className="text-sm leading-relaxed text-ink2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The single most useful control on the reference side: pick your state. */}
      <section className="rule-b">
        <div className="shell py-14">
          <p className="eyebrow mb-2">Start here</p>
          <h2 className="h2 mb-2">What does your state actually require?</h2>
          <p className="mb-6 max-w-[62ch] text-ink2">
            Every state runs its own licensing &mdash; different categories, exams, renewal cycles
            and CEU rules. We check each one against the state agency and date it, so you
            don&rsquo;t have to dig through a PDF from 2014.
          </p>

          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {[...WAVE_1, ...WAVE_2].map((s) => (
              <li key={s.code}>
                <a
                  href={`/academy/ceu/${s.slug}/`}
                  className="card flex items-baseline justify-between px-4 py-3"
                >
                  <span className="text-sm font-medium">{s.name}</span>
                  <span className="mono text-ink3">{s.code}</span>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-4 text-sm text-ink3">
            More states go up as each one is verified. Don&rsquo;t see yours? Ask in the{' '}
            <a href={site.discord.invite} target="_blank" rel="noopener noreferrer" className="link">
              Discord
            </a>{' '}
            &mdash; someone there has probably renewed in it.
          </p>
        </div>
      </section>

      {/* Who we are — in the owner's own words (site.mission). */}
      <section className="rule-b">
        <div className="shell grid items-center gap-10 py-14 lg:grid-cols-[auto_1fr]">
          <img
            src={ASSETS.mark}
            alt=""
            width={200}
            height={200}
            className="mx-auto hidden rounded-full ring-1 ring-ruleStrong lg:block"
          />
          <div>
            <p className="eyebrow mb-2">Who we are</p>
            <h2 className="h2 mb-4 max-w-[28ch]">More than just another industry forum.</h2>
            {site.mission.map((para) => (
              <p key={para.slice(0, 24)} className="mb-4 max-w-[68ch] text-ink2">
                {para}
              </p>
            ))}
            <p className="mb-4 max-w-[68ch] text-sm text-ink3">
              Started by {site.founder.name}, a pest technician.{' '}
              <a href="/community/podcast/" className="link">
                Watch him tell the story
              </a>
              .
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <DiscordButton>Join the Discord</DiscordButton>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--ghost"
              >
                Follow LTK on LinkedIn
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hub grid. Each card says what you get, in plain words. */}
      <section>
        <div className="shell py-14">
          <p className="eyebrow mb-2">Around the site</p>
          <h2 className="h2 mb-8">Everything else we&rsquo;re building.</h2>
          <ul className="grid gap-3 md:grid-cols-2">
            {HUBS.map((hub) => (
              <li key={hub.id}>
                <a href={hub.path} className="card group block h-full p-6">
                  <p className="eyebrow mb-2">{hub.eyebrow}</p>
                  <h3 className="h3 mb-2 group-hover:text-blood">{hub.title}</h3>
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
