// Merges state research batches (TS files exporting STATE_RESEARCH arrays) into
// lib/content/state-research.ts. Usage: node scripts/content/merge-state-research.mjs <file...>
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/** Rules count credits of 30 minutes (PA 7 Pa. Code 128.45; NJ per Rutgers PMO). */
const HALF_HOUR_CREDITS = new Set(['PA', 'NJ']);
const target = 'lib/content/state-research.ts';
const B = '/* BEGIN STATES */';
const E = '/* END STATES */';
let out = fs.readFileSync(target, 'utf8');
const s = out.indexOf(B) + B.length;
const e = out.indexOf(E);
const existing = JSON.parse(JSON.stringify(eval('(' + out.slice(s, e) + ')')));
for (const file of process.argv.slice(2)) {
  const tmp = path.join(os.tmpdir(), `sr-${Date.now()}-${path.basename(file, '.ts')}.mts`);
  fs.copyFileSync(file, tmp);
  const mod = await import(pathToFileURL(tmp).href);
  for (const r of mod.STATE_RESEARCH) {
    const reg = { ...r.regulatory, stateCode: r.code };
    // States whose rules count 30-minute credits: show clock hours, keep the credit count.
    if (HALF_HOUR_CREDITS.has(r.code)) {
      reg.ceuHoursByCategory = reg.ceuHoursByCategory.map((c) => ({
        category: `${c.category} (${c.hours} credits)`,
        hours: c.hours / 2,
      }));
      if (reg.ceuHoursPerCycle != null) reg.ceuHoursPerCycle = reg.ceuHoursPerCycle / 2;
    }
    existing[r.code] = { agency: r.agency, agencyUrl: r.agencyUrl, verified: !!r.verified, regulatory: reg, notes: r.notes ?? '' };
  }
  console.log(path.basename(file), '->', mod.STATE_RESEARCH.map((r) => `${r.code}${r.verified ? '' : '(unverified)'}`).join(' '));
}
const literal = JSON.stringify(existing, null, 2).replace(/^(\s*)"([a-zA-Z]+)":/gm, '$1$2:');
fs.writeFileSync(target, out.slice(0, s) + ' ' + literal + ' ' + out.slice(e));
console.log('states now:', Object.keys(existing).sort().join(' '));
