import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { seasonBoard, type BoardRow } from '@/lib/server/agent';
import { redisConfigured } from '@/lib/server/redis';
import { dayIn } from '@/lib/agent/missions';

/**
 * /arena/season/ — the monthly seasons. Each calendar month (US Central) is a season: XP
 * earned that month by signed-in Agents. Past months are kept here as the hall of fame.
 * Names follow the leaderboard rule: Discord name only if the member switched it on.
 */

export const revalidate = 3600;

const PATH = '/arena/season/';
const FIRST_SEASON = '2026-10';

export const metadata: Metadata = pageMeta({
  title: 'Arena seasons: monthly XP leaderboards',
  description:
    'Every month is a new LTK Arena season. Earn XP from the Daily Drop, games, missions and ACE exams; the top Agents of each month go in the hall of fame.',
  path: PATH,
});

function monthsSince(first: string, now: string): string[] {
  const out: string[] = [];
  let [y, m] = first.split('-').map(Number) as [number, number];
  const [ny, nm] = now.split('-').map(Number) as [number, number];
  while (y < ny || (y === ny && m <= nm)) {
    out.push(`${y}-${String(m).padStart(2, '0')}`);
    m += 1;
    if (m > 12) {
      m = 1;
      y += 1;
    }
  }
  return out.reverse();
}

const label = (m: string) => new Date(`${m}-15T12:00:00Z`).toLocaleDateString('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });

export default async function SeasonPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Seasons', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, pageType: 'CollectionPage', crumbs });
  const months = monthsSince(FIRST_SEASON, dayIn(new Date()).slice(0, 7));
  const boards: { month: string; rows: BoardRow[] }[] = await Promise.all(
    months.map(async (month) => ({ month, rows: redisConfigured ? await seasonBoard(month).catch(() => []) : [] })),
  );

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Arena &middot; Seasons</p>
        <h1 className="display mb-4 max-w-[18ch]">Seasons</h1>
        <p className="lede mb-6 max-w-[62ch]">
          Every calendar month is a new season. XP you earn that month &mdash; Daily Drops, games, weekly missions, ACE
          exams, field guides &mdash; counts toward the season board. When the month ends, the top ten go in the hall of
          fame below and everyone starts the next season level.
        </p>
        <ul className="mb-10 grid max-w-[62rem] gap-3 text-sm text-ink2 md:grid-cols-3">
          <li className="card p-4">
            <span className="font-semibold text-ink">Sign in to compete.</span> Season boards count signed-in Agents only, so
            every point is checked by the server.
          </li>
          <li className="card p-4">
            <span className="font-semibold text-ink">Your rank keeps.</span> Seasons reset the monthly board, never your
            Agent file, rank or achievements.
          </li>
          <li className="card p-4">
            <span className="font-semibold text-ink">Codenames by default.</span> Your Discord name shows only if you switch
            it on in your Agent file.
          </li>
        </ul>

        <div className="grid gap-6 lg:grid-cols-2">
          {boards.map((b, i) => (
            <section key={b.month} className="label-panel" aria-labelledby={`s-${b.month}`}>
              <div className="label-bar">
                <span id={`s-${b.month}`}>
                  Season {months.length - i} &middot; {label(b.month)}
                </span>
                <span>{i === 0 ? 'In progress' : 'Final'}</span>
              </div>
              {b.rows.length ? (
                <ol className="divide-y divide-rule py-1 pl-[1.35rem] pr-5">
                  {b.rows.map((r, k) => (
                    <li key={`${r.name}-${k}`} className="flex items-center gap-3 py-2">
                      <span className="mono w-6 text-right text-ink3">{k + 1}</span>
                      {r.avatar ? (
                        <img src={r.avatar} alt="" width={24} height={24} className="h-6 w-6 rounded-full" />
                      ) : (
                        <span aria-hidden="true" className="h-6 w-6 rounded-full bg-stock2" />
                      )}
                      <span className="min-w-0 flex-1 truncate text-ink">
                        {k === 0 && i > 0 ? '🏆 ' : ''}
                        {r.name}
                        <span className="mono ml-2 text-ink3">{r.rank}</span>
                      </span>
                      <span className="mono text-ink">{r.value.toLocaleString('en-US')} XP</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="py-4 pl-[1.35rem] pr-5 text-sm text-ink2">
                  {i === 0
                    ? 'Nobody on the board yet this month. Sign in with Discord on your Agent file and take the top spot.'
                    : 'No signed-in Agents that month.'}
                </p>
              )}
            </section>
          ))}
        </div>

        <p className="mt-8 text-sm">
          <a href="/arena/agent/" className="link">
            Your Agent file
          </a>{' '}
          &middot;{' '}
          <a href="/arena/leaderboards/" className="link">
            All leaderboards
          </a>
        </p>
        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Season winners get called out</span> in the Discord at the end of every
            month.
          </p>
          <DiscordButton>Join the Discord</DiscordButton>
        </div>
      </div>
    </>
  );
}
