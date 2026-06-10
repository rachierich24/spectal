"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particleVertexShader = `
  uniform float uTime;
  uniform float uMorphProgress;
  uniform float uScrollProgress; // global scroll for visibility
  
  attribute vec3 targetPosition1; // Festival/Stage Shape
  attribute vec3 targetPosition2; // Artist/Abstract Shape
  
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Determine base position by blending between initial position and targets based on uMorphProgress
    vec3 currentPos = mix(position, targetPosition1, smoothstep(0.0, 0.5, uMorphProgress));
    currentPos = mix(currentPos, targetPosition2, smoothstep(0.5, 1.0, uMorphProgress));
    
    // Add subtle floating motion
    currentPos.y += sin(uTime * 0.5 + currentPos.x) * 0.2;
    currentPos.x += cos(uTime * 0.3 + currentPos.y) * 0.1;

    // Visibility logic based on global scroll
    // Section 2 is roughly when scrollProgress is between 0.8 and 2.2 (normalized to window height)
    // We want to fade in as section 1 ends, stay visible, then fade out.
    float visibility = smoothstep(0.5, 1.0, uScrollProgress) * (1.0 - smoothstep(2.0, 2.5, uScrollProgress));
    
    // Calculate final position
    vec4 mvPosition = modelViewMatrix * vec4(currentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Size attenuation
    gl_PointSize = 4.0 * (10.0 / -mvPosition.z) * visibility;
    
    // Pass color based on position
    vColor = mix(vec3(0.788, 0.286, 0.239), vec3(0.866, 0.925, 0.768), (currentPos.y + 5.0) / 10.0);
    vAlpha = visibility;
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Draw a soft circle
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;
    
    float alpha = (1.0 - r) * vAlpha * 0.8;
    
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export default function AnticipationParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  // Reduced from 20000 to 5000 for massive performance boost
  const particleCount = 5000;
  
  const [positions, target1, target2] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const t1 = new Float32Array(particleCount * 3);
    const t2 = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Initial: Random cloud (Anticipation)
      pos[i3] = (Math.random() - 0.5) * 20;
      pos[i3 + 1] = (Math.random() - 0.5) * 20;
      pos[i3 + 2] = (Math.random() - 0.5) * 20 - 10;
      
      // Target 1: A "Stage" / Plane structure
      t1[i3] = (Math.random() - 0.5) * 15;
      t1[i3 + 1] = (Math.random() - 0.5) * 2 - 5; // Flat near bottom
      t1[i3 + 2] = (Math.random() - 0.5) * 15 - 15;
      
      // Target 2: Abstract "Energy Sphere"
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 8 + Math.random() * 2;
      t2[i3] = r * Math.sin(phi) * Math.cos(theta);
      t2[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      t2[i3 + 2] = r * Math.cos(phi) - 10;
    }
    
    return [pos, t1, t2];
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorphProgress: { value: 0 },
      uScrollProgress: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollProgress = scrollY / windowHeight;

    if (pointsRef.current) {
      const isVisible = scrollProgress > 0.5 && scrollProgress < 2.5;
      pointsRef.current.visible = isVisible;
      
      if (!isVisible) return; // Skip all processing if invisible
      
      pointsRef.current.rotation.y = scrollProgress * 0.5;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
      
      // Morph happens between scroll 1 and 2
      let morph = 0;
      if (scrollProgress > 1.0 && scrollProgress <= 2.0) {
        morph = scrollProgress - 1.0; // 0 to 1
      } else if (scrollProgress > 2.0) {
        morph = 1.0;
      }
      materialRef.current.uniforms.uMorphProgress.value = morph;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-targetPosition1"
          count={particleCount}
          array={target1}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-targetPosition2"
          count={particleCount}
          array={target2}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
