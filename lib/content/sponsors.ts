/**
 * sponsors.ts — LTK's current sponsors, as supplied by the owner (2026-10-03).
 *
 * Logos are the owner-supplied files (public/sponsors/), except Polaris, which is the logo
 * from Polaris's own site until the owner sends one. Websites and descriptions follow the LTK
 * Discord's #our-sponsors posts (paraphrased: no verbatim Discord quotes).
 *
 * Sponsor links carry rel="sponsored" and every placement is labelled — see
 * /about/sponsorship-policy/. Sponsors never touch editorial, the Lab or the pest library.
 */

import { EVENTS } from './events-feed';

export interface Sponsor {
  id: string;
  name: string;
  /** Confirmed website, or null until confirmed. */
  url: string | null;
  logo: { src: string; width: number; height: number };
  /** The logo is drawn for a light (white) or dark plate. */
  plate: 'light' | 'dark';
  /** One plain line on what they do. */
  what: string;
  /** LTK events they've backed, newest first (event ids from events-feed.ts). */
  backed: string[];
  /** Current sponsor (banner, footer, partners wall). Past backers keep their page and event credit. */
  current?: boolean;
}

export const SPONSORS: Sponsor[] = [
  {
    id: 'swarm',
    name: 'Swarm Pest Control Marketing',
    url: 'https://www.swarmpestcontrolmarketing.com/',
    logo: { src: '/sponsors/swarm.webp', width: 869, height: 360 },
    plate: 'light',
    what: 'A Tucson, Arizona agency doing digital marketing only for pest control companies: SEO, websites and paid ads.',
    backed: ['fantasy-football-2026', 'apex-legends-2026', 'osrs-ironman-2025', 'college-football-2025'],
  },
  {
    id: 'pest-patrol',
    name: 'Pest Patrol PDX',
    url: 'https://www.pestpatrolpdx.com/',
    logo: { src: '/sponsors/pest-patrol.webp', width: 718, height: 360 },
    plate: 'light',
    what: 'Locally owned pest control for homes and businesses around Portland and Salem, Oregon.',
    backed: ['fantasy-football-2026', 'apex-legends-2026', 'osrs-ironman-2025', 'halo-3-2025'],
  },
  {
    id: 'polaris',
    name: 'Polaris Pest Group',
    url: 'https://polarispestgroup.com/',
    logo: { src: '/sponsors/polaris-pest-group.png', width: 277, height: 66 },
    plate: 'dark',
    what: 'Brings together established pest control companies across the Southwest and backs them for the long term.',
    backed: ['fantasy-football-2026', 'apex-legends-2026'],
  },
  {
    id: 'steri-fab',
    name: 'Steri-Fab',
    url: 'https://www.sterifab.com/',
    logo: { src: '/sponsors/steri-fab.webp', width: 1188, height: 360 },
    plate: 'light',
    what: 'Insecticide and disinfectant in one spray, a bed bug staple for decades.',
    backed: ['apex-legends-2026', 'osrs-ironman-2025', 'halo-3-2025'],
  },
];

// Past backers: credited on their events and their own page, not in the current-sponsor rotation.
SPONSORS.push({
  id: 'nisus',
  name: 'Nisus',
  url: 'https://nisuscorp.com/',
  logo: { src: '/sponsors/nisus.png', width: 758, height: 662 },
  plate: 'dark',
  what: 'Pest control product maker behind the Helldivers 2 Kill Race and the Warhammer painting contest.',
  backed: ['warhammer-kill-team-2025', 'kill-race-2025'],
  current: false,
});

SPONSORS.push({
  id: 'siteone',
  name: 'SiteOne Landscape Supply',
  url: 'https://www.siteone.com/',
  logo: { src: '/sponsors/siteone-logo.png', width: 1138, height: 298 },
  plate: 'dark',
  what: 'Landscape and pest control supply distributor, and presenter of the LTK Fall Guys Tournament.',
  backed: [],
  current: false,
});

// Every sponsor's "backed" list comes from the events themselves, newest first.
for (const sp of SPONSORS) sp.backed = EVENTS.filter((e) => e.sponsors.includes(sp.id)).map((e) => e.id);

export const CURRENT_SPONSORS = SPONSORS.filter((s) => s.current !== false);

export const getSponsor = (id: string) => SPONSORS.find((s) => s.id === id);
