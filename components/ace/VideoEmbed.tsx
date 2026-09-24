'use client';

import { useState } from 'react';

/**
 * Click-to-load YouTube embed. A page with a dozen iframes loads a dozen YouTube players up
 * front; this shows the thumbnail and only loads the player on request (youtube-nocookie).
 */
export function VideoEmbed({ id, title, duration }: { id: string; title: string; duration: string }) {
  const [play, setPlay] = useState(false);

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-video bg-stock">
        {play ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            className="group absolute inset-0 h-full w-full"
            aria-label={`Play video: ${title} (${duration})`}
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-danger text-2xl text-ink ring-4 ring-black/30">
                &#9654;
              </span>
            </span>
          </button>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-3 p-4">
        <p className="font-semibold">{title}</p>
        <p className="mono shrink-0 text-ink3">{duration}</p>
      </div>
    </div>
  );
}
