"use client";

import { useEffect, useState } from "react";
import { useProgress } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const { progress } = useProgress();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial minimum delay for dramatic effect
    const timer = setTimeout(() => {
      if (progress === 100) {
        setLoading(false);
      }
    }, 2000);

    if (progress === 100) {
      // If loaded quickly, still ensure we wait the 2 seconds
    }
    
    return () => clearTimeout(timer);
  }, [progress]);

  // Fallback if 100% is reached after 2 seconds
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => setLoading(false), 2000);
    }
  }, [progress]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-spectal-charcoal text-spectal-mint"
        >
          <div className="relative flex flex-col items-center">
            {/* Pulsing core */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-4 h-4 bg-spectal-red rounded-full mb-8 shadow-[0_0_30px_#C9493D]"
            />
            
            <div className="text-sm font-mono tracking-[0.5em] uppercase mb-2">
              System Initialization
            </div>
            
            <div className="text-6xl font-light tracking-tighter">
              {Math.round(progress)}<span className="text-spectal-red">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
