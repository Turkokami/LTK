'use client';

import { useState } from 'react';
import { ACHIEVEMENTS, RANKS, rankFor } from '@/lib/agent/config';
import { resetAgent } from '@/lib/agent/store';
import { useAgent } from './useAgent';
import { Insignia } from './Insignia';
import { cx } from '@/lib/utils';

/** The Agent file: rank, XP, streak, achievements and stats, all from this device. */
export function AgentProfile() {
  const a = useAgent();
  const { rank, index, next, progress } = rankFor(a.xp);
  const [confirm, setConfirm] = useState(false);
  const unlocked = ACHIEVEMENTS.filter((x) => a.achievements[x.id]).length;
  const s = a.stats;

  return (
    <div>
      <section className="label-panel mb-8" aria-labelledby="rank">
        <div className="label-bar">
          <span>Agent file</span>
          <span>{a.xp.toLocaleString('en-US')} XP</span>
        </div>
        <div className="flex flex-wrap items-center gap-6 py-6 pl-[1.35rem] pr-5">
          <Insignia index={index} size={96} />
          <div className="min-w-[14rem] flex-1">
            <p className="eyebrow mb-1">Rank {index + 1} of {RANKS.length}</p>
            <h2 id="rank" className="display mb-1 !text-4xl">
              {rank.name}
            </h2>
            <p className="mb-3 text-ink2">{rank.blurb}</p>
            <div className="h-2 overflow-hidden rounded-full bg-stock2" aria-hidden="true">
              <div className="h-full bg-field transition-[width] duration-700" style={{ width: `${progress * 100}%` }} />
            </div>
            <p className="mono mt-2 text-ink3">
              {next ? `${(next.minXp - a.xp).toLocaleString('en-US')} XP to ${next.name}` : 'Top rank. Respect.'}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="rounded-md border border-rule px-4 py-3">
              <p className="text-2xl font-extrabold text-ink">🔥 {a.streak.count}</p>
              <p className="mono text-ink3">Day streak</p>
            </div>
            <div className="rounded-md border border-rule px-4 py-3">
              <p className="text-2xl font-extrabold text-ink">
                {unlocked}/{ACHIEVEMENTS.length}
              </p>
              <p className="mono text-ink3">Achievements</p>
            </div>
          </div>
        </div>
      </section>

      <h2 className="h2 mb-4">Achievements</h2>
      <ul className="mb-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((x) => {
          const got = a.achievements[x.id];
          return (
            <li key={x.id} className={cx('rounded-lg border p-4', got ? 'border-field bg-fieldTint' : 'border-rule opacity-70')}>
              <p className="flex items-center gap-2 font-semibold text-ink">
                <span aria-hidden="true">{got ? '★' : '☆'}</span>
                {x.name}
                <span className="sr-only">{got ? ' (unlocked)' : ' (locked)'}</span>
              </p>
              <p className="mt-1 text-sm text-ink2">{x.how}</p>
              {got ? <p className="mono mt-1 text-ink3">{new Date(got).toLocaleDateString('en-US')}</p> : null}
            </li>
          );
        })}
      </ul>

      <h2 className="h2 mb-4">Service record</h2>
      <dl className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ['Daily Drops', s.dailyDone],
          ['Best streak', s.dailyBestStreak],
          ['ACE exams', s.examsDone],
          ['Field guides read', s.fieldGuides],
          ['States opened', s.states],
          ['Glossary known', s.glossaryKnown],
          ['Decks finished', s.decks],
          ['Gear votes', s.votes],
          ['Episodes played', s.videos],
          ['Best Photo Sprint', s.bestSprint],
          ['Best Speed Round', s.bestSpeed],
        ].map(([k, v]) => (
          <div key={k as string} className="rounded-md border border-rule p-3">
            <dt className="mono text-ink3">{k}</dt>
            <dd className="m-0 text-xl font-bold text-ink">{(v as number).toLocaleString('en-US')}</dd>
          </div>
        ))}
      </dl>

      <div className="rounded-md border border-rule p-4 text-sm text-ink3">
        Your Agent file lives in this browser only. Nothing is sent to us, and it won&rsquo;t follow
        you to another phone or computer.{' '}
        {confirm ? (
          <>
            Really wipe it?{' '}
            <button type="button" className="link" onClick={() => { resetAgent(); setConfirm(false); }}>
              Yes, reset
            </button>{' '}
            &middot;{' '}
            <button type="button" className="link" onClick={() => setConfirm(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button type="button" className="link" onClick={() => setConfirm(true)}>
            Reset my Agent file
          </button>
        )}
      </div>
    </div>
  );
}
