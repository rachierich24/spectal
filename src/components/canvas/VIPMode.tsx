"use client";

import { useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function VIPMode() {
  const { scene } = useThree();
  const [isVip, setIsVip] = useState(false);

  useEffect(() => {
    let keys = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      keys += e.key.toLowerCase();
      if (keys.length > 3) {
        keys = keys.substring(keys.length - 3);
      }
      if (keys === "vip") {
        setIsVip((prev) => !prev);
      }
    };

    const handleToggleVip = () => {
      setIsVip((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("toggle-vip", handleToggleVip);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("toggle-vip", handleToggleVip);
    };
  }, []);

  useEffect(() => {
    // Dispatch event to notify Header about the VIP state change
    window.dispatchEvent(new CustomEvent("vip-changed", { detail: isVip }));
  }, [isVip]);

  useEffect(() => {
    // Traverse the scene and set wireframe to true on all materials
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const material = (child as THREE.Mesh).material;
        if (material) {
          // If it's an array of materials
          if (Array.isArray(material)) {
            material.forEach((mat) => {
              if ("wireframe" in mat) {
                mat.wireframe = isVip;
                mat.needsUpdate = true;
              }
            });
          } else {
            // Single material
            if ("wireframe" in material) {
              (material as any).wireframe = isVip;
              material.needsUpdate = true;
            }
          }
        }
      }
    });
  }, [isVip, scene]);

  return null;
}
