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

## Owner questionnaire — Marcus Scruggs, 2026-09-29 (handwritten PDF)

Applied to the site:
- Founded 1 Jan 2025 (not the 2024-12-14 Discord snowflake). Origin: the need for pest pros to get to know each other; started as a video game group.
- 545 members / 25–35 weekly active (Sept 2026). Open public invite, **no verification**. Roles: owner → admins → mods → members.
- Name stays: members are very attached ("the name is the hook"); Q5 **No** to a differently-named parent hub.
- Boundaries (hard rules): never say LTK is accredited or a formal org; no doxing, personal or slanderous info; **no public Discord quotes**; **no member names unless self-identified**. Only Marcus named publicly.
  → removed all Discord handles and verbatim quotes from the site; `scripts/community/credits.csv` untracked.
  → removed /about/verification/ and /about/advisory-board/ (301s), rewrote /join/ and the code of conduct from the real handbook answers.
- Events page built from Section 5. Prizes (small merch, collectables, petty cash) exist but are not promoted (R-18).

Open questions for Marcus:
- Facebook and Instagram URLs (he lists both; sameAs only takes owner-supplied URLs).
- Membership split (142 owners, 33 entomologists, 30 sales reps, 48 office, 377 techs) sums to 630, not 545. Role tags overlapping? Not published until clarified.
- Sponsors named: Polaris, Swarm PCM, Pest Patrol, "Visus"(?), SiteOne, Skyhawk. Confirm spellings and whether each agrees to be listed publicly.
- Photo consent: permission yes, **written consent no**. Earlier approval (2026-09-25) stands, but written consent is the safer record.
- The repo github.com/Turkokami/LTK is **public**; handles remain in git history. Make it private, or approve a history rewrite.
- Channel list ("data can be ripped"), who to work with day to day, what would make it a failure: unanswered.

## Owner topics (/trade/owners/) — merged 2026-09-30

Six topics live; per-topic gaps are in each entry's `notes` in `lib/content/owner-topics.ts`. Recheck items:
- DOL contractor rule: proposed 2026-02-26, no final rule yet.
- OSHA heat standard: proposed only; heat NEP reissued 2026-04-10.
- 7 CFR Part 110 rescinded effective 2025-07-11 (90 FR 20083). Federal floor is 40 CFR 171.303.
- FTC v. Rollins non-compete order (2026-04-15, final 2026-06-22). The 2024 FTC rule was vacated and the appeal dropped 2025-09-05.
- Texas insurance: a 2020 TDA PDF shows $200k/$300k, but the live TDA page (used on /trade/start/texas/) shows $500k/$1M. The owner topic cites the live page and states no Texas amount.
- 7(i) commission exemption: whether pest control counts as a retail or service establishment is unresolved. The page tells owners to get a wage-hour attorney's opinion.

## Regulatory wire (/wire/regulatory/): 26 items, compiled 2026-10-01

Items: 9 federal; TX 3; WA 2; FL 3; CA 5; SC 4. Per-item certainty is in `notes` in `lib/content/wire.ts`.
Dropped at review:
- WA HB 2516 rodenticide moratorium: died in committee; details came from an unofficial copy.
- EPA 2026 Pesticide General Permit: applies only where EPA issues the permit, none of the five states.

Recheck:
- FL FWC 68A-9.010: hearing held 2026-07-08, proposed effective 2026-12-31. The summary is kept general until the adopted text can be checked.
- CA SPCB items: details assume the rules were adopted as proposed.
- SC SGAR restriction: sourced to Clemson releases; no final State Register order found.
- EPA rodenticide interim decision: expected in 2026, not yet issued. Add it when it lands.
- OSHA heat rule: supplemental proposal on the agenda for Dec 2026.

## Field career guides (lib/content/field-guides.ts), researched 2026-10-01

All 16 merged (exclusion, insulation, mosquito-vector and turf-ornamental added last). Per-field gaps are in each guide's `notes`. Recheck before launch:
- **BLS National Compensation Survey (March 2026), private industry service occupations:** medical and retirement both came back as 47/23/49 (access, participation, take-up). Possibly a real coincidence; verify both rows by hand in a browser.
- **Mapping pest control workers to NCS "service occupations":** inferred from SOC major groups 31–39.
- **Management pay:** the combined supervisor group in NAICS 561710 (37-1011 + 37-1012). That pest supervisors are coded mostly as 37-1011 is inferred from employment counts.
- **Fumigation label details:** taken from the 2014 EPA-accepted Vikane label; recheck against the current label.
- **K9:**
  - Maryland COMAR 15.05.01.14(C) was read from an Oct 2022 printout; check for later amendments.
  - Its test protocol differs from NPMA's guidance.
  - Pay, insurance and dog cost are unsourced and written as questions to ask.
- **Fixed during review:**
  - salary.ts wrongly said OEWS excludes commission. Per the BLS OEWS FAQ, commissions and production bonuses are included; overtime premium, shift differentials and non-production bonuses are not.
  - Removed the unsourced claims "termite pays better than general pest" and "commercial pays accordingly".

- **Last batch:**
  - Exclusion pay uses 37-2021 as a stand-in.
  - Mosquito pay is matched to industry code 999300; confirm that code's label.
  - California rodent-exclusion licensing under B&P 8555 is our own reading of the statute.
  - California vector control CE figures date from June 2019.
  - No agency answer was found on whether installing TAP insulation needs a pest licence; the guide says so.
- **salary.ts:** 37-3012 median added ($46,340, May 2025, via the BLS Public Data API).

## ACE question bank expansion (2026-10-01)

277 practice questions (55 to 277): 20 new per module, written in original wording from the topics in the ESA ACE prep class decks (`Downloads/ACE-prep-extracted`).
- **Copying:** the decks are © Entomological Society of America. Their "Read me" restricts them to ESA members and Certified Entomologists teaching classes, and says not to copy them for distribution. No deck wording, quiz items or images are used; a script check found no 5-word overlap.
- **16 existing questions** that closely followed the decks' quiz slides were rewritten.
- **Corrected:**
  - German cockroaches prefer warm, moist places.
  - Termites are now classified within Blattodea.
  - True powderpost beetles are Lyctinae, within Bostrichidae.
  - Bean weevils are Bruchinae.
  - Silverfish are Zygentoma.
  - Extension heat guidance is 130°F for 30 minutes.
- **Deck errors rejected:** chitin as a protein; wings from the prothorax; Streptomyces as a fungus; "good management practices"; MSDS; "EPA established by Congress"; males producing moth pheromones; and others. See the agent report.

**OPEN, needs the owner's decision:** the 12 NotebookLM slide decks served from ace-prep-app.vercel.app show the "Entomological Society of America Certification Corporation" seal as a background on slides. That implies ESA endorsement and may be derived from ESA's copyrighted decks.
- **Fixed:** the deck page counts were also wrong in the data (56–195 listed; actual 7–15) and are now corrected.

## State licensing, 45-state expansion (2026-10-01)

Researched states live in `lib/content/state-research.ts` (generated by `scripts/content/merge-state-research.mjs`). Hand-built TX, WA, FL, CA and SC take precedence over any researched record for the same state. Per-state gaps, conflicts and document dates are in each record's `notes`.

Recheck before relying on these:
- **MA:** category numbers come from MDAR's 2026 bulletin; 333 CMR uses 7(a)–(g). The renewal fee conflicts ($50 in the LII copy vs $150 on MDAR's page; $150 used).
- **MT:** category (7) vs (40) in an older PDF. Unclear whether 12 credits per cycle is per category or a total.
- **NE:** the reciprocity crosswalk is dated 2012.
- **OK:** sourced from ODAFF's unofficial copy (Nov 2022; rules amended through 2017). Check against the live OAC.
- **NJ:** NJDEP pages are behind a CAPTCHA wall. Credit figures come from Rutgers PMO, not the rule text.
- **NM:** the CEU rule changes on 2027-04-01. The licence fee conflicts ($75 in the rule vs $100 on the page), so it is left null.
- **PA, NJ:** 30-minute credits converted to clock hours in the per-category table; the credit count is kept in the label.
- **VT:** unclear whether 16 credits is per category or a total.
- **RI:** 8 credits per category per the rule (DEM pages just say "8 credits").
- **WY:** follows the rule s.28-3(h); recert options are alternatives, not cumulative.
- **Batch AL–HI:**
  - AZ category codes are rule references (no card codes found).
  - AR renewal date conflicts: "prior to June 30" in the rule vs "prior to July 1" in the 2026 overview.
  - HI renewal fee conflicts: $278/$212 on the Board page vs $210/$160 in the Jan 2026 FAQ. The record carries only the $30 DAB applicator fee.
  - DE admin code wouldn't extract.
  - GA has no public approved-course search.
- **Batch ID–MD:**
  - ME, KY and ID follow the current administrative code over older agency pages.
  - LA's recert deadline differs by a year (LDAF page vs LAC 7:XXV.117); the reader caveat is on the page.
  - KS fees are null (the K.A.R. fee sections have reversion clauses), and agriculture.ks.gov blocked everything.
  - KS codes are reversed: 7A is wood-destroying, 7E is general structural.
  - MD credits (half-hour) were converted by the research batch itself.
  - IA's 7A–7F codes come from a 2011 IDALS sheet.

**All 50 states verified as of 2026-10-01.** The audit gate now checks that non-state slugs 404.
