import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { site } from '@/lib/site.config';

/**
 * /about/privacy/ — approved by Marcus on 2026-10-04 (REGISTRY R-08), from the draft in
 * docs/privacy-policy-draft.html. Describes what the code actually does; when data handling
 * changes (new storage, new third party), update this page in the same commit.
 * Still to add when they exist: the legal entity name (R-02) and a contact email (R-07).
 */

const PATH = '/about/privacy/';
const EFFECTIVE = 'October 4, 2026';

export const metadata: Metadata = pageMeta({
  title: 'Privacy policy',
  description:
    'What the LTK Community Hub collects and why: browser-only progress, gear votes, leaderboards, Discord sign-in and cookieless analytics. We never sell your data.',
  path: PATH,
});

const ROWS: [string, string, string][] = [
  ['Browsing, playing games, taking practice exams', 'Your Agent file (XP, rank, achievements, streaks, mission progress) and game best scores.', 'Stored only in your browser’s local storage. It is not sent to us unless you sign in.'],
  ['Voting on gear (thumbs up/down)', 'A random ID created by your browser, and your vote.', 'To count one vote per device. The ID is hashed (scrambled) before we store it and is never shown.'],
  ['Posting a score to an Arena leaderboard', 'The display name you type, your score, and the hashed browser ID.', 'To show the leaderboard. Moderators can remove names.'],
  ['Signing in with Discord', 'Your Discord user ID, display name (or LTK server nickname), profile picture link, whether you’re in the LTK Discord server, and your Agent file and Daily Drop results.', 'To keep your progress across devices, check scores, run leaderboards and give you a rank role in the LTK Discord. Stored in our database (Upstash).'],
  ['Every request', 'Your IP address, hashed, kept for about one minute.', 'To stop spam and abuse (rate limiting).'],
  ['Page views', 'Vercel Web Analytics: pages viewed, referrer, rough location and device type.', 'To understand which pages help people. It uses no cookies and doesn’t follow you across other sites.'],
];

export default function PrivacyPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about/' },
    { name: 'Privacy policy', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <article className="max-w-[48rem]">
          <p className="eyebrow mb-3">About &middot; Privacy</p>
          <h1 className="display mb-3">Privacy policy</h1>
          <p className="mono mb-8 text-ink3">Effective {EFFECTIVE}</p>

          <div className="prose-bulletin space-y-4 text-ink2">
            <h2 className="h2 !mt-0">Who we are</h2>
            <p>
              The LTK Community Hub (www.ltkpmp.com) is the website of Licensed to Kill (LTK), a community for people who
              work in pest control, founded by Marcus Scruggs. Questions about this policy: message a moderator in the{' '}
              <a href={site.discord.invite} className="link" target="_blank" rel="noopener noreferrer">
                {site.discord.name}
              </a>{' '}
              or Marcus on{' '}
              <a href={site.social.linkedin} className="link" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              .
            </p>

            <h2 className="h2">The short version</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>You can use the whole site without an account, and most of what you do stays in your own browser.</li>
              <li>If you sign in with Discord, we keep your Discord ID, name, picture and your game progress so it follows you between devices.</li>
              <li>We don’t sell personal information, don’t run advertising trackers, and sponsors only ever see totals.</li>
            </ul>

            <h2 className="h2">What we collect, and why</h2>
          </div>
          <div className="mt-4 overflow-x-auto rounded-[var(--radius)] border border-rule">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <thead className="bg-stock2 text-ink">
                <tr>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">What</th>
                  <th className="px-4 py-3">Why, and where it lives</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule align-top text-ink2">
                {ROWS.map(([when, what, why]) => (
                  <tr key={when}>
                    <td className="px-4 py-3 font-semibold text-ink">{when}</td>
                    <td className="px-4 py-3">{what}</td>
                    <td className="px-4 py-3">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose-bulletin mt-6 space-y-4 text-ink2">
            <p>
              Discord sign-in only asks Discord for your basic profile and your LTK server membership. We never see your email
              address, password, messages or friends list, and we don’t keep your Discord login token.
            </p>

            <h2 className="h2">Leaderboards and your name</h2>
            <p>
              If you sign in, leaderboards show you as a codename (like “Agent 7DC6”) unless you choose to show your Discord
              name and picture. You can switch this off at any time on your{' '}
              <a href="/arena/agent/" className="link">
                Agent file
              </a>
              .
            </p>

            <h2 className="h2">Cookies</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="text-ink">Sign-in session</strong> (<code>ltk_s</code>) — keeps you signed in for up to 30
                days. Only set if you sign in.
              </li>
              <li>
                <strong className="text-ink">Sign-in check</strong> (<code>ltk_oauth</code>) — a 10-minute cookie that protects
                the Discord sign-in step.
              </li>
            </ul>
            <p>
              We don’t use advertising or cross-site tracking cookies. YouTube videos on the site use YouTube’s
              privacy-enhanced mode and only load when you press play.
            </p>

            <h2 className="h2">Who else handles data</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li><strong className="text-ink">Vercel</strong> — hosts the website and provides the analytics.</li>
              <li><strong className="text-ink">Upstash</strong> — stores votes, leaderboards and signed-in Agent files.</li>
              <li><strong className="text-ink">Discord</strong> — handles sign-in when you choose to use it.</li>
              <li><strong className="text-ink">YouTube</strong> — plays embedded videos when you press play.</li>
            </ul>
            <p>
              We don’t sell or rent personal information. Sponsors receive aggregate numbers only (for example, how many
              members the community has), never anything about you. See the{' '}
              <a href="/about/sponsorship-policy/" className="link">
                sponsorship policy
              </a>
              .
            </p>

            <h2 className="h2">Keeping and deleting your data</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Data in your browser stays until you clear it. Your Agent file has a reset button.</li>
              <li>Signing out removes your progress from that browser; your signed-in file stays on your account.</li>
              <li>
                To have your signed-in Agent file, leaderboard entries or votes deleted, ask a moderator in the{' '}
                {site.discord.name}. We’ll remove it within 30 days.
              </li>
            </ul>

            <h2 className="h2">Children</h2>
            <p>
              The site is for adults working in or exploring the pest control trade. It isn’t directed at children under 13,
              and we don’t knowingly collect their information.
            </p>

            <h2 className="h2">Changes</h2>
            <p>If this policy changes, we’ll update the effective date above and note the change in the LTK Discord.</p>
          </div>
        </article>
      </div>
    </>
  );
}
