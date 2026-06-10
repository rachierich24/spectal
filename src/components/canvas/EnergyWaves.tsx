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
    
    // Global scroll visibility logic (Section 3 is roughly scroll 2 to 3)
    // We want the grid to fly up from below, be active, then fade/move down
    float visibility = smoothstep(1.5, 2.0, uScrollProgress) * (1.0 - smoothstep(3.0, 3.5, uScrollProgress));
    
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
    // Visibility fade
    float visibility = smoothstep(1.5, 2.0, uScrollProgress) * (1.0 - smoothstep(3.0, 3.5, uScrollProgress));
    
    // If not visible, discard to save performance
    if (visibility <= 0.01) discard;

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

export default function EnergyWaves() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uScrollProgress: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    const scrollProgress = scrollStore.progress;

    if (meshRef.current) {
      const isVisible = scrollProgress > 1.0 && scrollProgress < 4.0;
      meshRef.current.visible = isVisible;
      
      if (!isVisible) return;
      
      // Tilt the plane to look like a perspective grid floor
      meshRef.current.rotation.x = -Math.PI / 3;
      // Pan it slowly
      meshRef.current.position.y = -2;
      meshRef.current.position.z = -5;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uPointer.value.lerp(state.pointer, 0.1);
      materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
    }
  });

  return (
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
  );
}
