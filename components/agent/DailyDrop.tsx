'use client';

import { useEffect, useState } from 'react';
import { DAILY_TZ } from '@/lib/agent/config';
import { recordDaily } from '@/lib/agent/store';
import type { DailyDrop as Drop } from '@/lib/agent/daily';
import { useAgent } from './useAgent';
import { AgentBoards } from './AgentBoards';
import { Missions } from './Missions';
import { cx } from '@/lib/utils';

/**
 * Daily Drop: a member photo to identify, then one ACE question. One go per day; the result,
 * streak and a shareable score line stay on this device. Answers show their explanation right
 * away — the point is learning, the streak is the hook.
 */

function msToNextDrop(): number {
  // Current wall-clock time in the drop's time zone, then distance to its next midnight.
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: DAILY_TZ, hour: 'numeric', minute: 'numeric', second: 'numeric', hourCycle: 'h23' }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const elapsed = (get('hour') * 3600 + get('minute') * 60 + get('second')) * 1000;
  return 86_400_000 - elapsed;
}

const fmtCountdown = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 3600)}h ${String(Math.floor((s % 3600) / 60)).padStart(2, '0')}m`;
};

export function DailyDrop({ drop, discordInvite, siteUrl }: { drop: Drop; discordInvite: string; siteUrl: string }) {
  const agent = useAgent();
  const done = agent.daily[drop.day];
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [pickPhoto, setPickPhoto] = useState<string | null>(null);
  const [pickQ, setPickQ] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
    const tick = () => setCountdown(fmtCountdown(msToNextDrop()));
    tick();
    const t = window.setInterval(tick, 30_000);
    return () => window.clearInterval(t);
  }, []);

  const photoRight = pickPhoto === drop.photo.group;
  const qRight = pickQ === drop.question.correctOptionId;

  function finish() {
    recordDaily(
      { day: drop.day, yesterday: drop.yesterday, answers: [photoRight, qRight], localHour: new Date().getHours() },
      { photo: pickPhoto ?? '', q: pickQ ?? '' },
    );
    setStep(2);
  }

  // The page's own origin, so the link works on preview and production deploys alike.
  const origin = typeof window === 'undefined' ? siteUrl : window.location.origin;
  const result = done?.answers ?? [photoRight, qRight];
  const streakNow = agent.streak.last === drop.day ? agent.streak.count : 0;
  const shareText = `LTK Daily Drop #${drop.number} ${result.map((r) => (r ? '🎯' : '❌')).join('')}${streakNow ? ` 🔥${streakNow}` : ''}\n${origin}/arena/daily/`;

  async function share() {
    try {
      if (navigator.share) {
        await navigator.share({ text: shareText });
        return;
      }
    } catch {
      /* fall through to copy */
    }
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard blocked */
    }
  }

  async function postToDiscord() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
    } catch {
      /* ignore */
    }
    window.open(discordInvite, '_blank', 'noopener,noreferrer');
  }

  // Avoid flashing the puzzle to someone who already played today.
  if (!hydrated) return <div className="label-panel min-h-[24rem]" aria-busy="true" />;

  if (done || step === 2) {
    return (
      <div className="label-panel" aria-live="polite">
        <div className="label-bar">
          <span>Daily Drop #{drop.number}</span>
          <span>Next drop in {countdown}</span>
        </div>
        <div className="py-6 pl-[1.35rem] pr-5">
          <p className="mb-2 text-4xl">{result.map((r) => (r ? '🎯' : '❌')).join(' ')}</p>
          <p className="h3 mb-1">
            {result.filter(Boolean).length === 2 ? 'Clean sweep.' : result.some(Boolean) ? 'One for two.' : 'Tough one today.'}
          </p>
          <p className="mb-5 text-ink2">
            {streakNow ? (
              <>
                <strong className="text-ink">🔥 {streakNow}-day streak.</strong> Come back tomorrow to keep it alive.
              </>
            ) : (
              'Come back tomorrow for the next drop.'
            )}
          </p>
          <pre className="mono mb-4 whitespace-pre-wrap rounded-md border border-ruleStrong bg-stock p-3 text-ink2">{shareText}</pre>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn" onClick={postToDiscord}>
              Copy &amp; post in the Discord
            </button>
            <button type="button" className="btn btn--ghost" onClick={share}>
              {copied ? 'Copied' : 'Share'}
            </button>
            <a href="/arena/agent/" className="btn btn--ghost">
              Your Agent file
            </a>
          </div>
          <div className="mt-8">
            <Missions />
          </div>
          <div className="mt-8">
            <AgentBoards only="today" title={`Today's board · Drop #${drop.number}`} next="/arena/daily/" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-md border border-rule p-4">
              <p className="eyebrow mb-2">Today&rsquo;s photo</p>
              <img src={drop.photo.src} alt={drop.photo.caption} className="mb-2 aspect-[4/3] w-full rounded object-cover" />
              <p className="text-sm text-ink2">
                <span className="font-semibold text-ink">{drop.photo.caption}</span> &middot;{' '}
                {drop.photo.choices.find((c) => c.slug === drop.photo.group)?.name} &middot; {drop.photo.credit}
              </p>
            </div>
            <div className="rounded-md border border-rule p-4">
              <p className="eyebrow mb-2">Today&rsquo;s question &middot; {drop.question.moduleName}</p>
              <p className="mb-2 font-semibold text-ink">{drop.question.prompt}</p>
              <p className="mb-2 text-sm text-field">{drop.question.options.find((o) => o.id === drop.question.correctOptionId)?.text}</p>
              <p className="text-sm text-ink2">{drop.question.answerText}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="label-panel">
      <div className="label-bar">
        <span>Daily Drop #{drop.number}</span>
        <span>{step === 0 ? '1 of 2 · Name the pest' : '2 of 2 · ACE question'}</span>
      </div>
      <div className="py-5 pl-[1.35rem] pr-5">
        {step === 0 ? (
          <>
            <div className="mb-4 flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-black">
              <img
                src={drop.photo.src}
                alt={pickPhoto ? drop.photo.caption : 'Mystery photo from a member’s job — name the pest group'}
                width={drop.photo.width}
                height={drop.photo.height}
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <p className="h3 mb-3">What pest group is this?</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {drop.photo.choices.map((c) => {
                const right = pickPhoto && c.slug === drop.photo.group;
                const wrong = pickPhoto === c.slug && c.slug !== drop.photo.group;
                return (
                  <button
                    key={c.slug}
                    type="button"
                    disabled={!!pickPhoto}
                    onClick={() => setPickPhoto(c.slug)}
                    className={cx(
                      'rounded-lg border px-4 py-3 text-left text-[0.9375rem] transition-colors disabled:cursor-default',
                      'border-rule hover:border-ink3',
                      right && '!border-field bg-fieldTint',
                      wrong && '!border-blood bg-stock2',
                    )}
                  >
                    {c.name}
                  </button>
                );
              })}
            </div>
            {pickPhoto ? (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-ink2">
                  <span className={cx('mr-2 font-bold uppercase', photoRight ? 'text-field' : 'text-blood')}>{photoRight ? 'Correct' : 'Miss'}</span>
                  {drop.photo.caption} &middot; {drop.photo.credit}
                </p>
                <button type="button" className="btn" onClick={() => setStep(1)}>
                  Next: ACE question &rarr;
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <>
            <p className="mono mb-2 text-ink3">{drop.question.moduleName}</p>
            <p className="h3 mb-4">{drop.question.prompt}</p>
            <div className="space-y-2">
              {drop.question.options.map((o) => {
                const right = pickQ && o.id === drop.question.correctOptionId;
                const wrong = pickQ === o.id && o.id !== drop.question.correctOptionId;
                return (
                  <button
                    key={o.id}
                    type="button"
                    disabled={!!pickQ}
                    onClick={() => setPickQ(o.id)}
                    className={cx(
                      'block w-full rounded-lg border px-4 py-3 text-left text-[0.9375rem] transition-colors disabled:cursor-default',
                      'border-rule hover:border-ink3',
                      right && '!border-field bg-fieldTint',
                      wrong && '!border-blood bg-stock2',
                    )}
                  >
                    {o.text}
                  </button>
                );
              })}
            </div>
            {pickQ ? (
              <div className="mt-4">
                <p className="mb-4 text-sm text-ink2">
                  <span className={cx('mr-2 font-bold uppercase', qRight ? 'text-field' : 'text-blood')}>{qRight ? 'Correct' : 'Miss'}</span>
                  {drop.question.answerText}
                </p>
                <button type="button" className="btn btn--lg" onClick={finish}>
                  See my result
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
