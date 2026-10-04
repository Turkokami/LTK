import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { discordStats } from '@/lib/server/discord-stats';
import { SPONSORS } from '@/lib/content/sponsors';
import { site } from '@/lib/site.config';
import { TiltCard, XpDemo, Scope } from './LabDemos';
import './lab.css';

/**
 * /style-lab/ — private design samples for the gamer refresh (2026-10-04). Unlinked, noindex,
 * not in the sitemap. Three directions built with real content so the owner can feel them on
 * a phone before we pick one. Delete once a direction is chosen and rolled out.
 */

export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: 'Style lab: three looks for LTK',
  description:
    'Private design samples for the LTK Community Hub refresh: Neon Ops, Arcade Pop and Tactical HUD, each with interactive cards, XP bars and rank-up effects.',
  path: '/style-lab/',
  noindex: true,
});

const GAMES = [
  { tag: 'Daily', name: 'Daily Drop', blurb: 'One pest photo, one ACE question. Keep the streak.', href: '/arena/daily/' },
  { tag: 'Game 3', name: 'Inspection Hunt', blurb: 'Six pest problems hidden on a house. 75 seconds.', href: '/arena/games/inspection-hunt/' },
  { tag: 'Game 4', name: 'Lookalike Showdown', blurb: 'Swarmer or flying ant? Ten seconds a round.', href: '/arena/games/lookalike-showdown/' },
  { tag: 'Game 1', name: 'ACE Speed Round', blurb: 'Sixty seconds of real ACE exam questions.', href: '/arena/games/speed-round/' },
];

const IDEAS: [string, string][] = [
  ['Live “Agents online” counter', 'The real Discord online count, pulsing in the hero. Proof the place is alive.'],
  ['Activity ticker', '“Agent 7DC6 cleared Inspection Hunt — 1,240 pts.” Codenames only, scrolling under the hero.'],
  ['Tilt + glow game cards', 'Cards lean toward the cursor and light up. Tap targets stay big on phones.'],
  ['Rank-up moments', 'Full-width burst, sound (off by default) and confetti when you rank up or finish a mission.'],
  ['Leaderboard podium', 'Top three on a lit 1-2-3 podium with avatars, above the table.'],
  ['Daily Drop countdown', 'A big timer to the next drop on the home page — the reason to come back tomorrow.'],
  ['Achievement shelf', 'Locked achievements as dark silhouettes you can hover to see how to unlock.'],
  ['Sponsor marquee', 'Logos scrolling past like a stadium board, with “Sponsored by” on the event posters.'],
  ['Scope cursor on the Arena', 'A crosshair that follows the cursor over game cards — on brand with the badge.'],
  ['Season pass bar', 'This month’s season as a tiered bar with rewards at each step (roles, badges).'],
];

function Ticker({ names }: { names: string[] }) {
  return (
    <div className="sl-ticker" style={{ marginTop: '3rem', opacity: 0.85, fontSize: '.95rem' }}>
      <div>
        {names.map((n) => (
          <span key={n} style={{ marginRight: '3rem' }}>
            ★ {n}
          </span>
        ))}
      </div>
    </div>
  );
}

export default async function StyleLab() {
  const stats = await discordStats();
  const online = stats.online ?? 60;
  const sponsorNames = SPONSORS.map((s) => `Sponsored by ${s.name}`);
  const feed = [
    `${online} Agents online now`,
    'Agent 7DC6 cleared Inspection Hunt — 1,240 pts',
    'Agent 3F1A hit a 7-day Daily Drop streak',
    `${stats.members.toLocaleString('en-US')} members in the ${site.discord.name}`,
    'Fantasy Football · Week 1 results are in',
    ...sponsorNames,
  ];

  return (
    <div className="sl">
      <link
        rel="stylesheet"
        precedence="default"
        href="https://fonts.googleapis.com/css2?family=Bungee&family=Orbitron:wght@700;900&family=Press+Start+2P&family=Rajdhani:wght@500;700&family=Share+Tech+Mono&display=swap"
      />

      {/* Intro */}
      <section style={{ background: '#121412', color: '#ecebe4' }}>
        <div className="sl-wrap" style={{ paddingBottom: '2.5rem' }}>
          <p className="sl-kicker" style={{ color: '#f05a63' }}>
            Private · style lab
          </p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.4rem)', fontWeight: 900, lineHeight: 1.05, margin: '.8rem 0' }}>Three looks for the gamer refresh</h1>
          <p style={{ maxWidth: '44rem', color: '#b9b8ae', fontSize: '1.1rem' }}>
            Same content, three directions. Hover the cards, hit <strong>Earn XP</strong> to see a rank-up, and move your cursor
            over the scope in Tactical HUD. On a phone, tap. Pick one (or mix pieces) and we roll it across the site.
          </p>
          <p style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', fontWeight: 700 }}>
            <a href="#neon" style={{ color: '#39ff88' }}>1 · Neon Ops</a>
            <a href="#arcade" style={{ color: '#ffd23f' }}>2 · Arcade Pop</a>
            <a href="#hud" style={{ color: '#e11d2e' }}>3 · Tactical HUD</a>
            <a href="#ideas" style={{ color: '#ecebe4' }}>Interactive ideas</a>
          </p>
        </div>
      </section>

      {/* 1 — Neon Ops */}
      <section id="neon" className="sl-neon">
        <div className="sl-wrap">
          <p className="sl-kicker">
            <span className="live-dot" /> &nbsp;{online} Agents online · Neon Ops
          </p>
          <h2>Every field. One crew.</h2>
          <p className="lead">
            Pest control&rsquo;s gaming crew. Daily drops, tournaments and a leaderboard &mdash; plus every field guide and
            state licence you&rsquo;ll ever need.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.6rem' }}>
            <a className="sl-btn" href="/arena/daily/">▶ Play today&rsquo;s drop</a>
            <a className="sl-btn ghost" href={site.discord.invite}>Join the Discord</a>
          </div>
          <div className="sl-cards">
            {GAMES.map((g) => (
              <TiltCard key={g.name}>
                <span className="tag">{g.tag}</span>
                <h3>{g.name}</h3>
                <p style={{ color: '#a9c3d6' }}>{g.blurb}</p>
              </TiltCard>
            ))}
          </div>
          <div className="sl-row">
            <XpDemo theme="neon" />
            <div className="sl-panel">
              <div className="sl-kicker" style={{ marginBottom: '.6rem' }}>Palette</div>
              <p style={{ color: '#a9c3d6' }}>Black base, electric green actions, cyan info, magenta for hype. Glow on hover, a faint grid and scanlines behind.</p>
              <div className="sl-swatches">
                {['#06080d', '#39ff88', '#22d3ee', '#ff2bd6', '#e7f6ff'].map((c) => (
                  <span key={c} style={{ background: c }} title={c} />
                ))}
              </div>
            </div>
          </div>
          <Ticker names={feed} />
        </div>
      </section>

      {/* 2 — Arcade Pop */}
      <section id="arcade" className="sl-arcade">
        <div className="sl-wrap">
          <p className="sl-kicker">Player 1 · press start</p>
          <h2>Level up your route</h2>
          <p className="lead">
            The pest control crew that games. Play the daily drop, climb the board, win sponsor gear. <span className="sticker">{stats.members} players</span>
          </p>
          <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', marginTop: '1.8rem' }}>
            <a className="sl-btn" href="/arena/daily/">Play today&rsquo;s drop</a>
            <a className="sl-btn ghost" href={site.discord.invite}>Join the Discord</a>
          </div>
          <div className="sl-cards">
            {GAMES.map((g) => (
              <TiltCard key={g.name}>
                <span className="tag">{g.tag}</span>
                <h3>{g.name}</h3>
                <p style={{ fontWeight: 600 }}>{g.blurb}</p>
              </TiltCard>
            ))}
          </div>
          <div className="sl-row">
            <XpDemo theme="arcade" />
            <div className="sl-panel">
              <div className="sl-kicker" style={{ marginBottom: '.6rem' }}>Palette</div>
              <p>Deep purple stage, candy-bright blocks, chunky black outlines and offset shadows. Pixel font for labels only so it stays readable.</p>
              <div className="sl-swatches">
                {['#1b0b33', '#ffd23f', '#ff4f9a', '#3a86ff', '#9ef01a'].map((c) => (
                  <span key={c} style={{ background: c }} title={c} />
                ))}
              </div>
            </div>
          </div>
          <Ticker names={feed} />
        </div>
      </section>

      {/* 3 — Tactical HUD */}
      <section id="hud" className="sl-hud">
        <div className="hazard" />
        <div className="sl-wrap">
          <div className="sl-row" style={{ marginTop: 0, alignItems: 'center' }}>
            <div>
              <p className="sl-kicker">{'// mission briefing · tactical HUD'}</p>
              <h2>
                Licensed to <em>kill</em> pests
              </h2>
              <p className="lead">
                {'>'} {stats.members} agents enlisted · {online} on comms now
                <br />
                {'>'} Today&rsquo;s target: name the pest, answer one ACE question
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.6rem' }}>
                <a className="sl-btn" href="/arena/daily/">Accept mission</a>
                <a className="sl-btn ghost" href={site.discord.invite}>Report to Discord</a>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Scope src="/brand/badge-600.jpg" />
            </div>
          </div>
          <div className="sl-cards">
            {GAMES.map((g, i) => (
              <TiltCard key={g.name}>
                {i === 0 ? <span className="stamp">Daily</span> : null}
                <span className="tag">{`[${g.tag}]`}</span>
                <h3>{g.name}</h3>
                <p style={{ color: '#b9b8ae' }}>{g.blurb}</p>
              </TiltCard>
            ))}
          </div>
          <div className="sl-row">
            <XpDemo theme="hud" />
            <div className="sl-panel">
              <div className="sl-kicker" style={{ marginBottom: '.6rem' }}>Palette</div>
              <p style={{ color: '#b9b8ae' }}>Keeps today&rsquo;s night + blood red and the scope badge, adds hazard yellow and toxic green. Closest to the current brand.</p>
              <div className="sl-swatches">
                {['#0b0d0c', '#e11d2e', '#ffcc00', '#7cfc00', '#ecebe4'].map((c) => (
                  <span key={c} style={{ background: c }} title={c} />
                ))}
              </div>
            </div>
          </div>
          <Ticker names={feed} />
        </div>
        <div className="hazard" />
      </section>

      {/* Ideas */}
      <section id="ideas" style={{ background: '#121412', color: '#ecebe4' }}>
        <div className="sl-wrap">
          <p className="sl-kicker" style={{ color: '#f05a63' }}>
            Works with any look
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, margin: '.6rem 0 1.5rem' }}>Interactive pieces we can add</h2>
          <ol style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(18rem, 1fr))', listStyle: 'none', padding: 0 }}>
            {IDEAS.map(([t, d], i) => (
              <li key={t} style={{ border: '1px solid #2a2e2a', borderRadius: 12, padding: '1rem 1.1rem', background: '#171a18' }}>
                <span style={{ color: '#f05a63', fontWeight: 800 }}>{String(i + 1).padStart(2, '0')}</span>
                <strong style={{ display: 'block', margin: '.3rem 0' }}>{t}</strong>
                <span style={{ color: '#b9b8ae' }}>{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
