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

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const scrollProgress = scrollStore.progress;
    const isVisible = scrollProgress > 3.0 && scrollProgress < 7.0;

    // Hide/show without expensive logic when not in range
    groupRef.current.visible = isVisible;
    if (!isVisible) return; // skip ALL math when not visible

    const targetZ = (scrollProgress - 5.0) * 80;
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.08);
    groupRef.current.rotation.z += delta * 0.04;
    groupRef.current.rotation.y += delta * 0.02;
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
