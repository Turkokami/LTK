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

export type PersonRole = 'founder' | 'advisor' | 'editorial' | 'moderator' | 'instructor';

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
  /** 140-160 characters, for the page's meta description. */
  metaDescription: string;
  /** Which hubs their name appears on, for cross-linking. */
  covers?: string[];
}

/**
 * REGISTRY R-05 / R-06 still gate advisors and the editorial lead. The founder is listed from
 * his own public bio (Pest Perspectives EP 36, 2025); no credential number is published.
 */
export const PEOPLE: SitePerson[] = [
  {
    slug: 'marcus-scruggs',
    name: 'Marcus Scruggs',
    role: 'founder',
    jobTitle: 'Founder, Licensed to Kill',
    bio:
      'Pest management professional with more than ten years in the trade, specializing in food safety, audits, sanitation and public health, and a certified applicator. Created the Licensed to Kill Discord and hosts The Licensed to Kill Podcast.',
    metaDescription:
      'Marcus Scruggs founded Licensed to Kill: 10+ years in pest management, specializing in food safety, audits and sanitation. Hear him on the podcast and Discord.',
    covers: ['community'],
  },
];

export function getPerson(slug: string): SitePerson | undefined {
  return PEOPLE.find((p) => p.slug === slug);
}

export function peopleByRole(role: PersonRole): SitePerson[] {
  return PEOPLE.filter((p) => p.role === role);
}
