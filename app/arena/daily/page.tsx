import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DailyDrop } from '@/components/agent/DailyDrop';
import { dailyDrop } from '@/lib/agent/daily';
import { XP } from '@/lib/agent/config';
import { site } from '@/lib/site.config';

/**
 * /arena/daily/ — the Daily Drop. Rendered on the server for today's date (US Central) and
 * re-rendered every 10 minutes, so everyone gets the same drop and only today's items ship.
 */

export const revalidate = 600;

const PATH = '/arena/daily/';

export const metadata: Metadata = pageMeta({
  title: 'Daily Drop: one pest photo, one ACE question',
  description:
    'A new pest ID photo and ACE exam question every day. Two minutes, keep your streak alive, then post your result in the LTK Discord. Free, no sign-up.',
  path: PATH,
});

export default function DailyPage() {
  const drop = dailyDrop();
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Daily Drop', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell max-w-[52rem] pb-8">
        <p className="eyebrow mb-3">Arena &middot; Daily Drop #{drop.number}</p>
        <h1 className="display mb-4">Daily Drop</h1>
        <p className="lede mb-8 max-w-[58ch]">
          One photo from a real job, one ACE question. Same drop for every Agent, new one every day
          at midnight Central. Keep the streak going and post your result in the{' '}
          {site.discord.name}.
        </p>

        <DailyDrop drop={drop} discordInvite={site.discord.invite} siteUrl={site.url} />

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="card p-4">
            <p className="eyebrow mb-1">XP</p>
            <p className="text-sm text-ink2">
              {XP.dailyComplete} for finishing, {XP.dailyCorrect} per right answer, plus {XP.dailyStreakPerDay} per streak day
              (up to {XP.dailyStreakCap}).
            </p>
          </div>
          <div className="card p-4">
            <p className="eyebrow mb-1">Streaks</p>
            <p className="text-sm text-ink2">Play on back-to-back days to build a streak. Miss a day and it starts over.</p>
          </div>
          <div className="card p-4">
            <p className="eyebrow mb-1">Want more?</p>
            <p className="text-sm text-ink2">
              <a href="/arena/games/photo-id-sprint/" className="link">
                Photo ID Sprint
              </a>{' '}
              or a{' '}
              <a href="/academy/ace/practice-test/" className="link">
                timed ACE exam
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
