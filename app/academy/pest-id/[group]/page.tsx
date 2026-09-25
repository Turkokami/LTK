import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { pageMeta, fitTitle, pickDescription } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { CommunityGallery } from '@/components/community/CommunityGallery';
import { PEST_GROUPS, PEST_ID_PATH, getPestGroup } from '@/lib/content/pest-library';
import { photosFor } from '@/lib/content/community-photos';
import { ID_NOTES, PHOTO_ID_TIP } from '@/lib/content/community';
import { getDiscipline } from '@/lib/content/disciplines';
import { ACE_PATH, getAceModule } from '@/lib/content/ace';
import { abs, ID, site } from '@/lib/site.config';

export const dynamicParams = false;

export function generateStaticParams() {
  return PEST_GROUPS.map((g) => ({ group: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ group: string }> }): Promise<Metadata> {
  const { group } = await params;
  const g = getPestGroup(group);
  if (!g) return {};
  return pageMeta({
    title: fitTitle([`${g.name}: pest ID photos from the field`, `${g.name} ID photos`, g.name]),
    description: pickDescription(`${g.name} ID from real field photos posted by pest control pros, with the ID notes the community has confirmed.`, [
      `${g.blurb}`,
      'Plus the field guide and study module.',
      'Free for pest pros.',
    ]),
    path: `${PEST_ID_PATH}${g.slug}/`,
  });
}

export default async function PestGroupPage({ params }: { params: Promise<{ group: string }> }) {
  const { group } = await params;
  const g = getPestGroup(group);
  if (!g) notFound();

  const path = `${PEST_ID_PATH}${g.slug}/`;
  const photos = photosFor(...g.sections);
  const notes = g.notes.flatMap((k) => ID_NOTES[k] ?? []);
  const field = g.field ? getDiscipline(g.field) : undefined;
  const ace = g.aceModule ? getAceModule(g.aceModule) : undefined;

  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'Pest ID library', href: PEST_ID_PATH },
    { name: g.name, href: path },
  ];
  const graph = buildGraph({
    path,
    pageType: 'CollectionPage',
    crumbs,
    primary: [
      {
        '@type': 'ImageGallery',
        '@id': `${abs(path)}#gallery`,
        name: `${g.name} — field photos`,
        publisher: { '@id': ID.organization },
        image: photos.slice(0, 20).map((p) => ({
          '@type': 'ImageObject',
          contentUrl: abs(p.src),
          caption: p.caption || p.alt,
          creditText: p.credit,
        })),
      },
    ],
  });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Pest ID library</p>
        <h1 className="display mb-4 max-w-[20ch]">{g.name}</h1>
        <p className="lede mb-8">{g.blurb}</p>

        {notes.length ? (
          <section aria-labelledby="id-notes" className="mb-12">
            <h2 id="id-notes" className="h2 mb-4">
              ID notes from the crew
            </h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {notes.map((n) => (
                <li key={n.title} className="label-panel">
                  <div className="label-bar">
                    <span>{n.title}</span>
                    <span>{n.when}</span>
                  </div>
                  <div className="py-4 pl-[1.35rem] pr-5 text-[0.9375rem] leading-relaxed text-ink">
                    <p>{n.body}</p>
                    <p className="mt-2 text-xs text-ink3">Confirmed in the {site.discord.name} by {n.who}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="photos" className="mb-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="photos" className="h2 mb-1">
                From the field
              </h2>
              <p className="text-sm text-ink3">
                {photos.length} photos posted by members. Tip: {PHOTO_ID_TIP}
              </p>
            </div>
            <DiscordButton variant="ghost">Post yours for ID</DiscordButton>
          </div>
          <CommunityGallery photos={photos} />
        </section>

        <div className="grid gap-3 sm:grid-cols-2">
          {field ? (
            <a href={`/fields/${field.slug}/`} className="card group p-5">
              <span className="eyebrow">Field guide</span>
              <span className="h3 mt-1 block group-hover:text-blood">{field.name}</span>
            </a>
          ) : null}
          {ace ? (
            <a href={`${ACE_PATH}${ace.slug}/`} className="card group p-5">
              <span className="eyebrow">Study module {ace.n}</span>
              <span className="h3 mt-1 block group-hover:text-blood">{ace.name}</span>
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}
