/**
 * timeline.ts — LTK since 2025, for visitors who assume a new website means a new community.
 *
 * Every entry is dated and sourced: YouTube upload dates (lib/content/podcast.ts), the Discord
 * #our-sponsors posts (dates as posted), the owner's event posters, and published press.
 * Add entries the same way — no undated or unsourced claims.
 */

export interface Milestone {
  /** YYYY-MM-DD, or YYYY-MM when only the month is known. */
  date: string;
  title: string;
  body: string;
  kind: 'community' | 'gaming' | 'sponsor' | 'press' | 'podcast';
  href?: string;
}

export const MILESTONES: Milestone[] = [
  {
    date: '2025-01-01',
    title: 'LTK starts',
    body: 'Marcus Scruggs starts Licensed to Kill so pest pros on different routes can get to know each other. It begins as a video game group.',
    kind: 'community',
    href: '/about/',
  },
  {
    date: '2025-02-20',
    title: 'First video: Community Buzz #1',
    body: 'LTK’s YouTube channel goes live with its first community update.',
    kind: 'podcast',
    href: '/community/podcast/',
  },
  {
    date: '2025-03-11',
    title: 'Industry interview series begins',
    body: 'The podcast starts sitting down with people across the trade, from technicians and owners to the VP of Steri-Fab.',
    kind: 'podcast',
    href: '/community/podcast/',
  },
  {
    date: '2025-06-21',
    title: 'Halo 3 tournament',
    body: 'A members-only Halo 3 tournament, streamed live and sponsored by Pest Patrol and Steri-Fab.',
    kind: 'gaming',
    href: 'https://www.youtube.com/watch?v=ouDDiWHdpco',
  },
  {
    date: '2025-11-04',
    title: 'Sponsors get their own channel',
    body: '#our-sponsors opens in the Discord, introducing Pest Patrol PDX and Swarm Pest Control Marketing to every member.',
    kind: 'sponsor',
    href: '/partners/',
  },
  {
    date: '2025-12-02',
    title: 'Polaris Pest Group joins',
    body: 'Polaris Pest Group comes on as a sponsor.',
    kind: 'sponsor',
    href: '/partners/',
  },
  {
    date: '2026-02',
    title: 'Apex Legends tournament',
    body: 'A weekend Apex Legends tournament backed by four sponsors: Steri-Fab, Pest Patrol, Polaris Pest Group and Swarm.',
    kind: 'gaming',
    href: '/community/events/',
  },
  {
    date: '2026-06-29',
    title: 'Featured in Professional Pest Controller',
    body: 'The British Pest Control Association’s magazine runs “Licensed to connect”, an interview with Marcus about how LTK works (issue 123).',
    kind: 'press',
    href: 'https://ppconline.org/ppc123/licensed-to-connect',
  },
  {
    date: '2026-07-07',
    title: 'Podcast Season 2',
    body: 'Season 2 opens live with a debate: how much access should homeowners have to professional pest control products?',
    kind: 'podcast',
    href: '/community/podcast/',
  },
  {
    date: '2026-09',
    title: 'Fantasy Football 2026 kicks off',
    body: 'The LTK league starts its season, sponsored by Swarm, Pest Patrol and Polaris Pest Group.',
    kind: 'gaming',
    href: '/community/events/',
  },
];

/** Press coverage, for "as featured in" placements. */
export const PRESS = [
  {
    outlet: 'Professional Pest Controller',
    publisher: 'British Pest Control Association',
    title: 'Licensed to connect: the pest control water cooler',
    date: '2026-06-29',
    issue: 'Issue 123',
    url: 'https://ppconline.org/ppc123/licensed-to-connect',
  },
];

export function formatMilestoneDate(d: string): string {
  const [y, m, day] = d.split('-').map(Number);
  const date = new Date(Date.UTC(y!, (m ?? 1) - 1, day ?? 1));
  return date.toLocaleDateString('en-US', { timeZone: 'UTC', month: 'long', year: 'numeric', ...(day ? { day: 'numeric' } : {}) });
}
