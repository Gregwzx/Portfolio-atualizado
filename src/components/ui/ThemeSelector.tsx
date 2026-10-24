'use client';

import { useTheme, Theme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';

interface ThemeOption {
  id: Theme;
  label: string;
  color: string;
  glow: string;
}

const THEMES: ThemeOption[] = [
  { id: 'purple', label: 'ROXO', color: '#a855f7', glow: 'rgba(168,85,247,0.4)' },
  { id: 'green', label: 'VERDE', color: '#00f5c4', glow: 'rgba(0,245,196,0.4)' },
  { id: 'blue', label: 'AZUL', color: '#00d2ff', glow: 'rgba(0,210,255,0.4)' },
];

export function ThemeSelector({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 backdrop-blur-md select-none ${className}`}
      data-cursor="hover"
      title="Selecionar tema de cores"
    >
      <span className="font-mono text-[0.55rem] tracking-widest text-white/40 uppercase mr-1">
        TEMA:
      </span>

      <div className="flex items-center gap-2">
        {THEMES.map((t) => {
          const isActive = theme === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className="relative p-1 rounded-full flex items-center justify-center transition-transform hover:scale-110"
              aria-label={`Mudar para tema ${t.label}`}
              title={`${t.label}${t.id === 'purple' ? ' (Padrão)' : ''}`}
            >
              {/* Active animated outer ring */}
              {isActive && (
                <motion.span
                  layoutId="activeThemeRing"
                  className="absolute inset-0 rounded-full border border-current opacity-80"
                  style={{ color: t.color, boxShadow: `0 0 10px ${t.glow}` }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Color swatch dot */}
              <span
                className="w-3.5 h-3.5 rounded-full transition-all duration-300 relative z-10"
                style={{
                  background: t.color,
                  boxShadow: isActive ? `0 0 8px ${t.color}` : 'none',
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
