import { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const holdTime = prefersReducedMotion ? 250 : 1500;
    const exitDuration = prefersReducedMotion ? 150 : 550;

    const exitTimer = setTimeout(() => setExiting(true), holdTime);
    const doneTimer = setTimeout(() => onFinish(), holdTime + exitDuration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={
        'fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[color:var(--color-ink)] transition-opacity duration-500 ease-out ' +
        (exiting ? 'pointer-events-none opacity-0' : 'opacity-100')
      }
      role="status"
      aria-label="Loading InkSphere"
    >
      <div className="relative flex items-center justify-center">
        <span className="splash-ripple" aria-hidden="true" />
        <svg width="72" height="72" viewBox="0 0 64 64" fill="none" className="splash-icon" aria-hidden="true">
          <path
            d="M32 4C32 4 12 30 12 42C12 53.0457 20.9543 62 32 62C43.0457 62 52 53.0457 52 42C52 30 32 4 32 4Z"
            fill="var(--color-paper)"
          />
          <path d="M24 44C24 38 27 33 32 30" stroke="var(--color-gold)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <p className="splash-word mt-5 font-display text-2xl font-semibold tracking-tight text-[color:var(--color-paper)]">
        InkSphere
      </p>
      <p className="splash-tagline mt-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-[color:var(--color-paper)]/50">
        every idea deserves a page
      </p>
    </div>
  );
}
