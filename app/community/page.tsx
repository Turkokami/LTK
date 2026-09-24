import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { getHub } from '@/lib/content/hubs';
import { HubSpokes } from '@/components/site/HubSpokes';
import { site } from '@/lib/site.config';
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

        <HubSpokes hub={HUB} />
      </div>
    </>
  );
}
