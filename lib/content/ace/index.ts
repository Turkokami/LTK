/**
 * ACE Prep — the Academy's study track for the Associate Certified Entomologist exam.
 *
 * Content (study guide, practice questions, glossary, flashcards) is ported from the owner's
 * standalone ACE Prep app. The heavy media — 13 podcast episodes and 12 slide-deck PDFs, about
 * 380MB — stays hosted on that app's deployment (ACE_MEDIA_BASE, public, CORS open) rather
 * than being copied into this repo. If that deployment ever moves, change ACE_MEDIA_BASE only.
 */

import { aceStudyGuideSections, aceExamTips, type AceStudyGuideSection } from './study-guide';
import { acePracticeExamChapters, type PracticeExamQuestion } from './practice';
import { aceGlossaryTerms, storedProductFlashcards, type TrainingGlossaryTerm } from './glossary';

export { aceExamTips, aceGlossaryTerms, storedProductFlashcards };
export type { PracticeExamQuestion, TrainingGlossaryTerm };

export const ACE_MEDIA_BASE = 'https://ace-prep-app.vercel.app';
export const ACE_PATH = '/academy/ace/';
/** Date the ACE content was last ported/edited. Shown as "Updated", never as "Verified". */
export const ACE_UPDATED = '2026-09-24';

export interface Podcast {
  file: string;
  title: string;
  desc: string;
}
export interface SlideDeck {
  file: string;
  title: string;
  pages: number;
  category: string;
}
export interface Video {
  id: string;
  title: string;
  duration: string;
}

export const PODCASTS: Podcast[] = [
  { file: 'The_High_Standards_of_ACE_Certification.mp3', title: 'The High Standards of ACE Certification', desc: 'What ACE certification means, exam structure, and what examiners are testing for.' },
  { file: 'The_alien_engineering_of_insect_anatomy.mp3', title: 'The Alien Engineering of Insect Anatomy', desc: 'Deep dive into insect morphology — body segments, appendages, mouthparts, and why anatomy drives pest behavior.' },
  { file: 'Scientific_Principles_of_Integrated_Pest_Management.mp3', title: 'Scientific Principles of Integrated Pest Management', desc: 'IPM theory from the ground up — pest thresholds, monitoring, decision-making, and treatment hierarchy.' },
  { file: 'Neurochemistry_and_the_Evolutionary_Pest_Arms_Race.mp3', title: 'Neurochemistry and the Evolutionary Pest Arms Race', desc: 'How pesticides work at the neurological level, resistance mechanisms, and the evolutionary arms race between pests and treatments.' },
  { file: 'Why_the_Pesticide_Label_Is_Law.mp3', title: 'Why the Pesticide Label Is Law', desc: 'Label comprehension, FIFRA, EPA registration, signal words, and why label compliance is both legal and scientific.' },
  { file: 'Biting_And_Stinging_Pests_Inside_Your_Walls.mp3', title: 'Biting and Stinging Pests Inside Your Walls', desc: 'Hidden biting pest biology — identification, harborage patterns, and targeted control for stinging and biting species.' },
  { file: 'How_cockroaches_exploit_human_architecture.mp3', title: 'How Cockroaches Exploit Human Architecture', desc: 'Cockroach biology, harborage behavior, cryptic movement patterns, and why structural knowledge is key to control.' },
  { file: 'Household_flies_are_biological_cheat_codes.mp3', title: 'Household Flies Are Biological Cheat Codes', desc: 'Fly biology, development cycles, breeding site identification, and urban fly management strategies.' },
  { file: 'Identifying_Ants_by_Nodes_and_Antennae.mp3', title: 'Identifying Ants by Nodes and Antennae', desc: 'Ant taxonomy using node count, antennae structure, and petiole shape — the diagnostic keys for field ID.' },
  { file: 'Identifying_Termites_Beetles_and_Carpenter_Ants.mp3', title: 'Identifying Termites, Beetles, and Carpenter Ants', desc: 'WDI differentiation — how to tell subterranean vs. drywood termites, powderpost beetles, and carpenter ants apart in the field.' },
  { file: 'Why_occasional_invaders_wander_into_you.mp3', title: 'Why Occasional Invaders Wander Into Your Home', desc: 'The environmental triggers that drive occasional invaders — boxelders, centipedes, silverfish, crickets — inside, and how to break the cycle.' },
  { file: 'How_Humans_Evolved_the_Perfect_Pantry_Pest.mp3', title: 'How Humans Evolved the Perfect Pantry Pest', desc: 'Stored product pest biology, co-evolution with human food storage, species ID, and IPM control strategies.' },
  { file: 'The_Biological_Battleground_in_Your_Pantry.mp3', title: 'The Biological Battleground in Your Pantry', desc: 'Stored product pest competition, secondary infestations, monitoring with pheromone traps, and heat/cold treatments.' },
];

export const SLIDE_DECKS: SlideDeck[] = [
  { file: 'ACE_Certification_Blueprint.pdf', title: 'ACE Certification Blueprint', pages: 56, category: 'Certification' },
  { file: 'ACE_Insect_Biology.pdf', title: 'ACE Insect Biology', pages: 181, category: 'Biology' },
  { file: 'ACE_Stored_Product_Dossier.pdf', title: 'ACE Stored Product Dossier', pages: 148, category: 'Stored products' },
  { file: 'Ant_Identification_Field_Guide.pdf', title: 'Ant Identification Field Guide', pages: 110, category: 'Identification' },
  { file: 'Arthropod_Diagnostic_Blueprint.pdf', title: 'Arthropod Diagnostic Blueprint', pages: 147, category: 'Diagnostics' },
  { file: 'IPM_Strategic_Blueprint.pdf', title: 'IPM Strategic Blueprint', pages: 155, category: 'IPM' },
  { file: 'Occasional_Invaders_Diagnostic_Guide.pdf', title: 'Occasional Invaders Diagnostic Guide', pages: 121, category: 'Identification' },
  { file: 'Pesticide_Safety_Dossier.pdf', title: 'Pesticide Safety Dossier', pages: 123, category: 'Safety' },
  { file: 'Structural_Cockroach_Diagnostic_Blueprint.pdf', title: 'Structural Cockroach Diagnostic Blueprint', pages: 135, category: 'Diagnostics' },
  { file: 'Tactical_IPM_Blueprint.pdf', title: 'Tactical IPM Blueprint', pages: 195, category: 'IPM' },
  { file: 'Urban_Fly_Diagnostics.pdf', title: 'Urban Fly Diagnostics', pages: 174, category: 'Diagnostics' },
  { file: 'WDI_Inspector_Blueprint.pdf', title: 'WDI Inspector Blueprint', pages: 127, category: 'WDI' },
];

export const VIDEOS: Video[] = [
  { id: 'tk4TIUkgOCE', title: 'Insect Biology & Morphology', duration: '10:00' },
  { id: 'jBM5mQWxWds', title: 'Science of Pest Management', duration: '10:10' },
  { id: 'UabWF-5D6Dg', title: 'Insect Detective Lineup', duration: '8:28' },
  { id: 'iAQa42HkXVk', title: 'Household Pests', duration: '9:44' },
  { id: 'ID7fpF6_d-o', title: 'Household Bug Detective', duration: '8:12' },
  { id: '5hPOCOzjTWc', title: 'Hidden Housewreckers', duration: '9:07' },
  { id: '9NJcCXmuJh0', title: 'Diagnostic Taxonomy: Lookalike Stored Product Pests', duration: '8:23' },
  { id: 'f5oVgHMtLH0', title: 'The Pantry Private Eye', duration: '8:00' },
  { id: '8evnKr7Io6k', title: 'The Threat Matrix', duration: '7:10' },
  { id: 'WXY623t_Gxg', title: 'Wood Destroying Insects 1', duration: '9:10' },
  { id: 'ZGUz9ltl0Gk', title: 'Wood Destroying Insects 2', duration: '9:25' },
  { id: 'bm90TgFErZ8', title: 'ACE Prep: Wood Insects', duration: '9:00' },
];

export const mediaUrl = (kind: 'audio' | 'reference-pdfs', file: string) =>
  `${ACE_MEDIA_BASE}/${kind}/${file}`;

/** Which media goes with which module. Editorial pairing by topic. */
const MODULE_MEDIA: Record<string, { podcasts: string[]; decks: string[]; videos: string[] }> = {
  'biology-morphology': {
    podcasts: ['The_alien_engineering_of_insect_anatomy.mp3'],
    decks: ['ACE_Insect_Biology.pdf'],
    videos: ['tk4TIUkgOCE', 'UabWF-5D6Dg'],
  },
  'ipm-principles': {
    podcasts: ['Scientific_Principles_of_Integrated_Pest_Management.mp3'],
    decks: ['IPM_Strategic_Blueprint.pdf'],
    videos: ['jBM5mQWxWds'],
  },
  'ipm-tools-practice': { podcasts: [], decks: ['Tactical_IPM_Blueprint.pdf'], videos: [] },
  'toxicology-safety-laws': {
    podcasts: ['Neurochemistry_and_the_Evolutionary_Pest_Arms_Race.mp3', 'Why_the_Pesticide_Label_Is_Law.mp3'],
    decks: ['Pesticide_Safety_Dossier.pdf'],
    videos: [],
  },
  cockroaches: {
    podcasts: ['How_cockroaches_exploit_human_architecture.mp3'],
    decks: ['Structural_Cockroach_Diagnostic_Blueprint.pdf'],
    videos: ['iAQa42HkXVk', 'ID7fpF6_d-o'],
  },
  ants: {
    podcasts: ['Identifying_Ants_by_Nodes_and_Antennae.mp3'],
    decks: ['Ant_Identification_Field_Guide.pdf'],
    videos: [],
  },
  flies: {
    podcasts: ['Household_flies_are_biological_cheat_codes.mp3'],
    decks: ['Urban_Fly_Diagnostics.pdf'],
    videos: [],
  },
  'biting-stinging': {
    podcasts: ['Biting_And_Stinging_Pests_Inside_Your_Walls.mp3'],
    decks: ['Arthropod_Diagnostic_Blueprint.pdf'],
    videos: ['8evnKr7Io6k'],
  },
  'occasional-invaders': {
    podcasts: ['Why_occasional_invaders_wander_into_you.mp3'],
    decks: ['Occasional_Invaders_Diagnostic_Guide.pdf'],
    videos: [],
  },
  'stored-product-pests': {
    podcasts: ['How_Humans_Evolved_the_Perfect_Pantry_Pest.mp3', 'The_Biological_Battleground_in_Your_Pantry.mp3'],
    decks: ['ACE_Stored_Product_Dossier.pdf'],
    videos: ['9NJcCXmuJh0', 'f5oVgHMtLH0'],
  },
  'wood-destroying-insects': {
    podcasts: ['Identifying_Termites_Beetles_and_Carpenter_Ants.mp3'],
    decks: ['WDI_Inspector_Blueprint.pdf'],
    videos: ['WXY623t_Gxg', 'ZGUz9ltl0Gk', 'bm90TgFErZ8', '5hPOCOzjTWc'],
  },
};

export interface AceModule extends AceStudyGuideSection {
  /** 1-based module number, from the study guide order. */
  n: number;
  /** Title without the "Module N." prefix. */
  name: string;
  /** URL segment. Equal to the study-guide id. Never changes once shipped. */
  slug: string;
  questions: PracticeExamQuestion[];
  podcasts: Podcast[];
  decks: SlideDeck[];
  videos: Video[];
}

/**
 * Study modules joined to their practice chapters. The two files pair by position (study
 * module 1 ↔ practice chapter ace-1); the check below fails the build if they ever drift.
 */
export const ACE_MODULES: AceModule[] = aceStudyGuideSections.map((s, i) => {
  const chapter = acePracticeExamChapters.find((c) => c.id === `ace-${i + 1}`);
  const expected = s.title.replace(/^Module \d+\.\s*/, '');
  if (!chapter || chapter.title.replace(/^Module \d+\.\s*/, '') !== expected) {
    throw new Error(`ACE practice chapter ace-${i + 1} does not match study module "${s.title}"`);
  }
  const m = MODULE_MEDIA[s.id] ?? { podcasts: [], decks: [], videos: [] };
  return {
    ...s,
    n: i + 1,
    name: expected,
    slug: s.id,
    questions: chapter.questions,
    podcasts: PODCASTS.filter((p) => m.podcasts.includes(p.file)),
    decks: SLIDE_DECKS.filter((d) => m.decks.includes(d.file)),
    videos: VIDEOS.filter((v) => m.videos.includes(v.id)),
  };
});

export function getAceModule(slug: string): AceModule | undefined {
  return ACE_MODULES.find((m) => m.slug === slug);
}

/** Every practice question with its module, for the full-length practice test. */
export const ALL_QUESTIONS = ACE_MODULES.flatMap((m) =>
  m.questions.map((q) => ({ ...q, moduleName: m.name, moduleN: m.n })),
);

/** The "start here" pair on the ACE hub: the certification podcast and blueprint deck. */
export const ACE_OVERVIEW = {
  podcast: PODCASTS[0]!,
  deck: SLIDE_DECKS[0]!,
};
