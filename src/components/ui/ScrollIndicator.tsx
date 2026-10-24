'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export function ScrollIndicator() {
  const progress = useScrollProgress();

  return (
    <div className="scroll-indicator" aria-hidden="true">
      <span
        className="font-mono text-[0.55rem] tracking-widest text-white/20"
        style={{ writingMode: 'vertical-rl' }}
      >
        SCROLL
      </span>
      <div className="scroll-indicator-bar">
        <div
          className="scroll-indicator-fill"
          style={{ height: `${progress * 100}%` }}
        />
      </div>
      <span className="font-mono text-[0.55rem] text-white/20">
        {Math.round(progress * 100)}
      </span>
    </div>
  );
}
