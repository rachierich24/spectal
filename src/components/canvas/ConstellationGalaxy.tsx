"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

export default function ConstellationGalaxy() {
  const groupRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.InstancedMesh>(null);

  const starCount = 500; // Representing brands/partnerships

  // Create randomized positions for the galaxy
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < starCount; i++) {
      // Create a cylinder/tube-like galaxy to fly through
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 15;
      const z = (Math.random() - 0.5) * 100; // Deep Z axis

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      temp.push({ x, y, z });
    }
    // Sort by Z so we can apply textures properly if needed later
    return temp.sort((a, b) => a.z - b.z);
  }, [starCount]);

  // Set initial instance matrices
  useEffect(() => {
    if (!starsRef.current) return;
    particles.forEach((particle, i) => {
      dummy.position.set(particle.x, particle.y, particle.z);
      // Give them varying sizes
      const scale = 0.5 + Math.random() * 1.5;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      starsRef.current!.setMatrixAt(i, dummy.matrix);
    });
    starsRef.current.instanceMatrix.needsUpdate = true;
  }, [particles, dummy]);

  useFrame((state) => {
    const scrollProgress = scrollStore.progress;

    if (groupRef.current) {
      const isVisible = scrollProgress > 4.5 && scrollProgress < 6.5;
      groupRef.current.visible = isVisible;

      if (!isVisible) return;

      const targetZ = (scrollProgress - 6.0) * 80;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1);
      groupRef.current.rotation.z += 0.001;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -150]}>
      {/* 
        In a full production version, this InstancedMesh would use 
        drei's <Instances> component or custom shaders to apply 
        different brand logo textures to each plane.
      */}
      <instancedMesh ref={starsRef} args={[undefined, undefined, starCount]}>
        <planeGeometry args={[0.5, 0.5]} />
        <meshBasicMaterial
          color="#DDECC4"
          transparent={true}
          opacity={0.15}
          side={THREE.DoubleSide}
          // additive blending for glowing stars
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
    </group>
  );
}
