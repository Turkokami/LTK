import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { AceNav } from '@/components/ace/AceNav';
import { VideoEmbed } from '@/components/ace/VideoEmbed';
import { ACE_PATH, PODCASTS, SLIDE_DECKS, VIDEOS, mediaUrl } from '@/lib/content/ace';

/**
 * ACE media library: podcast episodes and slide decks (hosted on the ACE Prep app deployment,
 * see ACE_MEDIA_BASE) and YouTube walkthroughs (click-to-load).
 */

const PATH = `${ACE_PATH}library/`;

export const metadata: Metadata = pageMeta({
  title: 'ACE study library: podcast, videos and slide decks',
  description: `${PODCASTS.length} ACE study podcast episodes, ${VIDEOS.length} pest ID and biology videos and ${SLIDE_DECKS.length} full slide decks, all free for pest management pros preparing for the ACE exam.`,
  path: PATH,
});

export default function LibraryPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Academy', href: '/academy/' },
    { name: 'ACE Prep', href: ACE_PATH },
    { name: 'Library', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs, pageType: 'CollectionPage' });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-8">
        <p className="eyebrow mb-3">ACE Prep &middot; Library</p>
        <h1 className="display mb-6 max-w-[20ch]">Podcast, videos and slide decks</h1>
        <AceNav current="library" />
        <p className="lede mb-10">
          Listen between stops, watch the ID walkthroughs at lunch, and open the full decks when
          you sit down to study.
        </p>

        <section aria-labelledby="podcast" className="mb-14">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
            <h2 id="podcast" className="h2">
              Podcast episodes
            </h2>
            <DiscordButton variant="ghost">Discuss episodes on Discord</DiscordButton>
          </div>
          <ol className="grid gap-3 md:grid-cols-2">
            {PODCASTS.map((p, i) => (
              <li key={p.file} className="card p-5">
                <p className="mono mb-1 text-blood">Episode {i + 1}</p>
                <p className="h3 mb-1">{p.title}</p>
                <p className="mb-3 text-sm text-ink2">{p.desc}</p>
                <audio controls preload="none" src={mediaUrl('audio', p.file)} className="w-full">
                  <a href={mediaUrl('audio', p.file)} className="link">
                    Download the episode
                  </a>
                </audio>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="videos" className="mb-14">
          <h2 id="videos" className="h2 mb-5">
            Videos
          </h2>
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((v) => (
              <li key={v.id}>
                <VideoEmbed id={v.id} title={v.title} duration={v.duration} />
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="decks">
          <h2 id="decks" className="h2 mb-5">
            Slide decks
          </h2>
          <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {SLIDE_DECKS.map((d) => (
              <li key={d.file}>
                <a
                  href={mediaUrl('reference-pdfs', d.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card group flex h-full flex-col p-5"
                >
                  <span className="mono mb-2 text-ink3">
                    {d.category} &middot; {d.pages} slides
                  </span>
                  <span className="h3 mb-3 group-hover:text-blood">{d.title}</span>
                  <span className="mt-auto text-sm text-blood">
                    Open PDF &rarr;<span className="sr-only"> (opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
