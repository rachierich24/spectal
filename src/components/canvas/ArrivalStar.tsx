"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollStore } from "@/lib/scrollStore";

const particleVertexShader = `
  uniform float uTime;
  uniform float uScrollProgress;
  uniform vec2 uPointer;
  
  attribute vec3 originalPosition;
  attribute vec3 explosionDirection;
  attribute vec3 color;
  
  varying vec3 vColor;
  
  void main() {
    vColor = color;
    
    vec3 pos = originalPosition;
    
    // Interactive pointer repulsion (energy)
    float dist = distance(pos.xy, uPointer * 5.0);
    float repulsion = smoothstep(2.0, 0.0, dist);
    pos += explosionDirection * repulsion * 0.5;
    
    // Scroll-based explosion
    // As scroll goes from 0 to 1, particles explode outward based on their random explosion direction
    float explodeFactor = pow(uScrollProgress, 2.0) * 20.0;
    
    pos += explosionDirection * explodeFactor;
    
    // Add some turbulence
    pos.x += sin(uTime * 2.0 + originalPosition.y) * uScrollProgress;
    pos.y += cos(uTime * 2.0 + originalPosition.x) * uScrollProgress;
    
    // Swirling vortex effect around the Z-axis
    float angle = uScrollProgress * 2.0 + uTime * 0.05;
    float cosA = cos(angle);
    float sinA = sin(angle);
    vec2 rotated = vec2(
      pos.x * cosA - pos.y * sinA,
      pos.x * sinA + pos.y * cosA
    );
    pos.xy = mix(pos.xy, rotated, uScrollProgress);
    
    // Fly towards camera
    pos.z += uScrollProgress * 15.0;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    
    // Shimmering twinkle factor based on time
    float twinkle = 0.8 + 0.2 * sin(uTime * 5.0 + originalPosition.x * 100.0);
    
    // Particles get larger as they fly at you, then shrink
    gl_PointSize = (1.5 + repulsion * 2.0) * twinkle * (15.0 / -mvPosition.z);
    
    // Fade out size at extreme explosion
    gl_PointSize *= (1.0 - smoothstep(0.5, 1.0, uScrollProgress));
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  
  void main() {
    // Make particles circular and soft without using discard
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    float mask = smoothstep(1.0, 0.8, r);
    
    gl_FragColor = vec4(vColor, mask * 0.9);
  }
`;

export default function ArrivalStar() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const [geometryData, setGeometryData] = useState<{
    positions: Float32Array;
    colors: Float32Array;
    directions: Float32Array;
    count: number;
  } | null>(null);

  // Load the image and convert to particles
  useEffect(() => {
    const img = new Image();
    // Updated to the user's actual filename
    img.src = '/spectallogo.jpg';

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const size = 150;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);

      const imgData = ctx.getImageData(0, 0, size, size).data;

      const positions = [];
      const colors = [];
      const directions = [];

      const scale = 0.05;

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const i = (y * size + x) * 4;
          const r = imgData[i] / 255;
          const g = imgData[i + 1] / 255;
          const b = imgData[i + 2] / 255;

          // The logo is a JPEG with a solid red background.
          // Spectal Red is roughly R: 0.78, G: 0.28, B: 0.23
          // Spectal Mint is roughly R: 0.86, G: 0.92, B: 0.76
          // We filter out the red background by checking if Green is reasonably high compared to Red.
          // This isolates the mint green geometric pieces perfectly!
          if (g > r - 0.2) {
            const posX = (x - size / 2) * scale;
            const posY = -(y - size / 2) * scale;
            const posZ = (Math.random() - 0.5) * 0.5;

            positions.push(posX, posY, posZ);
            colors.push(r, g, b);

            const dirX = posX * 2.0 + (Math.random() - 0.5);
            const dirY = posY * 2.0 + (Math.random() - 0.5);
            const dirZ = (Math.random() - 0.5) * 5.0;
            directions.push(dirX, dirY, dirZ);
          }
        }
      }

      setGeometryData({
        positions: new Float32Array(positions),
        colors: new Float32Array(colors),
        directions: new Float32Array(directions),
        count: positions.length / 3
      });
    };

    // Fallback if image fails to load (dev environment without logo.png)
    img.onerror = () => {
      console.warn("logo.png not found in public folder. Please add it!");
    };
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uScrollProgress: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    const scrollProgress = Math.min(scrollStore.progress, 1.0);

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uPointer.value.lerp(state.pointer, 0.1);
      materialRef.current.uniforms.uScrollProgress.value = scrollProgress;
    }

    if (pointsRef.current) {
      // Visibility culling
      const isVisible = scrollProgress < 1.5;
      pointsRef.current.visible = isVisible;

      if (!isVisible) return;

      // Slow rotation before explosion
      pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      pointsRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  if (!geometryData) return null; // Wait for image to process

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[geometryData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-originalPosition"
          args={[geometryData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[geometryData.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-explosionDirection"
          args={[geometryData.directions, 3]}
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
