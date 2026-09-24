import type { PersonRef } from '@/lib/schema/types';

/**
 * editorial.ts — who signs the work.
 *
 * REGISTRY: R-06. This is a placeholder and it is deliberately a boring one. It says
 * "Editorial lead" because that is honest about there being no named human yet. It does not
 * say a name, because a name on a page is a claim about a real person, and inventing one is
 * exactly the kind of thing that makes a site worthless to the professionals it is courting.
 *
 * WHY THIS FILE EXISTS: this object was previously copy-pasted into each template. The moment
 * R-06 resolves and a real reviewer is appointed, a copy-pasted constant means hunting through
 * templates and missing one — leaving a page signed by a placeholder next to pages signed by a
 * person. One import, one edit, no drift.
 *
 * When R-06 resolves, this file is the only thing that changes. The `signed` flag then flips
 * to true, and the audit harness can start failing any reviewed page that is still unsigned.
 */

export const EDITOR: PersonRef = {
  name: 'Editorial lead',
  path: '/about/team/editorial-lead/',
  jobTitle: 'Editor',
};

/**
 * False until a real, named human with verifiable credentials is in the chair (R-06).
 *
 * Read this before emitting anything that asserts human review to a search engine. A
 * `reviewedBy` node pointing at a placeholder is worse than no node at all: it is a
 * machine-readable claim that somebody checked this, when nobody did.
 */
export const EDITOR_IS_NAMED = false;

/**
 * Technical reviewers per discipline (R-05 — advisory board).
 *
 * Empty on purpose. The advisory board has the longest lead time of any blocker in the
 * registry, and these pages publish before it fills. A discipline page with no technical
 * reviewer is an honest page written from sourced material. A discipline page claiming review
 * by an entomologist who has never seen it is a liability.
 */
export const DISCIPLINE_REVIEWERS: Record<string, PersonRef> = {};
