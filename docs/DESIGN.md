# DESIGN.md

## Direction: the label is the law

Every technician in America reads a pesticide label daily. It is this trade's most universal
artifact and the source of its most repeated sentence. The interface is built from it.

To an insider, label typography reads as instant competence. To a sponsor's brand-safety review,
it reads as regulatory seriousness. Neither is available from a generic SaaS look.

Deliberately **not**: warm cream + serif + terracotta, near-black + acid green, or broadsheet
hairline columns. Those are AI-design defaults, and this brief has its own material to work from.

## Tokens

Defined in `app/globals.css`. **Never a raw hex in a component.**

| Token | Value | Use |
|---|---|---|
| `--stock` | `#f0efe9` | Page ground. Label stock, cool bone — not warm cream. |
| `--paper` | `#fbfbf8` | Panels, cards, header, footer. |
| `--ink` | `#16171a` | Body text, label bars, primary buttons. |
| `--rule` | `#c9c7bd` | Hairlines. Labels are built from rules, not shadows. **No box-shadows anywhere.** |
| `--signal-danger` | `#d13a1f` | DANGER. The single most important thing on a page. **Once per page, never twice.** |
| `--signal-warning` | `#e0a013` | WARNING. Regulatory and state-specific flags. |
| `--field` | `#1f4d3d` | Verified credentials, licensed status, anything earned. |

The signal-word hierarchy carries meaning exactly as it does on a real label. If you want a
second DANGER on a page, one of the two is not the most important thing on the page.

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
