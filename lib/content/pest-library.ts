/**
 * pest-library.ts — the community pest ID library: groups of member photos plus the ID notes
 * the community has confirmed (lib/content/community.ts → ID_NOTES). Each group links to the
 * field guide and ACE study module that cover it.
 */

export interface PestGroup {
  slug: string;
  name: string;
  blurb: string;
  /** Photo-pack sections that feed this group. */
  sections: string[];
  /** ID_NOTES keys. */
  notes: string[];
  field?: string;
  aceModule?: string;
}

export const PEST_ID_PATH = '/academy/pest-id/';

export const PEST_GROUPS: PestGroup[] = [
  { slug: 'termites-wdo', name: 'Termites and wood-destroying insects', blurb: 'Mud tubes, swarmers, kick-out holes and the damage they leave.', sections: ['termites-wdo'], notes: ['termites-wdo'], field: 'termite-wdo', aceModule: 'wood-destroying-insects' },
  { slug: 'ants', name: 'Ants', blurb: 'Carpenter, fire and odorous house ants — and the ant-or-termite question.', sections: ['ants'], notes: ['ants'], field: 'general-pest', aceModule: 'ants' },
  { slug: 'rodents', name: 'Rodents', blurb: 'Rats, mice, burrows, entry points and station work.', sections: ['rodents'], notes: [], field: 'general-pest' },
  { slug: 'stinging-insects', name: 'Wasps, hornets and bees', blurb: 'Yellowjacket voids, open-air nests, mud daubers and the pollinators to leave alone.', sections: ['stinging-insects'], notes: ['stinging-insects'], field: 'general-pest', aceModule: 'biting-stinging' },
  { slug: 'spiders-scorpions', name: 'Spiders and scorpions', blurb: 'Recluses, widows, jumpers and bark scorpions.', sections: ['spiders-scorpions'], notes: ['spiders-scorpions'], field: 'general-pest', aceModule: 'biting-stinging' },
  { slug: 'cockroaches', name: 'Cockroaches', blurb: 'German, American and the rest of the crew.', sections: ['cockroaches'], notes: [], field: 'general-pest', aceModule: 'cockroaches' },
  { slug: 'stored-product-pests', name: 'Stored product and fabric pests', blurb: 'Grain beetles, dermestids and the pantry lineup.', sections: ['stored-product-pests', 'fabric-pests'], notes: ['stored-product-pests'], field: 'commercial-food-safety', aceModule: 'stored-product-pests' },
  { slug: 'occasional-invaders', name: 'Occasional invaders', blurb: 'The things that wander in — and what they say about the house.', sections: ['occasional-invaders'], notes: ['occasional-invaders'], field: 'general-pest', aceModule: 'occasional-invaders' },
  { slug: 'bed-bugs', name: 'Bed bugs', blurb: 'Adults, nymphs, eggs and treatment in the field.', sections: ['bed-bugs'], notes: ['bed-bugs'], field: 'bed-bugs', aceModule: 'biting-stinging' },
  { slug: 'flies-mosquitoes-ticks', name: 'Flies, mosquitoes and ticks', blurb: 'Filth flies, gnats, mosquitoes and ticks.', sections: ['flies-gnats', 'mosquito-vector', 'ticks'], notes: [], field: 'mosquito-vector', aceModule: 'flies' },
  { slug: 'wildlife-birds', name: 'Wildlife, bats and birds', blurb: 'Raccoons, squirrels, bats, pigeons and the damage they do.', sections: ['wildlife', 'bats-birds'], notes: [], field: 'wildlife-control' },
];

export function getPestGroup(slug: string): PestGroup | undefined {
  return PEST_GROUPS.find((g) => g.slug === slug);
}
