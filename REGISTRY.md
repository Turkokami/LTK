# REGISTRY.md

Real-world values the build depends on. **Never invent one of these.**

Use `TODO_REGISTRY('R-xx', 'what is missing')` from `lib/utils.ts` as a placeholder. It renders a
visible amber flag in development and **fails the production build**. That is intentional.

Status: `BLOCKED` · `IN PROGRESS` · `RESOLVED`

---

## Blocking launch

| ID | Item | Status | Owner | Notes |
|---|---|---|---|---|
| **R-01** | **Parent brand legal name** | OPEN | Kristofer | Owner chose **LTK Community Hub / Licensed to Kill** on 2026-09-24, matching the Discord community and badge logo. Still needs USPTO clearance in classes 35/41/42 plus state and common-law search by a trademark attorney — the audit flagged collisions with an operating NM pest company, LikeToKnow.it ("LTK") and the Bond franchise. `BRAND_STATUS` stays PROVISIONAL until cleared. |
| **R-02** | Registered entity + jurisdiction | BLOCKED | Kristofer | Determines `Organization.legalName`, footer, terms. Consider whether this sits under LOKES ONE or a separate entity — the audit's valuation guidance was to keep the media asset's books clean and separate. |
| **R-03** | Apex domain | BLOCKED | Kristofer | Everything canonical depends on this. `site.config.ts` currently uses a placeholder that will fail the build. |
| **R-04** | Logo + brand mark (SVG, 1200×1200 raster) | BLOCKED | Kristofer | Feeds `#logo` ImageObject node and OG generation. |
| **R-05** | **Advisory board — 3–5 credentialed entomologists** | BLOCKED | Kristofer | Name, ACE/BCE number, issuing body, institution, headshot, bio, LinkedIn/Scholar `sameAs`, signed participation agreement. **Longest lead time in the entire plan.** Moves E-E-A-T from 1 to 4 on its own. |
| **R-06** | Editorial lead (named, bylined, accountable) | BLOCKED | Kristofer | Every Academy and Wire page needs a named author and a named reviewer. Anonymous content does not compete in a YMYL-adjacent regulatory vertical. |
| **R-07** | Contact addresses — join@, partners@, ir@, press@ | BLOCKED | — | Depends on R-03. |
| **R-08** | Legal text: privacy, terms, community code of conduct, member data policy | BLOCKED | Kristofer | Code of conduct is read first by every sponsor's brand-safety review. Member data policy matters more than usual because of R-10. |

## Blocking specific phases

| ID | Item | Status | Blocks | Notes |
|---|---|---|---|---|
| **R-09** | Forum backend selection | BLOCKED | Phase 5 | **Verify server-rendered thread HTML before selecting.** Several modern community SaaS products render threads client-side or `noindex` them by default, which would destroy the single highest-leverage asset on the site. Test: `curl` a thread URL and grep for post body text. |
| **R-10** | License verification service / process | BLOCKED | Phase 5 | Must store state, license number, category, verified-at, with an auditable trail. This is the differentiator against Facebook groups, the credibility that gets an entomologist to lecture, the audience-quality claim in the media kit, and the data asset capital is buying. Manual review is acceptable at founding-cohort scale. |
| **R-11** | Video hosting + transcript pipeline | BLOCKED | Phase 4, 6 | Every session and stream needs an on-page timestamped transcript inside `VideoObject.transcript`. Video is invisible to text retrieval; transcripts are not. |
| **R-12** | Course / CEU record system | BLOCKED | Phase 4 | Registration, attendance, assessment, certificate, CEU record export. |
| **R-13** | Analytics + consent stack | BLOCKED | Phase 1 | Three separate funnel segments. Instrument before launch — retrofitting means the first six months of cohort data are permanently lost, and cohort data is exactly what sponsors and investors ask for. |
| **R-14** | **State licensing + CEU data, Wave 1** | BLOCKED | Phase 3 | TX, WA, FL, CA, SC. Per state: agency name + URL, license categories with codes, exam structure, application fee, renewal cycle length, CEU hours by category, accepted formats, approved-provider list, renewal deadline, reciprocity agreements. **Every value needs a source URL and a verification date.** You operate in WA, TX and SC — verify those three first-hand. |
| **R-15** | State licensing + CEU data, Waves 2–3 | BLOCKED | Phase 3b | 45 remaining. Do not start until Wave 1 is indexed and ranking. |
| **R-16** | Sponsor pricing | BLOCKED | Phase 7 | Model against the NPMA benchmark: a company sponsoring an NPMA event without exhibiting must commit ≥ $7,500 just for one-time attendee-list access, from an event drawing ~3,500–3,750 attendees with 90%+ buying influence. You are selling 365 days and a behavioural relationship, not four days and a list. Price against the exhibit-plus-sponsorship line, not against a banner ad. |
| **R-17** | Real member/audience numbers for `/partners/audience/` | BLOCKED | Phase 7 | Verified member count, state distribution, role mix, company-size mix, license categories held, average tenure, MAU, session depth. Publish with a visible timestamp, update monthly. **Publishing an unverified number here is unrecoverable** — it is the one page a sponsor will fact-check. |
| **R-18** | Prize inventory + tournament rules review | BLOCKED | Phase 6 | Skill-based contest rules vary by state. Needs legal review before the first Championship. |

## Resolved

_(move rows here with the resolution date and the source)_

---

## Rules

1. A `TODO_REGISTRY` sentinel in a production path fails the build. Do not suppress it.
2. When you resolve an item, update this table **in the same commit** as the code change, with a source URL and a date.
3. If you find yourself about to write a plausible-sounding number, stop and add a registry row instead.
4. Registry values with a legal, regulatory or financial character (R-05, R-08, R-14, R-16, R-18) need human sign-off before they go live. Code review is not sign-off.
