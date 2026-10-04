'use client';

import { useState } from 'react';
import { PODCAST_CLIPS } from '@/lib/content/gallery';
import { site } from '@/lib/site.config';

/** Vertical podcast clips. Posters only until tapped; one plays at a time. */
export function PodcastClips() {
  const [playing, setPlaying] = useState<string | null>(null);
  return (
    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {PODCAST_CLIPS.map((c) => (
        <li key={c.id} className="clip-card">
          {playing === c.id ? (
            <video
              src={`/video/clips/${c.id}.mp4`}
              poster={`/video/clips/${c.id}.webp`}
              controls
              autoPlay
              playsInline
              width={540}
              height={960}
              className="block h-auto w-full"
            />
          ) : (
            <button type="button" onClick={() => setPlaying(c.id)} className="group relative block w-full" aria-label={`Play clip: ${c.title} (${c.seconds} seconds)`}>
              <img src={`/video/clips/${c.id}.webp`} alt="" width={540} height={960} loading="lazy" className="block h-auto w-full" />
              <span className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <span className="promo-video__btn absolute left-1/2 top-1/2 !h-14 !w-14 -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
              <span className="absolute inset-x-0 bottom-0 p-3 text-left text-sm font-bold leading-snug text-white">
                {c.title}
                <span className="mono mt-1 block text-[0.6875rem] font-normal text-ink3">0:{String(c.seconds).padStart(2, '0')}</span>
              </span>
            </button>
          )}
        </li>
      ))}
      <li className="col-span-2 lg:col-span-4">
        <a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="link text-sm">
          Full episodes on YouTube<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </li>
    </ul>
  );
}
