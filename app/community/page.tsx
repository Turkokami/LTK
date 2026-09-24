import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';
import { HubSpokes } from '@/components/site/HubSpokes';
import { site } from '@/lib/site.config';
import { EPISODES, PODCAST_PATH } from '@/lib/content/podcast';
import { DiscordButton, DiscordChannels } from '@/components/community/Discord';

const HUB = getHub('community');

export const metadata: Metadata = pageMeta({
  title: 'Forums, chapters and members',
  description:
    `Join the ${site.discord.name} for shop talk, pest ID help, the podcast and group training, plus forums and state chapters for licence-verified pest management pros.`,
  path: HUB.path,
});

export default function Page() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: HUB.eyebrow, href: HUB.path },
  ];
  const graph = buildGraph({ path: HUB.path, pageType: 'CollectionPage', crumbs });

  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>

      <div className="shell pb-16">
        <p className="eyebrow mb-3">{HUB.eyebrow}</p>
        <h1 className="display mb-5 max-w-[18ch]">{HUB.title}</h1>
        <p className="lede mb-8">
          The forums and chapters on this site are still being built. The community itself
          isn&rsquo;t waiting &mdash; it&rsquo;s already talking every day in the {site.discord.name}.
        </p>
        <div className="mb-14 flex flex-wrap gap-3">
          <DiscordButton size="lg">Jump into the Discord</DiscordButton>
          <a href="/join/" className="btn btn--ghost btn--lg">
            Get verified
          </a>
        </div>

        <section aria-labelledby="discord-inside" className="mb-14">
          <h2 id="discord-inside" className="h2 mb-2">
            What you&rsquo;ll find in there
          </h2>
          <p className="mb-6 max-w-[60ch] text-ink2">
            Real techs, real questions, fast answers. Bring a photo of that bug, a pricing question
            or an exam you&rsquo;re dreading &mdash; somebody&rsquo;s been there.
          </p>
          <DiscordChannels />
        </section>

        {EPISODES[0] ? (
        <a href={PODCAST_PATH} className="card group mb-14 grid items-center gap-5 p-5 sm:grid-cols-[auto_1fr_auto]">
          <img
            src={`https://i.ytimg.com/vi/${EPISODES[0].youtubeId}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            loading="lazy"
            className="hidden aspect-video w-44 rounded-md object-cover sm:block"
          />
          <span>
            <span className="eyebrow mb-1">The podcast</span>
            <span className="h3 block group-hover:text-blood">{EPISODES[0].title}</span>
            <span className="mt-1 block text-sm text-ink2">{EPISODES[0].hook}</span>
          </span>
          <span className="btn btn--ghost">Watch</span>
        </a>
        ) : null}

        <HubSpokes hub={HUB} />
      </div>
    </>
  );
}
