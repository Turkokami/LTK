#!/usr/bin/env node
/**
 * npm run audit:smartsite — the pre-PR gate. CLAUDE.md §5.
 *
 * Checks the things that are cheap to break and expensive to notice: SSR body content present,
 * @graph valid and deduplicated, canonical set, title and description length, no registry
 * sentinels in shipped HTML, and no viewport scale restriction.
 *
 * Usage: start the production server, then run this.
 *   npm run build && npm start &
 *   npm run audit:smartsite
 */

const BASE = process.env.AUDIT_BASE ?? 'http://localhost:3000';

let failures = 0;

const ROUTES = [
  '/',
  '/academy/',
  '/community/',
  '/lab/',
  '/lab/compare/',
  '/lab/technology/',
  '/lab/technology/remote-rodent-monitoring/',
  '/lab/technology/ai-pest-identification/',
  '/lab/technology/thermal-remediation/',
  '/lab/technology/automated-bait-stations/',
  '/arena/',
  '/arena/tournaments/',
  '/trade/',
  '/academy/ace/',
  '/academy/ace/biology-morphology/',
  '/academy/ace/wood-destroying-insects/',
  '/academy/ace/practice-test/',
  '/academy/ace/flashcards/',
  '/academy/ace/glossary/',
  '/academy/ace/library/',
  '/community/podcast/',
  '/arena/games/speed-round/',
  '/academy/licensing/',
  '/academy/exam-prep/',
  '/academy/exam-prep/termite-wdo/',
  '/community/forums/',
  '/community/chapters/',
  '/trade/jobs/',
  '/wire/regulatory/',
  '/academy/pest-id/',
  '/academy/pest-id/termites-wdo/',
  '/academy/resources/',
  '/lab/crew-picks/',
  '/trade/pay-and-pricing/',
  '/trade/start/',
  '/trade/start/texas/',
  '/arena/field-challenges/',
  '/arena/games/photo-id-sprint/',
  '/about/team/marcus-scruggs/',
  '/fields/',
  '/fields/general-pest/',
  '/fields/termite-wdo/',
  '/fields/falconry-abatement/',
  '/trade/jobs/texas/',
  '/academy/ceu/texas/',
  '/academy/licensing/texas/',
  '/academy/ceu/washington/',
  '/academy/licensing/washington/',
  '/academy/ceu/south-carolina/',
  '/academy/licensing/south-carolina/',
  '/academy/ceu/florida/',
  '/academy/licensing/florida/',
  '/academy/ceu/california/',
  '/academy/licensing/california/',
  '/wire/',
  '/wire/regulatory/texas/',
  '/community/chapters/texas/',
  '/community/forums/termite-wdo/',
  '/partners/',
  '/partners/audience/',
  '/partners/sponsorship/',
  '/investors/',
  '/investors/thesis/',
  '/about/',
];

/**
 * Routes that MUST 404 until their registry blocker resolves.
 *
 * A state reference page with verified: false is supposed to 404 — publishing a guessed CEU
 * hour count is the one failure mode this whole build is arranged to prevent. So a 404 here is
 * a PASS, and a 200 is a FAIL, because a 200 means someone removed the gate.
 *
 * Delete an entry from this list in the same commit that sets verified: true for that state.
 */
const MUST_404 = [
  // WAVE 1 IS COMPLETE. All five states (TX, WA, SC, FL, CA) were verified against their own
  // regulator on 2026-09-23 and moved out of this list in the same commit that set
  // verified: true. Wave 2 states get added here as work on them starts — the gate goes in
  // FIRST, before any data lands, so a half-finished record can never reach production.
  //
  // A 404 here is a PASS. A 200 means somebody removed the gate without verifying the data.
  //
  // Verify against the regulator's OWN publication — never a third-party CEU vendor. Every
  // wrong figure found during Wave 1 came from a vendor page ranking on page one of Google.
  //
  // These two are Wave 2 and genuinely unverified. They are listed for a second reason: with
  // Wave 1 complete this array would otherwise be EMPTY, and an empty array means the gate
  // mechanism itself is never exercised. A regression that deleted the verified check
  // entirely would sail through a green audit. Keeping real unverified states here means the
  // harness proves, every run, that unverified data still 404s.
  ['/academy/ceu/arizona/', 'R-14 — Wave 2, not yet sourced'],
  ['/academy/licensing/arizona/', 'R-14 — Wave 2, not yet sourced'],
];

for (const [route, blocker] of MUST_404) {
  try {
    const res = await fetch(BASE + route);
    if (res.status === 404) {
      console.log(`  ok    ${route}  correctly gated (${blocker})`);
    } else {
      failures++;
      console.error(
        `  FAIL  ${route}  HTTP ${res.status} — expected 404. ${blocker} is unresolved, so this ` +
          `page must not publish. Someone removed the verification gate.`,
      );
    }
  } catch (e) {
    failures++;
    console.error(`  FAIL  ${route}  unreachable: ${e.message}`);
  }
}

const fail = (route, msg) => {
  failures++;
  console.error(`  FAIL  ${route}  ${msg}`);
};
const pass = (route) => console.log(`  ok    ${route}`);

for (const route of ROUTES) {
  let html;
  try {
    const res = await fetch(BASE + route);
    if (!res.ok) { fail(route, `HTTP ${res.status}`); continue; }
    html = await res.text();
  } catch (e) {
    fail(route, `unreachable: ${e.message}`);
    continue;
  }

  // 1. Server-rendered body content. The original prototype's fatal defect.
  const text = html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').trim();
  if (text.split(/\s+/).length < 80) fail(route, 'fewer than 80 words of server-rendered text');

  // 2. Structured data present, parseable, single Organization node.
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length === 0) { fail(route, 'no JSON-LD'); }
  for (const [, body] of blocks) {
    let parsed;
    try { parsed = JSON.parse(body); } catch { fail(route, 'JSON-LD does not parse'); continue; }
    const graph = parsed['@graph'] ?? [];
    const types = (n) => [].concat(n['@type'] ?? []);
    const orgs = graph.filter((n) => types(n).includes('Organization'));
    if (orgs.length !== 1) fail(route, `${orgs.length} Organization nodes (want exactly 1)`);
    if (!graph.some((n) => types(n).includes('BreadcrumbList'))) fail(route, 'no BreadcrumbList');
    if (!graph.some((n) => types(n).includes('WebSite'))) fail(route, 'no WebSite node');
  }

  // 3. Canonical.
  if (!/rel="canonical"/.test(html)) fail(route, 'no canonical');

  // 4. Title and description length.
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '';
  if (!title) fail(route, 'no title');
  else if (title.length > 60) fail(route, `title ${title.length} chars (>60)`);
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  if (!desc) fail(route, 'no meta description');
  else if (desc.length < 140 || desc.length > 160) fail(route, `description ${desc.length} chars (want 140-160)`);

  // 5. No registry sentinels shipped.
  if (/\[\[R-\d+/.test(html)) fail(route, 'unresolved TODO_REGISTRY sentinel in output');

  // 6. Accessibility: viewport must not restrict scale.
  if (/maximum-scale/.test(html)) fail(route, 'viewport restricts scale (WCAG 1.4.4)');

  if (failures === 0) pass(route);
}

console.log(failures === 0 ? '\nSmart Site audit passed.' : `\n${failures} failure(s).`);
process.exit(failures === 0 ? 0 : 1);
