'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TECH_STACK, TECH_CATEGORIES } from '@/lib/constants';
import { FadeIn } from '@/components/ui/TextReveal';

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: '#00f5c4',
  Backend: '#00c4f5',
  Mobile: '#f5c400',
  Database: '#f500c4',
  Tools: '#c4f500',
  Learning: '#555',
};

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTech = activeCategory
    ? TECH_STACK.filter((t) => t.category === activeCategory)
    : TECH_STACK;

  return (
    <section id="tech" className="section relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      <div className="container relative z-10">
        {/* Header */}
        <FadeIn className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-accent/30" />
            <span className="label-mono">CAPABILITIES</span>
          </div>
          <div
            className="heading-display text-white"
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
            }}
          >
            TECH
            <br />
            <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)', color: 'transparent' }}>
              STACK
            </span>
          </div>
        </FadeIn>

        {/* Category filter */}
        <FadeIn className="mb-12">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveCategory(null)}
              className={`font-mono text-[0.65rem] tracking-widest px-4 py-2 border transition-all ${
                activeCategory === null
                  ? 'border-accent/30 text-accent bg-accent/5'
                  : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/60'
              }`}
              data-cursor="hover"
            >
              ALL
            </button>
            {TECH_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`font-mono text-[0.65rem] tracking-widest px-4 py-2 border transition-all ${
                  activeCategory === cat
                    ? 'border-accent/30 text-accent bg-accent/5'
                    : 'border-white/10 text-white/30 hover:border-white/20 hover:text-white/60'
                }`}
                data-cursor="hover"
                style={
                  activeCategory === cat
                    ? { borderColor: CATEGORY_COLORS[cat] + '40', color: CATEGORY_COLORS[cat] }
                    : {}
                }
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Tech grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredTech.map((tech, i) => (
              <motion.div
                key={tech.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                className={`relative border p-4 group cursor-default transition-all duration-300 ${
                  tech.level === 'learning'
                    ? 'border-dashed border-white/6'
                    : 'border-white/6 hover:border-white/12'
                }`}
                style={
                  tech.level === 'learning'
                    ? { opacity: 0.5 }
                    : {}
                }
                whileHover={{ scale: 1.02 }}
                data-cursor="hover"
              >
                {/* Category color dot */}
                <div
                  className="w-1.5 h-1.5 rounded-full mb-3"
                  style={{ background: CATEGORY_COLORS[tech.category] || '#333' }}
                />

                <div className="font-mono text-[0.75rem] text-white/70 group-hover:text-white transition-colors mb-1">
                  {tech.name}
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.55rem] text-white/20">
                    {tech.category.toLowerCase()}
                  </span>
                  {tech.level === 'learning' && (
                    <span className="font-mono text-[0.5rem] text-accent/30 border border-accent/10 px-1.5 py-0.5">
                      LEARNING
                    </span>
                  )}
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${CATEGORY_COLORS[tech.category]}05 0%, transparent 70%)`,
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Legend */}
        <FadeIn className="mt-12" delay={0.2}>
          <div className="flex items-center gap-6 font-mono text-[0.6rem] text-white/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-[1px] bg-white/20" />
              <span>PROFICIENT / FAMILIAR</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-[1px] border-t border-dashed border-white/20" />
              <span>CURRENTLY LEARNING</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
