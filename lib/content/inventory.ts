/**
 * inventory.ts — what a sponsor can back. `status` is honest: 'running' means LTK already does
 * it with sponsors today; 'new' means it's available to book but nobody has bought it yet.
 * Prices stay off the site until REGISTRY R-16 is set; prize items are subject to R-18.
 */

export interface InventoryItem {
  id: string;
  name: string;
  status: 'running' | 'new';
  what: string;
  includes: string[];
  example?: { label: string; href: string };
}

export const INVENTORY: InventoryItem[] = [
  {
    id: 'tournament',
    name: 'Tournament sponsor',
    status: 'running',
    what: 'Back a gaming tournament in the LTK Discord, streamed on YouTube.',
    includes: ['Logo on the tournament poster', 'Shout-outs during the live stream', 'Your name in the stream title and description', 'A page in the tournament archive with your logo'],
    example: { label: 'Apex Legends, February 2026', href: '/arena/tournaments/apex-legends-2026/' },
  },
  {
    id: 'fantasy',
    name: 'Fantasy football season sponsor',
    status: 'running',
    what: 'Ride along with the LTK league for the whole NFL season.',
    includes: ['“Sponsored by” on every weekly results graphic', 'Logo on the league’s page on this site', 'Mentions when results post in the Discord'],
    example: { label: 'Fantasy Football 2026', href: '/arena/tournaments/fantasy-football-2026/' },
  },
  {
    id: 'giveaway',
    name: 'Giveaway or prize pool',
    status: 'running',
    what: 'Put your product or gear in front of the techs who use it, as a prize or giveaway.',
    includes: ['Your product named in the giveaway announcement', 'Shown on stream when it’s won', 'Prize details posted in the Discord (contest rules apply)'],
  },
  {
    id: 'discord',
    name: 'Discord sponsor channel',
    status: 'running',
    what: 'A standing introduction in #our-sponsors, read by every member.',
    includes: ['Your logo, what you do and a link', 'Pinned for the length of your sponsorship'],
  },
  {
    id: 'site',
    name: 'Website placement',
    status: 'running',
    what: 'Your logo across the LTK Community Hub.',
    includes: ['Logo in the sponsor row at the foot of every page', 'Home page and events page placement', 'Your own sponsor page with the events you’ve backed'],
    example: { label: 'Our sponsors', href: '/partners/' },
  },
  {
    id: 'daily-drop',
    name: 'Daily Drop presenting sponsor',
    status: 'new',
    what: 'The Daily Drop is the two-minute pest ID and ACE question techs come back for every day.',
    includes: ['“Presented by” on the Daily Drop page', 'Your name on the shareable result card', 'Mention in the weekly missions'],
    example: { label: 'Today’s Daily Drop', href: '/arena/daily/' },
  },
  {
    id: 'game',
    name: 'Arena game sponsor',
    status: 'new',
    what: 'Present one of the Arena games — Inspection Hunt, Lookalike Showdown, Photo ID Sprint or the ACE Speed Round.',
    includes: ['“Presented by” on the game page and its leaderboard', 'Logo on the end-of-round screen'],
    example: { label: 'Inspection Hunt', href: '/arena/games/inspection-hunt/' },
  },
  {
    id: 'season',
    name: 'Monthly season sponsor',
    status: 'new',
    what: 'Every month is an Arena season with its own leaderboard and a winner called out in the Discord.',
    includes: ['“Season presented by” on the season board', 'Named in the end-of-month winner announcement'],
    example: { label: 'Arena seasons', href: '/arena/season/' },
  },
  {
    id: 'meetup',
    name: 'Meetup sponsor',
    status: 'new',
    what: 'LTK runs in-person meetups and shows up at trade shows, including PestWorld.',
    includes: ['Named as the meetup’s host sponsor', 'Logo on the meetup announcement'],
  },
];
