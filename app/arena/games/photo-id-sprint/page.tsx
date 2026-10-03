import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { PhotoSprint, type SprintPhoto } from '@/components/arena/PhotoSprint';
import { ID_GROUPS, ID_PHOTOS } from '@/lib/content/id-photos';
import { PEST_ID_PATH } from '@/lib/content/pest-library';
import { abs, ID, site } from '@/lib/site.config';

/**
 * Arena → Games → Photo ID Sprint (game 2). Answer key = the pest-library group each photo
 * was sorted into during human review. Photos of tools, stations, treatment steps and other
 * non-pest subjects are filtered out so every question is answerable from the image.
 * CONVERSION CONTRACT: primary action "Start the clock"; secondary "Post your score on Discord".
 */

const PATH = '/arena/games/photo-id-sprint/';

export const metadata: Metadata = pageMeta({
  title: 'Photo ID Sprint: name the pest from real job photos',
  description: `Real photos from pest control jobs, posted by the crew in the ${site.discord.name}. Name the pest group before the clock runs out. Sixty seconds, free.`,
  path: PATH,
});

export default function PhotoSprintPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Photo ID Sprint', href: PATH },
  ];
  const graph = buildGraph({
    path: PATH,
    crumbs,
    primary: [
      {
        '@type': 'Game',
        '@id': `${abs(PATH)}#game`,
        name: 'Photo ID Sprint',
        description: 'A 60-second pest identification game built from real field photos posted by pest control professionals.',
        publisher: { '@id': ID.organization },
        isAccessibleForFree: true,
      },
    ],
  });

  const photos: SprintPhoto[] = ID_PHOTOS;
  const groups = ID_GROUPS;

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell max-w-[56rem] pb-8">
        <p className="eyebrow mb-3">Arena &middot; Game 2</p>
        <h1 className="display mb-4">Photo ID Sprint</h1>
        <p className="lede mb-8">
          Every photo here came off a real job and was posted by someone in the crew. Termite tube or
          ant trail? Wasp nest or bee comb? Sixty seconds &mdash; call it.
        </p>

        <PhotoSprint photos={photos} groups={groups} discordInvite={site.discord.invite} libraryPath={PEST_ID_PATH} />

        <div className="card mt-10 flex flex-wrap items-center justify-between gap-4 p-5">
          <p className="max-w-[46ch] text-sm text-ink2">
            <span className="font-semibold text-ink">Got a photo that would stump the crew?</span> Post it in the{' '}
            {site.discord.name} &mdash; the best ones end up in the game.
          </p>
          <DiscordButton>Post a stumper</DiscordButton>
        </div>
        <p className="mt-6 text-sm text-ink3">
          Study first in the{' '}
          <a href={PEST_ID_PATH} className="link">
            Pest ID library
          </a>
          , or try the{' '}
          <a href="/arena/games/speed-round/" className="link">
            ACE Speed Round
          </a>
          .
        </p>
      </div>
    </>
  );
}
