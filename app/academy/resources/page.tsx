import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { AUDIT_TIP, RESOURCES } from '@/lib/content/community';
import { site } from '@/lib/site.config';

const PATH = '/academy/resources/';

export const metadata: Metadata = pageMeta({
  title: 'Pest control training resources the crew recommends',
  description: `Podcasts, certifications, courses, apps and field tools that pest control pros in the ${site.discord.name} point each other to, credited to who shared them.`,
  path: PATH,
});

export default function ResourcesPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'Resources', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, pageType: 'CollectionPage', crumbs });
  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Academy &middot; Resources</p>
        <h1 className="display mb-4 max-w-[18ch]">Where the crew goes to learn.</h1>
        <p className="lede mb-10">
          Podcasts, certifications, courses and tools members of the {site.discord.name} recommend
          to each other. Shared by the crew, credited to whoever posted it.
        </p>

        <ul className="mb-12 grid gap-3 md:grid-cols-2">
          {RESOURCES.map((r) => (
            <li key={r.name} className="card flex h-full flex-col p-5">
              <p className="h3 mb-2">
                {r.link ? (
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="hover:text-blood">
                    {r.name}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ) : (
                  r.name
                )}
              </p>
              <p className="mb-4 text-[0.9375rem] leading-relaxed text-ink2">{r.what}</p>
              <p className="mt-auto text-xs text-ink3">
                Shared by {r.who} &middot; {r.when}
              </p>
            </li>
          ))}
        </ul>

        <div className="label-panel mb-12 max-w-[52rem]">
          <div className="label-bar">
            <span>Commercial audit tip: {AUDIT_TIP.title}</span>
            <span>{AUDIT_TIP.when}</span>
          </div>
          <div className="py-4 pl-[1.35rem] pr-5 text-[0.9375rem] leading-relaxed text-ink">
            <p>{AUDIT_TIP.body}</p>
            <p className="mt-2 text-xs text-ink3">From {AUDIT_TIP.who}, a food-safety specialist in the Discord</p>
          </div>
        </div>

        <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-ink2">
            <span className="font-semibold text-ink">Know a resource that belongs here?</span> Drop it in
            #training-grounds.
          </p>
          <DiscordButton>Share it on Discord</DiscordButton>
        </div>
      </div>
    </>
  );
}
