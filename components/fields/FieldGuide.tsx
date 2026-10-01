import type { FieldGuide } from '@/lib/content/field-guides';
import { LabelBlock } from '@/components/label/LabelBlock';

/**
 * Section pieces for the long-form field guide. Server components; the FAQ uses native
 * <details> so it works without JavaScript. Each piece takes the guide and renders one section
 * with a stable id, so the page's "On this page" nav can jump to it.
 */

export const GUIDE_SECTIONS = [
  { id: 'the-job', label: 'The job' },
  { id: 'duties', label: 'Daily duties' },
  { id: 'environment', label: 'Work environment' },
  { id: 'training', label: 'Training and licensing' },
  { id: 'skills-tools', label: 'Skills and tools' },
  { id: 'career-path', label: 'Career path' },
  { id: 'pay', label: 'Pay and benefits' },
  { id: 'good-hard', label: 'The good and the hard' },
  { id: 'faq', label: 'FAQ' },
  { id: 'sources', label: 'Sources' },
] as const;

export function GuideNav() {
  return (
    <nav aria-label="On this page" className="mt-8 rounded-[var(--radius)] border border-rule p-4">
      <p className="eyebrow mb-2">On this page</p>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
        {GUIDE_SECTIONS.map((s) => (
          <li key={s.id}>
            <a href={`#${s.id}`} className="link">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function GuideDuties({ g }: { g: FieldGuide }) {
  return (
    <section id="duties" className="mt-12 scroll-mt-24">
      <h2 className="h2 mb-4">Daily duties</h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {g.duties.map((d) => (
          <li key={d} className="flex gap-3 rounded-md border border-rule bg-paper px-3 py-2.5 text-[0.9375rem] text-ink2">
            <span aria-hidden="true" className="mt-0.5 text-field">
              &#10003;
            </span>
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function GuideEnvironment({ g }: { g: FieldGuide }) {
  const w = g.workEnvironment;
  return (
    <section id="environment" className="mt-12 scroll-mt-24">
      <h2 className="h2 mb-4">Work environment</h2>
      <LabelBlock
        title="What the work asks of you"
        signal="warning"
        specs={[
          { label: 'Schedule', value: w.schedule },
          { label: 'Seasons', value: w.seasonality },
          { label: 'Physical', value: w.physical },
          { label: 'Hazards', value: w.hazards },
          { label: 'Vehicle and travel', value: w.vehicleAndTravel },
        ]}
      />
    </section>
  );
}

export function GuideTraining({ g }: { g: FieldGuide }) {
  const t = g.training;
  return (
    <section id="training" className="mt-12 scroll-mt-24">
      <h2 className="h2 mb-4">Training and licensing</h2>
      <div className="prose-bulletin">
        <h3 className="h3 mb-2 mt-6">Getting hired</h3>
        <p className="whitespace-pre-line">{t.entry}</p>
        <h3 className="h3 mb-2 mt-6">Learning on the job</h3>
        <p className="whitespace-pre-line">{t.onTheJob}</p>
        <h3 className="h3 mb-2 mt-6">Licensing</h3>
        <p className="whitespace-pre-line">{t.licensing}</p>
      </div>
      {t.certifications.length ? (
        <>
          <h3 className="h3 mb-3 mt-8">Certifications worth knowing</h3>
          <ul className="grid gap-3 md:grid-cols-2">
            {t.certifications.map((c) => (
              <li key={c.name} className="card p-4">
                <p className="font-semibold text-ink">
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-blood">
                    {c.name}
                  </a>
                </p>
                <p className="mono mb-2 text-ink3">{c.body}</p>
                <p className="text-sm text-ink2">{c.what}</p>
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </section>
  );
}

export function GuideSkillsTools({ g }: { g: FieldGuide }) {
  return (
    <section id="skills-tools" className="mt-12 scroll-mt-24">
      <h2 className="h2 mb-4">Skills and tools</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="label-panel">
          <div className="label-bar">
            <span>Skills that matter</span>
          </div>
          <ul className="list-disc space-y-1.5 py-4 pl-10 pr-5 text-[0.9375rem] text-ink2">
            {g.skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="label-panel">
          <div className="label-bar">
            <span>Tools and equipment</span>
          </div>
          <ul className="list-disc space-y-1.5 py-4 pl-10 pr-5 text-[0.9375rem] text-ink2">
            {g.tools.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function GuideCareerPath({ g }: { g: FieldGuide }) {
  return (
    <section id="career-path" className="mt-12 scroll-mt-24">
      <h2 className="h2 mb-4">Career path</h2>
      <ol className="space-y-3">
        {g.careerPath.map((c, i) => (
          <li key={c.stage} className="card flex gap-4 p-4">
            <span className="mono shrink-0 text-blood">{String(i + 1).padStart(2, '0')}</span>
            <span>
              <span className="block font-semibold text-ink">{c.stage}</span>
              <span className="text-[0.9375rem] text-ink2">{c.description}</span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function GuidePayBenefits({ g }: { g: FieldGuide }) {
  return (
    <div className="prose-bulletin mt-6">
      <p>{g.pay}</p>
      <h3 className="h3 mb-2 mt-6">Benefits</h3>
      <p>{g.benefits}</p>
    </div>
  );
}

export function GuideGoodHard({ g }: { g: FieldGuide }) {
  return (
    <section id="good-hard" className="mt-12 scroll-mt-24">
      <h2 className="h2 mb-4">The good and the hard</h2>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="label-panel" style={{ ['--accent' as string]: 'var(--field)' }}>
          <div className="label-bar">
            <span>Why people stay</span>
          </div>
          <ul className="list-disc space-y-1.5 py-4 pl-10 pr-5 text-[0.9375rem] text-ink2">
            {g.goodParts.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="label-panel">
          <div className="label-bar">
            <span>What wears people down</span>
          </div>
          <ul className="list-disc space-y-1.5 py-4 pl-10 pr-5 text-[0.9375rem] text-ink2">
            {g.hardParts.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function GuideFaq({ g }: { g: FieldGuide }) {
  return (
    <section id="faq" className="mt-12 scroll-mt-24">
      <h2 className="h2 mb-4">Questions people ask</h2>
      <div className="space-y-2">
        {g.faq.map((f) => (
          <details key={f.q} className="group rounded-md border border-rule bg-paper">
            <summary className="cursor-pointer list-none px-4 py-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
              <span className="mr-2 text-blood group-open:hidden">+</span>
              <span className="mr-2 hidden text-blood group-open:inline">&minus;</span>
              {f.q}
            </summary>
            <p className="px-4 pb-4 text-[0.9375rem] leading-relaxed text-ink2">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function GuideSources({ g, updated }: { g: FieldGuide; updated: string }) {
  return (
    <section id="sources" className="mt-12 scroll-mt-24">
      <h2 className="h2 mb-3">Sources</h2>
      <ul className="space-y-1.5 text-sm">
        {g.sources.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" className="link">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-ink3">
        Researched {updated}. Licensing details change; confirm with your state agency before you
        rely on them.
      </p>
    </section>
  );
}
