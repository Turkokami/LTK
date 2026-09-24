/**
 * site.config.ts — the single point of truth for brand identity.
 *
 * CLAUDE.md 2.4: nothing brand-related is hardcoded anywhere else. The parent brand is
 * PROVISIONAL (REGISTRY.md R-01). When trademark clearance lands, this file is the only
 * edit required to rename the entire property.
 */

export const BRAND_STATUS = (process.env.NEXT_PUBLIC_BRAND_STATUS ?? 'PROVISIONAL') as
  | 'PROVISIONAL'
  | 'CLEARED';

/**
 * Owner decision 2026-09-24: the property is LTK Community Hub — Licensed to Kill — matching the badge logo and
 * the existing LTK Discord community. Trademark clearance (REGISTRY R-01) is still open, which is
 * why BRAND_STATUS stays PROVISIONAL and the indexing gate below stays shut.
 */
const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME ?? 'LTK Community Hub';

/** REGISTRY R-03. Build fails against this value in production — see lib/utils.ts. */
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com').replace(/\/$/, '');

/**
 * INDEXABLE — the single gate deciding whether this deployment may be crawled at all.
 *
 * Three conditions must ALL hold. If any fails, robots.ts serves a site-wide disallow.
 *
 *   1. BRAND_STATUS is CLEARED          (R-01 — trademark actually cleared)
 *   2. SITE_URL is not the placeholder   (R-03 — a real apex domain is configured)
 *   3. SITE_URL is not a *.vercel.app    (deploy URL, not the permanent home)
 *
 * WHY CONDITION 3 EXISTS: Vercel adds noindex automatically to PREVIEW deployments, but NOT
 * to production deployments — and a production deploy lands on <project>.vercel.app until a
 * custom domain is attached. Without this check, the first production deploy would invite
 * indexation of the whole property at a throwaway hostname under a provisional brand name.
 *
 * URLs are permanent from first indexation. A redirect inherits a discount; a URL that was
 * never indexed under the wrong name inherits nothing. This gate is cheap insurance against
 * the one mistake in this build that cannot be undone later.
 *
 * To go live: set NEXT_PUBLIC_SITE_URL to the apex domain and NEXT_PUBLIC_BRAND_STATUS=CLEARED.
 */
export const INDEXABLE =
  BRAND_STATUS === 'CLEARED' &&
  !SITE_URL.includes('example.com') &&
  !SITE_URL.includes('vercel.app');

export const site = {
  /** Parent brand. See CLAUDE.md §7. */
  name: BRAND_NAME,
  shortName: 'LTK',
  /** REGISTRY R-02. */
  legalName: null as string | null,
  url: SITE_URL,
  locale: 'en-US',

  tagline: 'Pest pros helping pest pros. Pull up a chair.',

  /** Used in meta descriptions and the Organization node. Condensed from the mission below. */
  description:
    'Licensed To Kill (LTK) is a community for pest management professionals: a Discord ' +
    'server, podcast, events and education connecting technicians, owners, manufacturers ' +
    'and industry leaders.',

  /** The owner's own words (2026-09-24). Used on the home page and About. Do not paraphrase. */
  mission: [
    'Licensed To Kill (LTK) is a community built for pest management professionals who want ' +
      'more than just another industry forum. Through our Discord server, podcast, events, and ' +
      'educational initiatives, we connect technicians, owners, manufacturers, and industry ' +
      'leaders while creating opportunities to learn, network, and build lasting relationships.',
    'From professional development to gaming tournaments and community outreach, LTK exists to ' +
      'strengthen the pest control industry—one connection at a time.',
  ],

  /** Owner-supplied social profiles. Never add a guessed URL. */
  social: {
    linkedin: 'https://www.linkedin.com/in/ltk-licensed-to-kill-824690368/',
  },

  /**
   * The LTK Discord — the live heart of the community. Every "come hang out" CTA on the site
   * points here. Change the invite in this one place if it is ever rotated.
   */
  discord: {
    invite: 'https://discord.com/invite/3DpNzdEtvs',
    name: 'LTK Discord',
    /** What actually happens in the server. Drives the Discord sections site-wide. */
    channels: [
      {
        name: 'Shop talk',
        blurb: 'Swap stories, war stories and workarounds with techs who run the same routes you do.',
      },
      {
        name: 'Pest ID help',
        blurb: 'Snap a photo, drop it in, and get a second (and third) set of eyes on it fast.',
      },
      {
        name: 'The podcast',
        blurb: 'Catch episodes as they drop, hang out in the live recordings, and pitch guests.',
      },
      {
        name: 'Group training',
        blurb: 'Study groups for the licensing exam, CEU sessions and hands-on technique walkthroughs.',
      },
      {
        name: 'Business & sales',
        blurb: 'Pricing, hiring, routing, marketing. Owners and managers comparing real numbers.',
      },
      {
        name: 'And more',
        blurb: 'Gear talk, job leads, rookie questions, and the occasional rodent meme.',
      },
    ],
  },

  /**
   * The Arena's flagship competition. This is the ONLY place the LTK name is permitted.
   * CLAUDE.md §7.
   */
  championship: {
    name: 'Licensed to Kill Championship',
    shortName: 'LTK Championship',
    slug: 'licensed-to-kill-championship',
  },

  /** REGISTRY R-07. Null until the domain resolves. */
  contact: {
    membership: null as string | null,
    sponsorship: null as string | null,
    investors: null as string | null,
    press: null as string | null,
  },

  /** Brand mark. Square raster ≥1200px for the schema ImageObject node. See lib/brand.ts. */
  logo: {
    path: '/brand/logo-1200.jpg',
    width: 1200,
    height: 1200,
  },

  /** sameAs targets. Owner-supplied URLs only — never ship a guessed social URL. */
  sameAs: [
    'https://discord.com/invite/3DpNzdEtvs',
    'https://www.linkedin.com/in/ltk-licensed-to-kill-824690368/',
  ] as string[],

  /**
   * knowsAbout feeds the Organization node. These are the topical claims the entity makes,
   * and they should map to hubs that actually exist.
   */
  knowsAbout: [
    'Structural pest management',
    'Pesticide applicator licensing',
    'Continuing education units',
    'Integrated pest management',
    'Termite and wood-destroying organism inspection',
    'Rodent exclusion',
    'Bed bug remediation',
    'Field service management software',
  ],

  founded: '2026',
} as const;

/** Absolute URL for any path. Always use this — never string-concatenate the domain. */
export function abs(path: string): string {
  if (path.startsWith('http')) return path;
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${site.url}${p}`;
}

/** Stable @id anchors. Every schema node references these rather than redeclaring. */
export const ID = {
  organization: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  logo: `${site.url}/#logo`,
  webpage: (url: string) => `${url}#webpage`,
  breadcrumb: (url: string) => `${url}#breadcrumb`,
  primaryImage: (url: string) => `${url}#primaryimage`,
} as const;
