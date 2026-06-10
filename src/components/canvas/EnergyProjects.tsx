"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

const PROJECTS = [
  { url: "/event_mainstage.png", floatX: -5, floatZ: -10, delay: 0,   galX: -2.3, galY: 1.3, galZ: -4 },
  { url: "/event_spatial.png",   floatX: 5,  floatZ: -12, delay: 0.2, galX: 2.3,  galY: 1.3, galZ: -4 },
  { url: "/event_hackathon.png", floatX: -4, floatZ: -16, delay: 0.4, galX: -2.3, galY: -1.3, galZ: -4 },
  { url: "/event_networking.png", floatX: 4,  floatZ: -20, delay: 0.6, galX: 2.3,  galY: -1.3, galZ: -4 }
];

export default function EnergyProjects() {
  const groupRef = useRef<THREE.Group>(null);
  const textures = useTexture(PROJECTS.map(p => p.url));
  const planesRef = useRef<(THREE.Mesh | null)[]>([]);

  // Helper smoothstep
  const smoothstep = (min: number, max: number, value: number) => {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  };

  useFrame((state) => {
    const scrollProgress = scrollStore.progress;

    if (groupRef.current) {
      // Visible from energy section, through impact, up to showcase
      const isVisible = scrollProgress > 1.0 && scrollProgress < 4.0;
      groupRef.current.visible = isVisible;

      if (!isVisible) return;

      planesRef.current.forEach((mesh, index) => {
        if (!mesh) return;
        const project = PROJECTS[index];
        
        // 1. POP OUT PHASE (Scroll 1.2 to 2.0)
        const popProgress = smoothstep(1.2 + project.delay * 0.5, 2.0, scrollProgress);
        
        // 2. FORM GALLERY PHASE (Scroll 2.0 to 2.8) - this is when the Archive Gallery starts
        const galleryProgress = smoothstep(2.0, 2.8, scrollProgress);

        // Calculate Floating State
        const floatY = Math.sin(state.clock.elapsedTime * 0.5 + index * 2) * 0.5 + 1.5;
        const floatRotX = 0;
        const floatRotY = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
        const floatRotZ = Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.05;
        
        // Mix positions: Hide(-15) -> Float -> Gallery
        const startY = -15;
        
        const currentX = THREE.MathUtils.lerp(
          project.floatX, 
          project.galX, 
          galleryProgress
        );
        
        const currentY = THREE.MathUtils.lerp(
          THREE.MathUtils.lerp(startY, floatY, popProgress),
          project.galY,
          galleryProgress
        );
        
        const currentZ = THREE.MathUtils.lerp(
          project.floatZ + (scrollProgress - 1.5) * 5, // Camera approaches during float
          project.galZ, 
          galleryProgress
        );

        mesh.position.set(currentX, currentY, currentZ);
        
        // Mix rotations: Float -> Flat (Gallery)
        mesh.rotation.x = THREE.MathUtils.lerp(floatRotX, 0, galleryProgress);
        mesh.rotation.y = THREE.MathUtils.lerp(floatRotY, 0, galleryProgress);
        mesh.rotation.z = THREE.MathUtils.lerp(floatRotZ, 0, galleryProgress);
        
        // Scale effect
        const scale = THREE.MathUtils.lerp(popProgress * 1.5, 1.8, galleryProgress);
        mesh.scale.set(scale, scale, scale);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {textures.map((texture, index) => (
        <mesh
          key={index}
          ref={(el) => { planesRef.current[index] = el; }}
          position={[0, -15, 0]}
        >
          {/* 16:9 aspect ratio roughly */}
          <planeGeometry args={[2.4, 1.35]} />
          <meshBasicMaterial 
            map={texture} 
            transparent={true} 
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}
