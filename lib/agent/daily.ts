import { DAILY_EPOCH, DAILY_TZ } from './config';
import { ID_GROUPS, ID_PHOTOS, type IdPhoto } from '@/lib/content/id-photos';
import { ALL_QUESTIONS } from '@/lib/content/ace';

/**
 * The Daily Drop: one member photo to identify and one ACE question, the same for everyone on
 * a given day (US Central). Picks are deterministic from the day number, so the page can be
 * rendered on the server and cached.
 */

/** YYYY-MM-DD for `date` in the drop's time zone. */
export function dayIn(date: Date, tz = DAILY_TZ): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

export function addDays(day: string, n: number): string {
  const d = new Date(`${day}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export function dailyNumber(day: string): number {
  const ms = Date.parse(`${day}T12:00:00Z`) - Date.parse(`${DAILY_EPOCH}T12:00:00Z`);
  return Math.round(ms / 86_400_000) + 1;
}

/** Small seeded PRNG (mulberry32). */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled<T>(arr: T[], r: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}

export interface DailyDrop {
  day: string;
  yesterday: string;
  number: number;
  photo: Pick<IdPhoto, 'src' | 'width' | 'height' | 'caption' | 'credit' | 'group'> & {
    choices: { slug: string; name: string }[];
  };
  question: {
    prompt: string;
    options: { id: string; text: string }[];
    correctOptionId: string;
    answerText: string;
    moduleName: string;
    moduleN: number;
  };
}

export function dailyDrop(now = new Date()): DailyDrop {
  const day = dayIn(now);
  const number = dailyNumber(day);
  const r = rng(number * 2654435761);
  // Stable orderings so a given day maps to the same items between builds.
  const photos = [...ID_PHOTOS].sort((a, b) => a.src.localeCompare(b.src));
  const pool = shuffled(photos, rng(20261003));
  const photo = pool[(number - 1 + pool.length * 10) % pool.length]!;
  const wrong = shuffled(ID_GROUPS.filter((g) => g.slug !== photo.group), r).slice(0, 3);
  const choices = shuffled([{ slug: photo.group, name: ID_GROUPS.find((g) => g.slug === photo.group)!.name }, ...wrong], r);

  const qs = [...ALL_QUESTIONS].filter((q) => q.difficulty !== 'recall').sort((a, b) => a.id.localeCompare(b.id));
  const qpool = shuffled(qs, rng(31337));
  const q = qpool[(number - 1 + qpool.length * 10) % qpool.length]!;

  return {
    day,
    yesterday: addDays(day, -1),
    number,
    photo: { src: photo.src, width: photo.width, height: photo.height, caption: photo.caption, credit: photo.credit, group: photo.group, choices },
    question: {
      prompt: q.prompt,
      options: q.options,
      correctOptionId: q.correctOptionId,
      answerText: q.answerText,
      moduleName: q.moduleName,
      moduleN: q.moduleN,
    },
  };
}
