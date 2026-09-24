# Deploying to Vercel

Everything here assumes the archive has been unpacked and you are at the repo root.

---

## 1. Before anything else — read this

**This site is not cleared to go live on a permanent domain yet.** Two registry blockers are
still open, and both of them are the kind that cannot be fixed after the fact:

| Blocker | What it is | Why it blocks go-live |
|---|---|---|
| **R-01** | THRESHOLD trademark clearance (USPTO 35/41/42) | The name collides with an operating New Mexico pest company, LikeToKnow.it, and the Bond franchise. A rename after indexation means redirecting every URL. |
| **R-03** | Apex domain not chosen | URLs are permanent from first indexation. A redirect inherits a discount; a URL never indexed under the wrong name inherits nothing. |

**Deploying is still the right move now** — you want the preview URL, the build pipeline and
the audit running against real infrastructure. You just should not let it get *indexed* yet.

The code enforces this for you. See §4.

---

## 2. Create the repo and push

```bash
cd smartsite-pest-community
git init
git add .
git commit -m "THRESHOLD: initial import — 231 routes, Wave 1 states verified, Lab open"
git branch -M main
git remote add origin git@github.com:<you>/<repo>.git
git push -u origin main
```

`.gitignore` already excludes `node_modules`, `.next`, `.env*` and `.vercel`.

---

## 3. Import into Vercel

1. Vercel dashboard → **Add New** → **Project** → import the repo.
2. Framework preset: **Next.js** (auto-detected).
3. Root directory: leave as the repo root.
4. Build command, output directory, install command: **leave all defaults.**
5. Do **not** deploy yet — set the environment variables first (§4).

---

## 4. Environment variables

Set these in **Settings → Environment Variables**, for **all three** environments
(Production, Preview, Development).

### While the brand and domain are unsettled — use exactly this

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | your Vercel URL, e.g. `https://threshold-abc123.vercel.app` |
| `NEXT_PUBLIC_BRAND_NAME` | `THRESHOLD` |
| `NEXT_PUBLIC_BRAND_STATUS` | `PROVISIONAL` |

With `BRAND_STATUS=PROVISIONAL` **or** a `vercel.app` URL, `app/robots.ts` serves a site-wide
`Disallow: /` and advertises no sitemap. That is deliberate — an advertised sitemap is an
invitation regardless of what the rules say.

Vercel adds `noindex` automatically to *preview* deployments, but **not** to production
deployments, and a production deploy lands on `<project>.vercel.app` until you attach a custom
domain. The gate in `lib/site.config.ts` (`INDEXABLE`) covers that hole.

### When R-01 and R-03 both resolve — and only then

| Key | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://<your-apex-domain>` |
| `NEXT_PUBLIC_BRAND_NAME` | the cleared name |
| `NEXT_PUBLIC_BRAND_STATUS` | `CLEARED` |

Changing `BRAND_STATUS` to `CLEARED` is what opens the site to crawlers. Treat flipping that
value as the go-live decision, because that is exactly what it is.

---

## 5. Fonts

`app/layout.tsx` loads Archivo, Newsreader and JetBrains Mono through `next/font/google`.

**This works on Vercel.** It fails in the sandbox this was built in only because
`fonts.googleapis.com` is not on that sandbox's network allowlist. No change needed.

Worth doing later, not now: move to `next/font/local`. It removes a build-time dependency on a
third party and a privacy consideration. It was not done here because the font files download
from the same blocked domain.

---

## 6. Verify the deployment

```bash
npm ci
npm run build          # must succeed
npx tsc --noEmit       # must be silent
```

Then against the deployed URL:

```bash
npm run audit:smartsite
```

The harness checks every route for title length (≤60 incl. brand suffix), description length
(140–160), canonical, and `@graph` validity — and asserts that **unverified states still 404**.

**A 404 in the `MUST_404` list is a PASS.** Arizona is in that list on purpose: with Wave 1
complete the list would otherwise be empty, and an empty list means the gating mechanism is
never exercised. A regression that deleted the `verified` check would sail through a green
audit.

Expected result: `Smart Site audit passed.` — 39 routes ok, 2 correctly gated.

---

## 7. After the first successful deploy

Check `https://<deployment>/robots.txt`. It must read:

```
User-agent: *
Disallow: /
```

If it shows `Allow: /` instead, your env vars did not apply — stop and fix that before
anything else. That is the single check worth doing manually every time until go-live.

---

## 8. What NOT to do

- **Do not attach the real apex domain before R-01 clears.** Attaching a domain to a
  production deployment is what makes the URLs real.
- **Do not set `BRAND_STATUS=CLEARED` to "test indexing."** There is no test mode for
  indexation.
- **Do not delete Arizona from `MUST_404`** to make the audit look cleaner. It is load-bearing.
- **Do not add a state to `lib/content/states.ts` with `verified: true`** without sourcing it
  from that state's own regulator. Every wrong figure found during Wave 1 came from a CEU
  vendor page ranking on page one of Google.

---

## 9. Current state of the build

- **231 routes**, all prerendered where possible
- **Wave 1 regulatory data complete and verified**: TX (TDA), WA (WSDA), SC (Clemson DPR),
  FL (FDACS + §482.111 F.S.), CA (SPCB + 16 CCR §1950)
- **Lab open**: 4 technology explainers, each sourced to peer-reviewed research, government
  reviews or patent filings
- **Career routes**: 14 disciplines + hub
- `npx tsc --noEmit` clean, audit green

Open blockers are tracked in `REGISTRY.md`. The longest lead time is **R-05 — advisory board**
(3–5 ACE/BCE entomologists). Start it regardless of everything else; nothing in the build
unblocks it and it gates the Lab's comparison side entirely.
