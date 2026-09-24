/**
 * hubs.ts — the route registry.
 *
 * CLAUDE.md §3: single source of truth for navigation, breadcrumbs, segmented sitemaps and the
 * footer. Add a route HERE FIRST, then build it. If it is not in this file it does not exist.
 */

export type HubId =
  | 'academy'
  | 'community'
  | 'lab'
  | 'arena'
  | 'trade'
  | 'wire'
  | 'partners'
  | 'about';

export interface Hub {
  id: HubId;
  /** Uppercase eyebrow in the label system. */
  eyebrow: string;
  title: string;
  path: string;
  /** One line, technician-facing. Used on the hub card and in the hub index meta description. */
  blurb: string;
  /** The conversion job this hub does. Keeps the three funnels from blending. */
  job: string;
  /** Primary schema entity for spoke templates in this hub. */
  primaryEntity: string;
  /** Spoke route patterns. `:param` marks a dynamic segment. */
  spokes: { pattern: string; label: string; count?: number | 'open' }[];
}

export const HUBS: Hub[] = [
  {
    id: 'academy',
    eyebrow: 'Academy',
    title: 'Licensing, CEUs and training',
    path: '/academy/',
    blurb:
      'Licensing requirements and continuing-education rules for every state, plus exam prep and live sessions with certified entomologists.',
    job: 'Acquisition. This is the front door and the largest traffic driver.',
    primaryEntity: 'Course / Event / FAQPage',
    spokes: [
      { pattern: '/academy/licensing/:state/', label: 'State licensing', count: 50 },
      { pattern: '/academy/ceu/:state/', label: 'State CEU requirements', count: 50 },
      { pattern: '/academy/exam-prep/:category/', label: 'Exam prep by category', count: 12 },
      { pattern: '/academy/courses/:slug/', label: 'On-demand courses', count: 30 },
      { pattern: '/academy/sessions/:slug/', label: 'Live sessions', count: 36 },
      { pattern: '/academy/instructors/:slug/', label: 'Instructors', count: 12 },
    ],
  },
  {
    id: 'community',
    eyebrow: 'Community',
    title: 'Forums, chapters and members',
    path: '/community/',
    blurb:
      'Thirteen technical forums for verified working pros, state chapters, and member profiles that show credentials rather than follower counts.',
    job: 'The moat. Self-producing indexable content.',
    primaryEntity: 'DiscussionForumPosting / ProfilePage',
    spokes: [
      { pattern: '/community/forums/:category/', label: 'Forum categories', count: 13 },
      { pattern: '/community/forums/:category/:thread/', label: 'Threads', count: 'open' },
      { pattern: '/community/chapters/:state/', label: 'State chapters', count: 50 },
      { pattern: '/community/members/:handle/', label: 'Member profiles', count: 'open' },
    ],
  },
  {
    id: 'lab',
    eyebrow: 'Lab',
    title: 'Equipment, software and field trials',
    path: '/lab/',
    blurb:
      'Independent reviews and head-to-head comparisons of the gear and software you actually buy, plus member-run field trials with published data.',
    job: 'Commercial intent. The hub that makes manufacturers take your call.',
    primaryEntity: 'Product / Review / ItemList',
    spokes: [
      { pattern: '/lab/technology/:slug/', label: 'Technology explainers', count: 25 },
      { pattern: '/lab/reviews/:product/', label: 'Product reviews', count: 60 },
      { pattern: '/lab/software/:slug/', label: 'Software reviews', count: 18 },
      { pattern: '/lab/compare/:slug/', label: 'Head-to-head comparisons', count: 24 },
      { pattern: '/lab/field-trials/:slug/', label: 'Field trials', count: 8 },
    ],
  },
  {
    id: 'arena',
    eyebrow: 'Arena',
    title: 'Competition and leaderboards',
    path: '/arena/',
    blurb:
      'Skills competitions built as real competency tests: pest ID speed rounds, label literacy, inspection sims. National and state rankings.',
    job: 'Retention, and the most cleanly sponsorable inventory on the site.',
    primaryEntity: 'Event / ItemList',
    spokes: [
      { pattern: '/arena/games/:slug/', label: 'Games', count: 10 },
      { pattern: '/arena/tournaments/:slug/', label: 'Tournaments', count: 16 },
      { pattern: '/arena/leaderboards/', label: 'National leaderboard', count: 1 },
      { pattern: '/arena/leaderboards/:state/', label: 'State leaderboards', count: 50 },
      { pattern: '/arena/season/:n/', label: 'Season archives', count: 'open' },
    ],
  },
  {
    id: 'trade',
    eyebrow: 'Trade',
    title: 'Jobs, pay and ownership',
    path: '/trade/',
    blurb:
      'What the work pays by role and region, who is hiring in your state, and what it takes to start or sell a pest control company.',
    job: 'Career mobility for members; recruiting inventory for operators.',
    primaryEntity: 'JobPosting / Dataset',
    spokes: [
      { pattern: '/trade/jobs/:state/', label: 'Jobs by state', count: 50 },
      { pattern: '/trade/salary/:role/', label: 'Pay data by role', count: 12 },
      { pattern: '/trade/start/:state/', label: 'Starting a company', count: 50 },
      { pattern: '/trade/owners/:slug/', label: 'Owner topics', count: 18 },
    ],
  },
  {
    id: 'wire',
    eyebrow: 'Wire',
    title: 'Regulatory news and label changes',
    path: '/wire/',
    blurb:
      'Label changes, EPA actions, state regulatory updates, recalls and industry acquisitions. Sourced, dated and fast.',
    job: 'News velocity. The fastest route to habitual return visits.',
    primaryEntity: 'NewsArticle',
    spokes: [
      { pattern: '/wire/:slug/', label: 'Articles', count: 'open' },
      { pattern: '/wire/regulatory/:state/', label: 'State regulatory', count: 50 },
    ],
  },
  {
    id: 'partners',
    eyebrow: 'Partners',
    title: 'Sponsorship and partnership',
    path: '/partners/',
    blurb:
      'Who the members are, what can be sponsored, what it costs, and where the line between sponsorship and editorial sits.',
    job: 'Sponsor conversion. Do not open this funnel before the Academy produces traffic.',
    primaryEntity: 'Offer / Organization',
    spokes: [
      { pattern: '/partners/audience/', label: 'Audience data', count: 1 },
      { pattern: '/partners/sponsorship/', label: 'Tiers and pricing', count: 1 },
      { pattern: '/partners/inventory/', label: 'Sponsorable inventory', count: 1 },
      { pattern: '/partners/:brand/', label: 'Partner pages', count: 'open' },
      { pattern: '/partners/media-kit/', label: 'Media kit', count: 1 },
    ],
  },
  {
    id: 'about',
    eyebrow: 'Trust',
    title: 'Who runs this and how it works',
    path: '/about/',
    blurb:
      'The team, the advisory board, how content is researched and reviewed, how reviews are conducted, and how licenses are verified.',
    job: 'E-E-A-T anchor. These pages ship before content, not after.',
    primaryEntity: 'AboutPage / Person',
    spokes: [
      { pattern: '/about/team/:slug/', label: 'Team', count: 'open' },
      { pattern: '/about/advisory-board/', label: 'Advisory board', count: 1 },
      { pattern: '/about/editorial-standards/', label: 'Editorial standards', count: 1 },
      { pattern: '/about/review-methodology/', label: 'Review methodology', count: 1 },
      { pattern: '/about/sponsorship-policy/', label: 'Sponsorship policy', count: 1 },
      { pattern: '/about/verification/', label: 'License verification', count: 1 },
      { pattern: '/about/code-of-conduct/', label: 'Code of conduct', count: 1 },
      { pattern: '/about/press/', label: 'Press', count: 1 },
    ],
  },
];

export function getHub(id: HubId): Hub {
  const hub = HUBS.find((h) => h.id === id);
  if (!hub) throw new Error(`Unknown hub: ${id}. Add it to lib/content/hubs.ts first.`);
  return hub;
}

/** Primary nav. Partners and About live in the footer — the three funnels stay separated. */
export const PRIMARY_NAV: HubId[] = ['academy', 'community', 'lab', 'arena', 'trade', 'wire'];

/** Forum categories. Ordered by expected thread volume, not alphabetically. */
export const FORUM_CATEGORIES = [
  { slug: 'general-household', name: 'General household' },
  { slug: 'termite-wdo', name: 'Termite & WDO' },
  { slug: 'rodents-exclusion', name: 'Rodents & exclusion' },
  { slug: 'bed-bugs', name: 'Bed bugs' },
  { slug: 'commercial-food-safety', name: 'Commercial & food safety' },
  { slug: 'sales-pricing', name: 'Sales & pricing' },
  { slug: 'owners-operations', name: 'Owners & operations' },
  { slug: 'equipment', name: 'Equipment' },
  { slug: 'wildlife', name: 'Wildlife' },
  { slug: 'mosquito-vector', name: 'Mosquito & vector' },
  { slug: 'fumigation', name: 'Fumigation' },
  { slug: 'turf-ornamental', name: 'Turf & ornamental' },
  { slug: 'rookies', name: 'Rookies' },
] as const;
