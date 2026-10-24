'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { PERSONAL } from '@/lib/constants';
import { TerminalLog } from '@/components/ui/TerminalLog';
import { MagneticButton } from '@/components/ui/MagneticButton';


const HeroScene = dynamic(
  () => import('@/components/3d/HeroScene').then((m) => m.HeroScene),
  { ssr: false }
);

const TAGLINES = PERSONAL.taglines;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.4,
    },
  },
};

const lineVariants = {
  hidden: { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', opacity: 0 },
  visible: {
    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const metaVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function Hero() {
  const [time, setTime] = useState('');
  const [uptime, setUptime] = useState(0);
  const startTime = useRef(Date.now());

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toISOString().replace('T', ' ').split('.')[0] + ' UTC');
      setUptime(Math.floor((Date.now() - startTime.current) / 1000));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const scrollDown = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative w-full h-screen overflow-hidden grid-bg flex flex-col"
    >
      {/* 3D Background */}
      <HeroScene />

      {/* Radial gradient center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 60% at 65% 50%, rgba(0,245,196,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, #080808)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full px-8 md:px-16 lg:px-24">
        {/* Top metadata row */}
        <motion.div
          className="flex items-center justify-between pt-28"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div className="status-dot" />
            <span className="label-mono">SYSTEM ONLINE</span>
          </div>
          <div className="flex items-center gap-6">

            <div className="hidden md:flex items-center gap-8 font-mono text-[0.6rem] text-white/20">
              <span>{PERSONAL.coordinates}</span>
              <span>BUILD: {PERSONAL.buildHash}</span>
              <span className="text-accent/40">{time}</span>
            </div>
          </div>
        </motion.div>

        {/* Hero typography */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* JAILSON */}
            <motion.div variants={lineVariants} className="overflow-hidden">
              <h1
                className="heading-display text-white select-none"
                style={{
                  fontSize: 'clamp(5rem, 15vw, 8rem)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.04em',
                }}
              >
                JAILSON
              </h1>
            </motion.div>

            {/* FERREIRA */}
            <motion.div variants={lineVariants} className="overflow-hidden -mt-2">
              <h1
                className="heading-display select-none"
                style={{
                  fontSize: 'clamp(5rem, 15vw, 14rem)',
                  lineHeight: 0.88,
                  letterSpacing: '-0.04em',
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(255,255,255,0.15)',
                }}
              >
                FERREIRA
              </h1>
            </motion.div>

            {/* Divider + taglines */}
            <motion.div
              variants={metaVariants}
              className="flex items-center gap-6 mt-8"
            >
              <div className="h-[1px] w-16 bg-accent/30" />
              <div className="flex gap-4 md:gap-8">
                {TAGLINES.map((tag, i) => (
                  <span
                    key={tag}
                    className="font-mono text-[0.6rem] md:text-[0.7rem] tracking-[0.25em] text-white/30"
                  >
                    {tag}
                    {i < TAGLINES.length - 1 && (
                      <span className="text-accent/20 ml-4 md:ml-8">·</span>
                    )}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right column: terminal + CTA */}
          <motion.div
            className="absolute right-8 md:right-16 lg:right-24 bottom-32 hidden lg:block w-72"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <TerminalLog speed={280} />

            <div className="mt-6">
              <MagneticButton onClick={scrollDown}>
                <span>VIEW WORK</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1v10H1" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </MagneticButton>
            </div>
          </motion.div>

          {/* Mobile CTA */}
          <motion.div
            className="lg:hidden mt-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <button
              onClick={scrollDown}
              className="font-mono text-xs tracking-widest text-accent/60 border border-accent/20 px-6 py-3"
            >
              VIEW WORK ↓
            </button>
          </motion.div>
        </div>

        {/* Bottom info row */}
        <motion.div
          className="flex items-end justify-between pb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          <div className="flex items-center gap-4 font-mono text-[0.6rem] text-white/15">
            <span>UPTIME: {uptime}s</span>
            <span>·</span>
            <span>{PERSONAL.version}</span>
          </div>
          <div className="flex items-center gap-2">
            <motion.div
              className="flex flex-col items-center gap-1"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-accent/40" />
              <div className="w-1 h-1 rounded-full bg-accent/40" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
