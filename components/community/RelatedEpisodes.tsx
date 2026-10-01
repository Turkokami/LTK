import { VideoEmbed } from '@/components/ace/VideoEmbed';
import { PODCAST_PATH, formatLength, type LtkEpisode } from '@/lib/content/podcast';

/** "From the LTK podcast" strip for topic pages. Renders nothing when no episode is paired. */
export function RelatedEpisodes({ episodes, title = 'From the LTK podcast' }: { episodes: LtkEpisode[]; title?: string }) {
  if (!episodes.length) return null;
  return (
    <section aria-labelledby="related-episodes" className="mt-12">
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
        <h2 id="related-episodes" className="h2">
          {title}
        </h2>
        <a href={PODCAST_PATH} className="link text-sm">
          Every episode
        </a>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2">
        {episodes.slice(0, 4).map((e) => (
          <li key={e.youtubeId}>
            <VideoEmbed id={e.youtubeId} title={e.title} duration={formatLength(e.lengthSeconds)} />
            <p className="px-1 pt-2 text-sm text-ink2">{e.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
