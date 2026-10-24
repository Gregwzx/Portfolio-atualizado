'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  spread?: number;
  mouseInfluence?: { x: number; y: number };
  scrollProgress?: number;
  color?: string;
}

export function ParticleField({
  count = 2000,
  spread = 15,
  mouseInfluence = { x: 0, y: 0 },
  scrollProgress = 0,
  color = '#a855f7',
}: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const { positions, originalPositions } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const originalPositions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread * 0.5;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;
    }

    return { positions, originalPositions };
  }, [count, spread]);

  useFrame((state) => {
    if (!ref.current) return;
    const time = state.clock.elapsedTime;

    const geo = ref.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const ox = originalPositions[i * 3];
      const oy = originalPositions[i * 3 + 1];
      const oz = originalPositions[i * 3 + 2];

      // Gentle wave motion
      pos[i * 3] = ox + Math.sin(time * 0.3 + oy * 0.5) * 0.2;
      pos[i * 3 + 1] = oy + Math.cos(time * 0.2 + ox * 0.5) * 0.15;
      pos[i * 3 + 2] = oz + Math.sin(time * 0.4 + ox * 0.3) * 0.1;

      // Mouse repulsion (subtle)
      const dx = pos[i * 3] - mouseInfluence.x * 3;
      const dy = pos[i * 3 + 1] - mouseInfluence.y * 3;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 2) {
        pos[i * 3] += dx * 0.02;
        pos[i * 3 + 1] += dy * 0.02;
      }

      // Scroll scatter: particles drift outward
      pos[i * 3] += ox * scrollProgress * 0.5;
      pos[i * 3 + 1] += oy * scrollProgress * 0.3;
    }

    geo.attributes.position.needsUpdate = true;
    ref.current.rotation.y = time * 0.03;

    // Opacity decreases with scroll
    if (materialRef.current) {
      materialRef.current.opacity = Math.max(0.1, 0.5 - scrollProgress * 0.4);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.03}
        color={color}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
