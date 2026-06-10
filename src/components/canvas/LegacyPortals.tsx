"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshPortalMaterial, Environment, Text } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

const TEAM = [
  {
    position: [-3, 0, 0] as [number, number, number],
    rotation: [0, Math.PI / 6, 0] as [number, number, number],
    title: "RACHIT VIJ",
    subtitle: "FOUNDER",
    color: "#C9493D",           // Spectal Red
    geometry: "torusKnot",
  },
  {
    position: [0, 0, 1] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    title: "SHRIYANSH SHARMA",
    subtitle: "CO-FOUNDER",
    color: "#DDECC4",           // Spectal Mint
    geometry: "octahedron",
  },
  {
    position: [3, 0, 0] as [number, number, number],
    rotation: [0, -Math.PI / 6, 0] as [number, number, number],
    title: "ARYAN SETH",
    subtitle: "CREATIVE DIR.",
    color: "#1a1a2e",           // Deep indigo
    geometry: "icosahedron",
  },
];

export default function LegacyPortals() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const scrollProgress = scrollStore.progress;

    if (groupRef.current) {
      const isVisible = scrollProgress > 4.5 && scrollProgress < 7.0;
      groupRef.current.visible = isVisible;

      if (!isVisible) return;

      const targetY = (5.7 - scrollProgress) * 15;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.1
      );
      groupRef.current.position.z = -5;
    }
  });

  return (
    <group ref={groupRef}>
      {TEAM.map((member) => (
        <PortalItem key={member.title} {...member} />
      ))}
    </group>
  );
}

interface PortalItemProps {
  position: [number, number, number];
  rotation: [number, number, number];
  title: string;
  subtitle: string;
  color: string;
  geometry: string;
}

function PortalItem({
  position,
  rotation,
  title,
  subtitle,
  color,
  geometry,
}: PortalItemProps) {
  const portalRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state, delta) => {
    const scrollProgress = scrollStore.progress;
    if (scrollProgress < 4.5 || scrollProgress > 7.0) return;

    if (portalRef.current) {
      const targetBlend = hovered ? 1 : 0;
      portalRef.current.blend = THREE.MathUtils.lerp(
        portalRef.current.blend,
        targetBlend,
        0.1
      );
    }

    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Role title below card */}
      <Text
        fontSize={0.22}
        position={[0, -2.15, 0]}
        anchorY="top"
        color="white"
        font={undefined}
        letterSpacing={0.12}
      >
        {title}
      </Text>
      <Text
        fontSize={0.14}
        position={[0, -2.55, 0]}
        anchorY="top"
        color={color === "#DDECC4" ? "#DDECC4" : "#C9493D"}
        letterSpacing={0.2}
      >
        {subtitle}
      </Text>

      <mesh
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <planeGeometry args={[2.5, 3.5]} />
        <MeshPortalMaterial ref={portalRef} blend={0} blur={0} resolution={512}>
          <color attach="background" args={[color]} />
          <Environment preset="city" />
          <ambientLight intensity={0.6} />
          <pointLight position={[2, 2, 2]} intensity={1.5} />

          {/* Unique 3D shape per person */}
          <mesh ref={meshRef}>
            {geometry === "torusKnot" && (
              <torusKnotGeometry args={[0.5, 0.15, 120, 16]} />
            )}
            {geometry === "octahedron" && (
              <octahedronGeometry args={[0.7, 0]} />
            )}
            {geometry === "icosahedron" && (
              <icosahedronGeometry args={[0.7, 1]} />
            )}
            <meshStandardMaterial
              color="white"
              roughness={0.05}
              metalness={0.9}
            />
          </mesh>
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}
