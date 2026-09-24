import { ASSETS } from '@/lib/brand';
import { site } from '@/lib/site.config';
import { DiscordButton } from '@/components/community/Discord';

/** 404. Says what happened and where to go next — an invitation, not an apology. */
export default function NotFound() {
  return (
    <div className="shell grid items-center gap-10 py-16 md:grid-cols-[auto_1fr]">
      <img src={ASSETS.mark} alt="" width={220} height={220} className="mx-auto rounded-full ring-1 ring-ruleStrong" />
      <div>
        <p className="eyebrow mb-3">404 &middot; Page not found</p>
        <h1 className="display mb-4 max-w-[16ch]">This one got away.</h1>
        <p className="lede mb-8">
          The page you were after isn&rsquo;t here &mdash; it may have moved, or it hasn&rsquo;t been
          built yet. Try one of these, or search for it.
        </p>
        <div className="mb-8 flex flex-wrap gap-2">
          <a href="/search/" className="btn btn--lg">
            Search the site
          </a>
          <a href="/fields/" className="btn btn--ghost btn--lg">
            Every field
          </a>
          <a href="/academy/ace/" className="btn btn--ghost btn--lg">
            ACE Prep
          </a>
        </div>
        <p className="text-sm text-ink3">
          Still stuck? Ask in the {site.discord.name} &mdash; someone will point you the right way.
        </p>
        <div className="mt-4">
          <DiscordButton variant="ghost">Ask on Discord</DiscordButton>
        </div>
      </div>
    </div>
  );
}
