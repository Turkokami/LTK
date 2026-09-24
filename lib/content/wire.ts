/**
 * wire.ts — regulatory update log.
 *
 * EMPTY. Items land here only with a primary-source document behind them.
 *
 * `sourceUrl` and `sourceLabel` are NON-OPTIONAL on purpose. A regulatory claim without a
 * primary source is the one category of error on this site that can cost a reader their
 * licence, and the type system is the cheapest place to make that impossible.
 *
 * Sources that count: a state agency bulletin, an EPA registration document, a registrant
 * label revision, a published rule. Sources that do not count: a distributor email, a trade
 * press summary, a forum post, a manufacturer newsletter. Those may TELL us to look — they are
 * never the citation.
 */

export interface RegulatoryUpdate {
  slug: string;
  stateCode: string;
  headline: string;
  summary: string;
  /** ISO date the change takes effect — not the date we noticed it. */
  effectiveOn: string;
  /** Required. Primary source only. */
  sourceUrl: string;
  /** What the reader is clicking through to, named plainly. */
  sourceLabel: string;
}

export const UPDATES: RegulatoryUpdate[] = [];

export function updatesForState(stateCode: string): RegulatoryUpdate[] {
  return UPDATES
    .filter((u) => u.stateCode === stateCode)
    .sort((a, b) => (a.effectiveOn < b.effectiveOn ? 1 : -1));
}
