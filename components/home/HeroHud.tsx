import { site } from '@/lib/site.config';
import { DISCIPLINES } from '@/lib/content/disciplines';
import { fieldPhotos } from '@/lib/content/photos';
import { LTK_EPISODES } from '@/lib/content/podcast';
import { EVENTS } from '@/lib/content/events-feed';
import { TiltLink } from '@/components/ui/Tilt';
import { OptImg } from '@/components/ui/OptImg';
import { SponsorRotator } from '@/components/community/SponsorRotator';
import { SPONSORS } from '@/lib/content/sponsors';
import type { DiscordStats } from '@/lib/server/discord-stats';

/**
 * Home hero, red/neon refresh (2026-10). Red carries the brand — the headline accent and the
 * primary button; neon green is the highlight — live status, hover glow, icons. The photo is
 * a real member photo (tech in a respirator), not stock or AI art.
 */

const TILES: { slug: string; label: string; icon: string }[] = [
  { slug: 'general-pest', label: 'General pest', icon: 'M12 4c-1.5 0-2.5 1-2.5 2.2 0 .8.4 1.4 1 1.8-1.6.5-2.6 1.7-2.6 3.1 0 .7.2 1.3.6 1.8-1.4.6-2.3 1.9-2.3 3.4 0 2.2 2.6 3.7 5.8 3.7s5.8-1.5 5.8-3.7c0-1.5-.9-2.8-2.3-3.4.4-.5.6-1.1.6-1.8 0-1.4-1-2.6-2.6-3.1.6-.4 1-1 1-1.8C14.5 5 13.5 4 12 4zM5 9l3 2M19 9l-3 2M4 15h4M20 15h-4M5 21l3-2M19 21l-3-2' },
  { slug: 'termite-wdo', label: 'Termite', icon: 'M12 3c-1.2 0-2 .9-2 2s.8 2 2 2 2-.9 2-2-.8-2-2-2zm0 5c-1.7 0-3 1.3-3 3v1c0 1.7 1.3 3 3 3s3-1.3 3-3v-1c0-1.7-1.3-3-3-3zm0 8c-1.4 0-2.5 1.3-2.5 3s1.1 3 2.5 3 2.5-1.3 2.5-3-1.1-3-2.5-3zM9 10H5M15 10h4M9 13l-4 2M15 13l4 2' },
  { slug: 'wildlife-control', label: 'Wildlife', icon: 'M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM4.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm15 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 12c-2.8 0-5 2.6-5 5 0 1.7 1.2 3 3 3 .8 0 1.4-.3 2-.3s1.2.3 2 .3c1.8 0 3-1.3 3-3 0-2.4-2.2-5-5-5z' },
  { slug: 'exclusion', label: 'Exclusion', icon: 'M3 11l9-7 9 7M5 10v10h14V10M9 20v-6h6v6' },
  { slug: 'insulation', label: 'Insulation', icon: 'M4 20L20 4M4 14L14 4M10 20L20 10M4 8l4-4M16 20l4-4' },
];

const STATS = (members: number, online: number | null) => [
  { top: `${members.toLocaleString('en-US')} pest pros`, sub: 'in the community', icon: 'M16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 2.7-5 6-5s6 2 6 5M14 15.5c.6-.3 1.3-.5 2-.5 3.3 0 6 2 6 5' },
  { top: `${EVENTS.length} tournaments & leagues`, sub: 'backed by the trade', icon: 'M6 9h4M8 7v4M15 10h.01M17 8h.01M7.5 5h9A4.5 4.5 0 0 1 21 9.5v4a3.5 3.5 0 0 1-6.3 2.1L14 15h-4l-.7.6A3.5 3.5 0 0 1 3 13.5v-4A4.5 4.5 0 0 1 7.5 5z' },
  { top: 'Podcast & training', sub: `${LTK_EPISODES.length} episodes`, icon: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3' },
  { top: online ? `${online} online now` : 'Active discussions', sub: online ? 'in the Discord' : 'get answers', icon: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z' },
];

function Icon({ d, className = '' }: { d: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

function DiscordGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor" aria-hidden="true">
      <path d="M20.3 4.4A19.8 19.8 0 0 0 15.4 3l-.6 1.3a18.4 18.4 0 0 0-5.6 0L8.6 3a19.7 19.7 0 0 0-4.9 1.5C.6 9.1-.3 13.6.1 18.1a19.9 19.9 0 0 0 6 3l1.3-2.1a12.9 12.9 0 0 1-2-1l.5-.4a14.2 14.2 0 0 0 12.2 0l.5.4c-.6.4-1.3.7-2 1l1.3 2.1a19.8 19.8 0 0 0 6-3c.5-5.2-.8-9.7-3.6-13.7ZM8 15.4c-1.2 0-2.2-1.1-2.2-2.4S6.8 10.6 8 10.6s2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Zm8 0c-1.2 0-2.2-1.1-2.2-2.4s1-2.4 2.2-2.4 2.2 1.1 2.2 2.4-1 2.4-2.2 2.4Z" />
    </svg>
  );
}

export function HeroHud({ stats }: { stats: DiscordStats }) {
  // Hero art (owner-supplied, 2026-10-04): gamer on one side, pest tech on the other, under the
  // LTK scope badge — the whole community in one picture.
  const tech = { src: '/brand/hero-gamer-tech.webp', width: 1993, height: 789, position: 'center 40%' };
  return (
    <>
      {/* Live status strip */}
      <div className="hud-strip">
        <div className="shell flex items-center justify-between gap-4 py-2">
          <a href={site.discord.invite} className="flex items-center gap-2 text-blood hover:text-ink">
            <span className="live-dot live-dot--red" aria-hidden="true" />
            Live community
            {stats.online ? <span className="text-neon">· {stats.online} online</span> : null}
          </a>
          <span className="hidden text-ink2 md:inline">Pest pros helping pest pros</span>
          <span className="hidden items-center gap-3 text-ink3 sm:flex">
            {stats.members.toLocaleString('en-US')} agents · est. 2025
            <span className="hud-slashes" aria-hidden="true" />
          </span>
        </div>
      </div>

      {/* Rotating sponsor strip, right under the live bar. */}
      <SponsorRotator sponsors={SPONSORS} />

      {/* Hero */}
      <section className="hero-hud hud-grid">
        {tech ? (
          <div className="hero-hud__photo hero-hud__photo--art" aria-hidden="true">
            <OptImg src={tech.src} width={tech.width} height={tech.height} priority quality={62} sizes="(max-width: 899px) 100vw, 62rem" widths={[640, 828, 1080, 1200, 1920]} style={{ objectPosition: tech.position }} />
          </div>
        ) : null}
        <div className="shell relative py-14 lg:py-24">
          <div className="max-w-[40rem]">
            <p className="eyebrow mb-5">Pest pros helping pest pros</p>
            <h1 className="hero-hud__title">
              Every field in <span className="hero-hud__red">pest control.</span> One crew.
            </h1>
            <p className="lede mt-6 max-w-[36rem] text-ink">
              {site.name} is the crew for the whole pest control industry &mdash; techs, owners and specialists who game
              together, talk shop and get better at the job. Jump into game nights and tournaments in our Discord, then use
              the site to learn every field, your state&rsquo;s licensing rules and the ACE exam.
            </p>

            <div className="mt-8 grid max-w-[34rem] gap-3">
              <a href={site.discord.invite} className="cta-hud cta-hud--red" target="_blank" rel="noopener noreferrer">
                <span className="cta-hud__icon">
                  <DiscordGlyph />
                </span>
                <span className="cta-hud__text">
                  <span className="cta-hud__title">Join the Discord &mdash; it&rsquo;s free</span>
                  <span className="cta-hud__sub">Game nights // tournaments // shop talk // pest ID help</span>
                </span>
                <span className="cta-hud__chev" aria-hidden="true">›</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href="/fields/" className="cta-hud cta-hud--dark">
                <span className="cta-hud__icon">
                  <Icon d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" className="h-8 w-8" />
                </span>
                <span className="cta-hud__text">
                  <span className="cta-hud__title">Explore the fields</span>
                  <span className="cta-hud__sub">Discover topics // training // resources</span>
                </span>
                <span className="cta-hud__chev" aria-hidden="true">›</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Field cards: neon frame, photo, and a plain explainer of the job. */}
      <section className="rule-b hud-grid" aria-labelledby="pick-field">
        <div className="shell py-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow mb-2">Pick your field</p>
              <h2 id="pick-field" className="h2">
                What do you want to <span className="text-hot">get good at?</span>
              </h2>
            </div>
            <a href="/fields/" className="link text-sm">
              All {DISCIPLINES.length} fields
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {TILES.map((t) => {
              const d = DISCIPLINES.find((x) => x.slug === t.slug);
              const p = fieldPhotos(t.slug)?.hero;
              if (!d) return null;
              return (
                <TiltLink key={t.slug} href={`/fields/${t.slug}/`} className="field-card">
                  <span className="field-card__photo">
                    {p ? (
                      <OptImg src={p.src} width={p.width} height={p.height} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 240px" widths={[384, 640, 828]} style={p.position ? { objectPosition: p.position } : undefined} />
                    ) : null}
                    <span className="field-card__name">
                      <Icon d={t.icon} className="h-6 w-6 shrink-0" />
                      {t.label}
                    </span>
                  </span>
                  <span className="field-card__body">
                    <span className="block text-sm leading-relaxed text-ink2">{d.summary}</span>
                    <span className="field-card__go">
                      Explore {t.label.toLowerCase()} <span aria-hidden="true">›</span>
                    </span>
                  </span>
                </TiltLink>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stat tiles */}
      <section className="rule-b">
        <div className="shell grid grid-cols-1 gap-3 py-8 min-[440px]:grid-cols-2 lg:grid-cols-4">
          {STATS(stats.members, stats.online).map((s) => (
            <div key={s.top} className="stat-tile">
              <span className="stat-tile__icon">
                <Icon d={s.icon} className="h-7 w-7" />
              </span>
              <span className="min-w-0">
                <span className="block break-words font-extrabold uppercase tracking-wide text-ink">{s.top}</span>
                <span className="mono block text-[0.6875rem] uppercase tracking-[0.12em] text-ink3">{s.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
