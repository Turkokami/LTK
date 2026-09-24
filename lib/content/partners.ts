/**
 * partners.ts — sponsorship tiers.
 *
 * Tier NAMES and INCLUSIONS are product decisions and can ship now. PRICES are REGISTRY R-16
 * and are absent from both the page and the Offer schema until set — a placeholder price in
 * structured data gets cached and quoted back at you.
 *
 * Every inclusion below is something we can deliver without touching editorial. If a proposed
 * inclusion requires an editorial decision to change, it does not belong in a tier.
 */

export interface Tier {
  name: string;
  summary: string;
  includes: string[];
}

export const TIERS: Tier[] = [
  {
    name: 'Supporting',
    summary: 'A labelled presence for companies that want to back the community without a campaign.',
    includes: [
      'Labelled placement on the partners page',
      'Job postings on the state boards',
      'Chapter meetup support in states you choose',
    ],
  },
  {
    name: 'Programme',
    summary: 'Underwrite a named programme — an entomologist session series or a CEU track.',
    includes: [
      'Everything in Supporting',
      'Named underwriting of a session series, labelled as sponsored',
      'Attendance at the sessions you underwrite',
      'Arena event presence',
    ],
  },
  {
    name: 'Research',
    summary:
      'Fund original industry research. We set the questions and publish the findings whichever way they fall.',
    includes: [
      'Everything in Programme',
      'Named funding of an annual research report',
      'Early access to findings — never editorial control over them',
      'Publication rights to the published report',
    ],
  },
];
