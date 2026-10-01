// One-off (2026-10-01): rewrites ACE practice questions that closely followed the ESA deck quiz
// slides, corrects outdated facts, and merges new original questions.
// Usage: node scripts/content/merge-ace-questions.mjs <rewrites.json> <new-questions.ts>
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [rewritesFile, newFile] = process.argv.slice(2);
const p = 'lib/content/ace/practice.ts';
const t = fs.readFileSync(p, 'utf8');
let head = t.slice(0, t.indexOf('export const acePracticeExamChapters'));
const arr = t.slice(t.indexOf('[', t.indexOf('export const acePracticeExamChapters')), t.lastIndexOf(']') + 1);
const ch = eval(arr);

const R = JSON.parse(fs.readFileSync(rewritesFile, 'utf8'));
let n = 0;
for (const c of ch) {
  for (const q of c.questions) {
    const r = R[q.id];
    if (r) {
      q.prompt = r.prompt;
      q.options = r.options.map(([id, text]) => ({ id, text }));
      q.correctOptionId = r.correct;
      q.answerText = r.answer;
      n++;
    }
    if (q.id === 'ace-11-q3') {
      q.prompt = 'True powderpost beetles (subfamily Lyctinae, family Bostrichidae) attack';
      q.answerText =
        'Hardwoods only. True powderpost beetles need the large starch-filled pores of hardwoods. Other bostrichids (false powderpost beetles) and anobiids attack both.';
    }
    if (q.id === 'ace-11-q6') q.prompt = q.prompt.replace('frecal', 'fecal');
  }
}
console.log('rewritten', n);

const tmp = path.join(os.tmpdir(), `ace-new-${Date.now()}.mts`);
fs.copyFileSync(newFile, tmp);
const m = await import(pathToFileURL(tmp).href);
let added = 0;
for (const c of ch) {
  const ids = new Set(c.questions.map((q) => q.id));
  for (const q of m.NEW_QUESTIONS[c.id] ?? []) {
    if (ids.has(q.id)) throw new Error('duplicate id ' + q.id);
    c.questions.push(q);
    added++;
  }
  c.questionCount = c.questions.length;
}
console.log('added', added, 'total', ch.reduce((s, c) => s + c.questions.length, 0));

head = head.replace(
  '  correctOptionId: "a" | "b" | "c";\n  answerText: string;\n};',
  '  correctOptionId: "a" | "b" | "c";\n  answerText: string;\n  /** Added with the 2026-10 expansion; older questions have none. */\n  difficulty?: "recall" | "id" | "applied";\n};',
);
head = head.replace(
  "If questions change in the standalone app, copy them here too — the two don't sync.",
  "If questions change in the standalone app, copy them here too — the two don't sync.\n *\n * 2026-10-01: 220 questions added (20 per module), written in original wording from the topics\n * the ACE prep class decks cover. Those decks are ESA-owned and are not copied or reused. 16\n * earlier questions that closely followed the decks' quiz slides were rewritten, and outdated\n * facts corrected (termites in Blattodea, Lyctinae, German cockroach moisture, heat guidance).",
);
fs.writeFileSync(p, head + 'export const acePracticeExamChapters: PracticeExamChapter[] = ' + JSON.stringify(ch, null, 2) + ';\n');
