"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

const waveVertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uScrollProgress;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    
    // Base position
    vec3 currentPos = position;
    
    // Wave calculations
    // Create a circular wave radiating from the pointer
    vec2 pointerPos = uPointer * 10.0; // Scale pointer mapped to plane size roughly
    float dist = distance(currentPos.xy, pointerPos);
    
    // The "Energy" wave - a damped sine wave based on distance and time
    float wave = sin(dist * 2.0 - uTime * 5.0) * exp(-dist * 0.2);
    
    // Add extra noise based on pointer speed (simulated by having it pulse)
    float pulse = sin(uTime * 10.0) * 0.5 + 0.5;
    
    currentPos.z += wave * 2.0 + (pulse * exp(-dist * 0.5));
    
    vElevation = currentPos.z;
    
    // Global scroll visibility logic (Shifted by +1.0)
    float visibility = smoothstep(1.5, 2.0, uScrollProgress) * (1.0 - smoothstep(3.0, 3.8, uScrollProgress));
    
    // Move the plane up into view based on scroll
    currentPos.y += (1.0 - visibility) * -20.0;
    // Rotate it to be a floor/wall depending on scroll
    
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const waveFragmentShader = `
  uniform float uScrollProgress;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    // Visibility fade (Shifted by +1.0)
    float visibility = smoothstep(1.5, 2.0, uScrollProgress) * (1.0 - smoothstep(3.0, 3.8, uScrollProgress));
    
    vec3 colorCharcoal = vec3(0.043, 0.043, 0.043);
    vec3 colorMint = vec3(0.866, 0.925, 0.768);
    vec3 colorRed = vec3(0.788, 0.286, 0.239);
    
    // Map elevation to color
    // Low elevation = charcoal, Mid = Mint, High = Red
    vec3 color = mix(colorCharcoal, colorMint, smoothstep(0.0, 0.5, vElevation));
    color = mix(color, colorRed, smoothstep(0.5, 2.0, vElevation));
    
    // Wireframe grid lines effect
    // We can simulate wireframe with fract(vUv * gridScale)
    vec2 grid = fract(vUv * 50.0);
    float lineThickness = 0.05;
    float isLine = step(grid.x, lineThickness) + step(grid.y, lineThickness);
    
    // Base color for lines, transparent for gaps
    float alpha = clamp(isLine, 0.0, 1.0) * visibility;
    
    gl_FragColor = vec4(color, alpha);
  }
`;

import { useExperience } from "@/lib/experienceStore";
import EnergyProjects from "./EnergyProjects";

export default function EnergyWaves() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { energy } = useExperience();
  const timeAccumulator = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uScrollProgress: { value: 0 },
    }),
    []
  );

  useFrame((state, delta) => {
    const scrollProgress = scrollStore.progress;

    if (meshRef.current) {
      const isVisible = scrollProgress > 1.5 && scrollProgress < 4.2;
      meshRef.current.visible = isVisible;
      
      if (!isVisible) return;
      
      // Tilt the plane to look like a perspective grid floor
      meshRef.current.rotation.x = -Math.PI / 3;
      // Pan it slowly
      meshRef.current.position.y = -2;
      meshRef.current.position.z = -5;
    }

    if (materialRef.current) {
      // Speed up grid wave animation dynamically when energy is surged (e.g. hovering service list)
      timeAccumulator.current += delta * (1.0 + energy * 3.5);
      materialRef.current.uniforms.uTime.value = timeAccumulator.current;
      materialRef.current.uniforms.uPointer.value.lerp(state.pointer, 0.1);
      materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        {/* Optimized segment count from 128 to 64 for performance */}
        <planeGeometry args={[30, 30, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={waveVertexShader}
          fragmentShader={waveFragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Floating project images popping out from the energy wave */}
      <EnergyProjects />
    </group>
  );
}
