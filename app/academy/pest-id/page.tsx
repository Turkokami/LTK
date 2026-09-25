import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { PEST_GROUPS, PEST_ID_PATH } from '@/lib/content/pest-library';
import { photosFor } from '@/lib/content/community-photos';
import { PHOTO_ID_TIP } from '@/lib/content/community';
import { abs, site } from '@/lib/site.config';

export const metadata: Metadata = pageMeta({
  title: 'Pest ID library: real field photos from working pros',
  description: `A pest ID library built from real field photos posted by pest control pros in the ${site.discord.name}, with the ID notes the community's entomologists confirmed.`,
  path: PEST_ID_PATH,
});

export default function PestIdIndexPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'Pest ID library', href: PEST_ID_PATH },
  ];
  const graph = buildGraph({
    path: PEST_ID_PATH,
    pageType: 'CollectionPage',
    crumbs,
    primary: [
      {
        '@type': 'ItemList',
        '@id': `${abs(PEST_ID_PATH)}#groups`,
        name: 'Pest ID library',
        numberOfItems: PEST_GROUPS.length,
        itemListElement: PEST_GROUPS.map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: g.name,
          url: abs(`${PEST_ID_PATH}${g.slug}/`),
        })),
      },
    ],
  });
  const total = PEST_GROUPS.reduce((n, g) => n + photosFor(...g.sections).length, 0);

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Academy &middot; Pest ID library</p>
        <h1 className="display mb-4 max-w-[18ch]">Real pests, real jobs, real photos.</h1>
        <p className="lede mb-8">
          {total} field photos posted by the crew in the {site.discord.name} &mdash; not stock images.
          Each group carries the ID notes the community&rsquo;s entomologists and BCEs have confirmed,
          and links to the field guide and study module that go deeper.
        </p>
        <div className="mb-10 flex flex-wrap items-center gap-3">
          <DiscordButton size="lg">Post a bug for ID</DiscordButton>
          <p className="text-sm text-ink3">Tip: {PHOTO_ID_TIP}</p>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PEST_GROUPS.map((g) => {
            const photos = photosFor(...g.sections);
            const lead = photos[0];
            return (
              <li key={g.slug}>
                <a href={`${PEST_ID_PATH}${g.slug}/`} className="card group flex h-full flex-col overflow-hidden">
                  {lead ? (
                    <span className="block aspect-[16/9] overflow-hidden border-b border-rule bg-stock2">
                      <img
                        src={lead.src}
                        alt=""
                        width={lead.width}
                        height={lead.height}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.03] group-hover:opacity-100 motion-reduce:transition-none"
                      />
                    </span>
                  ) : null}
                  <span className="flex flex-1 flex-col p-5">
                    <span className="h3 mb-2 group-hover:text-blood">{g.name}</span>
                    <span className="mb-3 text-sm leading-relaxed text-ink2">{g.blurb}</span>
                    <span className="mono mt-auto text-ink3">{photos.length} photos</span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
