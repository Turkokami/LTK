import type { ReactNode } from 'react';

/**
 * salary.ts — compensation survey registry.
 *
 * EMPTY UNTIL THE SURVEY HAS ACTUALLY RUN.
 *
 * This is the highest-value content on the site and the easiest to fake, which is exactly why
 * it is gated hardest. The page emits a schema.org Dataset node. A Dataset describing invented
 * numbers is a fabrication in a machine-readable wrapper — designed to be ingested by systems
 * that will never have a human check it. That is categorically worse than a made-up sentence.
 *
 * Preconditions before the first entry lands here:
 *   1. Survey instrument written and reviewed.
 *   2. Responses collected from licence-verified members only.
 *   3. Minimum cell size of 5 enforced in the data, not just in the copy.
 *   4. A named person accountable for the methodology.
 */

export interface SalaryRow {
  region: string;
  /** Keyed by tenure band. A missing band renders "n<5 — suppressed". Never estimated. */
  byTenure: Record<string, string | undefined>;
  /** Responses in this region. */
  n: number;
}

export interface Role {
  slug: string;
  name: string;
  /** Answer-first, 40-60 words, leads with the median. */
  answer: ReactNode;
  tenureBands: string[];
  rows: SalaryRow[];
  sampleSize: number;
  surveyYear: number;
  /** Human-readable collection window, e.g. "January–March 2027". */
  surveyWindow: string;
  publishedOn: string;
  /** The person accountable for the methodology. Required — see precondition 4. */
  reviewer: { name: string; path: string; credential?: string };
}

/**
 * NATIONAL BASELINE — published, sourced, no member survey required.
 *
 * Owner's instruction: pay figures come from national data, not from one operator. A single
 * company's rates reflect one market and one owner's philosophy, and publishing them as
 * industry pay would be misleading in a way that is hard to walk back.
 *
 * So the pay layer has two tiers, and they are never blended:
 *   Tier 1 — BLS OEWS. Sourced, national, comparable, already public. Ships now.
 *   Tier 2 — member-reported detail BLS cannot capture: commission structures, truck and tool
 *            allowances, what a route actually nets. Ships when there are enough responses.
 *
 * BLS caveats that must stay visible on the page, because omitting them is how wage pages
 * mislead: OEWS EXCLUDES self-employed workers, and annual figures for hourly occupations are
 * computed at 2,080 hours — so they do not reflect overtime, commission or seasonal swing,
 * all three of which are substantial in this industry.
 */
export const NATIONAL_BASELINE = {
  source: 'US Bureau of Labor Statistics, Occupational Employment and Wage Statistics (OEWS)',
  sourceUrl: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm',
  /**
   * Every figure below links to one of these. Checked in a browser against bls.gov on
   * 2026-09-24 (BLS blocks automated fetches, so re-verify by hand when the next release lands).
   */
  sources: {
    pay: {
      label: 'BLS Occupational Outlook Handbook: Pest Control Workers — Pay',
      url: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm#tab-5',
    },
    outlook: {
      label: 'BLS Occupational Outlook Handbook: Pest Control Workers — Job Outlook',
      url: 'https://www.bls.gov/ooh/building-and-grounds-cleaning/pest-control-workers.htm#tab-6',
    },
    oews: {
      label: 'BLS OEWS May 2025 occupation profiles',
      url: 'https://www.bls.gov/oes/2025/may/oes_stru.htm',
    },
  },
  referencePeriod: 'May 2025',
  verifiedOn: '2026-09-24',
  occupations: [
    {
      socCode: '37-2021',
      name: 'Pest control workers',
      medianAnnualUsd: 45250,
      medianHourlyUsd: 21.75,
      /** Lowest 10% earned less than this. */
      p10AnnualUsd: 34680,
      /** Highest 10% earned more than this. */
      p90AnnualUsd: 61890,
      /** For context, not comparison — BLS all-occupation median in the same period. */
      allOccupationMedianUsd: 50980,
      /** Median inside the industry most techs actually work in. */
      industryMedian: { name: 'Exterminating and pest control services', usd: 44930 },
      employment: 108700,
      employmentYear: 2025,
      projectedGrowthPercent: 6,
      allOccupationGrowthPercent: 3,
      projectionWindow: '2025–2035',
      annualOpenings: 13700,
      note:
        'Grows faster than the all-occupation average, but sits below the all-occupation median ' +
        'wage. Both facts are true and the industry usually quotes only the flattering one.',
    },
    {
      socCode: '37-3012',
      name: 'Pesticide handlers, sprayers and applicators, vegetation',
      medianAnnualUsd: null,
      note:
        'The adjacent SOC code covering turf and ornamental work. Listed because people in this ' +
        'lane are frequently misclassified as 37-2021 and then cannot find their own pay data.',
    },
  ],
  excludes: [
    'Self-employed workers — so owner-operators are absent entirely',
    'Commission, bonus and production pay',
    'Overtime and seasonal variation (annual figures assume 2,080 hours)',
  ],
} as const;

/** The pest control workers row, typed narrowly for pages that show the headline numbers. */
export const PEST_CONTROL_WORKERS = NATIONAL_BASELINE.occupations[0];

/**
 * Tier 2 — member-reported. Still empty, still gated the same way: a Dataset node describing
 * invented numbers is a fabrication in machine-readable packaging.
 */
export const ROLES: Role[] = [];

export function getRole(slug: string): Role | undefined {
  return ROLES.find((r) => r.slug === slug);
}

/** Roles to survey, in order. Technician first — largest population, worst existing data. */
export const ROLE_BACKLOG = [
  'pest-control-technician',
  'termite-technician',
  'service-manager',
  'branch-manager',
  'commercial-sales-representative',
  'quality-assurance-inspector',
  'fumigator',
  'wildlife-control-operator',
] as const;
