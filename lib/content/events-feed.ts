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
  /** upcoming = announced, running = under way, past = date has gone by (not a claim about results). */
  status: 'upcoming' | 'running' | 'past';
  /** Last day; after it a running event drops off the 'running now' slots automatically. */
  endDate?: string;
  summary: string;
  sponsors: string[];
  image?: EventImage;
  /** Newest first. */
  updates?: EventUpdate[];
  /** Stream or recording. */
  watch?: string;
  /** Meta description override (140–160 chars) when the generated one doesn't fit. */
  seoDescription?: string;
}

export const EVENTS: LtkEvent[] = [
  {
    id: 'pestworld-2026',
    name: 'LTK at PestWorld 2026',
    when: 'October 20 – 23, 2026 · Gaylord Texan, Grapevine, Texas',
    startDate: '2026-10-20',
    endDate: '2026-10-23',
    game: 'In person',
    status: 'upcoming',
    seoDescription: "LTK is heading to PestWorld 2026, October 20 to 23 at the Gaylord Texan in Grapevine, Texas. Meet the crew behind the community; details in the Discord.",
    summary: 'LTK is heading to PestWorld 2026, our first full organizational PestWorld. Explore the community, meet the people behind it, and discover new ways to learn and connect. Meetup details go out in the Discord.',
    sponsors: [],
  },
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
        title: 'Week 1 results (September 2026)',
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
    id: 'ready-or-not-2026',
    endDate: '2026-10-04',
    seoDescription: "LTK's Ready or Not tournament, October 4 at 7 PM: a squad tactics showdown for pest control pros in the LTK Discord. Test your tactics, prove your precision.",
    name: 'LTK Ready or Not tournament',
    when: 'October 4, 2026 · 7 PM',
    startDate: '2026-10-04',
    game: 'Ready or Not',
    status: 'running',
    summary: 'Test your tactics, prove your precision: a squad tactics tournament in the LTK Discord. Sign-ups and details are in the server.',
    sponsors: [],
    image: {
      src: '/events/ready-or-not-2025.webp',
      width: 1000,
      height: 745,
      alt: 'LTK presents: Ready or Not tournament. Test your tactics. Prove your precision.',
    },
  },
  {
    id: 'rocket-league-2026',
    name: 'LTK Rocket League tournament',
    when: 'Sunday, June 28, 2026 · 6:30 PM CT',
    startDate: '2026-06-28',
    game: 'Rocket League',
    status: 'past',
    seoDescription: "LTK's Rocket League tournament, Sunday June 28, 2026 at 6:30 PM CT: rocket-powered soccer for pest pros, sponsored by Swarm, Pest Patrol and Polaris.",
    summary: 'Rocket-powered soccer night in the LTK Discord, sponsored by Swarm Pest Control Marketing, Pest Patrol and Polaris Pest Group.',
    sponsors: ['swarm', 'pest-patrol', 'polaris'],
    image: { src: '/events/rocket-league-2026.webp', width: 1000, height: 1500, alt: 'Rocket League Tournament poster: two rocket cars and the ball, Sunday June 28th, 6:30 PM CT, with Swarm, Pest Patrol, Polaris and LTK logos.' },
  },
  {
    id: 'cod-zombies-solo-survival',
    name: 'LTK Cold War Zombies Solo Survival',
    when: 'Solo challenge',
    game: 'Call of Duty: Black Ops Cold War — Zombies',
    status: 'past',
    seoDescription: "LTK's Call of Duty Cold War Zombies Solo Survival: one player, no backup, highest round wins. Sponsored by Swarm, Pest Patrol and Polaris Pest Group.",
    summary: 'One player, no backup, survive the horde: the highest round reached wins. Sponsored by Swarm, Pest Patrol and Polaris Pest Group.',
    sponsors: ['swarm', 'pest-patrol', 'polaris'],
    image: { src: '/events/cod-zombies-solo.webp', width: 1000, height: 1500, alt: 'Call of Duty Cold War Zombies Solo Survival poster: a soldier on a ledge above a zombie horde. Mode: solo zombies survival; winner: highest round reached.' },
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
    id: 'poker-2026',
    name: 'LTK Poker Tournament',
    when: 'January 24, 2026 · 7 PM CST',
    startDate: '2026-01-24',
    game: 'Poker',
    status: 'past',
    seoDescription: "LTK's poker tournament night, January 24, 2026 at 7 PM CST, in the LTK Discord, sponsored by Steri-Fab, Swarm, Pest Patrol and Polaris Pest Group.",
    summary: 'A poker night in the LTK Discord, sponsored by Steri-Fab, Swarm, Pest Patrol and Polaris Pest Group.',
    sponsors: ['steri-fab', 'swarm', 'pest-patrol', 'polaris'],
  },
  {
    id: 'battlefield-6-2025',
    name: 'LTK Battlefield 6 Competition',
    when: 'December 12 – 14, 2025',
    startDate: '2025-12-12',
    game: 'Battlefield 6',
    status: 'past',
    seoDescription: "LTK's Battlefield 6 Competition, December 12 to 14, 2025: a weekend battle with four winners, sponsored by Steri-Fab, Swarm, Pest Patrol and Polaris.",
    summary: 'A weekend Battlefield 6 competition hosted by LTK with four winners, backed by Steri-Fab, Swarm, Pest Patrol and Polaris Pest Group.',
    sponsors: ['steri-fab', 'swarm', 'pest-patrol', 'polaris'],
    image: { src: '/events/battlefield-6-2025.webp', width: 1000, height: 1018, alt: 'Battlefield 6 Competition poster, hosted by LTK: four soldiers in a burning city street.' },
  },
  {
    id: 'osrs-ironman-2025',
    seoDescription: "LTK's Old School RuneScape Ironman Challenge ran July 18 to August 18, 2025, backed by Steri-Fab, Swarm and Pest Patrol. A month-long grind for pest pros.",
    name: 'LTK Old School RuneScape Ironman Challenge',
    when: 'July 18 – August 18, 2025',
    startDate: '2025-07-18',
    game: 'Old School RuneScape',
    status: 'past',
    summary: 'A month-long Ironman challenge in Old School RuneScape, backed by Steri-Fab, Swarm and Pest Patrol.',
    sponsors: ['steri-fab', 'swarm', 'pest-patrol'],
    image: { src: '/events/osrs-ironman-2025.webp', width: 1000, height: 1000, alt: 'Old School RuneScape Ironman Challenge, July 18 to August 18, with Steri-Fab, Swarm and Pest Patrol logos.' },
  },
  {
    id: 'college-football-2025',
    name: 'LTK College Football 2025',
    when: 'July 9, 2025',
    startDate: '2025-07-09',
    game: 'College Football 25',
    status: 'past',
    summary: 'A College Football 25 game night, 6 to 9 PM, sponsored by Swarm Pest Control Marketing.',
    sponsors: ['swarm'],
    image: { src: '/events/college-football-2025.webp', width: 1000, height: 1000, alt: 'College Football 2025 poster: a player standing over a pack of rats, July 9th, 6 to 9 PM, sponsored by Swarm Pest Control Marketing.' },
  },
  {
    id: 'halo-3-2025',
    name: 'LTK Halo 3 tournament',
    when: 'June 21, 2025',
    startDate: '2025-06-21',
    game: 'Halo 3',
    status: 'past',
    summary: 'A Halo 3 tournament night, 6 to 10 PM, hosted by Pest Patrol and streamed live on the LTK YouTube channel.',
    image: { src: '/events/halo-3-2025.webp', width: 1000, height: 1500, alt: 'Halo event poster: June 21, 6 to 10, hosted by Pest Patrol, with the LTK badge and Master Chief.' },
    sponsors: ['pest-patrol', 'steri-fab'],
    watch: 'https://www.youtube.com/watch?v=ouDDiWHdpco',
  },
  {
    id: 'snowrunner-2025',
    seoDescription: "LTK's Snowrunner tournament, June 7, 2025: an off-road hauling night for pest control pros in the LTK Discord. See the poster and every other LTK event.",
    name: 'LTK Snowrunner tournament',
    when: 'June 7, 2025',
    startDate: '2025-06-07',
    game: 'Snowrunner',
    status: 'past',
    summary: 'An off-road hauling tournament in Snowrunner, 8 PM in the Discord.',
    sponsors: [],
    image: { src: '/events/snowrunner-2025.webp', width: 1000, height: 1500, alt: 'LTK Tournament: Snowrunner, June 7th at 8 PM, a truck pushing through deep snow.' },
  },
  {
    id: 'warhammer-kill-team-2025',
    seoDescription: "LTK's in-person Warhammer Kill Team tournament and painting contest, June 1, 2025, at Dragon's Lair Comics & Fantasy in Houston, backed by Nisus.",
    name: 'LTK Warhammer Kill Team & painting contest',
    when: 'June 1, 2025',
    startDate: '2025-06-01',
    game: 'Warhammer 40,000: Kill Team',
    status: 'past',
    summary: 'LTK’s in-person tabletop day at Dragon’s Lair Comics & Fantasy in Houston: a Kill Team tournament plus a miniature painting contest, backed by Nisus.',
    sponsors: ['nisus'],
    image: { src: '/events/warhammer-kill-team-2025.webp', width: 1000, height: 1294, alt: 'Painting contest and Warhammer 40,000 Kill Team tournament poster, Dragon’s Lair Comics & Fantasy, Houston, June 1st, 10 AM, with LTK and Nisus logos.' },
  },
  {
    id: 'kill-race-2025',
    seoDescription: "LTK's Helldivers 2 Kill Race, May 24 to 25, 2025: eliminate the Terminid menace. A weekend kill race for pest control pros, backed by Nisus.",
    name: 'LTK Helldivers 2 Kill Race',
    when: 'May 24 – 25, 2025',
    startDate: '2025-05-24',
    game: 'Helldivers 2',
    status: 'past',
    summary: 'Eliminate the Terminid menace: a weekend kill race in Helldivers 2, backed by Nisus.',
    sponsors: ['nisus'],
    image: { src: '/events/kill-race-2025.webp', width: 1000, height: 1500, alt: 'Kill Race tournament poster, May 24th to 25th: eliminate the Terminid menace, with Nisus and LTK logos.' },
  },
  {
    id: 'fall-guys-siteone-2025',
    name: 'LTK Fall Guys Tournament',
    when: 'March 28, 2025 · 6 PM CST',
    startDate: '2025-03-28',
    game: 'Fall Guys',
    status: 'past',
    seoDescription: "LTK's Licensed to Kill Fall Guys Tournament, March 28, 2025 at 6 PM CST, presented by SiteOne Landscape Supply. Win big, or die trying, pest pros.",
    summary: 'SiteOne Landscape Supply presents the Licensed to Kill Fall Guys Tournament. Win big… or die trying.',
    sponsors: ['siteone'],
    image: { src: '/events/fall-guys-siteone.webp', width: 1000, height: 1500, alt: 'SiteOne Landscape Supply presents the Licensed to Kill Fall Guys Tournament, March 28th at 6 PM CST: spy-themed Fall Guys characters in an explosion.' },
  },
];

const today = () => new Date().toISOString().slice(0, 10);
/** Upcoming first, then running; anything whose endDate has passed drops out. */
export const RUNNING = EVENTS.filter((e) => (e.status === 'running' || e.status === 'upcoming') && (!e.endDate || e.endDate >= today()));
export const PAST = EVENTS.filter((e) => e.status === 'past' || (e.status !== 'upcoming' && !!e.endDate && e.endDate < today()));

/** The label to show for an event right now. */
export function statusLabel(e: LtkEvent): 'Coming up' | 'Running now' | 'Past' {
  if (e.endDate && e.endDate < today()) return 'Past';
  if (e.status === 'upcoming') return 'Coming up';
  return e.status === 'running' ? 'Running now' : 'Past';
}
