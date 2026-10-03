import { COMMUNITY_PHOTOS } from './community-photos';
import { PEST_GROUPS } from './pest-library';

/**
 * The photo-ID pool shared by the Photo ID Sprint and the Daily Drop: member photos mapped to
 * the pest group they were sorted into during human review. Tools, stations, treatment steps
 * and other non-pest subjects are filtered out so every question is answerable from the image.
 */

export interface IdPhoto {
  src: string;
  width: number;
  height: number;
  group: string;
  groupName: string;
  caption: string;
  credit: string;
}

const NOT_A_PEST = /station|trap|trench|drill|foam|mesh|sealed|sprayer|tool|ladder|equipment|treatment|cage|truck|vehicle|void/i;

const bySection = new Map<string, { slug: string; name: string }>();
for (const g of PEST_GROUPS) for (const s of g.sections) bySection.set(s, { slug: g.slug, name: g.name });

export const ID_PHOTOS: IdPhoto[] = COMMUNITY_PHOTOS.flatMap((p) => {
  const g = bySection.get(p.section);
  if (!g || !p.id || NOT_A_PEST.test(`${p.id} ${p.caption}`)) return [];
  return [{ src: p.src, width: p.width, height: p.height, group: g.slug, groupName: g.name, caption: p.caption, credit: p.credit }];
});

export const ID_GROUPS = PEST_GROUPS.filter((g) => ID_PHOTOS.some((p) => p.group === g.slug)).map((g) => ({ slug: g.slug, name: g.name }));
