'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { CoreObject } from '@/components/3d/CoreObject';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useTheme } from '@/context/ThemeContext';

import { motion, useScroll, useTransform } from 'framer-motion';

import { ABOUT_PHASES } from '@/lib/constants';

import { FadeIn } from '@/components/ui/TextReveal';

function CartaoFase({
  phase,
  index,
}: {
  phase: typeof ABOUT_PHASES[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.8, 1],
    [0, 1, 1, 0.4]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.4],
    [40, 0]
  );

  const lineWidth = useTransform(
    scrollYProgress,
    [0.3, 0.8],
    ['0%', '100%']
  );

  const isLast = index === ABOUT_PHASES.length - 1;

  return (
    <motion.div
      ref={ref}
      className="relative grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 md:gap-12"
      style={{ opacity, y }}
    >
      {/* Ano + linha */}
      <div className="flex flex-col items-end gap-2 pt-1">
        <span className="font-mono text-[0.6rem] text-accent/50 tracking-widest">
          {phase.year}
        </span>

        {!isLast && (
          <div className="flex-1 w-[1px] bg-white/5 relative overflow-hidden mt-2">
            <motion.div
              className="absolute top-0 left-0 w-full bg-accent/30"
              style={{ height: lineWidth }}
            />
          </div>
        )}
      </div>

      {/* Conteúdo da fase */}
      <div className="pb-16">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: isLast
                ? 'var(--accent)'
                : 'rgba(var(--accent-rgb), 0.3)',
              boxShadow: isLast
                ? '0 0 10px var(--accent)'
                : 'none',
            }}
          />

          <h3
            className="font-sans font-black tracking-tighter text-white"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              lineHeight: 1,
            }}
          >
            {phase.label}
          </h3>

          {phase.id === 'inovar' && (
            <motion.span
              className="font-mono text-[0.55rem] text-accent tracking-widest border border-accent/20 px-2 py-0.5"
              animate={{
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              ATUAL
            </motion.span>
          )}
        </div>

        <p className="text-white/40 text-sm leading-relaxed mb-4 max-w-lg">
          {phase.description}
        </p>

        <div className="font-mono text-[0.6rem] text-white/20 tracking-wider">
          {phase.detail}
        </div>
      </div>
    </motion.div>
  );
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { normalized } = useMousePosition();
  const scrollProgress = useScrollProgress();
  const { accentColor } = useTheme();

  useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section
      id="about"
      className="section relative overflow-hidden"
      ref={containerRef}
    >
      {/* Fundo */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Globo interativo */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[40vw] h-[60vh] pointer-events-none opacity-60">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.1} />
          <CoreObject mouseX={normalized.x} mouseY={normalized.y} scrollProgress={scrollProgress} color={accentColor} />
        </Canvas>
      </div>

      <div className="container relative z-10">

        {/* Cabeçalho */}
        <FadeIn className="mb-20">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-accent/30" />

            <span className="label-mono">
              IDENTIDADE
            </span>
          </div>

          <div
            className="heading-display text-white"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
            }}
          >
            MINHA
            <br />

            <span
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.15)',
                color: 'transparent',
              }}
            >
              JORNADA
            </span>
          </div>
        </FadeIn>

        {/* Linha superior das fases */}
        <FadeIn className="mb-16 overflow-hidden">
          <div className="flex items-center gap-8 pb-4 border-b border-white/5">
            {ABOUT_PHASES.map((phase, i) => (
              <div
                key={phase.id}
                className="flex items-center gap-8 flex-shrink-0"
              >
                <span className="font-mono text-[0.6rem] tracking-[0.25em] text-white/15">
                  {phase.label}
                </span>

                {i < ABOUT_PHASES.length - 1 && (
                  <span className="text-white/10 text-xs">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Linha do tempo */}
        <div className="max-w-3xl">
          {ABOUT_PHASES.map((phase, i) => (
            <CartaoFase
              key={phase.id}
              phase={phase}
              index={i}
            />
          ))}
        </div>

        {/* Nota final */}
        <FadeIn
          className="mt-8"
          delay={0.3}
        >
          <div className="border-t border-white/5 pt-8 flex items-center gap-4">
            <div className="h-[1px] w-8 bg-accent/20" />

            <p className="font-mono text-[0.65rem] text-white/20">
              Estudante de ADS · construindo software · evoluindo continuamente
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}