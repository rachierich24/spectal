"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

const PROJECTS = [
  { url: "/event_mainstage.png", floatX: -5, floatZ: -10, delay: 0 },
  { url: "/event_spatial.png",   floatX: 5,  floatZ: -12, delay: 0.2 },
  { url: "/event_hackathon.png", floatX: -4, floatZ: -16, delay: 0.4 },
  { url: "/event_networking.png", floatX: 4,  floatZ: -20, delay: 0.6 }
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
      // Visible from energy section, until they fly past camera (Shifted by +1.0)
      const isVisible = scrollProgress > 2.0 && scrollProgress < 3.5;
      groupRef.current.visible = isVisible;

      if (!isVisible) return;

      planesRef.current.forEach((mesh, index) => {
        if (!mesh) return;
        const project = PROJECTS[index];
        
        // 1. POP OUT PHASE (Scroll 2.2 to 3.0)
        const popProgress = smoothstep(2.2 + project.delay * 0.5, 3.0, scrollProgress);
        
        // 2. FLY OUT PHASE (Scroll 3.0 to 3.3) - zoom past camera right before Archive Gallery
        const flyOutProgress = smoothstep(3.0, 3.3, scrollProgress);

        // Calculate Floating State
        const floatY = Math.sin(state.clock.elapsedTime * 0.5 + index * 2) * 0.5 + 1.5;
        const floatRotY = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
        const floatRotZ = Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.05;
        
        // Positions
        const currentX = project.floatX;
        
        const currentY = THREE.MathUtils.lerp(-15, floatY, popProgress);
        
        const currentZ = THREE.MathUtils.lerp(
          project.floatZ + (scrollProgress - 2.5) * 5, // Camera approaches during float
          10, // Fly past the camera
          flyOutProgress
        );

        mesh.position.set(currentX, currentY, currentZ);
        
        // Rotations
        mesh.rotation.y = floatRotY;
        mesh.rotation.z = floatRotZ;
        
        // Scale effect
        const scale = popProgress * 1.5;
        mesh.scale.set(scale, scale, scale);

        // Fade out as it flies past
        const material = mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 1.0 - flyOutProgress;
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
