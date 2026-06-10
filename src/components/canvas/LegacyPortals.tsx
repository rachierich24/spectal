"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshPortalMaterial, Environment, Text } from "@react-three/drei";
import * as THREE from "three";

export default function LegacyPortals() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Section 5 is active around scrollProgress 4.5 to 5.5
  useFrame(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollProgress = scrollY / windowHeight;

    if (groupRef.current) {
      const isVisible = scrollProgress > 3.5 && scrollProgress < 6.5;
      groupRef.current.visible = isVisible;
      
      if (!isVisible) return;

      const targetY = (5.0 - scrollProgress) * 15;
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, targetY, 0.1);
      groupRef.current.position.z = -5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Portal 1: Art Basel */}
      <PortalItem 
        position={[-3, 0, 0]} 
        rotation={[0, Math.PI / 6, 0]} 
        title="ART BASEL" 
        color="#C9493D" 
      />
      
      {/* Portal 2: Tomorrowland */}
      <PortalItem 
        position={[0, 0, 1]} 
        rotation={[0, 0, 0]} 
        title="TOMORROWLAND" 
        color="#DDECC4" 
      />
      
      {/* Portal 3: F1 Paddock Club */}
      <PortalItem 
        position={[3, 0, 0]} 
        rotation={[0, -Math.PI / 6, 0]} 
        title="F1 PADDOCK" 
        color="#4A90E2" 
      />
    </group>
  );
}

function PortalItem({ position, rotation, title, color }: any) {
  const portalRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    if (portalRef.current) {
      // Animate portal blend when hovered
      const targetBlend = hovered ? 1 : 0;
      portalRef.current.blend = THREE.MathUtils.lerp(portalRef.current.blend, targetBlend, 0.1);
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Text fontSize={0.3} position={[0, -2, 0]} anchorY="top">
        {title}
      </Text>
      <mesh 
        onPointerOver={() => setHover(true)} 
        onPointerOut={() => setHover(false)}
      >
        <planeGeometry args={[2.5, 3.5]} />
        <MeshPortalMaterial ref={portalRef} blend={0}>
          <color attach="background" args={[color]} />
          <Environment preset="city" />
          <ambientLight intensity={0.5} />
          
          {/* A floating object representing the project inside the portal */}
          <mesh ref={meshRef}>
            <torusKnotGeometry args={[0.5, 0.15, 100, 16]} />
            <meshStandardMaterial color="white" roughness={0.1} metalness={0.8} />
          </mesh>
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}
