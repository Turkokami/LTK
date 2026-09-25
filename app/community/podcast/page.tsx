import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { VideoEmbed } from '@/components/ace/VideoEmbed';
import { EPISODES, LTK_SHOW, PODCAST_PATH, formatLength, isoDuration } from '@/lib/content/podcast';
import { abs, ID, site } from '@/lib/site.config';

/**
 * Community → Podcast. LTK episodes and appearances, click-to-load embeds, VideoObject per
 * episode. Transcripts land here when they exist (REGISTRY R-11).
 *
 * CONVERSION CONTRACT: primary action "Join the Discord" (live recordings and guest pitches
 * happen there); secondary: watch on YouTube.
 */

export const metadata: Metadata = pageMeta({
  title: 'The LTK podcast: voices from the pest control trade',
  description:
    `Long-form talks with the people behind Licensed to Kill and the pest control trade. Watch the episodes, then join the live recordings in the ${site.discord.name}.`,
  path: PODCAST_PATH,
});

const dateFmt = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export default function PodcastPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Community', href: '/community/' },
    { name: 'Podcast', href: PODCAST_PATH },
  ];
  const graph = buildGraph({
    path: PODCAST_PATH,
    pageType: 'CollectionPage',
    crumbs,
    primary: EPISODES.map((e) => ({
      '@type': 'VideoObject',
      '@id': `${abs(PODCAST_PATH)}#${e.slug}`,
      name: e.title,
      description: e.summary,
      thumbnailUrl: `https://i.ytimg.com/vi/${e.youtubeId}/hqdefault.jpg`,
      uploadDate: e.published,
      duration: isoDuration(e.lengthSeconds),
      embedUrl: `https://www.youtube-nocookie.com/embed/${e.youtubeId}`,
      contentUrl: `https://www.youtube.com/watch?v=${e.youtubeId}`,
      publisher: { '@type': 'Organization', name: e.show, url: e.showUrl },
      about: { '@id': ID.organization },
    })),
  });

  const [featured, ...rest] = EPISODES;

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-8">
        <p className="eyebrow mb-3">Community &middot; Podcast</p>
        <h1 className="display mb-4 max-w-[18ch]">Pull up a chair. Press play.</h1>
        <p className="lede mb-10">
          Long-form conversations with the people who make up this trade &mdash; starting with the
          person who started LTK. Live recordings, guest pitches and the arguments afterward all
          happen in the {site.discord.name}.
        </p>

        <section aria-labelledby="ltk-show" className="discord-band mb-14 p-6 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <p className="eyebrow mb-2">Our show</p>
              <h2 id="ltk-show" className="h2 mb-2">
                {LTK_SHOW.name}
              </h2>
              <p className="mb-4 text-ink2">{LTK_SHOW.blurb}</p>
              <p className="mb-5 text-sm text-ink3">
                Start with episode one,{' '}
                <a href={LTK_SHOW.firstEpisode.url} target="_blank" rel="noopener noreferrer" className="link">
                  &ldquo;{LTK_SHOW.firstEpisode.title}&rdquo;
                </a>
                .
              </p>
              <div className="flex flex-wrap gap-2">
                <a href={LTK_SHOW.spotifyUrl} target="_blank" rel="noopener noreferrer" className="btn">
                  Listen on Spotify<span className="sr-only"> (opens in a new tab)</span>
                </a>
                <DiscordButton variant="ghost">Join the live recordings</DiscordButton>
              </div>
            </div>
            <iframe
              title={`${LTK_SHOW.name} on Spotify`}
              src={`https://open.spotify.com/embed/show/${LTK_SHOW.spotifyId}?theme=0`}
              width="100%"
              height="232"
              loading="lazy"
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              className="w-full rounded-[var(--radius)] border-0"
            />
          </div>
        </section>

        <h2 className="h2 mb-5">Marcus on other shows</h2>

        {featured ? (
          <section aria-labelledby={featured.slug} className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
            <VideoEmbed id={featured.youtubeId} title={featured.title} duration={formatLength(featured.lengthSeconds)} />
            <div className="label-panel">
              <header className="label-bar">
                <span>Featured episode</span>
                <span>{formatLength(featured.lengthSeconds)}</span>
              </header>
              <div className="py-5 pl-[1.35rem] pr-5">
                <h2 id={featured.slug} className="h2 mb-3">
                  {featured.title}
                </h2>
                <p className="mb-4 text-[0.9375rem] leading-relaxed text-ink">{featured.summary}</p>
                <p className="mb-5 rounded-md border border-ruleStrong bg-stock px-3 py-2 text-sm text-ink2">
                  <span className="mr-2 font-semibold uppercase tracking-wide text-blood">Why listen</span>
                  {featured.hook}
                </p>
                <p className="mb-5 text-xs text-ink3">
                  On{' '}
                  <a href={featured.showUrl} target="_blank" rel="noopener noreferrer" className="link">
                    {featured.show}
                  </a>{' '}
                  &middot; {dateFmt.format(new Date(featured.published))}
                  {featured.alsoAt?.map((a) => (
                    <span key={a.url}>
                      {' '}
                      &middot;{' '}
                      <a href={a.url} target="_blank" rel="noopener noreferrer" className="link">
                        {a.label}
                      </a>
                    </span>
                  ))}
                </p>
                <div className="flex flex-wrap gap-2">
                  <DiscordButton>Talk about it on Discord</DiscordButton>
                  <a
                    href={`https://www.youtube.com/watch?v=${featured.youtubeId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                  >
                    Watch on YouTube<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        {rest.length ? (
          <section aria-labelledby="more-episodes" className="mt-14">
            <h2 id="more-episodes" className="h2 mb-5">
              More interviews
            </h2>
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((e) => (
                <li key={e.slug} className="flex flex-col gap-3">
                  <VideoEmbed id={e.youtubeId} title={e.title} duration={formatLength(e.lengthSeconds)} />
                  <div className="px-1">
                    <p className="text-sm text-ink2">{e.hook}</p>
                    <p className="mt-1 text-xs text-ink3">
                      On{' '}
                      <a href={e.showUrl} target="_blank" rel="noopener noreferrer" className="link">
                        {e.show}
                      </a>{' '}
                      &middot; {dateFmt.format(new Date(e.published))}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="discord-band mt-14 p-6 sm:p-8">
          <p className="eyebrow mb-2">Be on the show</p>
          <p className="h2 mb-2">Got a story from the field?</p>
          <p className="mb-5 max-w-[60ch] text-ink2">
            Wildlife calls gone sideways, the account that nearly broke you, the trick you learned
            in year one. Pitch yourself (or a coworker) as a guest in the Discord.
          </p>
          <DiscordButton size="lg">Pitch a guest</DiscordButton>
        </div>
      </div>
    </>
  );
}
