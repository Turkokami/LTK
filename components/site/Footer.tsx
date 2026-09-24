import { site } from '@/lib/site.config';
import { HUBS } from '@/lib/content/hubs';
import { ASSETS } from '@/lib/brand';
import { DiscordButton } from '@/components/community/Discord';

const TRUST = [
  { href: '/about/', label: 'About' },
  { href: '/about/editorial-standards/', label: 'Editorial standards' },
  { href: '/about/review-methodology/', label: 'Review methodology' },
  { href: '/about/sponsorship-policy/', label: 'Sponsorship policy' },
  { href: '/about/verification/', label: 'How verification works' },
  { href: '/about/code-of-conduct/', label: 'Code of conduct' },
];

/** Partners and Investors live here, not in primary nav. The three funnels stay separated. */
const COMMERCIAL = [
  { href: '/partners/', label: 'Sponsorship' },
  { href: '/partners/audience/', label: 'Who our members are' },
  { href: '/investors/', label: 'Investors' },
];

export function SiteFooter() {
  return (
    <footer className="rule-t mt-16 bg-paper">
      <div className="shell grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={ASSETS.mark} alt="" width={56} height={56} className="rounded-full" />
            <div className="font-sans text-lg font-extrabold uppercase tracking-tight">
              {site.name}
            </div>
          </div>
          <p className="mt-3 max-w-[32ch] text-sm text-ink2">{site.tagline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <DiscordButton variant="ghost">Hang out on Discord</DiscordButton>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost"
            >
              LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        <FooterCol title="Explore" links={HUBS.map((h) => ({ href: h.path, label: h.title }))} />
        <FooterCol title="How we work" links={TRUST} />
        <FooterCol title="Partners" links={COMMERCIAL} />
      </div>

      <div className="rule-t">
        <div className="shell mono flex flex-wrap justify-between gap-3 py-4 text-ink3">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span>Built by and for pest management pros</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="eyebrow mb-3">{title}</h2>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-sm text-ink2 transition-colors hover:text-blood">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
