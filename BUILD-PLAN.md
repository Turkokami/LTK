# BUILD-PLAN.md

Work top to bottom. Do not skip ahead — later phases assume earlier ones landed.
Each `[ ]` is a commit-sized unit. Mark `[x]` in the same commit that completes it.

Legend: **★** = scaffolded in this repo already · **○** = to build · **◆** = blocked on `REGISTRY.md`

---

## Phase 0 — Foundations (Days 1–21)

Runs in parallel with Phase 1. Mostly not code.

- [ ] ◆ **R-01** Trademark clearance on three parent-name candidates (USPTO classes 35/41/42, state, common-law)
- [ ] ◆ **R-03** Register apex domain + social handles
- [ ] ◆ **R-05** Confirm 3–5 advisory board entomologists (ACE/BCE). **Longest lead time on the plan — start day one.**
- [x] ★ Vercel project + preview deployments (branch protection on `main` still to do)
- [ ] ○ Record baseline rankings for the 20 Wave-1 geo queries (before any page ships)
- [ ] ○ Page-level re-verification of the nine benchmark properties from the audit

---

## Phase 1 — Skeleton & schema (Days 22–35)

The whole point: a crawlable, entity-anchored shell before a single word of content.

- [x] ★ Next.js 15 App Router + TS strict + Tailwind token layer
- [x] ★ `lib/site.config.ts` — single-point brand tokens
- [x] ★ `lib/schema/graph.ts` — root `@graph` builder (Organization / WebSite / WebPage / BreadcrumbList / ImageObject)
- [x] ★ `lib/schema/entities.ts` — per-template primary entity builders
- [x] ★ `lib/content/hubs.ts` — route registry, single source of truth
- [x] ★ `lib/content/states.ts` — 50-state registry with wave assignment
- [x] ★ `lib/seo/metadata.ts` — title/description/canonical/OG helper
- [x] ★ Design system: `app/globals.css` label-system tokens, Archivo / Newsreader / JetBrains Mono
- [x] ★ `components/label/LabelBlock.tsx` — signature component
- [x] ★ `components/ui/QuickAnswer.tsx` — AEO answer-first block
- [x] ★ Header, Footer, Breadcrumbs, JsonLd
- [x] ★ Eight hub index routes, server-rendered
- [x] ★ `app/robots.ts` hardening + per-hub segmented sitemaps (`generateSitemaps`, one segment per hub + `core`)
- [x] ★ `public/llms.txt` and `public/llms-full.txt`
- [x] ★ `npm run audit:smartsite` script (see `CLAUDE.md` §5)
- [x] ★ OG image generation route `app/og/[template]/route.tsx` (self-hosted, per-template, label design language)
- [x] ★ Analytics: three-funnel event taxonomy (`lib/analytics/events.ts`) + `TrackView` leaf. **Vendor impl is R-13.**

---

## Phase 2 — Trust hub (Days 30–40)

These pages establish the entity. They ship **before** content, not after.

- [x] ★ `/about/` and `/about/editorial-standards/`
- [x] ★ `/about/team/[slug]/` — Person entity per staff member, individual URLs not a headshot grid
- [x] ★ `/about/advisory-board/` template built — **renders an honest 'board in formation' state until R-05 lands**
- [x] ★ `/about/review-methodology/` — shipped ahead of the Lab, as required
- [x] ★ `/about/sponsorship-policy/` — the editorial wall, stated publicly
- [x] ★ `/about/verification/` — how licence verification works
- [x] ★ `/about/code-of-conduct/` — draft shipped. **Needs legal review (R-08) before launch.**
- [x] ★ `/about/press/` and `/about/contact/`

---

## Phase 3 — Geo layer, Wave 1 (Days 36–55)

**Five states only.** Do not scale until these rank.

- [x] ★ `/academy/licensing/[state]/` template
- [x] ★ `/academy/ceu/[state]/` template
- [ ] ◆ **R-14** Verified licensing + CEU data for TX, WA, FL, CA, SC — agency, categories, hours, cycle, fees, approved providers
- [ ] ○ Reviewer sign-off on each of the 10 pages (named human, dated)
- [ ] ○ Submit to GSC, confirm indexation, record ranking movement at day 14 and day 28
- [ ] ○ **Gate:** do not start Wave 2 until ≥ 6 of 10 pages are indexed and ranking

## Phase 3b — Geo layer, Waves 2–3 (Days 56–120)

- [ ] ◆ Wave 2 (10 states): GA, NC, AZ, OH, PA, NY, IL, TN, VA, AR
- [ ] ◆ Wave 3 (35 states + DC)
- [ ] ○ `/academy/exam-prep/[category]/` — 12 categories
- [ ] ○ Quarterly re-verification job + `dateModified` discipline

---

## Phase 4 — Lab (Days 50–90)

- [ ] ○ `/about/review-methodology/` **must be live first**
- [x] ★ `/lab/technology/[slug]/` template
- [ ] ○ 20 technology explainers: remote rodent monitoring, sensor networks, AI pest ID, thermal remediation, drone/pole-cam, RNAi & biologicals, automated bait stations, electronic monitoring compliance
- [x] ★ `/lab/compare/[slug]/` template
- [ ] ○ First 5 software comparisons — identical criteria across all
- [ ] ○ `Product` + `Review` + `AggregateRating`. **`AggregateRating` only from verified-member ratings, never editorial scores.** Policy line, not a preference.

---

## Phase 5 — Community (Days 60–100)

- [x] ★ `/community/forums/[category]/` and `/community/forums/[category]/[thread]/` templates
- [ ] ◆ **R-09** Forum backend decision. **Verify server-rendered thread output before selecting** — several community SaaS products block indexation by default.
- [ ] ◆ **R-10** License verification service (state, number, category, verified-at, auditable trail)
- [ ] ○ 13 forum categories seeded
- [ ] ○ 20–30 hand-recruited founding members. **Never open an empty forum publicly.**
- [ ] ○ `/community/members/[handle]/` — `ProfilePage` + `Person`, member-controlled visibility
- [ ] ○ `/community/chapters/[state]/` — top 15 states with real rosters

---

## Phase 6 — Arena (Days 91–135)

The differentiator. Also the hardest technical requirement — **prototype game one early; it decides
whether this stays on Next.js or needs a separate app surface.**

- [x] ★ Game shell + scoring (client leaf on Next.js — it suffices for quiz-style games; anti-cheat waits for server-side leaderboards)
- [x] ★ Game 1: ACE Speed Round `/arena/games/speed-round/` (photo-based pest ID round still to build — needs an ID photo set)
- [ ] ○ Game 2: label literacy challenge
- [ ] ○ `/arena/tournaments/[slug]/` with `Event` schema
- [ ] ○ `/arena/leaderboards/` national + `[state]`
- [ ] ○ Inaugural **Licensed to Kill Championship** — member-only entry, real prize
- [ ] ○ Export every game result as a training record (this is what makes it sellable to sponsors, associations *and* investors)

---

## Phase 7 — Commercial (Days 100–160)

Open sponsor conversations **only now**. Not before the Academy produces traffic.

- [x] ★ `/partners/` and `/partners/audience/`
- [ ] ○ `/partners/sponsorship/` — tiers with published pricing, `Offer` schema
- [ ] ○ `/partners/inventory/` — every sponsorable unit itemised
- [ ] ○ `/partners/[brand]/` — sponsor entity pages (the renewal mechanism)
- [ ] ○ `/partners/media-kit/` — **HTML version is the one that ranks;** PDF is the download
- [ ] ○ `/trade/jobs/[state]/` with `JobPosting` — free Google for Jobs distribution nobody in this category claims
- [ ] ○ `/trade/salary/[role]/` — original survey data as `Dataset`

---

## Phase 8 — Capital (Days 136–180)

- [x] ★ `/investors/`
- [ ] ○ `/investors/thesis/`, `/investors/traction/`, `/investors/team/`
- [ ] ○ `/investors/data-room/` — gated, `noindex`, auth-walled
- [ ] ○ PestWorld 2026 — **Oct 20–23, Gaylord Texan, Grapevine TX.** Lands inside this window. Highest-density founding-member recruitment and sponsor-conversation opportunity of the year.

---

## Added 2026-09-24 (owner direction)

- [x] ★ Rebrand to LTK Community Hub; night-route palette from the badge; Discord funnel site-wide
- [x] ★ `/fields/` hub + 14 field guides with state-by-state licensing and BLS pay (sourced)
- [x] ★ ACE Prep `/academy/ace/` — 11 modules, practice test, flashcards, glossary, library
- [x] ★ Field photography registry, owner photos, "From the field" gallery
- [x] ★ `/community/podcast/` — episode 1: Marcus Scruggs on starting LTK
- [x] ★ `/search/` (noindex), mobile menu, branded 404
- [ ] ◆ Replace every `placeholder: true` photo in `lib/content/photos.ts` before launch
- [ ] ◆ K9 detection photos (owner supplying)
- [ ] ◆ Podcast transcripts (R-11). Founding date set to 2024-12-14 from the Discord server ID — Marcus can correct it

## Standing workstreams

| Workstream | Cadence | Dimension |
|---|---|---|
| The Wire — regulatory, label changes, recalls | 2×/week minimum | Content |
| Forum moderation | Daily | Content, Reviews |
| Geo re-verification | Quarterly | Local, E-E-A-T |
| Off-page proof: trade press, third-party profiles, sponsor logos | Continuous | **Reviews — the chronic weak dimension. Treat as a workstream, not a task.** |
| Smart Site re-score against the 9-property benchmark | Day 90 / 180 / 365 | All |
