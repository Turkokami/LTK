/**
 * jobs.ts — the job board registry.
 *
 * DELIBERATELY EMPTY. Every entry here is a real, open, operator-posted role.
 *
 * We do not seed this board with aggregator scrapes or sample postings. Two reasons, and the
 * second one is the expensive one:
 *
 *   1. Technicians already distrust job boards, and the reason is boards padded with dead
 *      listings. An empty board is more useful than a fake one.
 *   2. A JobPosting that is expired, fabricated or unreachable is the most common trigger for
 *      a Google for Jobs manual action — and that action removes the WHOLE DOMAIN from the
 *      jobs surface, not the offending page. One sample posting could cost the entire board.
 *
 * BOARD POLICY (enforced at intake, stated on every state page):
 *   - Pay range required. No range, no posting. This is the differentiator.
 *   - validThrough required on every entry.
 *   - Expired roles are REMOVED, not archived. Same day. Automate this before the board opens.
 *   - No login or email wall in front of a posting. Gating a marked-up posting is cloaking.
 */

export interface JobPost {
  slug: string;
  title: string;
  /** Plain-language summary. Becomes schema description — no HTML. */
  summary: string;
  employer: string;
  city: string;
  /** Two-letter code, matching lib/content/states.ts. */
  stateCode: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACTOR';
  datePosted: string;
  /** ISO date. REQUIRED — see the removal policy above. */
  validThrough: string;
  baseSalary: { min: number; max: number; unit: 'HOUR' | 'YEAR' };
  /** Human-readable form of baseSalary, shown on the page. Keep the two in sync. */
  salaryDisplay: string;
}

export const JOBS: JobPost[] = [];

export function jobsForState(stateCode: string): JobPost[] {
  const today = new Date().toISOString().slice(0, 10);
  return JOBS
    // Expired postings never render and never get marked up, even if removal lagged.
    .filter((j) => j.stateCode === stateCode && j.validThrough >= today)
    .sort((a, b) => (a.datePosted < b.datePosted ? 1 : -1));
}
