'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { PDFDocumentProxy, RenderTask } from 'pdfjs-dist';
import { award } from '@/lib/agent/store';
import { XP } from '@/lib/agent/config';

/**
 * In-page slide viewer for the ACE decks. PDF.js renders one page at a time onto a canvas,
 * fetching only the byte ranges it needs (the decks are 5–20 MB; the host supports ranges),
 * so slide 1 shows in a second or two instead of after the whole file downloads.
 *
 * Controls: prev/next buttons, ← → keys, swipe, a page box to jump, and full screen.
 * The last slide viewed per deck is a per-browser convenience in localStorage.
 */

const WORKER = '/vendor/pdf.worker-4.10.38.min.mjs';

export function DeckViewer({ url, title, pages, storageKey }: { url: string; title: string; pages: number; storageKey: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const doc = useRef<PDFDocumentProxy | null>(null);
  const task = useRef<RenderTask | null>(null);
  const touchX = useRef<number | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(pages);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [rendering, setRendering] = useState(false);
  const [full, setFull] = useState(false);
  const [jump, setJump] = useState('1');

  // Load the document once.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc = WORKER;
        const d = await pdfjs.getDocument({ url, disableAutoFetch: true, disableStream: false, rangeChunkSize: 262144 }).promise;
        if (cancelled) return;
        doc.current = d;
        setTotal(d.numPages);
        let start = 1;
        try {
          const saved = Number(window.localStorage.getItem(storageKey));
          if (saved >= 1 && saved <= d.numPages) start = saved;
        } catch {
          /* ignore */
        }
        setPage(start);
        setState('ready');
      } catch {
        if (!cancelled) setState('error');
      }
    })();
    return () => {
      cancelled = true;
      doc.current?.destroy();
    };
  }, [url, storageKey]);

  const render = useCallback(async (n: number) => {
    const d = doc.current;
    const c = canvas.current;
    const w = wrap.current;
    if (!d || !c || !w) return;
    setRendering(true);
    try {
      task.current?.cancel();
      const p = await d.getPage(n);
      const base = p.getViewport({ scale: 1 });
      const box = w.getBoundingClientRect();
      const maxW = box.width;
      const maxH = document.fullscreenElement ? window.innerHeight - 72 : Math.min(window.innerHeight * 0.78, 900);
      const scale = Math.min(maxW / base.width, maxH / base.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vp = p.getViewport({ scale: scale * dpr });
      c.width = Math.floor(vp.width);
      c.height = Math.floor(vp.height);
      c.style.width = `${Math.floor(vp.width / dpr)}px`;
      c.style.height = `${Math.floor(vp.height / dpr)}px`;
      const ctx = c.getContext('2d');
      if (!ctx) return;
      task.current = p.render({ canvasContext: ctx, viewport: vp });
      await task.current.promise;
      // Warm the next page so "next" feels instant.
      if (n < d.numPages) d.getPage(n + 1).catch(() => undefined);
    } catch (e) {
      if ((e as { name?: string })?.name !== 'RenderingCancelledException') setState('error');
    } finally {
      setRendering(false);
    }
  }, []);

  useEffect(() => {
    if (state !== 'ready') return;
    render(page);
    setJump(String(page));
    try {
      window.localStorage.setItem(storageKey, String(page));
    } catch {
      /* ignore */
    }
  }, [page, state, render, storageKey]);

  // Re-fit on resize and full-screen changes.
  useEffect(() => {
    const onResize = () => state === 'ready' && render(page);
    const onFull = () => {
      setFull(!!document.fullscreenElement);
      onResize();
    };
    window.addEventListener('resize', onResize);
    document.addEventListener('fullscreenchange', onFull);
    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('fullscreenchange', onFull);
    };
  }, [page, state, render]);

  // Reaching the last slide finishes the deck (paid once per deck).
  useEffect(() => {
    if (total > 1 && page === total) award({ xp: XP.deckFinished, label: `Finished: ${title}`, once: `deck:${storageKey}`, stats: { decks: 1 }, event: { kind: 'deck' } });
  }, [page, total, title, storageKey]);

  const go = useCallback((n: number) => setPage((p) => Math.max(1, Math.min(total, Number.isFinite(n) ? n : p))), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        go(page + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        go(page - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page, go]);

  const toggleFull = () => {
    const el = wrap.current?.parentElement;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.().catch(() => undefined);
  };

  return (
    <div className={full ? 'flex h-full flex-col bg-stock p-3' : 'label-panel'}>
      {!full ? (
        <div className="label-bar">
          <span>{title}</span>
          <span>{total} slides</span>
        </div>
      ) : null}

      <div
        ref={wrap}
        className="relative flex min-h-[40vh] flex-1 items-center justify-center bg-black/40 p-2"
        onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          const start = touchX.current;
          const end = e.changedTouches[0]?.clientX;
          touchX.current = null;
          if (start == null || end == null || Math.abs(end - start) < 40) return;
          go(end < start ? page + 1 : page - 1);
        }}
      >
        {state === 'error' ? (
          <p className="p-8 text-center text-ink2">
            The slides didn&rsquo;t load here.{' '}
            <a href={url} target="_blank" rel="noopener noreferrer" className="link">
              Open the PDF instead
            </a>
            .
          </p>
        ) : (
          <>
            <canvas ref={canvas} className="max-w-full rounded shadow-2xl" aria-label={`${title}, slide ${page} of ${total}`} role="img" />
            {state === 'loading' || rendering ? (
              <span className="mono absolute right-3 top-3 rounded bg-stock/80 px-2 py-1 text-ink3" aria-live="polite">
                {state === 'loading' ? 'Loading slides…' : 'Loading…'}
              </span>
            ) : null}
            {/* Big tap zones on either side for phones. */}
            <button type="button" aria-label="Previous slide" onClick={() => go(page - 1)} className="absolute inset-y-0 left-0 w-1/5 cursor-w-resize" disabled={page <= 1} />
            <button type="button" aria-label="Next slide" onClick={() => go(page + 1)} className="absolute inset-y-0 right-0 w-1/5 cursor-e-resize" disabled={page >= total} />
          </>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2">
          <button type="button" className="btn btn--ghost !px-3" onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Previous slide">
            &larr;
          </button>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              go(parseInt(jump, 10));
            }}
            className="mono flex items-center gap-1.5 text-ink2"
          >
            <label className="sr-only" htmlFor={`${storageKey}-page`}>
              Slide number
            </label>
            <input
              id={`${storageKey}-page`}
              value={jump}
              onChange={(e) => setJump(e.target.value.replace(/\D/g, ''))}
              inputMode="numeric"
              className="w-14 rounded border border-ruleStrong bg-stock px-2 py-1 text-center text-ink"
            />
            <span>/ {total}</span>
          </form>
          <button type="button" className="btn btn--ghost !px-3" onClick={() => go(page + 1)} disabled={page >= total} aria-label="Next slide">
            &rarr;
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className="btn btn--ghost" onClick={toggleFull}>
            {full ? 'Exit full screen' : 'Full screen'}
          </button>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
            Download
          </a>
        </div>
      </div>
      <div className="h-1 bg-stock2" aria-hidden="true">
        <div className="h-full bg-field transition-[width]" style={{ width: `${(page / total) * 100}%` }} />
      </div>
    </div>
  );
}
