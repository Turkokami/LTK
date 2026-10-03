import { site } from '@/lib/site.config';

/**
 * Scan-to-join QR codes for desktop visitors who'd rather join on their phone. The SVGs in
 * public/qr/ were generated from the same links as LTK's own cards and decoded again to check
 * them; if a link in site.config changes, regenerate the matching code.
 */

const CODES = [
  { id: 'discord', label: 'Discord', note: 'The community', href: site.discord.invite },
  { id: 'facebook', label: 'Facebook', note: 'The LTK group', href: site.social.facebook },
  { id: 'youtube', label: 'YouTube', note: 'Podcast and streams', href: site.social.youtube },
  { id: 'merch', label: 'Merch', note: 'LTK merch on Etsy', href: site.social.merch },
] as const;

export function ConnectQr({ only }: { only?: (typeof CODES)[number]['id'][] }) {
  const list = only ? CODES.filter((c) => only.includes(c.id)) : CODES;
  return (
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {list.map((c) => (
        <li key={c.id}>
          <a href={c.href} target="_blank" rel="noopener noreferrer" className="card group block p-3 text-center">
            <img src={`/qr/${c.id}.svg`} alt={`QR code for LTK on ${c.label}`} width={200} height={200} loading="lazy" className="mx-auto w-full max-w-[11rem] rounded bg-white" />
            <span className="mt-2 block font-semibold text-ink group-hover:text-blood">{c.label}</span>
            <span className="block text-xs text-ink3">{c.note}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
