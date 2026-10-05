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


/* ------------------------------------------------------------------ LTK's own channel */

/** The show's YouTube channel (owner-supplied, 2026-10-01). Every LTK episode lives here. */
export const LTK_YOUTUBE = {
  handle: '@LTKpodcast',
  url: 'https://www.youtube.com/@LTKpodcast',
  channelId: 'UCysoNE0ZCe0boLUMBu-EwvQ',
} as const;

export type LtkSeries = 'interview' | 'pest-talk' | 'beyond-basics' | 'between-sprays' | 'debate' | 'community' | 'live';

export const SERIES: { id: LtkSeries; name: string; blurb: string }[] = [
  { id: 'interview', name: 'Industry Interviews', blurb: 'Owners, entomologists, manufacturers and specialists on their path through the trade.' },
  { id: 'pest-talk', name: 'Pest Talk', blurb: 'One pest, one expert, a full session.' },
  { id: 'beyond-basics', name: 'Beyond the Basics', blurb: 'Going deeper on the technical side: chemistry and certification.' },
  { id: 'debate', name: 'Debates', blurb: 'Two sides of a live industry argument.' },
  { id: 'between-sprays', name: 'Between Sprays', blurb: 'The lighter side: pop culture, cryptids and the trade.' },
  { id: 'community', name: 'Community', blurb: 'Community Buzz, testimonials and the people behind LTK.' },
  { id: 'live', name: 'Live events', blurb: 'Streams and tournaments.' },
];

export interface LtkEpisode {
  youtubeId: string;
  /** As published on the channel. */
  title: string;
  series: LtkSeries;
  /** ISO publish date, from the watch page. */
  published: string;
  lengthSeconds: number;
  /** Guests as named publicly in the episode. */
  guests: string[];
  /** Written for this site from the episode; not the channel description. */
  summary: string;
  alsoAt?: { label: string; url: string }[];
}

/** Every episode on the channel, newest first. Re-pull from the channel when new ones land. */
export const LTK_EPISODES: LtkEpisode[] = [
  {
    youtubeId: "ELByqBmZKPk",
    title: "Debate: How Much Access Should Consumers Have to Pesticides?",
    series: "debate",
    published: "2026-07-07",
    lengthSeconds: 4860,
    guests: [
      "Andrew Sanefski",
      "Sean Kassab"
    ],
    summary: "Season 2 opens with a debate on whether professional pest control products belong over the counter and online. Andrew Sanefski of Perimetek argues they should stay with licensed applicators; Sean Kassab takes the other side.",
    alsoAt: [
      {
        label: "Original livestream (Season 2 premiere)",
        url: "https://www.youtube.com/watch?v=ISEwAEiOh54"
      }
    ]
  },
  {
    youtubeId: "0A4z_JFeI1I",
    title: "Industry Interview: Chad Moreschi",
    series: "interview",
    published: "2026-03-12",
    lengthSeconds: 3873,
    guests: [
      "Chad Moreschi"
    ],
    summary: "Chad Moreschi, owner-operator and co-founder of GorillaDesk, on how field service software is changing the way startups and growing pest companies run."
  },
  {
    youtubeId: "5rFASZVQyE4",
    title: "Industry Interview: Christian Allen",
    series: "interview",
    published: "2026-02-10",
    lengthSeconds: 5181,
    guests: [
      "Christian Allen"
    ],
    summary: "Bonus episode with guest host Jorge Bedoya: Christian Allen, founder and CEO of Tailor Made Pest and Wildlife, on building and scaling a service business, including SEO and local search."
  },
  {
    youtubeId: "_N0aDRzW3rU",
    title: "Between Sprays: Cryptids",
    series: "between-sprays",
    published: "2026-02-03",
    lengthSeconds: 1807,
    guests: [],
    summary: "Bonus episode: cryptids treated as service calls. How would a tech inspect, what tools would actually work, and where does standard operating procedure fall apart?"
  },
  {
    youtubeId: "vPOjOELlpSo",
    title: "Industry Interview: Nick Godfroid",
    series: "interview",
    published: "2026-01-27",
    lengthSeconds: 4771,
    guests: [
      "Nick Godfroid"
    ],
    summary: "Nick Godfroid, BCE, of Rockwell Labs on where the industry is heading, rolling out new technology responsibly, and what innovation means for technician workload, pricing and wages."
  },
  {
    youtubeId: "frrzuyPzTsQ",
    title: "Industry Interview: Jeff Stafford",
    series: "interview",
    published: "2025-12-09",
    lengthSeconds: 3832,
    guests: [
      "Jeff Stafford"
    ],
    summary: "Jeff Stafford on bird control, one of the most overlooked branches of the trade: big installation projects and the growing demand for skilled installers."
  },
  {
    youtubeId: "sNyn2jKLuP4",
    title: "Industry Interview: Chaz Estrada",
    series: "interview",
    published: "2025-11-05",
    lengthSeconds: 4014,
    guests: [
      "Chaz Estrada"
    ],
    summary: "Chaz Estrada, sales rep and marketing director at Nisus and one of LTK’s earliest supporters, on moving from the field to the industry side and building a personal brand."
  },
  {
    youtubeId: "qyM7q9LKxXU",
    title: "Industry Interview: Jarred Lajaunie",
    series: "interview",
    published: "2025-10-25",
    lengthSeconds: 890,
    guests: [
      "Jarred Lajaunie"
    ],
    summary: "Recorded at PestWorld 2025: Jarred Lajaunie, owner of Lajaunie’s Pest Control in Thibodaux, Louisiana, on working his way up from hourly technician to branch manager to owner."
  },
  {
    youtubeId: "M07Vd1sljKw",
    title: "LTK testimonial (Swood/ Ian)",
    series: "community",
    published: "2025-10-25",
    lengthSeconds: 411,
    guests: [
      "Ian (Swood)"
    ],
    summary: "A member turned moderator on what LTK has meant for him, personally and professionally."
  },
  {
    youtubeId: "-WTVxc0KhHs",
    title: "Industry Interview: Christopher Hayes",
    series: "interview",
    published: "2025-09-23",
    lengthSeconds: 3994,
    guests: [
      "Christopher Hayes"
    ],
    summary: "Christopher Hayes on bridging academia and field work, training and leadership development, and how bugs show up in popular culture."
  },
  {
    youtubeId: "X9HitZcaryI",
    title: "Industry Interview: Morgan Manderfield",
    series: "interview",
    published: "2025-09-23",
    lengthSeconds: 4386,
    guests: [
      "Morgan Manderfield"
    ],
    summary: "Morgan Manderfield, BCE and senior entomologist at Ecolab, on AI in pest identification, its promise and the reasons for caution, and where gaming culture meets pest work."
  },
  {
    youtubeId: "282tJO5UkLo",
    title: "Industry Interview: Christopher Harkins",
    series: "interview",
    published: "2025-09-23",
    lengthSeconds: 4718,
    guests: [
      "Christopher Harkins"
    ],
    summary: "Christopher Harkins, senior integration specialist at Skyhawk, on cellular trap-line monitoring, automation and data, and his hands-on bird control work."
  },
  {
    youtubeId: "BpCazhaichY",
    title: "Industry Interview: Maria Sorrentino",
    series: "interview",
    published: "2025-08-04",
    lengthSeconds: 3818,
    guests: [
      "Maria Sorrentino"
    ],
    summary: "Maria Sorrentino, A.C.E., CEO and co-owner of Pest Pros in Michigan and founder of Hive Mind Consulting, on leadership, scaling a business and leading as a woman in the trade."
  },
  {
    youtubeId: "x5htvQ2lEtE",
    title: "Industry Interview: Kimberly Camera",
    series: "interview",
    published: "2025-08-04",
    lengthSeconds: 4430,
    guests: [
      "Kimberly Camera"
    ],
    summary: "Kimberly Camera, canine handler, on working dogs in pest control: bed bug detection, rodent programs, the science of scent and what it takes to train a pest-sniffing dog."
  },
  {
    youtubeId: "11YYL_S7zaI",
    title: "Between Sprays: Pest Control and Pop Culture",
    series: "between-sprays",
    published: "2025-07-01",
    lengthSeconds: 4537,
    guests: [
      "AJ Smith"
    ],
    summary: "With guest AJ Smith: how exterminators are portrayed on TV, in games and in film, from King of the Hill to The Witcher and Van Helsing, and what that means for real techs."
  },
  {
    youtubeId: "ouDDiWHdpco",
    title: "LTK: HALO 3 TOURNAMENT (SPONSORED BY PEST PATROL AND STERI-FAB)",
    series: "live",
    published: "2025-06-21",
    lengthSeconds: 13238,
    guests: [],
    summary: "The LTK Halo 3 tournament, streamed live and sponsored by Pest Patrol and Steri-Fab. Where LTK started: gaming with people in the trade."
  },
  {
    youtubeId: "bFHQKxDkihQ",
    title: "Industry Interview: Sylvia Kenmuir",
    series: "interview",
    published: "2025-04-22",
    lengthSeconds: 3409,
    guests: [
      "Sylvia Kenmuir"
    ],
    summary: "Sylvia Kenmuir, BCE and senior technical representative at BASF, on her career path and what it really takes to go after ACE certification."
  },
  {
    youtubeId: "LctqORdENdo",
    title: "Industry Interview: Dan Porter",
    series: "interview",
    published: "2025-04-22",
    lengthSeconds: 4257,
    guests: [
      "Dan Porter"
    ],
    summary: "Dan Porter, creator of ChemCal, on building an AI-assisted calculation tool that helps applicators get mixes and rates right in the field."
  },
  {
    youtubeId: "hYGgy_U4VsY",
    title: "Beyond The Basics: A.C.E. Prep Checklist",
    series: "beyond-basics",
    published: "2025-04-22",
    lengthSeconds: 3219,
    guests: [
      "Jorge Bedoya"
    ],
    summary: "Jorge Bedoya, ACE, breaks down how to prepare for the Entomological Society of America’s Associate Certified Entomologist exam."
  },
  {
    youtubeId: "Ce83-oO46X8",
    title: "Industry Interview: Adam Holt",
    series: "interview",
    published: "2025-03-11",
    lengthSeconds: 3671,
    guests: [
      "Adam Holt"
    ],
    summary: "Adam Holt, BCE, on the innovations shaping the industry, some of its more controversial topics, and lessons from working at every level of the field."
  },
  {
    youtubeId: "8cnuvCR6G6o",
    title: "Industry Interview: Jordan Brooks",
    series: "interview",
    published: "2025-03-11",
    lengthSeconds: 3730,
    guests: [
      "Jordan Brooks"
    ],
    summary: "Jordan Brooks, vice president of Steri-Fab, on the product’s history and what running a manufacturer looks like day to day."
  },
  {
    youtubeId: "28tYok-Di30",
    title: "Community Buzz #2",
    series: "community",
    published: "2025-03-11",
    lengthSeconds: 521,
    guests: [],
    summary: "Community Buzz #2: LTK community news, gaming headlines and what’s happening in pest control."
  },
  {
    youtubeId: "qRj1rhSRb-s",
    title: "Pest Talk: Rodent Exclusion",
    series: "pest-talk",
    published: "2025-03-11",
    lengthSeconds: 3290,
    guests: [],
    summary: "Two guest speakers on rodent exclusion: sealing entry points, reading rodent behavior and keeping them out for good."
  },
  {
    youtubeId: "vQzWqqWrGiM",
    title: "Pest Talk: Spiders",
    series: "pest-talk",
    published: "2025-03-11",
    lengthSeconds: 4542,
    guests: [
      "Brandon Runyon"
    ],
    summary: "Brandon Runyon, BCE, on spiders: identification, habitats and more, for new techs and veterans alike."
  },
  {
    youtubeId: "qD3BrcZMwLE",
    title: "Meet the Director",
    series: "community",
    published: "2025-03-11",
    lengthSeconds: 2405,
    guests: [
      "LTK Director"
    ],
    summary: "Niammi interviews the LTK Director on how Licensed to Kill started, why it mixes pest control and gaming, and where the community is going."
  },
  {
    youtubeId: "YnwhgdPeMls",
    title: "Beyond the Basics: Active Ingredients",
    series: "beyond-basics",
    published: "2025-02-20",
    lengthSeconds: 4466,
    guests: [
      "Jorge Bedoya"
    ],
    summary: "Jorge Bedoya, ACE, on active ingredients: insecticide chemistry and the ongoing problem of resistance."
  },
  {
    youtubeId: "SbJlRDu5SrU",
    title: "LTK: Community Buzz #1",
    series: "community",
    published: "2025-02-20",
    lengthSeconds: 572,
    guests: [],
    summary: "Community Buzz #1: community updates, gaming headlines and pest control news."
  },
  {
    youtubeId: "Xu98TYV87d4",
    title: "Pest Talk: Bed Bugs",
    series: "pest-talk",
    published: "2025-01-17",
    lengthSeconds: 6371,
    guests: [
      "Brandon Runyon"
    ],
    summary: "LTK’s first Pest Talk: Brandon Runyon, BCE, on bed bug biology and behavior and advanced treatment methods."
  }
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

/** Episodes worth surfacing on a topic page. Editorial pairing by topic, by field slug or 'ace'. */
export const EPISODES_FOR: Record<string, string[]> = {
  ace: ['hYGgy_U4VsY', 'YnwhgdPeMls', 'bFHQKxDkihQ'],
  'k9-detection': ['x5htvQ2lEtE'],
  'bed-bugs': ['Xu98TYV87d4'],
  'bird-abatement': ['frrzuyPzTsQ', '282tJO5UkLo'],
  exclusion: ['qRj1rhSRb-s'],
  'general-pest': ['vQzWqqWrGiM', 'YnwhgdPeMls'],
  ownership: ['qyM7q9LKxXU', '5rFASZVQyE4', '0A4z_JFeI1I', 'BpCazhaichY'],
  management: ['BpCazhaichY', 'vPOjOELlpSo'],
  'commercial-food-safety': ['X9HitZcaryI'],
};

export function episodesFor(key: string): LtkEpisode[] {
  const ids = EPISODES_FOR[key] ?? [];
  return ids.map((id) => LTK_EPISODES.find((e) => e.youtubeId === id)).filter(Boolean) as LtkEpisode[];
}

/** Podcast and interview uploads, not counting tournament livestreams. */
export const PODCAST_UPLOADS = LTK_EPISODES.filter((e) => e.series !== 'live').length;
export const STREAM_UPLOADS = LTK_EPISODES.length - PODCAST_UPLOADS;
