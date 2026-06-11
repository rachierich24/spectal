"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Node {
  pos: THREE.Vector3;
  targetPos: THREE.Vector3;
  velocity: THREE.Vector3;
  color: THREE.Color;
}

export default function NeuralPlexus() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const nodeCount = 120;
  const connectionDistance = 1.4;

  // Initialize node positions, velocities, and colors
  const { nodes, initialPositions } = useMemo(() => {
    const tempNodes: Node[] = [];
    const initialPos = new Float32Array(nodeCount * 3);

    const colors = [
      new THREE.Color("#C9493D"), // Spectal Red
      new THREE.Color("#DDECC4"), // Spectal Mint
      new THREE.Color("#E8A598"), // Blended Rose Gold
    ];

    for (let i = 0; i < nodeCount; i++) {
      // Spread across a 3D box region in camera view
      const x = (Math.random() - 0.5) * 12;
      const y = (Math.random() - 0.5) * 8;
      const z = (Math.random() - 0.5) * 4 - 1; // slightly back from camera

      const pos = new THREE.Vector3(x, y, z);
      
      // Random drift velocity
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.005,
        (Math.random() - 0.5) * 0.003
      );

      // Random color selection
      const color = colors[Math.floor(Math.random() * colors.length)].clone();

      tempNodes.push({
        pos: pos.clone(),
        targetPos: pos.clone(),
        velocity,
        color,
      });

      initialPos[i * 3] = x;
      initialPos[i * 3 + 1] = y;
      initialPos[i * 3 + 2] = z;
    }

    return { nodes: tempNodes, initialPositions: initialPos };
  }, []);

  // Set up node geometries and materials
  const pointColors = useMemo(() => {
    const colors = new Float32Array(nodeCount * 3);
    nodes.forEach((node, i) => {
      colors[i * 3] = node.color.r;
      colors[i * 3 + 1] = node.color.g;
      colors[i * 3 + 2] = node.color.b;
    });
    return colors;
  }, [nodes]);

  // Pre-allocate buffer arrays for lines
  // Max possible line count is (N * (N-1)) / 2, but we cap it for performance
  const maxLines = 400;
  const linePositions = useMemo(() => new Float32Array(maxLines * 2 * 3), []);
  const lineColors = useMemo(() => new Float32Array(maxLines * 2 * 3), []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const pointsGeometry = pointsRef.current?.geometry;
    const linesGeometry = linesRef.current?.geometry;

    if (!pointsGeometry || !linesGeometry) return;

    const positions = pointsGeometry.attributes.position.array as Float32Array;

    // Pointer position in viewport space (scaled)
    const pointerX = state.pointer.x * 6;
    const pointerY = state.pointer.y * 4;
    const pointerPos = new THREE.Vector3(pointerX, pointerY, 0);

    // 1. Update node positions
    nodes.forEach((node, i) => {
      // Apply constant drift
      node.targetPos.add(node.velocity);

      // Boundaries wrapping
      if (Math.abs(node.targetPos.x) > 7) node.targetPos.x = -node.targetPos.x;
      if (Math.abs(node.targetPos.y) > 5) node.targetPos.y = -node.targetPos.y;
      if (node.targetPos.z > 1 || node.targetPos.z < -5) node.velocity.z *= -1;

      // Mouse repulsion: nodes push away from mouse cursor
      const distToPointer = node.targetPos.distanceTo(pointerPos);
      if (distToPointer < 2.5) {
        const repulsionStrength = (2.5 - distToPointer) * 0.12;
        const forceDirection = new THREE.Vector3()
          .subVectors(node.targetPos, pointerPos)
          .normalize();
        
        // Push target position away
        node.pos.lerp(
          new THREE.Vector3().addVectors(node.targetPos, forceDirection.multiplyScalar(repulsionStrength * 4)),
          0.08
        );
      } else {
        // Return to normal drift position
        node.pos.lerp(node.targetPos, 0.08);
      }

      // Add small wave turbulence
      const waveX = Math.sin(time * 0.5 + node.targetPos.y * 0.5) * 0.002;
      const waveY = Math.cos(time * 0.5 + node.targetPos.x * 0.5) * 0.002;
      node.pos.x += waveX;
      node.pos.y += waveY;

      // Update positions buffer array
      positions[i * 3] = node.pos.x;
      positions[i * 3 + 1] = node.pos.y;
      positions[i * 3 + 2] = node.pos.z;
    });

    pointsGeometry.attributes.position.needsUpdate = true;

    // 2. Compute connections (lines)
    let lineIdx = 0;
    
    // Clear line positions buffer
    linePositions.fill(0);
    lineColors.fill(0);

    for (let i = 0; i < nodeCount; i++) {
      const nodeA = nodes[i];
      for (let j = i + 1; j < nodeCount; j++) {
        if (lineIdx >= maxLines) break;

        const nodeB = nodes[j];
        const dist = nodeA.pos.distanceTo(nodeB.pos);

        if (dist < connectionDistance) {
          // Fade connection color based on distance
          const opacity = 1 - dist / connectionDistance;

          // Vertex A
          linePositions[lineIdx * 6] = nodeA.pos.x;
          linePositions[lineIdx * 6 + 1] = nodeA.pos.y;
          linePositions[lineIdx * 6 + 2] = nodeA.pos.z;

          lineColors[lineIdx * 6] = nodeA.color.r * opacity * 0.35;
          lineColors[lineIdx * 6 + 1] = nodeA.color.g * opacity * 0.35;
          lineColors[lineIdx * 6 + 2] = nodeA.color.b * opacity * 0.35;

          // Vertex B
          linePositions[lineIdx * 6 + 3] = nodeB.pos.x;
          linePositions[lineIdx * 6 + 4] = nodeB.pos.y;
          linePositions[lineIdx * 6 + 5] = nodeB.pos.z;

          lineColors[lineIdx * 6 + 3] = nodeB.color.r * opacity * 0.35;
          lineColors[lineIdx * 6 + 4] = nodeB.color.g * opacity * 0.35;
          lineColors[lineIdx * 6 + 5] = nodeB.color.b * opacity * 0.35;

          lineIdx++;
        }
      }
    }

    linesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.attributes.color.needsUpdate = true;
  });

  return (
    <group>
      {/* Neural Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          blending={THREE.AdditiveBlending}
          linewidth={1}
          depthWrite={false}
        />
      </lineSegments>

      {/* Neural Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[pointColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.07}
          vertexColors={true}
          transparent={true}
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
