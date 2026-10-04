'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { cx } from '@/lib/utils';
import { award } from '@/lib/agent/store';
import { XP } from '@/lib/agent/config';
import { Leaderboard } from '@/components/arena/Leaderboard';
import { INSPECTION_SPOTS as SPOTS } from '@/lib/content/inspection-spots';

/**
 * Inspection Hunt — Arena game. A house exterior with twelve spots; each round, six of them are
 * real conducive conditions or entry points and six are drawn fixed. Find the problems in 75
 * seconds; tapping something that's fine costs 5 seconds. Every tap explains the pest risk and
 * the fix, so the game is the exterior inspection checklist in disguise.
 */

const SECONDS = 75;
const PROBLEMS_PER_ROUND = 6;
const PENALTY = 5;
const BEST_KEY = 'ltk-inspection-hunt-best';

function pickProblems(): Set<string> {
  const ids = SPOTS.map((s) => s.id);
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j]!, ids[i]!];
  }
  return new Set(ids.slice(0, PROBLEMS_PER_ROUND));
}

/* ------------------------------------------------------------------ the scene */

function Scene({ bad }: { bad: Set<string> }) {
  const b = (id: string) => bad.has(id);
  return (
    <g>
      <defs>
        <linearGradient id="ih-sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#1f2833" />
          <stop offset="1" stopColor="#3c4a55" />
        </linearGradient>
        <pattern id="ih-siding" width="20" height="18" patternUnits="userSpaceOnUse">
          <rect width="20" height="18" fill="#cfc6b4" />
          <line x1="0" y1="17.5" x2="20" y2="17.5" stroke="#b3aa97" strokeWidth="1.2" />
        </pattern>
        <pattern id="ih-mesh" width="5" height="5" patternUnits="userSpaceOnUse">
          <rect width="5" height="5" fill="#2a2d2f" />
          <path d="M0 0L5 5M5 0L0 5" stroke="#8d9296" strokeWidth="0.7" />
        </pattern>
      </defs>
      {/* Sky and ground */}
      <rect width="1000" height="600" fill="url(#ih-sky)" />
      <rect y="478" width="1000" height="122" fill="#3d4a2d" />
      <rect y="478" width="1000" height="6" fill="#4b5937" />

      {/* Tree */}
      <rect x="72" y="230" width="26" height="250" fill="#5a4330" />
      <circle cx="85" cy="200" r="88" fill="#2f4a2a" />
      <circle cx="130" cy="230" r="55" fill="#36552f" />
      {b('tree') ? (
        <g>
          <path d="M120 200 Q220 175 318 212" stroke="#5a4330" strokeWidth="9" fill="none" strokeLinecap="round" />
          <circle cx="270" cy="196" r="32" fill="#36552f" />
          <circle cx="315" cy="212" r="22" fill="#2f4a2a" />
        </g>
      ) : (
        <g>
          <path d="M130 200 Q160 190 182 190" stroke="#5a4330" strokeWidth="9" fill="none" strokeLinecap="round" />
          <circle cx="184" cy="190" r="4" fill="#a98c67" />
        </g>
      )}

      {/* House */}
      <rect x="230" y="255" width="520" height="190" fill="url(#ih-siding)" />
      <rect x="230" y="445" width="520" height="36" fill="#8b8a84" />
      <polygon points="200,258 490,112 780,258" fill="#454b51" />
      <polygon points="200,258 490,112 780,258" fill="none" stroke="#2f3337" strokeWidth="4" />
      {/* Windows */}
      {[300, 620].map((x) => (
        <g key={x}>
          <rect x={x} y="300" width="80" height="70" fill="#e8e2d5" />
          <rect x={x + 6} y="306" width="68" height="58" fill="#7d93a3" />
          <line x1={x + 40} y1="306" x2={x + 40} y2="364" stroke="#e8e2d5" strokeWidth="4" />
          <line x1={x + 6} y1="335" x2={x + 74} y2="335" stroke="#e8e2d5" strokeWidth="4" />
        </g>
      ))}
      {/* Door */}
      <rect x="448" y="358" width="74" height={b('door') ? 112 : 120} fill="#6b2f2f" />
      <rect x="448" y="358" width="74" height={b('door') ? 112 : 120} fill="none" stroke="#e8e2d5" strokeWidth="5" />
      <circle cx="508" cy="420" r="4" fill="#d9b44a" />
      {b('door') ? <rect x="450" y="470" width="70" height="8" fill="#f5d77a" /> : <rect x="450" y="472" width="70" height="7" fill="#1d1f20" />}

      {/* Gutter */}
      <rect x="198" y="256" width="584" height="10" fill="#d8d3c8" />
      {b('gutter') ? (
        <g>
          {[540, 575, 610, 650, 690, 730].map((x, k) => (
            <ellipse key={x} cx={x} cy={254} rx={12} ry={7} fill={k % 2 ? '#6c5a2c' : '#4f6b2d'} />
          ))}
          {[585, 640, 700].map((x) => (
            <path key={x} d={`M${x} 266 q-4 14 0 26 q4 10 0 22`} stroke="#8fc3e6" strokeWidth="3" fill="none" opacity="0.9" />
          ))}
        </g>
      ) : null}

      {/* Downspout */}
      <rect x="752" y="264" width="12" height={b('downspout') ? 210 : 196} fill="#d8d3c8" />
      {b('downspout') ? (
        <ellipse cx="764" cy="482" rx="34" ry="7" fill="#5b8bb0" opacity="0.85" />
      ) : (
        <g>
          <path d="M758 460 Q758 472 772 472 L812 472" stroke="#d8d3c8" strokeWidth="12" fill="none" />
          <rect x="806" y="476" width="30" height="8" fill="#9a9a94" />
        </g>
      )}

      {/* Shrubs */}
      {b('shrub') ? (
        <g>
          <circle cx="262" cy="430" r="34" fill="#2f5a2c" />
          <circle cx="306" cy="420" r="40" fill="#3a6a34" />
          <circle cx="285" cy="390" r="30" fill="#2f5a2c" />
          <circle cx="330" cy="448" r="26" fill="#3a6a34" />
        </g>
      ) : (
        <g>
          <ellipse cx="270" cy="472" rx="26" ry="14" fill="#3a6a34" />
          <ellipse cx="312" cy="474" rx="22" ry="12" fill="#2f5a2c" />
        </g>
      )}

      {/* Mulch */}
      {b('mulch') ? (
        <path d="M342 488 L346 446 Q392 432 440 446 L442 488 Z" fill="#6b4a2e" />
      ) : (
        <g>
          <rect x="342" y="481" width="100" height="7" fill="#6b4a2e" />
          <rect x="342" y="478" width="100" height="3" fill="#9a958a" />
        </g>
      )}

      {/* Pipe into the wall */}
      <line x1="546" y1="300" x2="546" y2="392" stroke="#9aa0a4" strokeWidth="7" />
      <circle cx="546" cy="406" r="10" fill="#9aa0a4" />
      {b('pipe') ? <circle cx="546" cy="406" r="17" fill="none" stroke="#141516" strokeWidth="7" /> : <circle cx="546" cy="406" r="15" fill="none" stroke="#b9b6ac" strokeWidth="5" />}

      {/* Crawlspace vent */}
      <rect x="600" y="449" width="60" height="22" fill="url(#ih-mesh)" stroke="#c9c5bb" strokeWidth="3" />
      {b('vent') ? <polygon points="612,452 632,450 640,462 628,469 614,466" fill="#0d0e0f" /> : null}

      {/* AC unit */}
      <rect x="680" y="418" width="54" height="60" rx="4" fill="#b8bcbf" />
      <circle cx="707" cy="446" r="18" fill="#7a8084" />
      <path d="M707 430 L707 462 M691 446 L723 446" stroke="#b8bcbf" strokeWidth="3" />
      {b('ac') ? (
        <g>
          <path d="M686 470 L686 478" stroke="#9aa0a4" strokeWidth="4" />
          <ellipse cx="690" cy="484" rx="22" ry="5" fill="#5b8bb0" opacity="0.85" />
        </g>
      ) : (
        <path d="M686 470 L686 486 L660 486" stroke="#9aa0a4" strokeWidth="4" fill="none" transform="translate(0,0)" />
      )}

      {/* Firewood */}
      {b('firewood') ? (
        <g>
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4].map((k) => <circle key={`${row}-${k}`} cx={146 + k * 18 + (row % 2) * 9} cy={470 - row * 17} r="9" fill="#8a6440" stroke="#5a3e24" strokeWidth="2" />),
          )}
          <rect x="226" y="420" width="6" height="60" fill="#5a3e24" opacity="0.4" />
        </g>
      ) : (
        <g>
          <rect x="116" y="452" width="74" height="4" fill="#4a4d50" />
          <rect x="118" y="452" width="4" height="30" fill="#4a4d50" />
          <rect x="184" y="452" width="4" height="30" fill="#4a4d50" />
          {[0, 1].map((row) =>
            [0, 1, 2, 3].map((k) => <circle key={`${row}-${k}`} cx={126 + k * 18 + (row % 2) * 9} cy={443 - row * 17} r="9" fill="#8a6440" stroke="#5a3e24" strokeWidth="2" />),
          )}
        </g>
      )}

      {/* Trash can */}
      <rect x="848" y="420" width="46" height="60" rx="4" fill="#3f5a3f" />
      {b('trash') ? (
        <g>
          <rect x="840" y="398" width="54" height="9" rx="3" fill="#2f4a2f" transform="rotate(-28 846 402)" />
          <path d="M852 420 Q860 404 872 414 Q884 402 890 420 Z" fill="#2b2b2b" />
          <circle cx="908" cy="476" r="6" fill="#c9a24a" />
        </g>
      ) : (
        <rect x="844" y="412" width="54" height="10" rx="3" fill="#2f4a2f" />
      )}

      {/* Bucket */}
      {b('bucket') ? (
        <g>
          <path d="M916 440 L964 440 L958 482 L922 482 Z" fill="#c4572f" />
          <ellipse cx="940" cy="440" rx="24" ry="6" fill="#5b8bb0" />
          <path d="M928 440 q6 -3 12 0 q6 3 12 0" stroke="#a9d0ea" strokeWidth="1.5" fill="none" />
        </g>
      ) : (
        <path d="M922 440 L958 440 L964 482 L916 482 Z" fill="#c4572f" />
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ the game */

type Phase = 'ready' | 'playing' | 'done';
interface Note {
  id: string;
  ok: boolean;
}

export function InspectionHunt({ discordInvite }: { discordInvite: string }) {
  const [phase, setPhase] = useState<Phase>('ready');
  const [bad, setBad] = useState<Set<string>>(() => new Set(['tree', 'door', 'mulch', 'vent', 'bucket', 'trash']));
  const [found, setFound] = useState<Set<string>>(new Set());
  const [left, setLeft] = useState(SECONDS);
  const [note, setNote] = useState<Note | null>(null);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);

  useEffect(() => {
    try {
      setBest(Number(window.localStorage.getItem(BEST_KEY)) || 0);
    } catch {
      /* ignore */
    }
  }, []);

  const start = useCallback(() => {
    setBad(pickProblems());
    setFound(new Set());
    setLeft(SECONDS);
    setNote(null);
    setScore(0);
    setPhase('playing');
  }, []);

  useEffect(() => {
    if (phase !== 'playing') return;
    if (left <= 0) {
      setPhase('done');
      return;
    }
    const t = window.setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, left]);

  const tap = useCallback(
    (id: string) => {
      if (phase !== 'playing') return;
      if (bad.has(id)) {
        if (found.has(id)) return;
        const next = new Set(found).add(id);
        setFound(next);
        setNote({ id, ok: true });
        if (next.size === bad.size) {
          setScore(next.size * 100 + 200 + left * 10);
          setPhase('done');
        } else setScore(next.size * 100);
      } else {
        setNote({ id, ok: false });
        setLeft((s) => Math.max(0, s - PENALTY));
      }
    },
    [phase, bad, found, left],
  );

  // Pay out once at the end.
  useEffect(() => {
    if (phase !== 'done') return;
    const final = found.size === bad.size ? score : found.size * 100;
    award({
      xp: Math.min(XP.gameCap, final / XP.gameScoreDivisor),
      label: `Inspection Hunt: ${found.size}/${bad.size}`,
      max: { bestHunt: final },
      event: { kind: 'inspection-hunt', score: final, correct: found.size, total: bad.size },
    });
    if (final > best) {
      setBest(final);
      try {
        window.localStorage.setItem(BEST_KEY, String(final));
      } catch {
        /* ignore */
      }
    }
    if (final !== score) setScore(final);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const noteSpot = useMemo(() => SPOTS.find((s) => s.id === note?.id), [note]);

  return (
    <div>
      <div className="label-panel">
        <div className="label-bar">
          <span>{phase === 'playing' ? `Found ${found.size} of ${bad.size}` : 'Inspection Hunt'}</span>
          <span>{phase === 'playing' ? `${left}s · ${score} pts` : `${PROBLEMS_PER_ROUND} problems · ${SECONDS}s`}</span>
        </div>
        <div className="relative">
          <svg viewBox="0 0 1000 600" className="block h-auto w-full select-none" role="group" aria-label="House exterior to inspect">
            <Scene bad={bad} />
            {phase !== 'ready'
              ? SPOTS.map((s, k) => {
                  const isFound = found.has(s.id);
                  const missed = phase === 'done' && bad.has(s.id) && !isFound;
                  const [x, y, w, h] = s.box;
                  return (
                    <g key={s.id}>
                      <rect
                        x={x}
                        y={y}
                        width={w}
                        height={h}
                        rx="10"
                        fill="transparent"
                        stroke={isFound ? '#39ff88' : missed ? '#ff4040' : 'transparent'}
                        strokeWidth="4"
                        strokeDasharray={missed ? '8 6' : undefined}
                        className={cx(phase === 'playing' && 'cursor-crosshair focus:outline-none')}
                        role={phase === 'playing' ? 'button' : undefined}
                        tabIndex={phase === 'playing' ? 0 : -1}
                        aria-label={phase === 'playing' ? `Check spot ${k + 1}: ${s.area}` : undefined}
                        onClick={() => tap(s.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            tap(s.id);
                          }
                        }}
                      />
                      {isFound ? (
                        <text x={x + w - 6} y={y + 22} textAnchor="end" fontSize="24" fontWeight="800" fill="#39ff88">
                          ✓
                        </text>
                      ) : null}
                    </g>
                  );
                })
              : null}
          </svg>
          {phase === 'ready' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 p-6 text-center">
              <p className="h2">Find the problems</p>
              <p className="max-w-[46ch] text-ink2">
                {PROBLEMS_PER_ROUND} things on this house are pest problems waiting to happen. Find them in {SECONDS} seconds. Tap
                something that&rsquo;s fine and you lose {PENALTY} seconds.
              </p>
              <button type="button" className="btn btn--lg" onClick={start}>
                Start inspection
              </button>
              {best ? <p className="mono text-ink3">Your best: {best.toLocaleString('en-US')}</p> : null}
            </div>
          ) : null}
        </div>
        <div className="min-h-[5.5rem] border-t border-rule py-4 pl-[1.35rem] pr-5 text-sm" aria-live="polite">
          {phase === 'playing' && noteSpot ? (
            note?.ok ? (
              <p className="text-ink2">
                <span className="mr-2 font-bold uppercase text-field">Found</span>
                <span className="font-semibold text-ink">{noteSpot.issue}.</span> {noteSpot.why} <span className="text-ink">Fix:</span> {noteSpot.fix}
              </p>
            ) : (
              <p className="text-ink2">
                <span className="mr-2 font-bold uppercase text-blood">−{PENALTY}s</span>
                {noteSpot.fine}
              </p>
            )
          ) : phase === 'playing' ? (
            <p className="text-ink3">Look over the whole house: roofline, walls, doors, foundation and yard.</p>
          ) : phase === 'done' ? (
            <p className="text-ink2">
              <span className="font-semibold text-ink">
                {found.size === bad.size ? 'Clean inspection.' : `Found ${found.size} of ${bad.size}.`}
              </span>{' '}
              Score {score.toLocaleString('en-US')}. Missed spots are outlined in red &mdash; the full report is below.
            </p>
          ) : (
            <p className="text-ink3">Tap or click spots on the house. Keyboard: Tab to a spot, Enter to check it.</p>
          )}
        </div>
      </div>

      {phase === 'done' ? (
        <div className="mt-6">
          <section className="label-panel" aria-label="Inspection report">
            <div className="label-bar">
              <span>Inspection report</span>
              <span>
                {found.size}/{bad.size} found
              </span>
            </div>
            <ul className="divide-y divide-rule">
              {SPOTS.filter((s) => bad.has(s.id)).map((s) => (
                <li key={s.id} className="py-3 pl-[1.35rem] pr-5 text-sm text-ink2">
                  <span className={cx('mr-2 font-bold uppercase', found.has(s.id) ? 'text-field' : 'text-blood')}>
                    {found.has(s.id) ? 'Found' : 'Missed'}
                  </span>
                  <span className="font-semibold text-ink">{s.issue}.</span> {s.why} <span className="text-ink">Fix:</span> {s.fix}
                </li>
              ))}
            </ul>
          </section>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn btn--lg" onClick={start}>
              Inspect another house
            </button>
            <a href={discordInvite} target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--lg">
              Post your score on Discord<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <Leaderboard game="inspection-hunt" finalScore={score} />
        </div>
      ) : null}
    </div>
  );
}

