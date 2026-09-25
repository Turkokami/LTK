/**
 * gear-images.ts — GENERATED product images for Crew picks, keyed by CrewPick.product.
 * Owner decision (2026-09-25): use the manufacturer's (or retailer's) official product image
 * on every card, credited to the brand and linked to the page it came from. Files are local
 * copies under public/photos/gear-products/. Remove any image a brand asks us to take down.
 */

export interface GearImage {
  src: string;
  width: number;
  height: number;
  /** Who the image belongs to, shown as "Image: …". */
  credit: string;
  /** Page the image came from. */
  sourceUrl: string;
}

export const GEAR_IMAGES: Record<string, GearImage> = {};
