# KEYSTONE.md — v3.2 conformance

This repo was scaffolded against the **eight-dimension Smart Site scorecard**. Keystone has
since moved to **v3.2 (14 Sep 2026), fourteen dimensions**, and several tactics this repo
originally shipped are now rejected on the record.

This file records what changed, what was corrected, and what is deliberately different. Read it
before adding anything, so nothing rejected gets re-introduced.

---

## Scoring — read this before quoting a number

The August audit scored the Manus prototype **1.25 on the eight-dimension rubric**.

**Never restate that number on the fourteen-dimension rubric, and never recompute the average.**
Keystone v3.1 re-baselining rule: always state the rubric version with any score quoted. When
this property is re-scored, dimensions 9 (Performance), 11 (Integrity), 12 (Entity & off-site),
13 (AI answer surface) and 14 (Accessibility) are scored **forward only** — first measurement,
no "before".

Correct phrasing: *"1.25 on the eight-dimension rubric, August 2026."*

---

## Removed — rejected in v3.2 §16.5

| Item | Was | Now |
|---|---|---|
| `llms.txt` / `llms-full.txt` | Shipped in `public/` | **Deleted.** Rejected on the record. Do not re-add. |
| `HowTo` markup | Emitted on state CEU pages | **Removed** from `stateReferenceEntities()`. Google retired HowTo rich results; the markup buys nothing and adds a maintenance surface. |
| FAQPage as a rich-result lever | Primary entity on state pages | **Demoted to conditional.** Emitted only when a genuine, visible FAQ block exists on the page — which it does on state pages, so it stays there. It is not a reason to add an FAQ. |
| Word-count floors | M1 3,000–5,000 words | Retired in v2. Nothing in this repo enforces a word count, and nothing should. |
| Speakable | Never shipped here | Retired. Do not add. |

## Schema graph — six required + four conditional

v3.2 renamed the "7-node graph". Current contract:

**Required (every page):** `WebSite`, `WebPage`, `ImageObject`, `Organization`, `BreadcrumbList`,
plus the page's primary entity (`Article` / `DiscussionForumPosting` / `Product` / `Event` /
`JobPosting` / `ProfilePage`).

**Conditional:** `FAQPage` (only with a visible FAQ), `Dataset` (salary survey), `ClaimReview`
(reserved — never on a service page), `VideoObject` (post-session, with transcript).

`buildGraph()` already enforces single-Organization. No other change needed.

---

## Added — v3.2 requirements this repo now carries

### Part 4A — Conversion Contract
Every page type declares exactly one primary action. `lib/content/conversion.ts` is the
contract; `docs/CONTENT.md` references it. **Lead magnets are banned** on any page carrying a
declared primary action, and may only exist on a dedicated landing page excluded from the
service and geo trees. Popups: frequency-capped, remembered dismissal, never on mobile entry,
never covering the primary CTA.

### Part 4.3 — Snippet-shape contract
Each page type declares whether its answer is a paragraph, a list or a table, and must carry
real semantic markup for that shape. Declared alongside the primary action in
`lib/content/conversion.ts`. A state CEU page declares **table** — so it ships a real `<table>`,
not a styled grid of divs.

### Part 6.5 — Citability
Four signals, tracked per page type in `lib/content/conversion.ts`:
1. A quantified, sourced, non-business fact
2. An outbound primary-authority citation in visible text
3. A stated position
4. First-party data

State pages hit 1, 2 and 4 (agency figures, agency link, member-reported changes). The Lab hits
all four. The forum hits 4 by construction.

### Part 3.5 — Navigation shell
Audited and compliant: 6 primary header items (4–7 required), primary action (`Join`) rightmost
and outside any hamburger, nav is crawlable HTML with no JS dependency, footer is 4 grouped
columns well under the ~40-link cap. `lib/content/hubs.ts` carries the nav assignment so an
orphan route fails at plan time.

### Dimension 14 — Accessibility, scored per template
`docs/ACCESSIBILITY.md` holds the per-template register. An accessibility finding on a template
is a **P0 that blocks that template's first publish**. The mechanical subset runs in
`npm run audit:smartsite`; the human pass is recorded separately and is never reported as
passing because the script was silent.

---

## Measurement doctrine (v3.2)

**We do not instrument the owner's phone.** No call tracking, no "how did you hear about us"
field, no call-derived counts. Basis is search data: GSC query × page, branded vs non-branded
split, impressions and clicks per page type, indexation by tier, plus on-site form and `tel:`
events. `lib/analytics/events.ts` is built to this shape.

Branded search volume is the attribution proxy for AI influence — stated as a **directional
proxy for influence**, never as a lead count and never as revenue.

## Operational notes carried over

- Schema must be read from a **rendered DOM**. `curl` never sees client-injected JSON-LD. Our
  audit script reads the served HTML because this site server-renders — that is valid here and
  would not be on a WordPress build.
- GA4 retention defaults to 2 months; set 14 at property creation.
- Set internal-traffic definition before testing forms, or our own tests inflate conversions.
- Referral exclusions must include our own subdomains and any scheduler or payment host.
- INP ≤200ms is the **28-day field** metric. TBT is the lab proxy only.
- Verify `OAI-SearchBot` and `PerplexityBot` receive a 200 — Cloudflare bot-fight silently
  overrides a permissive robots.txt.
- Crawl budget is a non-issue below ~1M URLs. Spend zero effort on log analysis here.
