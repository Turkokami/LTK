'use client';

import { useRef, type ReactNode } from 'react';

/**
 * A link card that leans toward the cursor (desktop) and glows on hover via .card styles.
 * Touch and reduced-motion users get the plain card. The content stays server-rendered HTML.
 */
export function TiltLink({ href, className = '', children }: { href: string; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);

  function move(e: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-2px)`;
  }

  return (
    <a ref={ref} href={href} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={() => ref.current && (ref.current.style.transform = '')}>
      {children}
    </a>
  );
}
