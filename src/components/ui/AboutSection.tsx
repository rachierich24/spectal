"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="w-full relative z-20 pointer-events-auto select-none overflow-hidden">
      
      {/* =========================================================================
          TOP BLOCK: MINT LIME BACKGROUND WITH BOLD RED TYPOGRAPHY
         ========================================================================= */}
      <div className="w-full bg-[#C5F3A2] py-20 sm:py-28 md:py-36 relative overflow-hidden border-b border-black/10">
        {/* Subtle Architectural Pinstripe Grid Lines (Dark) */}
        <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-4 md:grid-cols-6 divide-x divide-black/10" />

        <div className="max-w-6xl mx-auto px-8 sm:px-14 md:px-20 lg:px-24 relative z-20 flex flex-col gap-4 sm:gap-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.5 }}
            className="text-sm sm:text-base font-serif italic text-[#DE382B] tracking-wider lowercase"
          >
            who we are
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.65 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-syne font-extrabold uppercase tracking-tight leading-[1.05] text-[#DE382B]"
          >
            SPECTAL IS A YOUTH EXPERIENCES AGENCY BUILT AROUND INDIA’S NEXT GENERATION.
          </motion.h2>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM BLOCK: VIBRANT RED BACKGROUND WITH MINT & WHITE TYPOGRAPHY
         ========================================================================= */}
      <div className="w-full bg-[#DE382B] py-20 sm:py-28 md:py-36 relative overflow-hidden">
        {/* Subtle Architectural Pinstripe Grid Lines (Light) */}
        <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-4 md:grid-cols-6 divide-x divide-white/10" />

        <div className="max-w-6xl mx-auto px-8 sm:px-14 md:px-20 lg:px-24 relative z-20 flex flex-col gap-4 sm:gap-6">
          {/* Pure Manifesto Line 1: Mint Lime Accent */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.65 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-bold uppercase text-[#C5F3A2] tracking-tight leading-[1.12]"
          >
            WE LIVE ON THE PULSE OF YOUNG INDIA AS IT KEEPS EVOLVING,
          </motion.h3>

          {/* Pure Manifesto Line 2: White Bold Core Line */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase text-white tracking-tight leading-[1.12]"
          >
            TURNING THE CULTURE AROUND THEM INTO EXPERIENCES THEY REMEMBER &amp; RESONATE WITH.
          </motion.h3>
        </div>
      </div>

    </section>
  );
}



