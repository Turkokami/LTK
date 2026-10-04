import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { OptImg } from '@/components/ui/OptImg';
import { GALLERY } from '@/lib/content/gallery';
import { site } from '@/lib/site.config';

/** /community/gallery/ — LTK in pictures: meetups, gamer art, memes and merch. */

const PATH = '/community/gallery/';

export const metadata: Metadata = pageMeta({
  title: 'LTK in pictures: meetups, gamer art and merch',
  description:
    'The LTK crew in pictures: the LTK house at PestWorld 2025, gamer art, the Discord’s best memes and LTK merch. Pest pros who game, in their natural habitat.',
  path: PATH,
});

export default function GalleryPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Community', href: '/community/' },
    { name: 'Gallery', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, pageType: 'CollectionPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-16">
        <p className="eyebrow mb-3">Community &middot; Gallery</p>
        <h1 className="display mb-4 max-w-[18ch]">
          LTK in <span className="text-hot">pictures</span>
        </h1>
        <p className="lede mb-10 max-w-[60ch]">
          Meetups, art, memes and merch from the crew. Tournament posters live in the{' '}
          <a href="/arena/tournaments/" className="link">
            tournament archive
          </a>
          .
        </p>

        {GALLERY.map((sec) => (
          <section key={sec.id} id={sec.id} className="mb-14" aria-labelledby={`g-${sec.id}`}>
            <h2 id={`g-${sec.id}`} className="h2 mb-1">
              {sec.title}
            </h2>
            <p className="mb-5 text-ink2">{sec.blurb}</p>
            <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {sec.images.map((img) => (
                <li key={img.src} className="mb-4 break-inside-avoid">
                  <figure className="m-0 overflow-hidden rounded-[var(--radius)] border border-[rgba(255,42,61,0.45)] bg-stock2">
                    <OptImg src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 400px" widths={[384, 640, 828]} className="block h-auto w-full" />
                    <figcaption className="px-3 py-2 text-sm font-semibold text-ink">{img.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
            {sec.id === 'merch' ? (
              <a href={site.social.merch} target="_blank" rel="noopener noreferrer" className="btn mt-2">
                Shop LTK merch<span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : null}
          </section>
        ))}

        <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Got a photo from a meetup or a meme worth framing?</span> Post it in
            the {site.discord.name}.
          </p>
          <DiscordButton>Join the Discord</DiscordButton>
        </div>
      </div>
    </>
  );
}
