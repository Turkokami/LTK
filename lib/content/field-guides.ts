/**
 * field-guides.ts — the long-form career guide behind each /fields/:slug/ page.
 *
 * One entry per discipline slug. Researched against BLS (OOH, OEWS, NCS), O*NET, EPA, OSHA,
 * state agencies, extension and certification bodies; every guide lists its sources. `notes`
 * is maintainer-only (uncertainties, inferences, blocked sources) and is never rendered.
 * A field without an entry falls back to the short text in disciplines.ts.
 */

export interface FieldGuide {
  intro: string;
  dayInTheLife: string[];
  duties: string[];
  workEnvironment: {
    schedule: string;
    seasonality: string;
    physical: string;
    hazards: string;
    vehicleAndTravel: string;
  };
  training: {
    entry: string;
    onTheJob: string;
    licensing: string;
    certifications: { name: string; body: string; what: string; url: string }[];
  };
  skills: string[];
  tools: string[];
  careerPath: { stage: string; description: string }[];
  pay: string;
  benefits: string;
  goodParts: string[];
  hardParts: string[];
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  /** Maintainer-only. Never rendered. */
  notes: string;
}

export const FIELD_GUIDES: Record<string, FieldGuide> = {};

export const FIELD_GUIDES_UPDATED = '2026-10-01';

export function getFieldGuide(slug: string): FieldGuide | undefined {
  return FIELD_GUIDES[slug];
}
