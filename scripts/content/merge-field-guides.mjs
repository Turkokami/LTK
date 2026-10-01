// Merges researched field guides (TS files exporting FIELD_GUIDES) into
// lib/content/field-guides.ts between the BEGIN/END GUIDES markers. Node 24 strips the types
// on import, so the research files load as modules (shared constants and all).
// Usage: node scripts/content/merge-field-guides.mjs <file...>
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';

const FIXES = [
  ["The site's federal bird rules page summarizes these in more detail.", 'The state-by-state section on this page summarizes them in more detail.'],
  [' Every state treats fumigation as its own category, often with extra prerequisites.', ' Every state this site covers treats fumigation as its own category, often with extra prerequisites.'],
];
const B = '/* BEGIN GUIDES */';
const E = '/* END GUIDES */';
const target = 'lib/content/field-guides.ts';
let out = fs.readFileSync(target, 'utf8');
const s = out.indexOf(B) + B.length;
const e = out.indexOf(E);
const existing = JSON.parse(JSON.stringify(eval('(' + out.slice(s, e) + ')')));

for (const file of process.argv.slice(2)) {
  // Copy to a temp .mts so Node treats it as an ES module with types stripped.
  const tmp = path.join(os.tmpdir(), `fg-${Date.now()}-${path.basename(file, '.ts')}.mts`);
  fs.copyFileSync(file, tmp);
  const mod = await import(pathToFileURL(tmp).href);
  let json = JSON.stringify(mod.FIELD_GUIDES);
  for (const [a, b] of FIXES) json = json.split(JSON.stringify(a).slice(1, -1)).join(JSON.stringify(b).slice(1, -1));
  const guides = JSON.parse(json);
  for (const [k, v] of Object.entries(guides)) existing[k] = v;
  console.log(path.basename(file), '->', Object.keys(guides).join(', '));
}
const literal = JSON.stringify(existing, null, 2).replace(/^(\s*)"([a-zA-Z]+)":/gm, '$1$2:');
fs.writeFileSync(target, out.slice(0, s) + ' ' + literal + ' ' + out.slice(e));
console.log('guides now:', Object.keys(existing).join(', '));
