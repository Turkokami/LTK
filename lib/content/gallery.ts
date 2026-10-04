/**
 * gallery.ts — "LTK in pictures": owner-supplied community images (2026-10-04).
 * No names in captions (member-name rule). Event posters live in events-feed.ts, not here.
 */

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
}

export interface GallerySection {
  id: string;
  title: string;
  blurb: string;
  images: GalleryImage[];
}

export const GALLERY: GallerySection[] = [
  {
    id: 'pestworld-2025',
    title: 'The LTK house at PestWorld 2025',
    blurb: 'Members from across the country, finally in the same room.',
    images: [
      { src: '/gallery/pestworld-2025-crew.webp', width: 1200, height: 900, alt: 'Six LTK members standing in front of a TV showing the LTK badge at the LTK house during PestWorld 2025', caption: 'The crew at the LTK house' },
      { src: '/gallery/pestworld-2025-ltk-house.webp', width: 1200, height: 900, alt: 'LTK members laughing as they lift one of the crew sideways in front of the LTK badge on the TV', caption: 'Peak professionalism' },
      { src: '/gallery/pestworld-2025-selfie.webp', width: 1200, height: 1600, alt: 'Three pest pros in PestWorld lanyards taking a selfie outside the convention hotel', caption: 'Outside the show, PestWorld 2025' },
    ],
  },
  {
    id: 'route',
    title: 'On the route',
    blurb: 'The day job: bait stations, kitchens and a bucket of tools.',
    images: [
      { src: '/gallery/route-bait-station.webp', width: 1000, height: 1333, alt: 'A tech in gloves servicing a rodent bait station against a brick wall, a tool bucket beside him', caption: 'Bait station check' },
      { src: '/gallery/route-kitchen.webp', width: 1000, height: 1333, alt: 'A tech on his knees inspecting under a kitchen sink with a flashlight, a sprayer on the floor', caption: 'Under-sink inspection' },
      { src: '/gallery/route-ready.webp', width: 1000, height: 750, alt: 'A smiling tech in uniform holding a tool bucket and a tool bag in a front yard', caption: 'Ready for the next stop' },
    ],
  },
  {
    id: 'podcast',
    title: 'The LTK Podcast',
    blurb: 'Interviews, debates and the Between Sprays episodes.',
    images: [
      { src: '/gallery/podcast-godfroid.webp', width: 1000, height: 667, alt: 'LTK Podcast episode art: Marcus Scruggs, LTK Director, and Nick Godfroid, BCE, of Rockwell Labs — pest control future and innovation', caption: 'Future & innovation, with Nick Godfroid, BCE' },
      { src: '/gallery/podcast-cryptids.webp', width: 1000, height: 667, alt: 'Between Sprays edition episode art: Hunting Cryptids, with Bigfoot, a vampire and a chupacabra around the LTK badge', caption: 'Between Sprays: Hunting Cryptids' },
      { src: '/gallery/spotify-wrapped.webp', width: 1000, height: 1778, alt: 'Spotify for Creators Wrapped card: Licensed to Kill top episode, Industry Interview: Sylvia Kenmuir', caption: 'Spotify Wrapped top episode' },
      { src: '/gallery/insight-radio-2026.webp', width: 1000, height: 1000, alt: 'Insight Radio poster: Pest Control 2026 — how AI, evolving pests and smart strategies are shaping pest management, with guest Marcus Scruggs, January 18, 2026', caption: 'Marcus on Insight Radio, January 2026' },
    ],
  },
  {
    id: 'art',
    title: 'LTK gamer art',
    blurb: 'Where pests and pixels meet.',
    images: [
      { src: '/gallery/pests-and-pixels.webp', width: 1000, height: 1003, alt: 'Licensed to Kill — where pests and pixels meet: a bug in a scope over a neon gaming setup with a controller and the Discord logo', caption: 'Where pests and pixels meet' },
      { src: '/gallery/squad-vs-mosquitoes.webp', width: 1000, height: 1000, alt: 'An LTK squad in tactical gear with headsets taking on giant glowing-eyed mosquitoes in a neon city', caption: 'Squad up' },
      { src: '/events/ltk-tournament.webp', width: 1000, height: 1000, alt: 'Licensed to Kill Tournament: a soldier in front of giant red-eyed insects', caption: 'Licensed to Kill Tournament' },
      { src: '/gallery/xp-tech.webp', width: 1000, height: 1250, alt: 'An illustrated pest tech with a sprayer surrounded by game HUD panels: XP, missions, power-ups', caption: 'Every route is a mission' },
    ],
  },
  {
    id: 'memes',
    title: 'Memes',
    blurb: 'The Discord’s finest.',
    images: [
      { src: '/gallery/ltk-diver-meme.webp', width: 1000, height: 563, alt: 'Two Helldivers hugging: when you find another LTK Diver', caption: 'When you find another LTK Diver' },
      { src: '/gallery/clocking-in-meme.webp', width: 1000, height: 1000, alt: 'A cartoon tech vacuuming up roaches in a game HUD: what clocking in feels like after joining LTK', caption: 'Clocking in after joining LTK' },
    ],
  },
  {
    id: 'partners',
    title: 'Partners',
    blurb: 'The companies that back the crew.',
    images: [
      { src: '/gallery/swarm-partner.webp', width: 1000, height: 1500, alt: 'The smart agents use the LTK Podcast plus Swarm Pest Control Marketing: official LTK partners', caption: 'Official LTK partner: Swarm' },
    ],
  },
  {
    id: 'merch',
    title: 'Merch',
    blurb: 'Rep the crew on the route.',
    images: [
      { src: '/gallery/merch-tumbler.webp', width: 972, height: 1645, alt: 'A black LTK tumbler with the Licensed to Kill rat-in-the-scope badge and Discord lettering', caption: 'The LTK tumbler' },
      { src: '/gallery/nisus-gear.webp', width: 1000, height: 1333, alt: 'An LTK prize jug with the Licensed to Kill badge, sponsored by Nisus', caption: 'Event gear, sponsored by Nisus' },
      { src: '/gallery/merch-lab-coat-patch.webp', width: 944, height: 1120, alt: 'An embroidered Licensed to Kill rat-in-the-scope patch on a white lab coat', caption: 'The LTK patch' },
    ],
  },
];

export const PODCAST_CLIPS = [
  { id: 'wild-hogs', title: 'Wild hog hunting: helicopter pest removal is crazy', seconds: 34 },
  { id: 'crawl-spaces', title: 'Crawl spaces: real-world experience from a pest management expert', seconds: 39 },
  { id: 'rodenticide', title: 'Rodenticide: essential tool or environmental risk?', seconds: 17 },
  { id: 'mosquito-phd', title: 'Mosquito control: PhD insights and company lessons', seconds: 34 },
];
