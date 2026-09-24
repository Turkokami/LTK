/**
 * people.ts — the named-expert registry.
 *
 * Every named human on this site gets a real URL, a real credential and a Person entity.
 * A headshot grid is not an E-E-A-T asset; twelve individual Person pages with credential
 * numbers, issuing bodies, institutional affiliations and sameAs links are.
 *
 * REGISTRY R-05 (advisory board) and R-06 (editorial lead). This file is intentionally EMPTY
 * of real people — populating it with plausible-sounding entomologists would be the single
 * worst thing anyone could do to this project's credibility. Add people only when they have
 * signed a participation agreement and their credential has been checked.
 */

export type PersonRole = 'advisor' | 'editorial' | 'moderator' | 'instructor';

export interface SitePerson {
  slug: string;
  name: string;
  role: PersonRole;
  jobTitle: string;
  /** Institution, university extension programme, or company. */
  affiliation?: string;
  /** ACE, BCE, state applicator licence, etc. Verified before publishing. */
  credential?: {
    category: string;
    /** Certification number where the issuing body publishes one. */
    identifier?: string;
    issuedBy: string;
  };
  /** LinkedIn, Google Scholar, university profile, ESA listing. */
  sameAs?: string[];
  /** 2-4 sentences. What they actually know, not a career summary. */
  bio: string;
  /** Which hubs their name appears on, for cross-linking. */
  covers?: string[];
}

/** REGISTRY R-05 / R-06. Empty until real, verified, consenting humans exist. */
export const PEOPLE: SitePerson[] = [];

export function getPerson(slug: string): SitePerson | undefined {
  return PEOPLE.find((p) => p.slug === slug);
}

export function peopleByRole(role: PersonRole): SitePerson[] {
  return PEOPLE.filter((p) => p.role === role);
}
