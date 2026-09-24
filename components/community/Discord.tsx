import { site } from '@/lib/site.config';
import { cx } from '@/lib/utils';
import { ASSETS } from '@/lib/brand';

/**
 * Discord CTAs. The LTK Discord is where the community actually lives today — conversation,
 * the podcast, pest ID help, group training — so every page offers the invite. All variants
 * read the invite from site.config.ts; never paste the URL anywhere else.
 */

const INVITE = site.discord.invite;

/** Discord's mark, used only to label links to the server. Decorative: the text names it. */
export function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="currentColor"
    >
      <path d="M20.32 4.37A19.8 19.8 0 0 0 15.4 2.85a13.8 13.8 0 0 0-.63 1.29 18.4 18.4 0 0 0-5.53 0 13 13 0 0 0-.64-1.29 19.7 19.7 0 0 0-4.93 1.52C.54 9.05-.3 13.6.12 18.1a19.9 19.9 0 0 0 6.04 3.05 14.7 14.7 0 0 0 1.3-2.1 12.9 12.9 0 0 1-2.04-.98l.5-.39a14.2 14.2 0 0 0 12.16 0l.5.39c-.65.39-1.33.71-2.04.98.37.74.8 1.44 1.3 2.1a19.8 19.8 0 0 0 6.04-3.05c.5-5.22-.84-9.73-3.56-13.73ZM8.02 15.33c-1.18 0-2.16-1.09-2.16-2.42s.95-2.42 2.16-2.42c1.2 0 2.18 1.1 2.16 2.42 0 1.33-.96 2.42-2.16 2.42Zm7.96 0c-1.18 0-2.15-1.09-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.33-.95 2.42-2.16 2.42Z" />
    </svg>
  );
}

/** The one button. Opens the invite in a new tab so the reader keeps their place here. */
export function DiscordButton({
  children = `Join the ${site.discord.name}`,
  size,
  variant = 'primary',
  className,
}: {
  children?: React.ReactNode;
  size?: 'lg';
  variant?: 'primary' | 'ghost';
  className?: string;
}) {
  return (
    <a
      href={INVITE}
      target="_blank"
      rel="noopener noreferrer"
      className={cx('btn', size === 'lg' && 'btn--lg', variant === 'ghost' && 'btn--ghost', className)}
    >
      <DiscordIcon />
      <span>{children}</span>
      <span className="sr-only">(opens Discord in a new tab)</span>
    </a>
  );
}

/** The "what's inside" grid, driven by site.discord.channels. */
export function DiscordChannels({ className }: { className?: string }) {
  return (
    <ul className={cx('grid gap-3 sm:grid-cols-2 lg:grid-cols-3', className)}>
      {site.discord.channels.map((c) => (
        <li key={c.name} className="card p-5">
          <p className="h3 mb-1.5">{c.name}</p>
          <p className="text-sm leading-relaxed text-ink2">{c.blurb}</p>
        </li>
      ))}
    </ul>
  );
}

/** The band that closes every page (rendered from the root layout, above the footer). */
export function DiscordBand({
  heading = 'The conversation is already happening.',
  children,
}: {
  heading?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="discord-band" aria-labelledby="discord-band-heading">
      <div className="grid items-center gap-6 p-6 sm:p-8 md:grid-cols-[auto_1fr_auto] md:gap-8">
        <img
          src={ASSETS.mark}
          alt=""
          width={96}
          height={96}
          className="hidden rounded-full md:block"
        />
        <div>
          <p className="eyebrow mb-2">{site.discord.name}</p>
          <h2 id="discord-band-heading" className="h2 mb-2">
            {heading}
          </h2>
          <p className="max-w-[60ch] text-ink2">
            {children ?? (
              <>
                Techs, owners and rookies trading notes every day &mdash; pest ID help, podcast
                drops, group training nights and plenty of shop talk. Free to join, no licence
                check required to say hello.
              </>
            )}
          </p>
        </div>
        <DiscordButton size="lg">Join the Discord</DiscordButton>
      </div>
    </section>
  );
}
