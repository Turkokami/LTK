/**
 * conversion.ts — the Conversion Contract (Keystone v3.2 Part 4A), the snippet-shape contract
 * (Part 4.3), and the citability register (Part 6.5), declared per page type in one file.
 *
 * Three rules this file exists to enforce:
 *
 *   1. ONE primary action per page type. If a page has two, it has none.
 *   2. The declared snippet shape must be backed by REAL SEMANTIC MARKUP. A page that declares
 *      `table` ships a <table>, not a grid of divs that looks like one.
 *   3. LEAD MAGNETS ARE BANNED on any page carrying a declared primary action. They trade a
 *      quote-ready visitor for an email address. They may exist only on a dedicated landing
 *      page excluded from the hub and geo trees.
 *
 * When you add a page type, add it here first. A page type with no contract does not ship.
 */

export type SnippetShape = 'paragraph' | 'list' | 'table';

/** Keystone Part 6.5. A page type should hit at least two. The Lab should hit all four. */
export interface Citability {
  /** A quantified fact from outside this business, with a source. */
  quantifiedSourcedFact: boolean;
  /** An outbound link to a primary authority, in visible body text — not a footnote. */
  outboundPrimaryAuthority: boolean;
  /** A stated position. Something a competitor could disagree with. */
  statedPosition: boolean;
  /** Data we generated that exists nowhere else. */
  firstPartyData: boolean;
}

export interface PageContract {
  /** Route pattern, matching lib/content/hubs.ts. */
  pattern: string;
  /** Exactly one. The button text is the action name and does not change through the flow. */
  primaryAction: string;
  /** Where that action goes. */
  actionHref: string;
  /** Secondary actions are permitted but must be visually subordinate and never compete. */
  secondary?: string[];
  snippetShape: SnippetShape;
  /** The markup that shape obliges. Checked in review. */
  shapeMarkup: string;
  citability: Citability;
  notes?: string;
}

const none: Citability = {
  quantifiedSourcedFact: false,
  outboundPrimaryAuthority: false,
  statedPosition: false,
  firstPartyData: false,
};

export const CONTRACTS: PageContract[] = [
  {
    pattern: '/',
    primaryAction: 'Verify my licence',
    actionHref: '/join/',
    secondary: ["Find my state's rules"],
    snippetShape: 'paragraph',
    shapeMarkup: 'Answer-first opening paragraph, self-contained, directly after the H1.',
    citability: { ...none, statedPosition: true },
  },
  {
    pattern: '/academy/ceu/:state/',
    primaryAction: 'Tell us what changed',
    actionHref: '/join/',
    snippetShape: 'table',
    shapeMarkup: 'Real <table> of hours by licence category. Not a div grid.',
    citability: {
      quantifiedSourcedFact: true,
      outboundPrimaryAuthority: true,
      statedPosition: true,
      firstPartyData: true,
    },
    notes:
      'Stated position: we publish per-category hours rather than a pooled total, because a ' +
      'pooled number is the most common way a technician ends up short at renewal. ' +
      'First-party data: member-reported rule changes, which arrive before agencies publish them.',
  },
  {
    pattern: '/academy/licensing/:state/',
    primaryAction: 'Tell us what changed',
    actionHref: '/join/',
    snippetShape: 'table',
    shapeMarkup: 'Real <table> of licence category codes and names, using the agency’s own codes.',
    citability: {
      quantifiedSourcedFact: true,
      outboundPrimaryAuthority: true,
      statedPosition: true,
      firstPartyData: false,
    },
  },
  {
    pattern: '/community/forums/:category/:thread/',
    primaryAction: 'Verify my licence',
    actionHref: '/join/',
    snippetShape: 'paragraph',
    shapeMarkup: 'Opening post body as the answer. DiscussionForumPosting.articleBody.',
    citability: { ...none, firstPartyData: true, statedPosition: true },
    notes: 'First-party by construction — this content exists nowhere else in retrievable form.',
  },
  {
    pattern: '/lab/compare/:slug/',
    primaryAction: 'Read the methodology',
    actionHref: '/about/review-methodology/',
    secondary: ['Rate this yourself'],
    snippetShape: 'table',
    shapeMarkup: 'Real comparison <table>, identical criteria across every product in the set.',
    citability: {
      quantifiedSourcedFact: true,
      outboundPrimaryAuthority: true,
      statedPosition: true,
      firstPartyData: true,
    },
    notes: 'The only page type expected to hit all four citability signals.',
  },
  {
    pattern: '/lab/technology/:slug/',
    primaryAction: 'See what members use',
    actionHref: '/lab/',
    snippetShape: 'paragraph',
    shapeMarkup: 'Answer-first definition paragraph, then a list of where it does and does not fit.',
    citability: {
      quantifiedSourcedFact: true,
      outboundPrimaryAuthority: true,
      statedPosition: true,
      firstPartyData: false,
    },
  },
  {
    pattern: '/trade/jobs/:state/',
    primaryAction: 'Post a role',
    actionHref: '/partners/',
    secondary: ['Verify my licence'],
    snippetShape: 'list',
    shapeMarkup: 'Real <ul> of postings. JobPosting per item.',
    citability: { ...none, firstPartyData: true },
  },
  {
    pattern: '/trade/salary/:role/',
    primaryAction: 'Add your numbers',
    actionHref: '/join/',
    snippetShape: 'table',
    shapeMarkup: 'Real <table> by region and tenure. Dataset node.',
    citability: {
      quantifiedSourcedFact: true,
      outboundPrimaryAuthority: false,
      statedPosition: true,
      firstPartyData: true,
    },
    notes: 'Original survey data. The strongest link magnet available in this vertical.',
  },
  {
    pattern: '/partners/audience/',
    primaryAction: 'Start a conversation',
    actionHref: '/about/contact/',
    snippetShape: 'table',
    shapeMarkup: 'Real <table> of audience composition, with a visible updated-on date.',
    citability: { ...none, firstPartyData: true, statedPosition: true },
    notes:
      'The one page a sponsor will fact-check. Publishing an unverified number here is ' +
      'unrecoverable. REGISTRY R-17.',
  },
  {
    pattern: '/investors/',
    primaryAction: 'Request the data room',
    actionHref: '/about/contact/',
    snippetShape: 'paragraph',
    shapeMarkup: 'Thesis paragraph, self-contained.',
    citability: { ...none, quantifiedSourcedFact: true, statedPosition: true },
  },
];

export function contractFor(pattern: string): PageContract | undefined {
  return CONTRACTS.find((c) => c.pattern === pattern);
}

/** Page types on which a lead magnet, gated PDF or email-wall may never appear. */
export const LEAD_MAGNET_BANNED = CONTRACTS.map((c) => c.pattern);
