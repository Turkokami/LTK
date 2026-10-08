import { OptImg } from "@/components/ui/OptImg";
import { DiscordButton } from "@/components/community/Discord";
import { cx } from "@/lib/utils";

/**
 * The LTK PestWorld House 2026 shirt. The store isn't open yet, so there is no buy link —
 * a "store coming soon" pill and the Discord, where the drop is announced first.
 * Swap `STORE_URL` in when the store goes live and the pill becomes a button.
 */

const STORE_URL: string | null = null;

export function PestWorldMerch({
  className,
  headingLevel = "h2",
}: {
  className?: string;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  return (
    <div
      className={cx(
        "overflow-hidden rounded-[var(--radius)] border border-[rgba(255,42,61,0.55)] bg-[#0b0b0f] shadow-[var(--glow-hot)]",
        className,
      )}
    >
      <div className="grid items-center lg:grid-cols-[1.5fr_1fr]">
        <a href="/community/gallery/#merch" className="block">
          <OptImg
            src="/gallery/pestworld-2026-shirt.webp"
            alt="The black LTK PestWorld House 2026 shirt: GTA-style XXVI back art with sponsor logos, the PestWorld House badge on the left chest and a QR code on the left sleeve"
            width={1400}
            height={933}
            sizes="(max-width: 1023px) 100vw, 60vw"
            widths={[640, 828, 1080, 1400]}
            className="block h-auto w-full"
          />
        </a>
        <div className="p-6">
          <img
            src="/brand/pestworld-house-logo.webp"
            alt=""
            width={700}
            height={600}
            loading="lazy"
            className="mb-4 h-auto w-32"
          />
          <p className="eyebrow mb-2">New merch &middot; PestWorld 2026</p>
          <H className="h2 mb-3">
            The <span className="text-hot">PestWorld House</span> shirt
          </H>
          <p className="mb-5 text-ink2">
            Made for LTK&rsquo;s house at PestWorld 2026 in Grapevine, Texas:
            full-color XXVI back art, the PestWorld House badge on the chest and
            a QR code on the sleeve.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {STORE_URL ? (
              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                Shop the shirt
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <span className="mono inline-flex items-center gap-2 rounded-full border border-[rgba(255,42,61,0.6)] px-4 py-2 text-[0.75rem] uppercase tracking-[0.12em] text-ink">
                <span className="live-dot" aria-hidden="true" />
                Merch store coming soon
              </span>
            )}
            <DiscordButton>Get the drop first</DiscordButton>
          </div>
        </div>
      </div>
    </div>
  );
}
