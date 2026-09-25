/**
 * podcast.ts — LTK on the podcast circuit, and the show's own episodes as they land.
 *
 * Only owner-supplied episodes go here. Facts per episode come from the video itself
 * (YouTube oEmbed + the watch page): title, channel, publish date, length. Summaries are
 * written for this site — never paste the channel's description.
 *
 * TRANSCRIPTS (REGISTRY R-11): every episode should carry an on-page transcript so the talk
 * is findable by text search. `transcript` stays null until one exists; never auto-generate
 * and publish one unreviewed.
 */

export interface Episode {
  slug: string;
  youtubeId: string;
  title: string;
  /** The channel that published it. */
  show: string;
  showUrl: string;
  /** ISO date. */
  published: string;
  /** Seconds. */
  lengthSeconds: number;
  guests: string[];
  summary: string;
  /** Why an LTK member should press play. One line. */
  hook: string;
  transcript: string | null;
  /** Other copies of the same episode (e.g. the original livestream). */
  alsoAt?: { label: string; url: string }[];
}

/** LTK's own show. Episodes live on Spotify; link out rather than re-host. */
export const LTK_SHOW = {
  name: 'The Licensed to Kill Podcast',
  host: 'LTK Director',
  spotifyId: '032iBDHKytatvGWMxtj20h',
  spotifyUrl: 'https://open.spotify.com/show/032iBDHKytatvGWMxtj20h',
  blurb:
    'Pest control pros sharing what they know: techniques, products, industry news and the field stories you only hear from people who were there. Hosted by the LTK Director.',
  firstEpisode: {
    title: 'Meet The Director',
    released: '2025-01-31',
    url: 'https://open.spotify.com/episode/4lH88msfWKHCPDhdXaXmsp',
  },
} as const;

/**
 * Appearances by LTK people on other shows. The first entry is featured; the rest run newest first.
 */
export const EPISODES: Episode[] = [
  {
    slug: 'pest-perspectives-ep-36-marcus-scruggs',
    youtubeId: 'oFLsfdOoSak',
    title: 'Commercial pest control in food sites: audits, sanitation and public health',
    show: 'Pest Perspectives',
    showUrl: 'https://www.youtube.com/@PestPerspectivespodcast',
    published: '2025-10-01',
    lengthSeconds: 4059,
    guests: ['Marcus Scruggs'],
    summary:
      'Pest Perspectives episode 36. Marcus Scruggs — more than ten years as a pest management professional, specializing in food safety, audits, sanitation and public health — talks commercial work in food sites, and how Licensed to Kill brings pest control and gaming together in one community.',
    hook: 'The food-plant side of the trade: audits, sanitation and why it matters for public health.',
    transcript: null,
    alsoAt: [{ label: 'Original livestream', url: 'https://www.youtube.com/watch?v=Sf9eg7342i0' }],
  },
  {
    slug: 'main-street-mogul-marcus-scruggs',
    youtubeId: 'ORT0LXLOEuM',
    title: 'Marcus Scruggs: Licensed to Kill',
    show: 'Jared LaJaunie (Main Street Mogul)',
    showUrl: 'https://www.youtube.com/@Mainstreetmogul',
    published: '2025-10-22',
    lengthSeconds: 648,
    guests: ['Marcus Scruggs'],
    summary: 'A short conversation with Marcus Scruggs about Licensed to Kill on Jared LaJaunie’s Main Street Mogul channel.',
    hook: 'Ten minutes on LTK, if you want the quick version.',
    transcript: null,
  },
  {
    slug: 'marcus-scruggs-licensed-to-kill',
    youtubeId: 'S7PpI1XNBwk',
    title: 'Marcus Scruggs: “Licensed to Kill”',
    show: 'Kill Line Pest Control',
    showUrl: 'https://www.youtube.com/@killlinepestcontrol',
    published: '2025-05-03',
    lengthSeconds: 6016,
    guests: ['Marcus Scruggs'],
    summary:
      'Marcus Scruggs, a working pest technician and the creator of the Licensed to Kill Discord, sits down for a long-form conversation about building an online home where pest control pros can meet, talk shop and game together.',
    hook: 'The origin story of the LTK community, from the person who started it.',
    transcript: null,
  },
];

export const PODCAST_PATH = '/community/podcast/';

export function formatLength(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  return h ? `${h} hr ${m} min` : `${m} min`;
}

/** ISO 8601 duration for VideoObject.duration. */
export function isoDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `PT${h ? `${h}H` : ''}${m ? `${m}M` : ''}${s ? `${s}S` : ''}`;
}
