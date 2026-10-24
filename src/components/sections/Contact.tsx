'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from '@/components/3d/ParticleField';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useTheme } from '@/context/ThemeContext';
import { PERSONAL } from '@/lib/constants';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { FadeIn } from '@/components/ui/TextReveal';

function SocialLink({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 font-mono text-[0.7rem] tracking-widest text-white/25 hover:text-accent transition-all group"
      data-cursor="hover"
    >
      <span className="group-hover:scale-110 transition-transform">{icon}</span>
      {label}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
    </a>
  );
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const { normalized } = useMousePosition();
  const scrollProgress = useScrollProgress();
  const { accentColor } = useTheme();

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="section relative overflow-hidden min-h-screen flex items-center">
      {/* Particles */}
      <div className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ alpha: true, antialias: true }}>
          <ParticleField count={4000} spread={18} mouseInfluence={normalized} scrollProgress={scrollProgress} color={accentColor} />
        </Canvas>
      </div>

      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,245,196,0.15), transparent)',
        }}
      />

      {/* Bottom glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(0,245,196,0.04) 0%, transparent 60%)',
        }}
      />

      <div className="container relative z-10 text-center">
        {/* System complete label */}
        <FadeIn className="mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-accent/20" />
            <span className="font-mono text-[0.6rem] tracking-[0.3em] text-accent/40">
              TRANSMISSION COMPLETE
            </span>
            <div className="h-[1px] w-12 bg-accent/20" />
          </div>
        </FadeIn>

        {/* Main heading */}
        <FadeIn className="mb-6">
          <div
            className="heading-display text-white"
            style={{
              fontSize: 'clamp(3rem, 10vw, 10rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
            }}
          >
            READY
          </div>
          <div
            className="heading-display"
            style={{
              fontSize: 'clamp(3rem, 10vw, 10rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
            }}
          >
            TO BUILD?
          </div>
        </FadeIn>

        {/* Sub text */}
        <FadeIn className="mb-16" delay={0.2}>
          <p className="font-mono text-[0.7rem] tracking-widest text-white/20 max-w-md mx-auto">
            Available for interesting projects, collaborations, and engineering challenges.
          </p>
        </FadeIn>

        {/* CTA */}
        <FadeIn className="mb-20" delay={0.3}>
          <MagneticButton onClick={copyEmail} className="mx-auto text-sm">
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  EMAIL COPIED ✓
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  COPY EMAIL
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M4 2h6v8M2 4h6v6H2z"
                      stroke="currentColor"
                      strokeWidth="1.2"
                    />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </MagneticButton>
          <div className="mt-3 font-mono text-[0.6rem] text-white/15">{PERSONAL.email}</div>
        </FadeIn>

        {/* Social links */}
        <FadeIn delay={0.4}>
          <div className="flex items-center justify-center gap-10">
            <SocialLink
              href={`https://${PERSONAL.github}`}
              label="GITHUB"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              }
            />
            <SocialLink
              href={`https://${PERSONAL.linkedin}`}
              label="LINKEDIN"
              icon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
            />
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn className="mt-24" delay={0.5}>
          <div className="flex items-center justify-center gap-6 font-mono text-[0.55rem] text-white/10 tracking-widest">
            <span>GREG FERREIRA</span>
            <span>·</span>
            <span>{PERSONAL.version}</span>
            <span>·</span>
            <span>{new Date().getFullYear()}</span>
            <span>·</span>
            <span>BUILT WITH PRECISION</span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
