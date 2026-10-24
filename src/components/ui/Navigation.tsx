'use client';

import { motion, useScroll, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PERSONAL } from '@/lib/constants';
import { useScrollProgress } from '@/hooks/useScrollProgress';


const NAV_SECTIONS = [
  { id: 'hero', label: 'INIT' },
  { id: 'projects', label: 'WORK' },
  { id: 'devtrack', label: 'DEEP DIVE' },
  { id: 'about', label: 'ABOUT' },
  { id: 'tech', label: 'STACK' },
  { id: 'contact', label: 'CONTACT' },
];

export function Navigation() {
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const lastScrollY = useRef(0);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < 50 || currentY < lastScrollY.current);
      lastScrollY.current = currentY;

      // Detect active section
      for (const section of [...NAV_SECTIONS].reverse()) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[200] px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/5">
        <motion.div
          className="h-full bg-accent origin-left"
          style={{ scaleX: scrollProgress }}
        />
      </div>

      <div className="flex items-center justify-between">
        {/* Left: Identity */}
        <div className="flex items-center gap-3">
          <div className="status-dot" />
          <span
            className="font-mono text-xs tracking-widest text-white/30 hover:text-white/60 transition-colors cursor-pointer"
            onClick={() => scrollTo('hero')}
          >
            {PERSONAL.name.toUpperCase().replace(' ', '_')}
          </span>
        </div>

        {/* Center: Section nav (desktop) */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className={`font-mono text-[0.6rem] tracking-[0.2em] transition-colors ${
                activeSection === section.id
                  ? 'text-accent'
                  : 'text-white/25 hover:text-white/60'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Right: System metadata & Theme Selector */}
        <div className="flex items-center gap-4 font-mono text-[0.6rem] text-white/20">

          <span className="hidden sm:block">{PERSONAL.version}</span>
          <span className="text-accent/50 hidden md:block">SYS:ONLINE</span>
        </div>
      </div>
    </motion.nav>
  );
}
