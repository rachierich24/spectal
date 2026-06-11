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
      // Create a spiral galaxy tunnel to fly through
      const z = (Math.random() - 0.5) * 120; // Deeper Z axis range

      // Spiral rotation angle depends on Z (creates beautiful twisting nebula arm effect)
      const angle = (Math.random() * Math.PI * 2) + (z * 0.05);

      // Radial distribution favoring a denser core with some wider outlying arms
      const radius = 2.0 + Math.pow(Math.random(), 1.5) * 16.0;

      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;

      // Speed and phase for twinkling animation
      const speed = 0.5 + Math.random() * 1.5;
      const phase = Math.random() * Math.PI * 2;

      temp.push({ x, y, z, speed, phase });
    }
    return temp;
  }, [starCount]);

  // Set initial instance matrices
  useEffect(() => {
    if (!starsRef.current) return;
    particles.forEach((particle, i) => {
      dummy.position.set(particle.x, particle.y, particle.z);
      const scale = 0.4 + (i % 5 === 0 ? 0.8 : 0.3);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      starsRef.current!.setMatrixAt(i, dummy.matrix);
    });
    starsRef.current.instanceMatrix.needsUpdate = true;
  }, [particles, dummy]);

  useFrame((state) => {
    const scrollProgress = scrollStore.progress;

    if (groupRef.current) {
      const isVisible = scrollProgress > 3.8 && scrollProgress < 8.0;
      groupRef.current.visible = isVisible;

      if (!isVisible) return;

      const targetZ = (scrollProgress - 6.0) * 80;
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08); // smoother scroll follow
      groupRef.current.rotation.z += 0.0005; // slower rotation for cinematic space depth

      // Dynamic real-time star scale/twinkle updates
      if (starsRef.current) {
        const time = state.clock.getElapsedTime();

        // Smoothly fade in/out based on scrollProgress
        let opacity = 0;
        if (scrollProgress >= 3.8 && scrollProgress < 4.2) {
          opacity = ((scrollProgress - 3.8) / 0.4) * 0.15; // Fade in from 3.8 to 4.2
        } else if (scrollProgress >= 4.2 && scrollProgress <= 7.2) {
          opacity = 0.15;
        } else if (scrollProgress > 7.2) {
          opacity = Math.max(0, ((8.0 - scrollProgress) / 0.8) * 0.15); // Fade out at the very end
        }

        const material = starsRef.current.material as THREE.MeshBasicMaterial;
        if (material) {
          material.opacity = opacity;
        }
        particles.forEach((particle, i) => {
          // Unique sine-wave twinkle per star using its phase and speed
          const twinkle = 0.7 + Math.sin(time * particle.speed + particle.phase) * 0.3;

          dummy.position.set(particle.x, particle.y, particle.z);

          // Apply twinkling to the base scale
          const baseScale = 0.4 + (i % 5 === 0 ? 0.8 : 0.3);
          const scale = baseScale * twinkle;
          dummy.scale.set(scale, scale, scale);

          dummy.updateMatrix();
          starsRef.current!.setMatrixAt(i, dummy.matrix);
        });
        starsRef.current.instanceMatrix.needsUpdate = true;
      }
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
