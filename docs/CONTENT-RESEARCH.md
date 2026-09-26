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

## Discord content pack (integrated 2026-09-25)

The LTK Discord pack (photos, gear talk, job leads, pay/pricing talk, ID notes, resources) is live:
`lib/content/community.ts`, `lib/content/community-photos.ts` (generated — see
`scripts/community/`), `/academy/pest-id/`, `/lab/crew-picks/`, `/academy/resources/`,
`/trade/pay-and-pricing/`, `/arena/field-challenges/`, job leads on `/trade/jobs/`, and
"From the crew" galleries on field guides. Community approval for photo use confirmed by the
owner. 52 of 324 photos were excluded in review (people, plates, business names, graphic,
screenshots, blur, duplicates). Job leads are 2026 posts only and need a monthly prune.

### Crew picks product links and images (2026-09-25)

`lib/content/gear-images.ts` holds a product page and an official image for 34 of 38 picks.
Owner decision: manufacturer/retailer images, credited "Image: <brand>" and linked. Take down
any image a brand objects to. Several models are the closest match to what a member described,
not a confirmed model. Ask the poster to confirm: Lesco (SiteOne 190723), AlienTabi, Dinftin,
Birchmeier backpack (REC 15 AC1), Thorogood (804-3898), KORE, FLIR (C5), Hilti (TE 30-22),
roofing anchor (Malta Dynamics, example only). No image: sheet-metal bender, gloves tip, green
laser (no brand named), Pomerix (SVG only).

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

## Starting a company (/trade/start/) — researched 2026-09-26

TX, WA, FL, CA, SC live, from `lib/content/start-company.ts`. Open gaps before these can be called fully verified:
- TX: Occupations Code ch. 1951 unreadable (JS-only statute site); insurance figures rest on TDA pages. SPC-401 (rev. 05/15/18) lists SPT-430/SPT-002 while the web page says SPC-002/SPC-003. Confirm current form numbers.
- WA: RCW 17.21 / WAC 16-228 sites refused connections; figures from WSDA pages. No experience rule found, which doesn't prove there is none.
- FL: unclear whether the $300 fee is per location; 5E-14 F.A.C. not re-read.
- CA: SPCB page says "$500,000 general liability" but s.8692 sets $500k BI + $500k PD per occurrence (statute used). Branch fee unknown (form 43L-15 404s).
- SC: DPR words the DCA experience test two ways (Licensing page vs FAQ). Page tells readers to confirm with DPR 864-646-2150.

## Lab explainers batches 2–3 — merged 2026-09-26

16 explainers live. Recheck items:
- rodenticide-formulations: EPA interim decision still pending (Nov 2025 page). Murray 2020 hawk figures are abstract-only. The automated-bait-stations entry says EPA *proposed* RUP for SGARs (Mass. report); confirm against the interim decision when it lands.
- bed-bug-heat-vs-chemical: resistance ratios are Dang 2017's citations of earlier studies. "Heat leaves no residual" is an inference (Virginia Tech implies it; J IPM review states it and could be swapped in).
- insect-growth-regulators: EPA IGR fact sheet is from 2001, UC fleas page from 2010; K-State MF3094 is greenhouse-focused (flagged in text).
- insect-light-traps: no peer-reviewed figure for UV lamp output decay. Sliney 2016 has manufacturer co-authors (disclosed in label). The 2021 LED-trap finding hasn't been checked for newer work.
- moisture-meters-and-thermal-imaging: the UC Berkeley / SPCB report is not peer reviewed (stated in text).
- fumigant-monitoring: SF aeration hours not sourced. July 2024 SF label approval and the OIG report of 11 deaths were left out to stay at 5 sources.
