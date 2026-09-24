import { site, BRAND_STATUS } from '@/lib/site.config';
import { HUBS } from '@/lib/content/hubs';

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
  { href: '/partners/media-kit/', label: 'Media kit' },
  { href: '/investors/', label: 'Investors' },
];

export function SiteFooter() {
  return (
    <footer className="rule-t mt-20 bg-paper">
      <div className="shell grid gap-8 py-10 md:grid-cols-4">
        <div>
          <div className="font-sans text-base font-extrabold tracking-tight">{site.name}</div>
          <p className="mono mt-2 max-w-[26ch] text-ink3">{site.tagline}</p>
          {BRAND_STATUS === 'PROVISIONAL' ? (
            <p className="registry-stub mt-3 inline-block">
              R-01 brand name provisional
            </p>
          ) : null}
        </div>

        <FooterCol title="Hubs" links={HUBS.map((h) => ({ href: h.path, label: h.eyebrow }))} />
        <FooterCol title="Trust" links={TRUST} />
        <FooterCol title="Partners" links={COMMERCIAL} />
      </div>

      <div className="rule-t">
        <div className="shell mono flex flex-wrap justify-between gap-3 py-4 text-ink3">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>For licensed pest management professionals</span>
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
      <ul className="space-y-1.5">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-sm text-ink2 hover:text-ink">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
