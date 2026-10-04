'use client';

import { useRef, useState, type ReactNode } from 'react';

/** Style-lab interactions: tilt cards, an XP bar you can fill, a scope that tracks the cursor. */

export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.MouseEvent) {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateZ(6px)`;
  }
  return (
    <div ref={ref} className={`sl-card ${className}`} onMouseMove={move} onMouseLeave={() => ref.current && (ref.current.style.transform = '')}>
      {children}
    </div>
  );
}

const RANKS = ['Recruit', 'Field Agent', 'Specialist', 'Senior Agent', 'Master Exterminator', 'Licensed to Kill'];

export function XpDemo({ theme }: { theme: 'neon' | 'arcade' | 'hud' }) {
  const [xp, setXp] = useState(70);
  const [rank, setRank] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [burst, setBurst] = useState(0);
  function earn() {
    const next = xp + 35;
    if (next >= 100) {
      const r = Math.min(rank + 1, RANKS.length - 1);
      setRank(r);
      setXp(next - 100);
      setToast(`Rank up! You are now ${RANKS[r]}`);
      setBurst((b) => b + 1);
      window.setTimeout(() => setToast(null), 2600);
    } else {
      setXp(next);
      setToast('+35 XP · Daily Drop');
      window.setTimeout(() => setToast(null), 1400);
    }
  }
  return (
    <div className="sl-panel" style={{ position: 'relative', minHeight: '13rem' }}>
      <div className="sl-kicker" style={{ marginBottom: '.6rem' }}>Agent file</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '.6rem', fontWeight: 800, fontSize: '1.3rem' }}>
        <span>{RANKS[rank]}</span>
        <span style={{ fontSize: '.9rem', opacity: 0.8 }}>{xp} / 100 XP</span>
      </div>
      <div className="sl-xp">
        <i style={{ width: `${xp}%` }} />
      </div>
      <button type="button" className="sl-btn" style={{ marginTop: '1.2rem' }} onClick={earn}>
        Earn XP
      </button>
      {toast ? (
        <div className="sl-toast" role="status">
          <strong>{toast}</strong>
        </div>
      ) : null}
      {theme === 'arcade' && burst
        ? Array.from({ length: 28 }, (_, i) => (
            <span
              key={`${burst}-${i}`}
              className="confetti"
              style={
                {
                  background: ['#ffd23f', '#ff4f9a', '#3a86ff', '#9ef01a'][i % 4],
                  '--dx': `${Math.cos(i) * (120 + (i % 5) * 30)}px`,
                  '--dy': `${Math.sin(i * 1.7) * 110 - 60}px`,
                  '--rot': `${i * 47}deg`,
                } as React.CSSProperties
              }
            />
          ))
        : null}
    </div>
  );
}

export function Scope({ src }: { src: string }) {
  const [p, setP] = useState({ x: 50, y: 50 });
  return (
    <div
      className="scope"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setP({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      onMouseLeave={() => setP({ x: 50, y: 50 })}
    >
      <img src={src} alt="LTK badge in a rifle scope" />
      <div className="radar" />
      <svg className="ret" viewBox="0 0 100 100" aria-hidden="true">
        <line x1={p.x} y1="0" x2={p.x} y2="100" stroke="#e11d2e" strokeWidth=".6" />
        <line x1="0" y1={p.y} x2="100" y2={p.y} stroke="#e11d2e" strokeWidth=".6" />
        <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="#ffcc00" strokeWidth=".7" />
        <circle cx={p.x} cy={p.y} r="1.2" fill="#e11d2e" />
      </svg>
    </div>
  );
}
