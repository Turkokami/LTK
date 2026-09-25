# CONTENT-RESEARCH.md — what is still missing, and how to research it

The brief for anyone filling the site's content gaps, human or bot. Written 2026-09-25.

## The one rule

**Every fact traces to a primary source you actually opened.** A wrong licensing number,
pay figure or legal requirement can cost a reader their licence or their job. A missing fact
costs nothing. When in doubt, leave it out and write `null` with a note.

**Primary sources:** state agency pages, state statutes and administrative codes on official
sites, eCFR, EPA, USDA, FAA, BLS, FWS, university extension, peer-reviewed papers (PMC,
journals), patents, a standard body's own published standard.

**Never a source:** CEU vendors, SEO blogs, manufacturer marketing, other pest-company sites,
Wikipedia, AI summaries. They can help you *find* the primary page. They are never what you
cite. Every Wave 1 error caught so far came from a CEU vendor page ranking on page one.

**Deliverable format:** data, not prose pages. Fill the TypeScript/JSON shapes named below,
with a source URL beside every claim and the date you verified it.

---

## Gaps, in priority order

| # | Gap | Where it lands | Blocked by | Research needed |
|---|---|---|---|---|
| 1 | State wildlife / nuisance-animal permit rules (TX, WA, FL, CA, SC) + federal bird rules (MBTA, falconry abatement) | Wildlife, bird and falconry field guides — replaces "state-by-state guide in the works" | — | **Done 2026-09-25** (`lib/content/wildlife.ts`). Recheck FL 68A-9.010 after its July 2026 hearing. Open: TX/CA bat rules, SC fur-licence question, CA relocation clause. |
| 2 | Lab technology explainers — 17 more to reach 25 (8 live) | `lib/content/lab.ts` → `TECHNOLOGY` (shape: `TechnologyTopic`) | — | Remaining topics: sensor networks for structural pests, cold/cryogenic treatment, electronic termite monitoring, exclusion materials (copper mesh, hardware cloth, steel wool vs. alternatives), rodenticide formulations and secondary-poisoning rules, bed bug heat vs. chemical, insect light traps, moisture meters and thermal imaging for WDO, mosquito trap surveillance, IGRs, fumigant monitoring equipment, field service software categories. |
| 3 | Wave 2 state licensing + CEU data (GA, NC, AZ, OH, PA, NY, IL, TN, VA, AR) | `lib/content/states.ts` → `REGULATORY` (shape: `StateRegulatory`) | **CLAUDE.md gate:** do not start until Wave 1 is indexed and ranking. Site is not indexed yet. | Agency, categories with codes, exam structure, fee, renewal cycle, CEU hours by category and tier, accepted formats, approved providers, source URLs. |
| 4 | Wildlife permit rules, Wave 2 states | Same as #1 | After #1 lands | Same fields as #1. |
| 5 | Pay data by field (beyond BLS SOC 37-2021) | `lib/content/salary.ts` → `ROLES` (member survey) | R-17 member survey (never estimate) | BLS has figures for pest control workers only. Per-field pay needs the member survey. Nothing to research from the web here. |
| 6 | Starting a company, by state | `/trade/start/:state/` (template not built) | Wave 1 only, after #3 gate | Business licence + certified-applicator-of-record requirement, insurance/bond minimums, per state, from the agency. |
| 7 | Owner topics (18) | `/trade/owners/:slug/` (not built) | — | Operational guides (routing, pricing, hiring, selling to a roll-up). Opinion content from Marcus and the crew beats research. Better sourced from podcast and Discord conversations. |
| 8 | Wire articles | `lib/content/wire.ts` | Editorial lead (R-06) | News with a primary source per item: EPA actions, label changes, state rule changes, recalls. Ongoing, 2×/week. |
| 9 | Pest ID photo set for a photo Speed Round | Arena game 2 | Owner photos, or CC-licensed with credit | ~40 labelled species photos, CC0/CC BY/CC BY-SA with author and licence, or owner-supplied. |

## Not researchable — needs a person

These stay "Rolling out" until the owner or Marcus decides or supplies them:

- Product reviews and head-to-head comparisons: need physical testing by a named reviewer (review-methodology rule).
- Courses, live sessions and instructors: need real instructors and dates.
- Member profiles, forum threads and chapter rosters: need the forum backend (R-09) and license verification (R-10).
- Leaderboards, tournaments and season archives: need a scores backend, and prizes need the legal review (R-18).
- Partner pages, sponsorable inventory and the media kit: need sponsor pricing (R-16) and real audience numbers (R-17).
- Team pages and the advisory board: need named people (R-05, R-06).
- Podcast transcripts: need the recordings' transcripts (R-11).
- The LTK founding year: Marcus.

## Acceptance checklist for any research batch

- [ ] Every claim has a primary-source URL, and the URL was opened and says what is claimed.
- [ ] Uncertain items are `null` with a note, never a guess.
- [ ] Verified date recorded.
- [ ] Plain practitioner voice. No "exterminator", no marketing words (seamless, revolutionary, unlock, empower, cutting-edge).
- [ ] Delivered as data in the named shape, not as finished HTML.
- [ ] Reviewed by a person before it is merged. Research never auto-publishes.
