# COMMITS.md — the handoff sequence

Suggested commit boundaries for what is already in this repo, so the history reads as a build
rather than one opaque drop. Run `npm run verify` before each.

| # | Message | Files |
|---|---|---|
| 1 | `chore: scaffold Next 15 App Router, TS strict, Tailwind token layer` | `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `.gitignore`, `.env.example` |
| 2 | `docs: build standard, phased plan, blocker registry` | `CLAUDE.md`, `BUILD-PLAN.md`, `REGISTRY.md`, `README.md`, `docs/*` |
| 3 | `feat(brand): single-point site config with provisional-brand guard` | `lib/site.config.ts`, `lib/utils.ts` |
| 4 | `feat(schema): root @graph builder + per-template entity builders` | `lib/schema/*` |
| 5 | `feat(content): route registry and 50-state registry with wave assignment` | `lib/content/hubs.ts`, `lib/content/states.ts`, `lib/content/people.ts` |
| 6 | `feat(design): label system tokens, type scale, LabelBlock signature` | `app/globals.css`, `components/label/*`, `components/ui/*` |
| 7 | `feat(site): root layout, header, footer, breadcrumbs, JsonLd` | `app/layout.tsx`, `components/site/*`, `components/JsonLd.tsx` |
| 8 | `feat(home): answer-first homepage with state entry and hub grid` | `app/page.tsx` |
| 9 | `feat(hubs): eight server-rendered hub indexes` | `app/{academy,community,lab,arena,trade,wire,partners}/page.tsx` |
| 10 | `feat(academy): state CEU + licensing templates with FAQPage/HowTo graph` | `app/academy/**` |
| 11 | `feat(community): forum thread template with DiscussionForumPosting` | `app/community/forums/**` |
| 12 | `feat(funnels): join and investors entry points` | `app/join/`, `app/investors/` |
| 13 | `feat(seo): segmented per-hub sitemaps, robots, llms.txt, llms-full.txt` | `app/sitemap.ts`, `app/robots.ts`, `public/llms*.txt` |
| 14 | `feat(og): self-hosted per-template OG card generation` | `app/og/[template]/route.tsx` |
| 15 | `feat(analytics): three-funnel event taxonomy with PII guard` | `lib/analytics/`, `components/analytics/` |
| 16 | `feat(trust): full Trust hub — standards, methodology, policy, conduct, board` | `app/about/**` |
| 17 | `chore(ci): smart site audit gate` | `scripts/audit-smartsite.mjs` |

## Before the first deploy

```bash
npm install
npm run verify                          # typecheck + lint + build
npm run build && npm start &
npm run audit:smartsite                 # will FAIL until R-03 sets a real domain — expected
```

The audit failing on the placeholder domain is correct behaviour, not a bug. Resolve
`REGISTRY.md` R-03 and re-run.

## Vercel

- Env vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_BRAND_NAME`, `NEXT_PUBLIC_BRAND_STATUS`
- Protect `main`; every PR gets a preview deployment
- Add `npm run verify` and `npm run audit:smartsite` as required checks
- **Do not point the production domain at this until R-01 and R-03 resolve.** URLs are permanent
  from the moment they are indexed (CLAUDE.md 2.7) — shipping on a placeholder domain creates
  exactly the migration debt this whole rebuild exists to escape.
