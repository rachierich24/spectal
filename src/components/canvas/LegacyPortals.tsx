"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshPortalMaterial, Text, Environment } from "@react-three/drei";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

const TEAM = [
  {
    position: [-3, 0, 0] as [number, number, number],
    rotation: [0, Math.PI / 6, 0] as [number, number, number],
    title: "HIMANSHU CHOWDHRY",
    subtitle: "FOUNDER",
    color: "#C9493D",           // Spectal Red
    geometry: "torusKnot",
    about: "Founder of Spectal Management. Built India's leading boutique talent & event agency from New Delhi, working with 50+ artists across music and comedy.",
  },
  {
    position: [0, 0, 1] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    title: "SOURAV YADAV",
    subtitle: "LIVE EVENTS LEAD",
    color: "#DDECC4",           // Spectal Mint
    geometry: "octahedron",
    about: "Heads live event operations at Spectal. Manages end-to-end concert and campus festival production across 30+ cities.",
  },
  {
    position: [3, 0, 0] as [number, number, number],
    rotation: [0, -Math.PI / 6, 0] as [number, number, number],
    title: "SPECTAL TEAM",
    subtitle: "CREATIVE & OPS",
    color: "#1a1a2e",           // Deep indigo
    geometry: "icosahedron",
    about: "A tight-knit team of creators, producers, and strategists delivering 200+ events and 50+ brand experiences.",
  },
];

export default function LegacyPortals() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const scrollProgress = scrollStore.progress;

    if (groupRef.current) {
      const isVisible = scrollProgress > 4.5 && scrollProgress < 6.5;
      groupRef.current.visible = isVisible;

      if (!isVisible) return;

      const targetY = (5.5 - scrollProgress) * 15;
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
  about: string;
}

function PortalItem({
  position,
  rotation,
  title,
  subtitle,
  color,
  geometry,
  about,
}: PortalItemProps) {
  const portalRef = useRef<any>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const cardGroupRef = useRef<THREE.Group>(null);

  const [hovered, setHover] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useFrame((state, delta) => {
    const scrollProgress = scrollStore.progress;
    if (scrollProgress < 4.5 || scrollProgress > 6.5) return;

    if (portalRef.current) {
      const targetBlend = hovered || flipped ? 1 : 0;
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

    // Smoothly animate the card flip rotation
    if (cardGroupRef.current) {
      const targetRotationY = flipped ? Math.PI : 0;
      cardGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        cardGroupRef.current.rotation.y,
        targetRotationY,
        0.08
      );
    }
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Role title below card (does not flip) */}
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

      {/* Flippable Card Container */}
      <group ref={cardGroupRef}>

        {/* Invisible Hitbox for reliable clicking and hovering */}
        <mesh
          position={[0, 0, 0]}
          onClick={(e) => {
            e.stopPropagation();
            setFlipped(!flipped);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
            setHover(true);
          }}
          onPointerOut={(e) => {
            document.body.style.cursor = 'auto';
            setHover(false);
          }}
        >
          <boxGeometry args={[2.5, 3.5, 0.15]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>

        {/* Front Side: Mesh Portal */}
        <mesh position={[0, 0, 0.01]}>
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

        {/* Back Side: About Section */}
        <mesh position={[0, 0, -0.01]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2.5, 3.5]} />
          <meshBasicMaterial color="#0A0A0A" />

          <Text
            fontSize={0.25}
            position={[0, 1.2, 0]}
            color="white"
            anchorX="center"
            anchorY="top"
            letterSpacing={0.1}
          >
            ABOUT
          </Text>

          <Text
            fontSize={0.12}
            position={[0, 0.6, 0]}
            color="#A0A0A0"
            anchorX="center"
            anchorY="top"
            maxWidth={2.0}
            textAlign="center"
            lineHeight={1.5}
          >
            {about}
          </Text>

          <mesh position={[0, -0.8, 0]}>
            <planeGeometry args={[1.5, 0.02]} />
            <meshBasicMaterial color={color === "#DDECC4" ? "#DDECC4" : "#C9493D"} opacity={0.5} transparent />
          </mesh>
        </mesh>
      </group>
    </group>
  );
}
