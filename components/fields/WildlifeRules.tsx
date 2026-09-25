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
          <p>{fed.mbta.summary}</p>
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
          <p>{fed.falconryAbatement.summary}</p>
          <Sources citations={fed.falconryAbatement.citations} />
        </LabelBlock>
      ) : null}

      {show !== 'falconry' && WILDLIFE_STATES.length ? (
        <ul className="grid gap-3">
          {WILDLIFE_STATES.map((r) => {
            const st = STATES.find((s) => s.code === r.code);
            return (
              <li key={r.code} className="card p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="h3">{st?.name ?? r.code}</p>
                  <p className="mono text-ink3">{r.code}</p>
                </div>
                <p className="mt-1 text-xs text-ink3">
                  <a href={r.agencyUrl} target="_blank" rel="noopener noreferrer" className="link">
                    {r.agency}
                  </a>
                </p>
                <p className="mt-3 text-sm font-semibold text-ink">
                  {r.permitName ?? 'No single named permit — see notes'}
                </p>
                <p className="mt-1 text-sm text-ink2">{r.whoNeedsIt}</p>
                {r.requirements.length ? (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-ink2">
                    {r.requirements.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                ) : null}
                {r.restrictions.length ? (
                  <div className="mt-3 rounded-md border border-ruleStrong bg-stock px-3 py-2 text-sm text-ink2">
                    <span className="mr-2 font-semibold uppercase tracking-wide text-blood">Watch for</span>
                    {r.restrictions.join(' ')}
                  </div>
                ) : null}
                {r.pesticideLicenceAlsoNeeded ? (
                  <p className="mt-3 text-sm text-ink2">
                    <strong className="text-ink">Pesticide licence too:</strong> {r.pesticideLicenceAlsoNeeded}
                  </p>
                ) : null}
                {r.notes ? <p className="mt-3 text-xs italic text-ink3">{r.notes}</p> : null}
                <Sources citations={r.citations} />
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
