"use client";

import { useEffect, useRef } from "react";

export default function AudioEngine() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const isPlaying = useRef(false);

  useEffect(() => {
    // Initialize Web Audio API on first user interaction to bypass browser autoplay blocks
    const initAudio = () => {
      if (isPlaying.current) return;
      
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      // Create a deep hum oscillator
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 55; // Low bass hum (approx A1)

      const gain = ctx.createGain();
      gain.gain.value = 0; // Start silent

      // Filter to muffle it slightly for that "backstage" feel
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 400;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      
      // Fade in smoothly
      gain.gain.setTargetAtTime(0.1, ctx.currentTime, 2.0);

      oscRef.current = osc;
      gainRef.current = gain;
      isPlaying.current = true;

      // Remove the listeners once initialized
      window.removeEventListener("click", initAudio);
      window.removeEventListener("scroll", initAudio);
    };

    window.addEventListener("click", initAudio);
    window.addEventListener("scroll", initAudio);

    return () => {
      window.removeEventListener("click", initAudio);
      window.removeEventListener("scroll", initAudio);
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  // Modulate audio based on scroll velocity
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    let timeoutId: any = null;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (audioCtxRef.current && gainRef.current && oscRef.current) {
            const currentScrollY = window.scrollY;
            const velocity = Math.abs(currentScrollY - lastScrollY);
            
            // Map scroll velocity to pitch and volume
            // Fast scroll = higher pitch and louder
            const targetFreq = 55 + Math.min(velocity * 0.5, 100);
            const targetGain = 0.1 + Math.min(velocity * 0.005, 0.4);

            const now = audioCtxRef.current.currentTime;
            
            // Smoothly transition the frequency and gain
            oscRef.current.frequency.setTargetAtTime(targetFreq, now, 0.1);
            gainRef.current.gain.setTargetAtTime(targetGain, now, 0.1);

            // Debounce the return-to-baseline
            if (timeoutId) {
              clearTimeout(timeoutId);
            }

            // Return to baseline when stopping
            timeoutId = setTimeout(() => {
              if (audioCtxRef.current && oscRef.current && gainRef.current) {
                const future = audioCtxRef.current.currentTime;
                const currentProgress = window.scrollY / window.innerHeight;
                if (currentProgress < 6.5) {
                  oscRef.current.frequency.setTargetAtTime(55, future, 0.5);
                  gainRef.current.gain.setTargetAtTime(0.1, future, 0.5);
                }
              }
            }, 150);
            
            // Silence section cutoff
            const windowHeight = window.innerHeight;
            const scrollProgress = currentScrollY / windowHeight;
            if (scrollProgress >= 6.5) { // entering Silence section
              gainRef.current.gain.setTargetAtTime(0.0, now, 0.5); // Instant cut to near vacuum
            }

            lastScrollY = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return null; // This is a headless component
}
