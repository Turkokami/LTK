import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo/metadata';
import { buildGraph } from '@/lib/schema/graph';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { LabelBlock } from '@/components/label/LabelBlock';
import { DiscordButton } from '@/components/community/Discord';
import { PayHighlight } from '@/components/ui/PayHighlight';
import { PAY_TALK, PRICING_TALK, type ReportedFigure } from '@/lib/content/community';
import { site } from '@/lib/site.config';

/**
 * Trade → Pay and pricing talk. Member-reported figures from the Discord, next to the sourced
 * BLS benchmark. Never presented as market data: every figure carries who said it and when.
 * The member survey (salary.ts ROLES, REGISTRY R-17) is still the path to real pay data.
 */

const PATH = '/trade/pay-and-pricing/';

export const metadata: Metadata = pageMeta({
  title: 'Pest control pay and pricing: what the crew reports',
  description: `What pest control pros in the ${site.discord.name} report about technician pay and job pricing, credited and dated, next to national BLS pay figures.`,
  path: PATH,
});

function Figures({ items }: { items: ReportedFigure[] }) {
  return (
    <ul className="grid gap-3 md:grid-cols-2">
      {items.map((f) => (
        <li key={f.topic} className="card flex h-full flex-col p-5">
          <p className="text-sm font-semibold text-ink2">{f.topic}</p>
          <p className="mb-3 mt-1 text-lg font-bold leading-snug text-ink">{f.figure}</p>
          <p className="mt-auto text-xs text-ink3">
            {f.who} &middot; {f.when}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function PayAndPricingPage() {
  const crumbs = [
    { name: 'Home', href: '/' },
    { name: 'Trade', href: '/trade/' },
    { name: 'Pay and pricing', href: PATH },
  ];
  const graph = buildGraph({ path: PATH, crumbs });
  return (
    <>
      <JsonLd graph={graph} />
      <div className="shell">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="shell pb-8">
        <p className="eyebrow mb-3">Trade &middot; Pay and pricing</p>
        <h1 className="display mb-4 max-w-[18ch]">What the work pays, and what it bills.</h1>
        <p className="lede mb-6">
          Numbers members have shared in the {site.discord.name} about pay and pricing, next to the
          national BLS figures for the trade.
        </p>
        <LabelBlock title="What members said, not market rates" signal="warning" meta="Credited and dated" className="mb-12 max-w-[52rem]">
          Every figure below is what one member posted on the date shown, for their market. Pay and
          pricing swing hard by region, company and season. Use these to start a conversation, not
          to quote a job or negotiate an offer.
        </LabelBlock>

        <section aria-labelledby="pay" className="mb-14">
          <h2 id="pay" className="h2 mb-5">
            Pay, as members report it
          </h2>
          <Figures items={PAY_TALK} />
          <PayHighlight fieldName="pest control" industry className="mt-8" />
        </section>

        <section aria-labelledby="pricing" className="mb-14">
          <h2 id="pricing" className="h2 mb-2">
            Pricing specialty work
          </h2>
          <p className="mb-5 max-w-[62ch] text-ink2">From a thread on what height, access and risk should add to a quote.</p>
          <Figures items={PRICING_TALK} />
        </section>

        <div className="discord-band p-6 sm:p-8">
          <p className="eyebrow mb-2">Compare notes</p>
          <p className="h2 mb-2">What does your market pay?</p>
          <p className="mb-5 max-w-[60ch] text-ink2">
            The more people share, the less anyone gets lowballed. Post your numbers in the Discord.
          </p>
          <DiscordButton size="lg">Talk pay on Discord</DiscordButton>
        </div>
      </div>
    </>
  );
}
