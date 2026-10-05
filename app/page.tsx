import type { Metadata } from 'next';
import { OptImg, badgeSrc } from '@/components/ui/OptImg';
import { FeaturedIn } from '@/components/community/Timeline';
import { DropCountdown } from '@/components/agent/DropCountdown';
import { HeroHud } from '@/components/home/HeroHud';
import { GameOn } from '@/components/home/GameOn';
import { discordStats } from '@/lib/server/discord-stats';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { HUBS } from '@/lib/content/hubs';
import { STATES } from '@/lib/content/states';
import { site } from '@/lib/site.config';
import { ASSETS } from '@/lib/brand';
import { RUNNING, statusLabel } from '@/lib/content/events-feed';
import { SponsorStrip } from '@/components/community/Sponsors';
import { DiscordButton, DiscordChannels } from '@/components/community/Discord';
import { DISCIPLINES, FIELD_GROUPS, fieldsInGroup } from '@/lib/content/disciplines';
import { FIELD_GALLERY, GROUP_PHOTOS, fieldPhotos } from '@/lib/content/photos';

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
    title: 'Show up to something',
    body: 'Game nights, the championship, the podcast, specialist sessions and quarterly meetups. There’s usually something on.',
  },
  {
    n: '03',
    title: 'Level up with the crew',
    body: 'Bug ID help, treatment talk, gear reviews from people who run it daily, and a league to see who’s sharpest.',
  },
];

const NUMBER_WORDS: Record<number, string> = { 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty' };

// Hourly: the live Discord counter in the hero.
export const revalidate = 3600;

export default async function HomePage() {
  const stats = await discordStats();
  const graph = buildGraph({
    path: '/',
    pageType: 'WebPage',
    crumbs: [{ name: 'Home', href: '/' }],
  });

  return (
    <>
      <JsonLd graph={graph} />

      {/* Hero: red brand, neon highlights (2026-10 refresh). */}
      <HeroHud stats={stats} />

      {/* Why a pest control crew games: tournaments, the league, and games that build skills. */}
      <GameOn />

      {/* The daily habit: two minutes, one streak. */}
      <section className="rule-b">
        <div className="shell py-6">
          <a href="/arena/daily/" className="group flex flex-wrap items-center justify-between gap-4 rounded-[var(--radius)] border border-[rgba(255,42,61,0.55)] bg-[rgba(225,29,46,0.07)] px-5 py-4 transition-shadow hover:border-[#ff2a3d] hover:shadow-[var(--glow-hot)]">
            <span>
              <span className="eyebrow mb-1 block">Daily Drop &middot; new every day</span>
              <span className="block font-semibold text-ink group-hover:text-blood">
                Name today&rsquo;s pest, answer one ACE question, keep your streak.
              </span>
              <span className="block text-sm text-ink3">Earn XP and rank up from Recruit to Licensed to Kill.</span>
            </span>
            <span className="flex flex-wrap items-center gap-4">
              <span className="text-right">
                <span className="mono block text-[0.625rem] uppercase tracking-[0.14em] text-ink3">Next drop in</span>
                <DropCountdown className="font-sans text-2xl font-extrabold tabular-nums text-neon" />
              </span>
              <span className="btn">Play today&rsquo;s drop</span>
            </span>
          </a>
        </div>
      </section>

      {/* The industry map: Pest control → fields. The spine of the site. */}
      <section className="rule-b">
        <div className="shell py-14">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">Pest control, field by field</p>
              <h2 className="h2 mb-2 max-w-[26ch]">It&rsquo;s not one job. It&rsquo;s {NUMBER_WORDS[DISCIPLINES.length] ?? DISCIPLINES.length}.</h2>
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
              const photo = GROUP_PHOTOS[g.id] ?? (lead ? fieldPhotos(lead.slug)?.hero : undefined);
              return (
              <div key={g.id} className="card overflow-hidden">
                {photo ? (
                  <div className="aspect-[16/8] overflow-hidden border-b border-rule bg-stock2">
                    <OptImg
                      src={photo.src}
                      alt={photo.alt}
                      width={photo.width}
                      height={photo.height}
                      sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px"
                      widths={[384, 640, 828]}
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
                  <OptImg
                    src={p.src}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(max-width: 767px) 50vw, 300px"
                    widths={[256, 384, 640]}
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
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <a href="/academy/pest-id/" className="card group p-5">
              <span className="eyebrow">Pest ID library</span>
              <span className="h3 mt-1 block group-hover:text-blood">Hundreds of member photos, by pest</span>
            </a>
            <a href="/lab/crew-picks/" className="card group p-5">
              <span className="eyebrow">Crew picks</span>
              <span className="h3 mt-1 block group-hover:text-blood">The gear the crew actually runs</span>
            </a>
            <a href="/trade/jobs/#leads" className="card group p-5">
              <span className="eyebrow">Job leads</span>
              <span className="h3 mt-1 block group-hover:text-blood">Roles posted in the Discord</span>
            </a>
          </div>
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
          <h2 className="h2 mb-8">Show up, hang out, get better.</h2>
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
            {[...STATES].sort((a, b) => a.name.localeCompare(b.name)).map((s) => (
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
            All 50 states, each checked against its own agency and dated. Questions about yours? Ask in the{' '}
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
            {...badgeSrc(ASSETS.mark, 200)}
            alt=""
            width={200}
            height={200}
            loading="lazy"
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
              Started by {site.founder.name}, a pest management pro with 10+ years in food safety and audits.{' '}
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

      {/* What's running now (the newest update leads) and the sponsors who back it. */}
      <section className="rule-b">
        <div className="shell py-12">
          {RUNNING.map((ev) => {
            const u = ev.updates?.[0];
            return (
              <a key={ev.id} href="/community/events/" className="group mb-10 grid items-center gap-6 md:grid-cols-[3fr_2fr]">
                {u?.image ? <OptImg src={u.image.src} alt={u.image.alt} width={u.image.width} height={u.image.height} sizes="(max-width: 767px) 100vw, 60vw" widths={[640, 828, 1080]} className="w-full rounded-md ring-1 ring-ruleStrong" /> : null}
                <span>
                  <span className="eyebrow mb-2 block">{statusLabel(ev)} &middot; {ev.when.split(' · ')[0]}</span>
                  <span className="h2 block group-hover:text-blood">{ev.name}</span>
                  {u ? <span className="mt-2 block font-semibold text-ink">{u.title}</span> : null}
                  {u ? <span className="mt-1 block text-ink2">{u.body[0]}</span> : null}
                  <span className="btn btn--ghost mt-4">Events and results</span>
                </span>
              </a>
            );
          })}
          <SponsorStrip label="LTK sponsors" />
          <p className="mt-3 text-sm text-ink3">
            Sponsors back LTK events and never touch editorial.{' '}
            <a href="/partners/" className="link">Meet the sponsors</a>
          </p>
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
