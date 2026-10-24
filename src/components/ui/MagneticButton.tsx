'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  strength?: number;
  as?: 'button' | 'a' | 'div';
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  strength = 0.4,
  as: Tag = 'button',
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setTransform({ x, y });
  };

  const onMouseLeave = () => {
    setTransform({ x: 0, y: 0 });
  };

  const style = {
    transform: `translate(${transform.x}px, ${transform.y}px)`,
    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  };

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn('magnetic-btn', className)}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={style}
        data-cursor="hover"
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      className={cn('magnetic-btn', className)}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={style}
      data-cursor="hover"
    >
      {children}
    </button>
  );
}
