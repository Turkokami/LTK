# Smart Site — pest control professional community

A server-rendered, schema-native, geo-dense community platform for licensed pest management
professionals.

**Read `CLAUDE.md` before writing any code.** Then `BUILD-PLAN.md`, then `REGISTRY.md`.

```bash
npm install
cp .env.example .env.local     # see REGISTRY.md R-01 and R-03 first
npm run dev
```

Gates:

```bash
npm run verify            # typecheck + lint + build. Must pass on every commit.
npm run build && npm start
npm run audit:smartsite   # SSR content, @graph integrity, canonical, meta lengths, a11y
```

| Doc | What it is |
|---|---|
| `CLAUDE.md` | The build standard. The contract. |
| `BUILD-PLAN.md` | Phased task list with commit boundaries. |
| `REGISTRY.md` | Real-world values the build is blocked on. Never invent one. |
| `docs/DESIGN.md` | The label system — tokens, type, the signature component. |
| `docs/SCHEMA.md` | Structured-data contract. |
| `docs/CONTENT.md` | Editorial rules and voice. |
| `docs/SCORECARD.md` | Which phase moves which Smart Site dimension. |

## Current state

Phase 1 skeleton. Eight hub indexes, two fully-built reference templates (state CEU, forum
thread), the schema engine, the design system, the state registry, and the audit gate.

Everything else is `BUILD-PLAN.md`.
