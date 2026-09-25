import type { MetadataRoute } from 'next';
import { abs } from '@/lib/site.config';
import { HUBS, FORUM_CATEGORIES, type HubId } from '@/lib/content/hubs';
import { PUBLISHED_STATES } from '@/lib/content/states';
import { DISCIPLINES } from '@/lib/content/disciplines';
import { ACE_MODULES, ACE_PATH } from '@/lib/content/ace';
import { EXAM_CATEGORIES } from '@/lib/content/exam-prep';
import { TECHNOLOGY } from '@/lib/content/lab';

/**
 * Segmented sitemaps — one per hub, plus a `core` segment.
 *
 * Segmentation is the whole point: a single opaque sitemap tells you "412 of 500 indexed" and
 * nothing else. Per-hub segments tell you the Academy is at 96% and the Lab is at 40%, which is
 * a diagnosis. Next generates these at /sitemap/{id}.xml; robots.ts lists each one.
 *
 * When a hub's spokes ship, add them to the matching case below IN THE SAME COMMIT.
 * A route that is not in a sitemap is a route you cannot diagnose.
 */

type SegmentId = HubId | 'core';

export async function generateSitemaps(): Promise<{ id: SegmentId }[]> {
  return [{ id: 'core' as const }, ...HUBS.map((h) => ({ id: h.id }))];
}

const now = new Date();
const entry = (path: string, priority = 0.6): MetadataRoute.Sitemap[number] => ({
  url: abs(path),
  lastModified: now,
  priority,
});

export default async function sitemap({
  id,
}: {
  id: SegmentId;
}): Promise<MetadataRoute.Sitemap> {
  switch (id) {
    case 'core':
      return [entry('/', 1), entry('/join/', 0.8), entry('/investors/', 0.5)];

    case 'fields':
      return [
        entry('/fields/', 0.9),
        ...DISCIPLINES.map((d) => entry(`/fields/${d.slug}/`, 0.8)),
      ];

    case 'academy':
      return [
        entry('/academy/', 0.9),
        entry('/academy/ceu/', 0.8),
        entry('/academy/licensing/', 0.8),
        entry('/academy/exam-prep/', 0.8),
        ...EXAM_CATEGORIES.map((c) => entry(`/academy/exam-prep/${c.slug}/`, 0.7)),
        entry(ACE_PATH, 0.9),
        entry(`${ACE_PATH}practice-test/`, 0.8),
        entry(`${ACE_PATH}flashcards/`, 0.7),
        entry(`${ACE_PATH}glossary/`, 0.7),
        entry(`${ACE_PATH}library/`, 0.7),
        ...ACE_MODULES.map((m) => entry(`${ACE_PATH}${m.slug}/`, 0.8)),
        // Geo layers 1 and 2. Only verified states ship — CLAUDE.md 2.5.
        ...PUBLISHED_STATES.flatMap((s) => [
          entry(`/academy/ceu/${s.slug}/`, 0.7),
          entry(`/academy/licensing/${s.slug}/`, 0.7),
        ]),
      ];

    case 'community':
      return [
        entry('/community/', 0.9),
        entry('/community/podcast/', 0.8),
        entry('/community/forums/', 0.7),
        entry('/community/chapters/', 0.6),
        ...FORUM_CATEGORIES.map((c) => entry(`/community/forums/${c.slug}/`, 0.7)),
        // TODO(R-09): thread and member URLs come from the forum backend once it exists.
      ];

    case 'about':
      return [
        entry('/about/', 0.7),
        entry('/about/editorial-standards/', 0.6),
        entry('/about/review-methodology/', 0.6),
        entry('/about/sponsorship-policy/', 0.6),
        entry('/about/verification/', 0.6),
        entry('/about/code-of-conduct/', 0.6),
        entry('/about/advisory-board/', 0.6),
        entry('/about/press/', 0.5),
        entry('/about/contact/', 0.5),
      ];

    case 'partners':
      return [entry('/partners/', 0.7), entry('/partners/audience/', 0.7)];

    // Hubs whose spokes have not shipped yet. Index only — do not pad a sitemap with
    // routes that 404. Add spokes here as each phase lands.
    case 'arena':
      return [entry('/arena/', 0.8), entry('/arena/games/speed-round/', 0.8)];

    case 'trade':
      return [entry('/trade/', 0.8), entry('/trade/jobs/', 0.7)];

    case 'wire':
      return [entry('/wire/', 0.8), entry('/wire/regulatory/', 0.7)];

    case 'lab':
      return [
        entry('/lab/', 0.8),
        entry('/lab/technology/', 0.7),
        ...TECHNOLOGY.map((t) => entry(`/lab/technology/${t.slug}/`, 0.7)),
      ];

    default:
      return [];
  }
}
