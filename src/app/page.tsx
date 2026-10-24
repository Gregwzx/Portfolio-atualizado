'use client';

import { useEffect } from 'react';
import { GrainOverlay } from '@/components/ui/GrainOverlay';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { Navigation } from '@/components/ui/Navigation';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { Hero } from '@/components/sections/Hero';
import { Projects } from '@/components/sections/Projects';
import { DevTrack } from '@/components/sections/DevTrack';
import { About } from '@/components/sections/About';
import { TechStack } from '@/components/sections/TechStack';
import { GitHub } from '@/components/sections/GitHub';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    let lenis: any;

    const initLenis = async () => {
      try {
        const Lenis = (await import('lenis')).default;
        lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
        });

        const raf = (time: number) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);
      } catch (e) {
        // Lenis not available, fall back to native scroll
        console.warn('Lenis not available, using native scroll');
      }
    };

    initLenis();

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <main className="relative bg-background">
      {/* Global overlays */}
      <GrainOverlay />
      <CustomCursor />
      <Navigation />
      <ScrollIndicator />

      {/* Sections */}
      <Hero />
      <Projects />
      <DevTrack />
      <About />
      <TechStack />
      <GitHub />
      <Contact />
    </main>
  );
}
