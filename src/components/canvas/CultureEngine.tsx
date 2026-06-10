"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

export default function CultureEngine() {
  const engineRef = useRef<THREE.Group>(null);
  
  // Inner parts for rotation
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const scrollProgress = scrollStore.progress;

    if (engineRef.current) {
      const isVisible = scrollProgress > 4.5 && scrollProgress < 7.5;
      engineRef.current.visible = isVisible;
      
      if (!isVisible) return;
      
      const targetY = (6.0 - scrollProgress) * -20;
      const clampedY = Math.max(Math.min(targetY, 20), -20);
      engineRef.current.position.y = THREE.MathUtils.lerp(engineRef.current.position.y, clampedY, 0.1);
      engineRef.current.position.z = THREE.MathUtils.lerp(engineRef.current.position.z, -5, 0.05);
    }
    
    if (ring1Ref.current && ring2Ref.current && coreRef.current) {
      const scrollRotation = scrollProgress * Math.PI * 2;
      const timeRotation = state.clock.elapsedTime * 0.2;
      
      ring1Ref.current.rotation.x = scrollRotation + timeRotation;
      ring1Ref.current.rotation.y = scrollRotation * 0.5 + timeRotation;
      
      ring2Ref.current.rotation.y = -scrollRotation + timeRotation * 1.5;
      ring2Ref.current.rotation.z = -scrollRotation * 0.5 - timeRotation;
      
      coreRef.current.rotation.x = scrollRotation * 2 + timeRotation;
      coreRef.current.rotation.y = scrollRotation * 2 - timeRotation;
      
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={engineRef} position={[0, -50, -20]}>
      {/* Outer Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[3, 0.2, 16, 48]} />
        <meshBasicMaterial color="#DDECC4" wireframe={true} />
      </mesh>
      
      {/* Inner Ring */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2, 0.15, 16, 48]} />
        <meshBasicMaterial color="#DDECC4" />
      </mesh>
      
      {/* The Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#DDECC4" wireframe={true} />
      </mesh>
    </group>
  );
}
