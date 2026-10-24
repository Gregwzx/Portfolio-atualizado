'use client';

import { useEffect, useState } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useIsMobile } from '@/hooks/useBreakpoint';

import { useTheme } from '@/context/ThemeContext';
import { Canvas } from '@react-three/fiber';
import { ParticleField } from './ParticleField';
import { CoreObject } from './CoreObject';

export function HeroScene() {
  const { normalized } = useMousePosition();
  const scrollProgress = useScrollProgress();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const { accentColor } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const particleCount = isMobile ? 600 : 2000;

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.1} />
        <directionalLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
        <directionalLight position={[-5, -5, 3]} intensity={0.15} color={accentColor} />

        {!isMobile && (
          <ParticleField
            count={particleCount}
            spread={18}
            mouseInfluence={normalized}
            scrollProgress={scrollProgress}
            color={accentColor}
          />
        )}

        <CoreObject
          mouseX={normalized.x}
          mouseY={normalized.y}
          scrollProgress={scrollProgress}
          color={accentColor}
        />
      </Canvas>
    </div>
  );
}
