"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Elegant, slow-paced loader holding for 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-[#050505] pointer-events-none"
        >
          <motion.div 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <h1 className="text-2xl md:text-3xl font-light tracking-[0.6em] text-white/90 uppercase ml-[0.6em]">
              Spectal
            </h1>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: "2rem" }}
              transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
              className="w-[1px] bg-spectal-red/60 my-6" 
            />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="text-[9px] font-mono tracking-[0.4em] text-spectal-mint/40 uppercase ml-[0.4em]"
            >
              The Next Moment Could Be Yours
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
