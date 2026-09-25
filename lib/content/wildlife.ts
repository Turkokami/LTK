/**
 * wildlife.ts — how nuisance-wildlife and bird work is regulated, state by state plus federal.
 *
 * These fields are NOT licensed through the state pesticide programme, which is why they have
 * their own registry. Every entry is researched against the state wildlife agency, statute or
 * administrative code, eCFR or fws.gov — see docs/CONTENT-RESEARCH.md. A null means "not
 * verified yet", never "not required".
 */

export interface Citation {
  label: string;
  url: string;
}

export interface WildlifeStateRule {
  /** USPS code, matching states.ts. */
  code: string;
  agency: string;
  agencyUrl: string;
  /** e.g. "Nuisance Wildlife Control Operator permit". Null if no single named permit exists. */
  permitName: string | null;
  whoNeedsIt: string;
  requirements: string[];
  restrictions: string[];
  /** When a pesticide licence is also required (vertebrate toxicants, fumigants). */
  pesticideLicenceAlsoNeeded: string | null;
  citations: Citation[];
  /** Known gaps, stated plainly. */
  notes: string | null;
}

export interface FederalBirdRules {
  mbta: { summary: string; unprotectedExamples: string[]; citations: Citation[] };
  falconryAbatement: { summary: string; citations: Citation[] };
}

/** Filled from verified research. Empty = the field guide keeps its honest "in the works" copy. */
export const WILDLIFE_VERIFIED_ON: string | null = null;
export const WILDLIFE_STATES: WildlifeStateRule[] = [];
export const FEDERAL_BIRD_RULES: FederalBirdRules | null = null;

export function wildlifeRule(code: string): WildlifeStateRule | undefined {
  return WILDLIFE_STATES.find((r) => r.code === code);
}
