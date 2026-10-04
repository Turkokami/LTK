/**
 * events-feed.ts — LTK's competitions: what's running now, its updates, and past events.
 *
 * Member rule (owner questionnaire): no member names unless self-identified. Marcus is the
 * only member named; league results show places and points, not other members' names.
 * Play for fun; prize details stay in the Discord (REGISTRY R-18).
 */

export interface EventImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface EventUpdate {
  title: string;
  body: string[];
  image?: EventImage;
}

export interface LtkEvent {
  id: string;
  name: string;
  /** Plain-language timing, as LTK announced it. */
  when: string;
  /** ISO start date when known exactly (for Event schema); omitted when only the season is known. */
  startDate?: string;
  /** The game played. */
  game: string;
  status: 'running' | 'past';
  summary: string;
  sponsors: string[];
  image?: EventImage;
  /** Newest first. */
  updates?: EventUpdate[];
  /** Stream or recording. */
  watch?: string;
}

export const EVENTS: LtkEvent[] = [
  {
    id: 'fantasy-football-2026',
    name: 'LTK Fantasy Football',
    when: '2026 season · running now',
    game: 'Fantasy football (NFL)',
    status: 'running',
    summary: 'The LTK league runs all NFL season in the Discord, with weekly results posted here and in the server.',
    sponsors: ['swarm', 'pest-patrol', 'polaris'],
    updates: [
      {
        title: 'Week 1: results are in',
        body: [
          'Marcus S. opens the season on top with 177.66 points, the best score of the week. Second place posted 161.46 and third 146.62.',
          'Best single player score: Caleb Williams with 37.26 points, on Marcus’s roster.',
        ],
        image: {
          src: '/events/fantasy-football-2026-week-1.webp',
          width: 1672,
          height: 941,
          alt: 'Licensed to Kill Fantasy Football, 2026 season: Week 1 results are in. Sponsored by Swarm Pest Control Marketing, Pest Patrol and Polaris Pest Group.',
        },
      },
    ],
  },
  {
    id: 'apex-legends-2026',
    name: 'LTK Apex Legends tournament',
    when: 'Weekend of February 21, 2026',
    startDate: '2026-02-21',
    game: 'Apex Legends',
    status: 'past',
    summary: 'A weekend Apex Legends tournament for LTK Discord members.',
    sponsors: ['steri-fab', 'pest-patrol', 'polaris', 'swarm'],
    image: {
      src: '/events/apex-legends-2026.webp',
      width: 1024,
      height: 1536,
      alt: 'LTK Apex Legends tournament poster, weekend of February 21st, with Steri-Fab, Pest Patrol, Polaris Pest Group and Swarm Pest Control Marketing logos.',
    },
  },
  {
    id: 'halo-3-2025',
    name: 'LTK Halo 3 tournament',
    when: 'June 21, 2025',
    startDate: '2025-06-21',
    game: 'Halo 3',
    status: 'past',
    summary: 'A Halo 3 tournament streamed live on the LTK YouTube channel.',
    sponsors: ['pest-patrol', 'steri-fab'],
    watch: 'https://www.youtube.com/watch?v=ouDDiWHdpco',
  },
];

export const RUNNING = EVENTS.filter((e) => e.status === 'running');
export const PAST = EVENTS.filter((e) => e.status === 'past');
