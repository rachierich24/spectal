"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple fast loader
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#0B0B0B] pointer-events-none"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-spectal-mint/70 uppercase">
              Loading
            </span>
            <div className="w-32 h-[1px] bg-white/10 overflow-hidden relative">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="absolute top-0 left-0 w-1/2 h-full bg-spectal-red"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
