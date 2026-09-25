import { LabelBlock } from '@/components/label/LabelBlock';
import { STATES } from '@/lib/content/states';
import {
  FEDERAL_BIRD_RULES,
  WILDLIFE_STATES,
  WILDLIFE_VERIFIED_ON,
  type Citation,
} from '@/lib/content/wildlife';
import { formatVerified } from '@/lib/utils';

/**
 * State-by-state wildlife permits and federal bird rules, for the fields licensed outside the
 * pesticide programme. Renders nothing when the registry is empty, so the field guide keeps
 * its honest "in the works" copy until verified research lands.
 */

function Sources({ citations }: { citations: Citation[] }) {
  if (!citations.length) return null;
  return (
    <ul className="mt-3 space-y-1 text-xs">
      {citations.map((c) => (
        <li key={c.url}>
          <a href={c.url} target="_blank" rel="noopener noreferrer" className="link">
            {c.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function hasWildlifeRules(): boolean {
  return WILDLIFE_STATES.length > 0 || FEDERAL_BIRD_RULES !== null;
}

export function WildlifeRules({ show }: { show: 'wildlife' | 'birds' | 'falconry' }) {
  if (!hasWildlifeRules()) return null;
  const fed = FEDERAL_BIRD_RULES;

  return (
    <div className="space-y-6">
      {WILDLIFE_VERIFIED_ON ? (
        <p className="text-xs text-ink3">
          Checked against each agency, statute or federal regulation on {formatVerified(WILDLIFE_VERIFIED_ON)}.
          Rules change &mdash; confirm with the agency before you take a job.
        </p>
      ) : null}

      {(show === 'birds' || show === 'falconry') && fed ? (
        <LabelBlock title="Federal: Migratory Bird Treaty Act" signal="warning" meta="Applies everywhere">
          {fed.mbta.summary.split('\n').map((para) => (
            <p key={para.slice(0, 32)} className="mb-2">
              {para}
            </p>
          ))}
          {fed.mbta.unprotectedExamples.length ? (
            <p className="mt-2">
              <strong className="text-ink">Not protected under the Act:</strong>{' '}
              {fed.mbta.unprotectedExamples.join(', ')}.
            </p>
          ) : null}
          <Sources citations={fed.mbta.citations} />
        </LabelBlock>
      ) : null}

      {show === 'falconry' && fed ? (
        <LabelBlock title="Federal: falconry abatement" signal="danger" meta="Federal permit">
          {fed.falconryAbatement.summary.split('\n').map((para) => (
            <p key={para.slice(0, 32)} className="mb-2">
              {para}
            </p>
          ))}
          <Sources citations={fed.falconryAbatement.citations} />
        </LabelBlock>
      ) : null}

      {show !== 'falconry' && WILDLIFE_STATES.length ? (
        <ul className="grid gap-3">
          <li className="text-xs text-ink3">Tap your state for the details.</li>
          {WILDLIFE_STATES.map((r) => {
            const st = STATES.find((s) => s.code === r.code);
            return (
              <li key={r.code}>
                <details className="card group p-5 [&[open]]:border-ruleStrong">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-3 [&::-webkit-details-marker]:hidden">
                  <span>
                    <span className="h3 block group-hover:text-blood">{st?.name ?? r.code}</span>
                    <span className="mt-1 block text-sm text-ink2">
                      {r.permitName ?? 'No state licence for this work'}
                    </span>
                  </span>
                  <span className="mono shrink-0 text-ink3">
                    {r.code}{' '}
                    <span aria-hidden="true" className="inline-block transition-transform group-open:rotate-90">&rsaquo;</span>
                  </span>
                </summary>
                <p className="mt-1 text-xs leading-relaxed text-ink3">
                  {r.agency}{' '}
                  <a href={r.agencyUrl} target="_blank" rel="noopener noreferrer" className="link whitespace-nowrap">
                    Agency page<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
                <p className="mt-4 text-sm text-ink">{r.whoNeedsIt}</p>
                {r.requirements.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink2">
                    {r.requirements.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                ) : null}
                {r.restrictions.length ? (
                  <div className="mt-3 rounded-md border border-ruleStrong bg-stock px-4 py-3 text-sm text-ink2">
                    <p className="mb-2 font-semibold uppercase tracking-wide text-blood">Watch for</p>
                    <ul className="list-disc space-y-1.5 pl-5">
                      {r.restrictions.map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {r.pesticideLicenceAlsoNeeded ? (
                  <p className="mt-3 text-sm text-ink2">
                    <strong className="text-ink">Pesticide licence too:</strong> {r.pesticideLicenceAlsoNeeded}
                  </p>
                ) : null}
                {r.readerNote ? (
                  <p className="mt-3 text-xs leading-relaxed text-ink3">
                    <span className="font-semibold text-ink2">Before you rely on this: </span>
                    {r.readerNote}
                  </p>
                ) : null}
                <Sources citations={r.citations} />
                </details>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
