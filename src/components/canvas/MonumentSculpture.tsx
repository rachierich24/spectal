"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/lib/experienceStore";
import { gsap } from "gsap";

export default function MonumentSculpture() {
  const { state } = useExperience();
  const groupRef = useRef<THREE.Group>(null);
  
  // Refs for sub-mesh elements to rotate at different speeds
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const cageRef = useRef<THREE.Mesh>(null);

  // Mouse coords with inertia
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Monitor mouse movements in canvas space
  useFrame((stateContext) => {
    // Lerp mouse coordinates for smooth inertia
    mouse.current.targetX = stateContext.pointer.x * 0.8;
    mouse.current.targetY = stateContext.pointer.y * 0.8;
    
    mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
    mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

    const t = stateContext.clock.elapsedTime;

    if (groupRef.current) {
      // 1. Reveal Scale transition
      const isRevealed = state === "REVEALED";
      const targetScale = isRevealed ? 1 : 0;
      
      // Smoothly scale the entire group
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);

      if (isRevealed) {
        // 2. Slow floating motion
        groupRef.current.position.y = Math.sin(t * 0.8) * 0.15;
        
        // 3. Mouse Parallax (inertia)
        groupRef.current.rotation.x = mouse.current.y * 0.3;
        groupRef.current.rotation.y = mouse.current.x * 0.3;
      }
    }

    if (state === "REVEALED") {
      // Rotate core
      if (coreRef.current) {
        coreRef.current.rotation.y = t * 0.2;
        coreRef.current.rotation.x = Math.sin(t * 0.1) * 0.2;
      }

      // Gyroscopic rings rotating in opposite directions
      if (ring1Ref.current) {
        ring1Ref.current.rotation.x = t * 0.35;
        ring1Ref.current.rotation.z = Math.sin(t * 0.3) * 0.1;
      }

      if (ring2Ref.current) {
        ring2Ref.current.rotation.y = -t * 0.4;
        ring2Ref.current.rotation.x = Math.cos(t * 0.2) * 0.15;
      }

      // Outer wireframe cage
      if (cageRef.current) {
        cageRef.current.rotation.y = -t * 0.1;
        cageRef.current.rotation.x = -t * 0.05;
      }
    }
  });

  // Material configurations
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#DDECC4"), // Mint
      transmission: 0.95, // Glass transparency
      roughness: 0.08,
      metalness: 0.05,
      thickness: 1.5, // Refraction thickness
      ior: 1.52, // Refractive index of glass
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: true,
      shadowSide: THREE.DoubleSide,
    });
  }, []);

  const redChromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#E0433A"), // Spectal Red
      roughness: 0.15,
      metalness: 0.9,
    });
  }, []);

  const mintChromeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color("#DDECC4"), // Spectal Mint
      roughness: 0.2,
      metalness: 0.85,
    });
  }, []);

  return (
    <group ref={groupRef} scale={[0, 0, 0]} position={[0, 0, -2]}>
      {/* 1. Core Glass Geometry - Dodecahedron (very geometric and futuristic) */}
      <mesh ref={coreRef} material={glassMaterial}>
        <dodecahedronGeometry args={[1.0, 0]} />
      </mesh>

      {/* Inner glowing core light */}
      <pointLight 
        color="#E0433A" 
        intensity={2.5} 
        distance={8} 
        decay={2}
      />

      {/* 2. Gyroscope Outer Ring 1 - Red Chrome Thin Torus */}
      <mesh ref={ring1Ref} material={redChromeMaterial}>
        <torusGeometry args={[1.8, 0.03, 16, 100]} />
      </mesh>

      {/* 3. Gyroscope Inner Ring 2 - Mint Chrome Thin Torus */}
      <mesh ref={ring2Ref} material={mintChromeMaterial} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
      </mesh>

      {/* 4. Outer Cage Frame - Intersecting Wireframe Octahedron */}
      <mesh ref={cageRef}>
        <octahedronGeometry args={[2.2, 0]} />
        <meshBasicMaterial 
          color="#DDECC4" 
          wireframe 
          transparent 
          opacity={0.15} 
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Subtle details: floating nodes at cage vertices */}
      <group ref={cageRef}>
        {/* We can place small reflective spheres at structural vertex points */}
        <mesh position={[0, 2.2, 0]} material={redChromeMaterial}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
        <mesh position={[0, -2.2, 0]} material={redChromeMaterial}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
        <mesh position={[2.2, 0, 0]} material={redChromeMaterial}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
        <mesh position={[-2.2, 0, 0]} material={redChromeMaterial}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
        <mesh position={[0, 0, 2.2]} material={redChromeMaterial}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
        <mesh position={[0, 0, -2.2]} material={redChromeMaterial}>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
        </mesh>
      </group>
    </group>
  );
}
