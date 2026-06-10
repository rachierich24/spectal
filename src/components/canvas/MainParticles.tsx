"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/lib/experienceStore";
import { gsap } from "gsap";

const particleVertexShader = `
  uniform float uTime;
  uniform float uEnergy;
  uniform vec2 uPointer;
  uniform float uWeightStar;
  uniform float uWeightOrbit;
  uniform float uWeightStage;
  uniform float uWeightCrowd;
  uniform float uWeightLights;
  uniform float uWeightBooth;
  uniform float uWeightExplode;
  uniform float uExplodeFactor;

  attribute vec3 positionStar;
  attribute vec3 positionOrbit;
  attribute vec3 positionStage;
  attribute vec3 positionCrowd;
  attribute vec3 positionLights;
  attribute vec3 positionBooth;
  attribute vec3 explosionDirection;
  attribute vec3 particleColor;

  varying vec3 vColor;
  varying float vAlpha;

  // Simple noise function
  float hash(vec3 p) {
    p = fract(p * 0.3183099 + .1);
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  void main() {
    vColor = particleColor;
    
    // Blend target positions based on weights
    vec3 blendedPos = positionStar * uWeightStar +
                      positionOrbit * uWeightOrbit +
                      positionStage * uWeightStage +
                      positionCrowd * uWeightCrowd +
                      positionLights * uWeightLights +
                      positionBooth * uWeightBooth;

    // Add subtle ambient floating noise
    float noise = hash(blendedPos + vec3(uTime * 0.05));
    blendedPos.x += sin(uTime * 0.2 + blendedPos.y) * 0.08;
    blendedPos.y += cos(uTime * 0.15 + blendedPos.x) * 0.08;
    blendedPos.z += sin(uTime * 0.3 + blendedPos.x * 0.5) * 0.08;

    // Interactive pointer attraction/repulsion based on state and energy
    float dist = distance(blendedPos.xy, uPointer * 6.0);
    float attraction = smoothstep(3.0, 0.0, dist);
    
    // Pull particles towards pointer coordinates
    if (uWeightExplode < 0.1) {
      blendedPos.xy += (uPointer * 6.0 - blendedPos.xy) * attraction * uEnergy * 0.35;
      blendedPos.z += sin(uTime * 5.0 + blendedPos.x * 10.0) * attraction * uEnergy * 0.2;
    }

    // Explosion offset
    vec3 finalPos = blendedPos + (explosionDirection * uWeightExplode * uExplodeFactor * 18.0);

    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Calculate size with distance attenuation
    float sizeBase = 3.5;
    if (uWeightExplode > 0.01) {
      // Scale down during explosion blowout
      sizeBase *= (1.0 - smoothstep(0.3, 1.0, uWeightExplode));
    }
    
    // Add extra size during user energy charging
    gl_PointSize = (sizeBase + attraction * uEnergy * 4.0) * (15.0 / -mvPosition.z);
    
    // Soft fade out at margins
    vAlpha = smoothstep(-15.0, -1.0, mvPosition.z);
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Draw soft circle particle
    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
    float r = dot(cxy, cxy);
    if (r > 1.0) discard;

    float alpha = (1.0 - r) * vAlpha * 0.85;
    gl_FragColor = vec4(vColor, alpha);
  }
`;

export default function MainParticles() {
  const { state, energy, setState } = useExperience();
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { camera } = useThree();

  const [geometryData, setGeometryData] = useState<{
    positions: Float32Array;
    star: Float32Array;
    orbit: Float32Array;
    stage: Float32Array;
    crowd: Float32Array;
    lights: Float32Array;
    booth: Float32Array;
    directions: Float32Array;
    colors: Float32Array;
    count: number;
  } | null>(null);

  const particleCount = 14000;

  // Load the logo and parse coordinates
  useEffect(() => {
    const img = new Image();
    img.src = "/spectallogo.jpg";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const size = 120;
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);

      const imgData = ctx.getImageData(0, 0, size, size).data;
      const starPixels: [number, number][] = [];

      const scale = 0.055;

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const i = (y * size + x) * 4;
          const r = imgData[i] / 255;
          const g = imgData[i + 1] / 255;
          const b = imgData[i + 2] / 255;

          // JPEG red background exclusion (identifies the mint green star)
          if (g > r - 0.2) {
            const posX = (x - size / 2) * scale;
            const posY = -(y - size / 2) * scale;
            starPixels.push([posX, posY]);
          }
        }
      }

      // 1. Core Arrays initialization
      const positions = new Float32Array(particleCount * 3);
      const star = new Float32Array(particleCount * 3);
      const orbit = new Float32Array(particleCount * 3);
      const stage = new Float32Array(particleCount * 3);
      const crowd = new Float32Array(particleCount * 3);
      const lights = new Float32Array(particleCount * 3);
      const booth = new Float32Array(particleCount * 3);
      const directions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);

      const colorRed = new THREE.Color("#E0433A");
      const colorMint = new THREE.Color("#DDECC4");

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;

        // --- Brand Colors (Red and Mint streams) ---
        const colorMix = Math.random();
        let col = colorMint;
        if (colorMix < 0.35) {
          col = colorRed;
        } else if (colorMix < 0.45) {
          // Blended intermediate shade
          col = new THREE.Color().lerpColors(colorRed, colorMint, Math.random() * 0.5);
        }
        colors[i3] = col.r;
        colors[i3 + 1] = col.g;
        colors[i3 + 2] = col.b;

        // --- Shape 1: Logo Star ---
        if (starPixels.length > 0) {
          const pixel = starPixels[i % starPixels.length];
          // Add small Z depth noise
          const zDepth = (Math.random() - 0.5) * 0.2;
          star[i3] = pixel[0];
          star[i3 + 1] = pixel[1];
          star[i3 + 2] = zDepth;
        } else {
          // Fallback star coordinates (ring shape)
          const angle = Math.random() * Math.PI * 2;
          star[i3] = Math.cos(angle) * 1.5;
          star[i3 + 1] = Math.sin(angle) * 1.5;
          star[i3 + 2] = (Math.random() - 0.5) * 0.1;
        }

        // --- Shape 2: Orbit Shell / Vortex ---
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const r = 1.5 + Math.random() * 1.8;
        orbit[i3] = r * Math.sin(phi) * Math.cos(theta);
        orbit[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        orbit[i3 + 2] = r * Math.cos(phi);

        // --- Shape 3: Concert Stage ---
        const randPart = Math.random();
        if (randPart < 0.3) {
          // Stage floor deck
          stage[i3] = (Math.random() - 0.5) * 6.0;
          stage[i3 + 1] = -1.8;
          stage[i3 + 2] = (Math.random() - 0.5) * 3.0 - 1.0;
        } else if (randPart < 0.7) {
          // Proscenium stage backdrop grid
          stage[i3] = (Math.random() - 0.5) * 5.0;
          stage[i3 + 1] = (Math.random() - 0.5) * 3.0 + 0.2;
          stage[i3 + 2] = -2.5;
        } else {
          // Stage towers (left / right side scaffolding arches)
          const side = Math.random() > 0.5 ? 1 : -1;
          stage[i3] = side * 2.8;
          stage[i3 + 1] = (Math.random() - 0.5) * 3.5 + 0.2;
          stage[i3 + 2] = (Math.random() - 0.5) * 1.0 - 1.0;
        }

        // --- Shape 4: Audience Crowd ---
        crowd[i3] = (Math.random() - 0.5) * 8.0;
        crowd[i3 + 1] = -2.2 + 0.25 * Math.sin(crowd[i3] * 1.5) + (Math.random() - 0.5) * 0.25;
        crowd[i3 + 2] = Math.random() * 3.5 + 0.5; // Stretches forward in Z space

        // --- Shape 5: Festival Volumetric Lights ---
        const lightEmitter = i % 5;
        const emitterX = -2.4 + lightEmitter * 1.2;
        const tLight = Math.random();
        // Fan out towards top
        const beamTopX = emitterX * 1.6 + (Math.random() - 0.5) * 0.5;
        const beamTopY = 3.5;
        const beamTopZ = -3.0 + (Math.random() - 0.5) * 0.5;

        const lx = THREE.MathUtils.lerp(emitterX, beamTopX, tLight);
        const ly = THREE.MathUtils.lerp(-2.0, beamTopY, tLight);
        const lz = THREE.MathUtils.lerp(-1.5, beamTopZ, tLight);

        // Volumetric ray cone thickness
        const coneRadius = 0.08 + tLight * 0.5;
        const cAngle = Math.random() * Math.PI * 2;
        lights[i3] = lx + Math.cos(cAngle) * coneRadius;
        lights[i3 + 1] = ly;
        lights[i3 + 2] = lz + Math.sin(cAngle) * coneRadius;

        // --- Shape 6: Brand Activation Booth (Concentric Cubes/Rings) ---
        const boothPart = Math.random();
        if (boothPart < 0.5) {
          // Horizontal Ring
          const bAngle = Math.random() * Math.PI * 2;
          const bRadius = 1.8;
          booth[i3] = Math.cos(bAngle) * bRadius;
          booth[i3 + 1] = (Math.random() - 0.5) * 0.1;
          booth[i3 + 2] = Math.sin(bAngle) * bRadius;
        } else {
          // Vertical Ring
          const bAngle = Math.random() * Math.PI * 2;
          const bRadius = 1.8;
          booth[i3] = 0;
          booth[i3 + 1] = Math.cos(bAngle) * bRadius;
          booth[i3 + 2] = Math.sin(bAngle) * bRadius;
        }

        // --- Explosion Direction Vectors ---
        const eTheta = Math.random() * Math.PI * 2;
        const ePhi = Math.acos(Math.random() * 2 - 1);
        // Add random velocity speed multiplier
        const speed = 0.5 + Math.random() * 0.8;
        directions[i3] = Math.sin(ePhi) * Math.cos(eTheta) * speed;
        directions[i3 + 1] = Math.sin(ePhi) * Math.sin(eTheta) * speed;
        directions[i3 + 2] = Math.cos(ePhi) * speed;

        // Default initial coordinates matching Star + small noise
        positions[i3] = star[i3] + (Math.random() - 0.5) * 0.1;
        positions[i3 + 1] = star[i3 + 1] + (Math.random() - 0.5) * 0.1;
        positions[i3 + 2] = star[i3 + 2] + (Math.random() - 0.5) * 0.1;
      }

      setGeometryData({
        positions,
        star,
        orbit,
        stage,
        crowd,
        lights,
        booth,
        directions,
        colors,
        count: particleCount,
      });

      // Transition out of Loading state once assets are initialized
      setState("INTRO");
    };

    img.onerror = () => {
      console.error("Critical error: /spectallogo.jpg failed to load.");
      setState("INTRO"); // Fallback trigger
    };
  }, []);

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uEnergy: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uWeightStar: { value: 0 },
      uWeightOrbit: { value: 0 },
      uWeightStage: { value: 0 },
      uWeightCrowd: { value: 0 },
      uWeightLights: { value: 0 },
      uWeightBooth: { value: 0 },
      uWeightExplode: { value: 0 },
      uExplodeFactor: { value: 1.0 },
    };
  }, []);

  // Track state changes to execute animation sequences
  const lastState = useRef(state);
  const activeTimeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!geometryData) return;
    const material = materialRef.current;
    if (!material) return;

    if (activeTimeline.current) {
      activeTimeline.current.kill();
    }

    const tl = gsap.timeline();
    activeTimeline.current = tl;

    if (state === "INTRO") {
      // pulsing star: Star is dominating, Orbit is quiet
      tl.to(material.uniforms.uWeightStar, { value: 1.0, duration: 1.5, ease: "power2.out" })
        .to(material.uniforms.uWeightOrbit, { value: 0.15, duration: 1.5, ease: "power2.out" }, "<")
        .to(material.uniforms.uWeightStage, { value: 0.0, duration: 0.8 })
        .to(material.uniforms.uWeightCrowd, { value: 0.0, duration: 0.8 }, "<")
        .to(material.uniforms.uWeightLights, { value: 0.0, duration: 0.8 }, "<")
        .to(material.uniforms.uWeightBooth, { value: 0.0, duration: 0.8 }, "<")
        .to(material.uniforms.uWeightExplode, { value: 0.0, duration: 0.5 }, "<");
        
      // Slowly animate camera to default position
      gsap.to(camera.position, { x: 0, y: 0, z: 5.5, duration: 2.0, ease: "power2.out" });
    } 
    else if (state === "REVEALED") {
      // Set star weight to 1.0 immediately, then dissolve it into orbit surrounding the sculpture
      material.uniforms.uWeightStar.value = 1.0;
      material.uniforms.uWeightOrbit.value = 0.0;
      material.uniforms.uWeightExplode.value = 0.0;
      
      tl.to(material.uniforms.uWeightStar, { value: 0.0, duration: 2.2, ease: "power2.inOut" })
        .to(material.uniforms.uWeightOrbit, { value: 0.8, duration: 2.2, ease: "power2.out" }, "<")
        .to(camera.position, { x: 0, y: 0, z: 8.5, duration: 2.2, ease: "power2.out" }, "<");
    }

    lastState.current = state;
  }, [state, geometryData, camera]);

  // Handle recurring shape morphing loop in completed state
  useEffect(() => {
    if (state !== "REVEALED" || !geometryData) return;

    let morphTimeout: NodeJS.Timeout;
    const shapes: ("stage" | "crowd" | "lights" | "booth")[] = ["stage", "crowd", "lights", "booth"];
    let shapeIndex = 0;

    const performMorph = () => {
      const material = materialRef.current;
      if (!material) return;

      const targetShape = shapes[shapeIndex];
      shapeIndex = (shapeIndex + 1) % shapes.length;

      const targetUniforms: any = {
        stage: material.uniforms.uWeightStage,
        crowd: material.uniforms.uWeightCrowd,
        lights: material.uniforms.uWeightLights,
        booth: material.uniforms.uWeightBooth,
      };

      const activeUniform = targetUniforms[targetShape];

      const morphTimeline = gsap.timeline();
      
      // Morph into the chosen shape
      morphTimeline.to(material.uniforms.uWeightOrbit, { value: 0.15, duration: 2.5, ease: "power2.inOut" })
        .to(activeUniform, { value: 0.85, duration: 2.5, ease: "power2.inOut" }, "<")
        // Hold shape for 1.8 seconds
        .delay(2.2)
        // Morph back to loose float orbit
        .to(material.uniforms.uWeightOrbit, { value: 0.8, duration: 2.5, ease: "power2.inOut" })
        .to(activeUniform, { value: 0.0, duration: 2.5, ease: "power2.inOut" }, "<");

      // Loop after 12 seconds
      morphTimeout = setTimeout(performMorph, 13000);
    };

    // Delay the first morph cycle after the initial reveal completes
    morphTimeout = setTimeout(performMorph, 8000);

    return () => {
      clearTimeout(morphTimeout);
    };
  }, [state, geometryData]);

  // Frame animation loops
  useFrame((stateContext) => {
    const t = stateContext.clock.elapsedTime;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uPointer.value.lerp(stateContext.pointer, 0.1);
      materialRef.current.uniforms.uEnergy.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uEnergy.value,
        energy,
        0.08
      );
    }

    if (pointsRef.current) {
      if (state === "INTRO" || state === "INTERACTIVE") {
        // Slow breathing rotation
        pointsRef.current.rotation.y = t * 0.06;
        pointsRef.current.rotation.x = Math.sin(t * 0.25) * 0.04;
        
        // pulsing logo scale effect
        const pulse = 1.0 + Math.sin(t * (state === "INTERACTIVE" ? 4.5 : 2.5)) * 0.04;
        pointsRef.current.scale.set(pulse, pulse, pulse);
      } 
      else if (state === "BUILDUP") {
        // Spin fast
        pointsRef.current.rotation.y += 0.08 + energy * 0.05;
        pointsRef.current.rotation.x += 0.03;
      } 
      else if (state === "REVEALED") {
        // Very slow ambient drift
        pointsRef.current.rotation.y = t * 0.02;
        pointsRef.current.rotation.x = Math.sin(t * 0.1) * 0.02;
        pointsRef.current.scale.set(1, 1, 1);
      }
    }
  });

  if (!geometryData) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[geometryData.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-positionStar"
          args={[geometryData.star, 3]}
        />
        <bufferAttribute
          attach="attributes-positionOrbit"
          args={[geometryData.orbit, 3]}
        />
        <bufferAttribute
          attach="attributes-positionStage"
          args={[geometryData.stage, 3]}
        />
        <bufferAttribute
          attach="attributes-positionCrowd"
          args={[geometryData.crowd, 3]}
        />
        <bufferAttribute
          attach="attributes-positionLights"
          args={[geometryData.lights, 3]}
        />
        <bufferAttribute
          attach="attributes-positionBooth"
          args={[geometryData.booth, 3]}
        />
        <bufferAttribute
          attach="attributes-explosionDirection"
          args={[geometryData.directions, 3]}
        />
        <bufferAttribute
          attach="attributes-particleColor"
          args={[geometryData.colors, 3]}
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
