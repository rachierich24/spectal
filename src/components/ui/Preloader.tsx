"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [duration, setDuration] = useState<number | null>(null);

  // Unmute on first user interaction (safeguard for modern browser audio policies)
  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        setIsMuted(false);
        // Force play in case browser paused it when trying to unmute
        videoRef.current.play().catch(() => {});
      }
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
    };

    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    window.addEventListener("keydown", handleInteraction);
    window.addEventListener("pointerdown", handleInteraction);

    return cleanup;
  }, []);

  // Force play on mount (starts muted to ensure autoplay succeeds)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn("Muted autoplay failed: ", err);
      });
    }
  }, []);

  // Safety fallback timer: if metadata loading is slow, fade out after 10s
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleEnded = () => {
    setLoading(false);
  };

  const handleSkip = () => {
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0B0B0B]"
        >
          {/* Fullscreen Video */}
          <video
            ref={videoRef}
            src="/loader.mp4"
            autoPlay
            playsInline
            muted={isMuted}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            className="absolute inset-0 w-full h-full object-cover contrast-[1.05] brightness-[1.03] select-none pointer-events-none"
            style={{
              imageRendering: "-webkit-optimize-contrast",
              // @ts-ignore
              imageRendering: "crisp-edges",
            }}
          />

          {/* Interactive UI Overlay */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 pointer-events-none z-10">
            {/* Top Bar */}
            <div className="flex justify-between items-center w-full opacity-60">
              <span className="text-[10px] font-mono tracking-[0.3em] text-spectal-mint uppercase">
                Spectal Management // Experience Intro
              </span>
              {isMuted && (
                <span className="text-[10px] font-mono tracking-widest text-spectal-mint/60 uppercase animate-pulse">
                  [ Click anywhere to unmute sound ]
                </span>
              )}
            </div>

            {/* Bottom Right: Skip Intro Button */}
            <div className="flex justify-end w-full mt-auto">
              <button
                onClick={handleSkip}
                className="pointer-events-auto px-6 py-3 border border-spectal-mint/20 hover:border-spectal-mint bg-black/40 hover:bg-spectal-mint hover:text-spectal-charcoal text-[10px] font-mono tracking-widest uppercase transition-all duration-300 rounded-none text-spectal-mint font-bold shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
              >
                Skip Intro
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
