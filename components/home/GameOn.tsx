import { EVENTS, RUNNING } from '@/lib/content/events-feed';
import { OptImg } from '@/components/ui/OptImg';
import { SponsorStrip } from '@/components/community/Sponsors';
import { TiltLink } from '@/components/ui/Tilt';
import { site } from '@/lib/site.config';
import { PromoVideo } from './PromoVideo';

/**
 * Home: why a pest control community games. LTK started as a video game group (site.community
 * .origin); game nights, tournaments and the fantasy league are how techs from different
 * companies and states get to know each other — and that's what turns into ID help, mentoring
 * and better techs. Facts only from the events feed and the Arena; prizes are never promoted (R-18).
 */

const ARENA = [
  { name: 'Daily Drop', skill: 'Pest ID + one ACE question a day', href: '/arena/daily/' },
  { name: 'Inspection Hunt', skill: 'Spot conducive conditions on a house', href: '/arena/games/inspection-hunt/' },
  { name: 'Lookalike Showdown', skill: 'Tell confused pests apart', href: '/arena/games/lookalike-showdown/' },
  { name: 'ACE Speed Round', skill: 'Real ACE exam questions, 60 seconds', href: '/arena/games/speed-round/' },
];

const WHY = [
  {
    title: 'Game nights and tournaments',
    body: 'Halo 3, Apex Legends and more, backed by sponsors from the trade. Different companies, different states, same lobby.',
  },
  {
    title: 'A league that runs all season',
    body: 'The LTK fantasy football league keeps the crew talking every week — and talking shop in between.',
  },
  {
    title: 'Friendships that build skills',
    body: 'The tech you squadded up with on Friday is the one who IDs your bug on Monday. Members have moved into management, gone commercial and started their own companies with the crew behind them.',
  },
];

export function GameOn() {
  const running = RUNNING[0];
  const posters = EVENTS.flatMap((e) => {
    const img = e.image ?? e.updates?.[0]?.image;
    return img ? [{ e, img }] : [];
  }).slice(0, 2);

  return (
    <section className="rule-b hud-grid" aria-labelledby="game-on">
      <div className="shell py-16">
        <div className="grid items-start gap-10 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="eyebrow mb-3">Why a pest control crew games</p>
            <h2 id="game-on" className="display mb-5 max-w-[16ch]">
              Gamers first. <span className="text-hot">Pest pros</span> always.
            </h2>
            <p className="lede mb-8 max-w-[56ch] text-ink">
              LTK started in 2025 as a video game group for techs on different routes. It still runs on game nights &mdash;
              because the crew you play with is the crew you call when a job goes sideways. Gaming gets people talking; the
              talking makes everyone better at the job.
            </p>
            <ul className="mb-8 space-y-4">
              {WHY.map((w) => (
                <li key={w.title} className="flex gap-4">
                  <span aria-hidden="true" className="mt-1.5 h-3 w-3 flex-none rotate-45 border-2 border-[#ff2a3d] shadow-[0_0_10px_rgba(225,29,46,0.7)]" />
                  <span>
                    <span className="block font-bold text-ink">{w.title}</span>
                    <span className="block text-ink2">{w.body}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-3">
              <a href="/arena/tournaments/" className="btn btn--lg">
                See the tournaments
              </a>
              <a href={site.discord.invite} className="btn btn--ghost btn--lg" target="_blank" rel="noopener noreferrer">
                Join game night<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </div>

          <div>
            <div className="mb-5">
              <PromoVideo />
            </div>
            {running ? (
              <a href={`/arena/tournaments/${running.id}/`} className="mb-4 flex items-center gap-3 rounded-[var(--radius)] border border-[rgba(255,42,61,0.5)] bg-[rgba(225,29,46,0.07)] px-4 py-3 hover:shadow-[var(--glow-hot)]">
                <span className="live-dot" aria-hidden="true" />
                <span className="text-sm">
                  <span className="font-bold text-ink">Running now: {running.name}</span>
                  {running.updates?.[0] ? <span className="text-ink2"> &middot; {running.updates[0].title}</span> : null}
                </span>
              </a>
            ) : null}
            <div className="grid grid-cols-[1.6fr_1fr] items-start gap-3">
              {posters.map(({ e, img }) => (
                <TiltLink key={e.id} href={`/arena/tournaments/${e.id}/`} className="block overflow-hidden rounded-md border border-[rgba(225,29,46,0.55)] hover:border-[#ff2a3d] hover:shadow-[var(--glow-hot)]">
                  <OptImg src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 1023px) 60vw, 400px" widths={[384, 640, 828]} className="w-full" />
                </TiltLink>
              ))}
            </div>
            <SponsorStrip label="Tournaments backed by" className="mt-5" />
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow mb-1">The Arena</p>
              <h3 className="h2">Games that build real skills</h3>
            </div>
            <a href="/arena/" className="link text-sm">
              Every game, your rank and the leaderboards
            </a>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {ARENA.map((g) => (
              <li key={g.name}>
                <TiltLink href={g.href} className="card block h-full p-5">
                  <span className="mono block text-[0.6875rem] uppercase tracking-[0.14em] text-blood">Play &rsaquo;</span>
                  <span className="mt-1 block text-lg font-extrabold text-ink">{g.name}</span>
                  <span className="mt-1 block text-sm text-ink2">{g.skill}</span>
                </TiltLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
