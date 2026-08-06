"use client";

import { ReactLenis } from 'lenis/react';
import { ReactNode, useRef } from 'react';
import { useAnimationFrame } from 'framer-motion';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<any>(null);

  // Sync Lenis scroll with Framer Motion's internal requestAnimationFrame loop
  useAnimationFrame((time) => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.raf(time);
    }
  });

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false} options={{ lerp: 0.07, wheelMultiplier: 1, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
