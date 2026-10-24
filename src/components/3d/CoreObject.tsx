'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Icosahedron, Wireframe } from '@react-three/drei';
import * as THREE from 'three';

interface CoreObjectProps {
  mouseX?: number;
  mouseY?: number;
  scrollProgress?: number;
  color?: string;
}

export function CoreObject({
  mouseX = 0,
  mouseY = 0,
  scrollProgress = 0,
  color = '#a855f7',
}: CoreObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    if (groupRef.current) {
      // Mouse tracking tilt
      groupRef.current.rotation.x +=
        (mouseY * 0.4 - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y +=
        (mouseX * 0.4 - groupRef.current.rotation.y) * 0.05;

      // Scroll: scale down and move up
      const targetScale = Math.max(0.3, 1 - scrollProgress * 0.6);
      groupRef.current.scale.setScalar(targetScale);
      groupRef.current.position.y = scrollProgress * -2;
    }

    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15;
      meshRef.current.rotation.z = time * 0.08;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.2;
      innerRef.current.rotation.y = time * 0.25;
    }

    if (outerRef.current) {
      outerRef.current.rotation.x = time * 0.1;
      outerRef.current.rotation.y = -time * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer glow sphere */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* Main distort mesh */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#080808"
          distort={0.3}
          speed={1.5}
          roughness={0.8}
          metalness={0.1}
          envMapIntensity={0.5}
        />
      </mesh>

      {/* Wireframe inner */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.01, 4]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Core glow point light */}
      <pointLight color={color} intensity={2} distance={5} decay={2} />

      {/* Accent ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.4, 0.004, 2, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} />
      </mesh>

      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.6, 0.002, 2, 80]} />
        <meshBasicMaterial color={color} transparent opacity={0.12} />
      </mesh>
    </group>
  );
}
