/**
 * exam-prep.ts — licence-category exam prep.
 *
 * Every page is assembled from data that is already verified elsewhere on the site:
 *   - the field guide (disciplines.ts) for what the work is,
 *   - VERIFIED state records (states.ts) for each state's own category name and exam structure,
 *   - the ACE study modules for the overlapping science.
 * Nothing here states a pass mark, question count or fee — those live only on the state
 * pages, sourced to the agency. `aceModules` is an editorial study pairing, labelled as such.
 */

export interface ExamCategory {
  slug: string;
  name: string;
  /** Field guide slug; its categoryPattern selects the matching state categories. */
  field: string;
  /** One-line plain description. */
  blurb: string;
  /** ACE module slugs worth studying for this category, in study order. */
  aceModules: string[];
  /** What to drill hardest — study advice, not a claim about any exam's content. */
  focus: string[];
}

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    slug: 'general-pest',
    name: 'General pest',
    field: 'general-pest',
    blurb: 'The household and structural category most technicians license in first.',
    aceModules: [
      'biology-morphology',
      'ipm-principles',
      'ipm-tools-practice',
      'toxicology-safety-laws',
      'cockroaches',
      'ants',
      'flies',
      'biting-stinging',
      'occasional-invaders',
      'stored-product-pests',
    ],
    focus: [
      'Identification by body shape, antennae and wing structure — the rest of the answer usually follows from the ID.',
      'Reading a label: signal words, restricted-use status, PPE and re-entry language.',
      'IPM order of operations: inspection and exclusion before chemical control.',
      'Formulations and where each one belongs (baits, dusts, residuals, IGRs).',
    ],
  },
  {
    slug: 'termite-wdo',
    name: 'Termite and wood-destroying organisms',
    field: 'termite-wdo',
    blurb: 'Subterranean and drywood termites, wood-boring beetles, decay fungi and the inspection report.',
    aceModules: ['biology-morphology', 'toxicology-safety-laws', 'ants', 'wood-destroying-insects'],
    focus: [
      'Telling subterranean termites, drywood termites, carpenter ants and powderpost beetles apart by damage and frass.',
      'Conducive conditions: moisture, wood-to-soil contact and grade.',
      'Treatment approaches (soil termiticides, baits, wood treatments) and when each applies.',
      'The inspection report itself — what it states, and what it must never overstate.',
    ],
  },
  {
    slug: 'fumigation',
    name: 'Fumigation',
    field: 'fumigation',
    blurb: 'Whole-structure and commodity fumigation — the highest-consequence category.',
    aceModules: ['toxicology-safety-laws', 'stored-product-pests', 'wood-destroying-insects'],
    focus: [
      'Label and fumigant-management-plan requirements — the label is the law, and here it is long.',
      'Exposure, clearance and re-entry: monitoring before anyone goes back in.',
      'Target pests: drywood termites, wood borers and stored-product infestations.',
      'Sealing, tarping and posting — the steps that keep people out of the structure.',
    ],
  },
  {
    slug: 'mosquito-vector',
    name: 'Mosquito and public health',
    field: 'mosquito-vector',
    blurb: 'Mosquito and vector programmes, from larval control to adulticiding.',
    aceModules: ['biology-morphology', 'ipm-principles', 'toxicology-safety-laws', 'biting-stinging'],
    focus: [
      'Life cycles and breeding habitat — larval source reduction first.',
      'Larvicides versus adulticides, and the application windows for each.',
      'Drift, non-target and pollinator protections on the label.',
      'Surveillance: why counts and trap data decide when to treat.',
    ],
  },
  {
    slug: 'turf-ornamental',
    name: 'Lawn and ornamental',
    field: 'turf-ornamental',
    blurb: 'Pest, weed and disease management on lawns, trees and landscape plantings.',
    aceModules: ['biology-morphology', 'ipm-principles', 'ipm-tools-practice', 'toxicology-safety-laws'],
    focus: [
      'Plant, weed and pest identification — horticulture matters as much as entomology here.',
      'Application equipment and calibration.',
      'Runoff, drift and water-protection language on the label.',
      'Thresholds: when damage justifies treatment and when it does not.',
    ],
  },
];

export const EXAM_PREP_PATH = '/academy/exam-prep/';

export function getExamCategory(slug: string): ExamCategory | undefined {
  return EXAM_CATEGORIES.find((c) => c.slug === slug);
}
