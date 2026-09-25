import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { DiscordButton } from '@/components/community/Discord';
import { CommunityGallery } from '@/components/community/CommunityGallery';
import { photosFor } from '@/lib/content/community-photos';
import { site } from '@/lib/site.config';

/**
 * Arena → Field challenges. The recurring #field-challenges prompts from the Discord: members
 * go out on a route and bring back photos. Play-for-fun, no prize (R-18 does not apply).
 */

const PATH = '/arena/field-challenges/';

export const metadata: Metadata = pageMeta({
  title: 'Field challenges: photo hunts from real routes',
  description: `Recurring field challenges from the ${site.discord.name}: spot the conducive condition, find the harborage, place the station right. Real photos from real routes.`,
  path: PATH,
});

const CHALLENGES = [
  { name: 'Conducive conditions', prompt: 'Photograph the thing on today’s route that is feeding the problem — the leak, the mulch against the siding, the dumpster pad.' },
  { name: 'Spider harborage', prompt: 'Find where they actually live, not where the customer saw one. Clutter, eaves, window wells, outdoor lighting.' },
  { name: 'Monitoring placement', prompt: 'Show a monitor or station placed where the activity is — or one placed where it will never catch anything.' },
  { name: 'Ant species hunt', prompt: 'Bring back a clear shot for ID, with a coin for scale. The crew’s entomologists will call it.' },
  { name: 'Rodent stations', prompt: 'Good placement, bad placement, and the station nobody has opened in a year.' },
];

export default function FieldChallengesPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Arena', href: '/arena/' },
    { name: 'Field challenges', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, pageType: 'CollectionPage', crumbs });
  const conducive = photosFor('sanitation-conducive');
  const monitoring = photosFor('commercial-monitoring');

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Arena &middot; Field challenges</p>
        <h1 className="display mb-4 max-w-[18ch]">Go find it. Bring back the photo.</h1>
        <p className="lede mb-8">
          Every so often the {site.discord.name} posts a challenge in #field-challenges. Members take
          it out on their routes and bring back what they find. It sharpens the inspection eye
          faster than any quiz &mdash; and the photos end up here.
        </p>
        <div className="mb-12">
          <DiscordButton size="lg">Take the current challenge</DiscordButton>
        </div>

        <h2 className="h2 mb-5">The challenges so far</h2>
        <ol className="mb-14 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {CHALLENGES.map((c, i) => (
            <li key={c.name} className="card p-5">
              <p className="mono mb-2 text-blood">Challenge {i + 1}</p>
              <p className="h3 mb-2">{c.name}</p>
              <p className="text-sm leading-relaxed text-ink2">{c.prompt}</p>
            </li>
          ))}
        </ol>

        {conducive.length ? (
          <section aria-labelledby="conducive" className="mb-14">
            <h2 id="conducive" className="h2 mb-1">
              Spot the conducive condition
            </h2>
            <p className="mb-5 text-ink2">What members found feeding the problem on real accounts.</p>
            <CommunityGallery photos={conducive} />
          </section>
        ) : null}

        {monitoring.length ? (
          <section aria-labelledby="monitoring" className="mb-10">
            <h2 id="monitoring" className="h2 mb-1">
              Monitoring in the field
            </h2>
            <p className="mb-5 text-ink2">Commercial device programs, placement and the site maps auditors ask for.</p>
            <CommunityGallery photos={monitoring} />
          </section>
        ) : null}

        <p className="text-sm text-ink3">
          Want to play for points? The{' '}
          <a href="/arena/games/speed-round/" className="link">
            ACE Speed Round
          </a>{' '}
          is sixty seconds against the clock.
        </p>
      </div>
    </>
  );
}
