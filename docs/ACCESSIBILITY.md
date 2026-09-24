# ACCESSIBILITY.md — Dimension 14 register

Keystone v3.1 added Accessibility as Dimension 14, scored **per template, not per page**. An
accessibility finding on a template is a **P0 that blocks that template's first publish**.

Two reasons it sits beside Dimension 11 as a "keep the client out of trouble" dimension: Title III
demand letters reach small local service businesses, and the conversion cost of a broken form is
real. For this property there is a third — the audience works one-handed on a phone in a truck
cab, often in gloves, often in sunlight. The accessibility floor and the usability floor are the
same floor here.

## The checks

| # | Check | Standard |
|---|---|---|
| 1 | Keyboard operability — every interactive element reachable and operable | Manual |
| 2 | Visible `:focus-visible` state on every interactive element | Manual + script |
| 3 | Form labelling, plus `autocomplete` / `name` attributes | Manual |
| 4 | Semantic `<button>` vs `<a>` — actions are buttons, navigation is links | Manual |
| 5 | Contrast: 4.5:1 body, 3:1 large text | Script |
| 6 | Tap targets 44×44px with `touch-action: manipulation` | Manual |
| 7 | Descriptive link text — no "click here", no bare URLs | Script |
| 8 | `prefers-reduced-motion` honoured | Script |
| 9 | `alt` correctness — meaningful or empty, never filename | Manual |
| 10 | Usable at 200% zoom and 320px width | Manual |

**The script covers a mechanical subset only.** A silent script is not a pass. The human column
below must be filled in by a person, with a date, before a template ships.

## Register

Status: `BLOCKED` (finding open) · `PASS` (script + human) · `SCRIPT ONLY` (human pass outstanding)

| Template | Route | Script | Human | Date | Notes |
|---|---|---|---|---|---|
| Root layout | all | — | — | — | Skip link present. `prefers-reduced-motion` global. Viewport never restricts scale. **Focus outline uses Field green on Label stock — 9.8:1, passes.** |
| Homepage | `/` | — | — | — | State grid is a real `<ul>` of links. Hero has one primary action. |
| Hub index | 8 routes | — | — | — | Card links wrap the whole cell — check the focus ring is not clipped by `overflow`. |
| State CEU | `/academy/ceu/:state/` | — | — | — | Hours table has a visually hidden `<caption>` (A11Y-01 closed). |
| State licensing | `/academy/licensing/:state/` | — | — | — | Categories table has a visually hidden `<caption>` (A11Y-01 closed). |
| Forum thread | `/community/forums/:c/:t/` | — | — | — | Verified badge uses a `✓` glyph — confirm it is `aria-hidden` and the text carries the meaning. It is. |
| Person | `/about/team/:slug/` | — | — | — | — |
| Trust pages | `/about/*` | — | — | — | `LabelBlock` renders `<dl>` / `<dt>` / `<dd>` correctly. |
| Join | `/join/` | — | — | — | **Verification form not built yet (R-10). Check 3 and 6 apply when it is.** |

## Known open findings

| ID | Template | Finding | Severity |
|---|---|---|---|
| A11Y-01 | State CEU, State licensing | ~~Data tables have no accessible name.~~ **RESOLVED** — visually hidden `<caption>` added to both templates, naming the table and the state. | Closed |
| A11Y-02 | All templates | Human pass not yet run on any template. The script being silent is not a pass. | **P0 — blocks first publish** |

## Notes specific to this audience

- **Sunlight.** Fine print (`--ink-3`) is 4.6:1 — AA, but only just. Never use it for anything a
  reader must act on. It is for spec keys and metadata only, and the system already enforces that.
- **Gloves.** 44×44px is a floor, not a target. On the state grid and forum lists, give rows real
  vertical padding rather than relying on line-height.
- **One hand.** Primary actions stay in the lower two-thirds of the viewport on mobile where they
  can be. This is a layout habit, not a rule we can script.
