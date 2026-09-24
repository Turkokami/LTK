# DESIGN.md

## Direction: night route

The palette is lifted from the LTK badge (`public/brand/ltk-badge.jpg`): the smoky green-black
behind it, the bone of the scope ring and lettering, and the blood red of the ribbon and the
rat's ears. The label system (signal bars, spec grids) stays — it is still the right way to show
regulatory facts — but it now sits on a dark ground, with soft 10px corners and cards instead of
hairline tables. Copy is warm and plain-spoken: a crew talking, not a database describing itself.

## Tokens

Defined in `app/globals.css`, documented in `lib/brand.ts`. **Never a raw hex in a component.**

| Token | Value | Use |
|---|---|---|
| `--stock` | `#121412` | Page ground. The smoke behind the badge. |
| `--paper` | `#1a1c1a` | Panels, cards, footer. |
| `--ink` | `#efe8d6` | Bone. Primary text. |
| `--rule` | `#34362f` | Borders — the scope's crosshair lines. |
| `--signal-danger` | `#b3141f` | Blood red. Primary buttons (the Discord CTA) and the brand accent. |
| `--blood-text` | `#f05a63` | Red used as text on dark: links, highlights, the eyebrow dot. |
| `--signal-warning` | `#e0a013` | WARNING. Regulatory and state-specific flags. |
| `--field` | `#6cc49a` | Licensed green. Verified credentials, anything earned. |

All text pairings pass WCAG AA; contrast ratios are recorded in `lib/brand.ts`.

## Type

| Role | Face | Notes |
|---|---|---|
| Display + UI | **Archivo** | Industrial grotesque. 800 for display, tight negative tracking. |
| Long-form reference | **Newsreader** | `.prose-bulletin`. Academy and Wire body only. Reads as a technical bulletin. |
| Data + labels | **JetBrains Mono** | Spec labels, credential numbers, state codes, eyebrows, buttons. |

**Sentence case for all headings.** Uppercase is reserved for label-system eyebrows, spec keys,
signal bars and buttons. That reservation is what makes uppercase mean something.

## The signature: `LabelBlock`

A precautionary-statement panel — hairline box, uppercase mono signal bar, rigid key/value grid.
Three jobs and no fourth:

1. Regulatory facts on Academy state pages → `signal="warning"`
2. Verified credentials on member and expert pages → `signal="field"`
3. Methodology and disclosure statements in the Lab → `signal="danger"`

It renders `null` values as an honest *"Not yet published — verifying with the state agency"*
rather than hiding the gap, and renders registry sentinels as unmissable amber hatching. The
component enforces the content policy; that is the point of putting it in one place.

## The `datasheet` frame

Content column plus a persistent mono spec gutter carrying record metadata: state code,
verification date, build wave, sibling routes. It is the visual argument that this is a
maintained reference, not a blog. Collapses below 60rem.

## Quality floor (not negotiable)

- Responsive to 360px
- Visible keyboard focus everywhere, `--focus` outline
- `prefers-reduced-motion` respected globally
- Colour never the sole carrier of meaning — every signal colour is paired with a word
- Viewport never restricts scale

## Motion

Almost none. Hover state changes on links and cards, nothing else. This is a reference tool read
one-handed in a truck cab. Restraint here is the design; scattered animation is the fastest way
to make a site read as generated.
