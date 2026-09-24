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
}

export const EPISODES: Episode[] = [
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
