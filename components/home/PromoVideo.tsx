'use client';

import { useRef, useState } from 'react';

/**
 * LTK promo video (owner-supplied Helldivers 2 squad footage, 55s). Click-to-play: only the
 * 18 KB poster loads with the page; the 6 MB MP4 downloads when someone presses play, so it
 * costs nothing on page speed. Plays with sound on a user tap, with native controls after.
 */
export function PromoVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  function play() {
    const v = ref.current;
    if (!v) return;
    setStarted(true);
    v.controls = true;
    void v.play().catch(() => undefined);
  }

  return (
    <figure className="promo-video m-0">
      <div className="promo-video__frame">
        <video
          ref={ref}
          src="/video/ltk-promo.mp4"
          poster="/video/ltk-promo-poster.webp"
          preload="none"
          playsInline
          width={960}
          height={540}
          aria-label="LTK promo: a Licensed to Kill squad night in Helldivers 2"
          className="block h-auto w-full"
        />
        {!started ? (
          <button type="button" onClick={play} className="promo-video__play" aria-label="Play the LTK promo video (55 seconds, with sound)">
            <span className="promo-video__btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            <span className="promo-video__label">
              <span className="block font-extrabold uppercase tracking-wide text-white">Watch: LTK squad night</span>
              <span className="block text-xs text-ink2">Helldivers 2 &middot; 0:55 &middot; where bugs get wiped</span>
            </span>
          </button>
        ) : null}
      </div>
    </figure>
  );
}
