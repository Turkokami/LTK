# CLAUDE.md — Build Standard

This repository is a **Smart Site** build. Read this file completely before writing any code.
It is the contract. Where this file and your instinct disagree, this file wins.

Companion documents:

| File | Purpose |
|---|---|
| `BUILD-PLAN.md` | Phased task list. Each phase = one or more commits. Work top to bottom. |
| `REGISTRY.md` | Blockers requiring real-world data. **Never invent a registry value.** |
| `docs/SCHEMA.md` | The structured-data contract. Non-negotiable. |
| `docs/DESIGN.md` | Design tokens, type scale, component rules. |
| `docs/CONTENT.md` | Editorial rules, page templates, copy standards. |

---

## 1. What this site is

A professional community and continuing-education platform for **licensed pest management
professionals** — technicians, route managers, branch managers, owner-operators.

Three audiences, three funnels, never blended:

1. **Practitioners** → `/join/` (license-verification gate, free tier)
2. **Sponsors** → `/partners/` → `/partners/media-kit/`
3. **Capital** → `/investors/` → gated `/investors/data-room/`

Not a consumer pest control site. Never write homeowner-facing copy. Never give pest
treatment advice to the general public. The reader is a licensed applicator.

---

## 2. Non-negotiables

These are the reasons this codebase exists. A PR that violates any of them is wrong even if
it looks good.

### 2.1 Every indexable page is server-rendered
No `'use client'` on a page component. Ever. Client components are leaves only — interactive
widgets imported into a server page. If a page's content is not present in the raw HTML
response, the page has failed its only job.

**Verify before every commit:**
```bash
npm run build && npm start
curl -s http://localhost:3000/academy/ceu/texas | grep -c "CEU"   # must be > 0
```

### 2.2 Every page emits a valid `@graph`
No page ships without JSON-LD. Use `buildGraph()` from `lib/schema/graph.ts`. Never hand-write
a `<script type="application/ld+json">`. Never emit two `Organization` nodes on one page.
See `docs/SCHEMA.md`.

### 2.3 Every page has an answer-first opening
Academy, Lab and Wire pages open with a `<QuickAnswer>` block before any narrative: the target
question as an H2, a 40–60 word self-contained answer, one hard fact, and a last-verified date
with a named reviewer. Answer engines extract the first complete answer they find. If it is in
paragraph nine, a competitor's paragraph one wins.

### 2.4 Brand tokens come from one file
Everything brand-related resolves from `lib/site.config.ts`. Never hardcode the brand name, the
domain, an email address, or a social URL anywhere else. The parent brand is **provisional**
(see `REGISTRY.md` R-01) and will be renamed with a single edit to that file.

### 2.5 No invented facts
State licensing hours, CEU requirements, credential numbers, member counts, sponsor names,
pricing, statistics. If you do not have a verified source, use the `TODO_REGISTRY` sentinel:

```ts
import { TODO_REGISTRY } from '@/lib/utils';
ceuHours: TODO_REGISTRY('R-14', 'TX CEU hours per renewal cycle'),
```

This renders a visible amber build-time flag in development and **fails the production build**.
That is intentional. A wrong CEU number is worse than no page.

### 2.6 Accessibility floor
- Viewport meta never restricts scale. (`maximum-scale` is banned — it was the original site's defect.)
- Visible keyboard focus on every interactive element.
- `prefers-reduced-motion` respected.
- Colour is never the only carrier of meaning.
- Every image has meaningful `alt` or `alt=""` if decorative.

### 2.7 URLs are permanent
Once a route ships, its URL does not change. No trailing-slash drift, no casing drift, no
"we reorganised the hubs." Answer engines penalise broken citations far more than they reward
fresh ones. If a route must move, ship a `301` in `next.config.mjs` in the same commit.

---

## 3. Architecture

Eight hubs. Each hub is a topical authority centre with its own index, its own spoke templates,
its own schema primary entity, and its own conversion job.

```
/academy/    Education. Licensing, CEU, exam prep, courses, live sessions.  Course/Event/FAQPage
/community/  Forums, state chapters, member profiles.        DiscussionForumPosting/ProfilePage
/lab/        Technology, independent reviews, comparisons, field trials.    Product/Review/ItemList
/arena/      Games, tournaments, leaderboards, seasons.                     Event/ItemList
/trade/      Jobs, salary data, starting and selling a company.             JobPosting/Dataset
/wire/       News, regulatory changes, label updates, recalls.              NewsArticle
/partners/   Sponsor conversion. Audience data, tiers, partner pages.       Offer/Organization
/about/      Trust anchor. Team, advisory board, standards, methodology.    AboutPage/Person
```

Plus `/join/`, `/investors/`, `/search/`.

The full route map is in `lib/content/hubs.ts`. It is the single source of truth for
navigation, breadcrumbs, sitemaps and the footer. **Add a route there first, then build it.**

### The geo layer is the traffic engine
Five stacked 50-state grids = 300 pages:

| Layer | Route | Intent |
|---|---|---|
| L1 | `/academy/licensing/[state]/` | "pest control license texas" |
| L2 | `/academy/ceu/[state]/` | "pest control CEU requirements texas" |
| L3 | `/community/chapters/[state]/` | brand + geo, meetups |
| L4 | `/trade/jobs/[state]/` | "pest control technician jobs texas" |
| L5 | `/arena/leaderboards/[state]/`, `/wire/regulatory/[state]/` | engagement, monitoring |

**Do not generate all 50 at once.** Build Wave 1 (TX, WA, FL, CA, SC) with real verified data,
confirm indexation, then scale. Fifty templated pages with the state name swapped is doorway
spam and Google treats it as such. Each state page must carry genuinely state-specific
substance: real category names, real hour requirements, real renewal dates, real agency,
real approved providers.

---

## 4. Stack

- Next.js 15 App Router, TypeScript strict, React Server Components
- Tailwind CSS with the token layer in `app/globals.css` — **use the semantic tokens, not raw hex**
- `next/font` for Archivo, Newsreader, JetBrains Mono. No external font CDN.
- No client-side data fetching for indexable content. Ever.
- Content lives in typed TS modules under `lib/content/` until a CMS is chosen (see `REGISTRY.md` R-09).

### Banned
- `localStorage` / `sessionStorage` in anything that must render server-side
- `useEffect` for content
- Plugin-generated or library-generated schema
- Any dependency added without a note in the commit message explaining why

---

## 5. Commit protocol

One phase from `BUILD-PLAN.md` per commit series. Conventional commits:

```
feat(academy): state CEU template with FAQPage + HowTo graph
fix(schema): dedupe Organization node on nested layouts
chore(seo): segmented sitemaps per hub
docs(registry): mark R-03 resolved — domain confirmed
```

**Every commit must pass:**
```bash
npm run typecheck && npm run lint && npm run build
```

**Every commit that adds a route must also:**
1. Add the route to `lib/content/hubs.ts`
2. Confirm it appears in the correct segmented sitemap
3. Paste the Rich Results validation status in the commit body

### Before opening a PR
Run `npm run audit:smartsite`. It checks: SSR body content present, `@graph` valid and
deduplicated, canonical set, title ≤ 60 chars, meta description 140–160 chars, no `TODO_REGISTRY`
sentinels in production paths, no `maximum-scale` in viewport.

---

## 6. Copy standards

Write from the technician's side of the screen.

- **Specific over clever.** "50 states, verified quarterly" beats "comprehensive coverage."
- **Active voice.** A button says what happens: "Verify my license," not "Submit."
- **Consistent vocabulary.** The action keeps its name through the whole flow. "Join" produces "Joined."
- **Sentence case** for headings. Uppercase is reserved for label-system eyebrows and signal words.
- **No marketing filler.** Delete "seamless," "empower," "unlock," "revolutionary," "cutting-edge."
- **Empty states are invitations,** not apologies. Errors say what happened and how to fix it.
- **Never say "exterminator"** in first-party voice. The trade says pest management professional,
  technician, or applicator. (The one exception is the Arena competition brand — see §7.)

---

## 7. The brand situation — read this before naming anything

The parent brand in `lib/site.config.ts` is **PROVISIONAL**. It is a placeholder pending
trademark clearance (`REGISTRY.md` R-01).

**"Licensed to Kill" is not the parent brand.** It has three live collisions: an operating
New Mexico pest control company using the name in commerce, the LTK creator-commerce platform
which owns the acronym in search, and a heavily-defended film franchise — plus it is a
brand-safety problem in every enterprise sponsorship conversation.

It survives as **the name of the Arena's flagship annual competition only**:
`/arena/tournaments/licensed-to-kill-championship/`. The edge lands where it earns (culture,
competition, identity) and stays off the contract, the invoice and the cap table.

Do not use "Licensed to Kill" or "LTK" as the site name, in the `<title>` of any page other
than the championship pages, in schema `Organization.name`, or in any email address.

---

## 8. Scoring

This build is measured on the **Keystone v3.2 fourteen-dimension rubric**, not the original
eight. `docs/KEYSTONE.md` records what changed and what was corrected in this repo — read it
before adding anything, so nothing rejected gets re-introduced.

**Re-baselining rule (v3.1).** The August audit scored the Manus prototype **1.25 on the
eight-dimension rubric**. Never restate that figure on the fourteen-dimension rubric and never
recompute a published average. Always state the rubric version with any score quoted. Dimensions
9, 11, 12, 13 and 14 are scored forward only — first measurement, no "before".

When you are deciding between two implementations, pick the one that moves a dimension.
`docs/SCORECARD.md` maps phases to dimensions.

---

## 9. Three files that gate new work

| File | Gates |
|---|---|
| `lib/content/conversion.ts` | Conversion Contract, snippet shape, citability. **A page type with no contract does not ship.** |
| `docs/ACCESSIBILITY.md` | Dimension 14, per template. An open finding blocks that template's first publish. |
| `docs/KEYSTONE.md` | What v3.2 rejected. Do not re-add `llms.txt`, `HowTo`, Speakable, or word-count floors. |
