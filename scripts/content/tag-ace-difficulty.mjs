// One-off (2026-10-01): tags the 57 original ACE questions with a difficulty so the practice test
// can filter Easy (recall) / Medium (identification) / Hard (applied scenarios).
import fs from 'node:fs';
const ID = 'ace-1-q4 ace-5-q2 ace-5-q5 ace-6-q2 ace-6-q3 ace-6-q4 ace-7-q3 ace-7-q4 ace-8-q2 ace-8-q3 ace-8-q4 ace-9-q2 ace-10-q2 ace-10-q3 ace-11-q3 ace-11-q4 ace-11-q5 ace-11-q6'.split(' ');
const APPLIED = 'ace-1-q5 ace-3-q1 ace-3-q2 ace-3-q4 ace-5-q1 ace-5-q3 ace-6-q1 ace-6-q5 ace-7-q1 ace-7-q2 ace-7-q5 ace-8-q1 ace-8-q5 ace-9-q1 ace-9-q3 ace-9-q4 ace-10-q1 ace-10-q5 ace-11-q1 ace-11-q2'.split(' ');
const p = 'lib/content/ace/practice.ts';
const t = fs.readFileSync(p, 'utf8');
const head = t.slice(0, t.indexOf('export const acePracticeExamChapters'));
const ch = eval(t.slice(t.indexOf('[', t.indexOf('export const acePracticeExamChapters')), t.lastIndexOf(']') + 1));
const count = {};
for (const c of ch)
  for (const q of c.questions) {
    if (!q.difficulty) q.difficulty = ID.includes(q.id) ? 'id' : APPLIED.includes(q.id) ? 'applied' : 'recall';
    count[q.difficulty] = (count[q.difficulty] ?? 0) + 1;
  }
fs.writeFileSync(p, head.replace('  /** Added with the 2026-10 expansion; older questions have none. */\n  difficulty?:', '  /** recall = Easy, id = Medium, applied = Hard on the practice test. */\n  difficulty:') + 'export const acePracticeExamChapters: PracticeExamChapter[] = ' + JSON.stringify(ch, null, 2) + ';\n');
console.log(count);
