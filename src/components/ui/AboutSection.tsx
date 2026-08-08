"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Extended scroll tracker for cinematic pacing
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 15%"],
  });

  // Smooth, weighted spring for liquid-smooth background transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 35,
    damping: 24,
    restDelta: 0.0005,
  });

  // Multi-phase color morph: Deep Black -> Pale Lime-Mint -> Rich Vibrant Red -> Deep Black
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.18, 0.44, 0.74, 1],
    ["#0B0B0B", "#C5F3A2", "#DE382B", "#DE382B", "#0B0B0B"]
  );

  // Dynamic headline color morphing for seamless legibility
  const headlineColor = useTransform(
    smoothProgress,
    [0, 0.18, 0.44, 0.74, 1],
    ["#FFFFFF", "#111111", "#FFFFFF", "#FFFFFF", "#FFFFFF"]
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full min-h-[100vh] py-24 sm:py-32 md:py-44 relative z-20 pointer-events-auto overflow-hidden select-none"
    >
      {/* GPU-Composited Background Layer */}
      <motion.div
        style={{ backgroundColor }}
        className="absolute inset-0 will-change-[background-color] transform-gpu pointer-events-none"
      />

      {/* Top & Bottom seamless gradient dissolves into black */}
      <div className="absolute top-0 inset-x-0 h-32 md:h-48 bg-gradient-to-b from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 inset-x-0 h-32 md:h-48 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/60 to-transparent pointer-events-none z-10" />

      {/* Subtle Architectural Pinstripe Grid Lines */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-4 md:grid-cols-6 divide-x divide-black/[0.05] dark:divide-white/[0.05]" />

      {/* Main Content Container with Breathable Margins */}
      <div className="max-w-6xl mx-auto px-8 sm:px-14 md:px-20 lg:px-24 relative z-20 flex flex-col gap-16 sm:gap-24 md:gap-32">
        
        {/* =========================================================================
            PHASE 1: 01 / WHO WE ARE (PRIMARY STATEMENT)
           ========================================================================= */}
        <div className="relative pt-4 sm:pt-8 flex flex-col max-w-4xl">
          {/* Pure Headline: 100% Clean Typography */}
          <motion.h2
            style={{ color: headlineColor }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.65 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] font-syne font-extrabold uppercase tracking-tight leading-[1.05]"
          >
            SPECTAL IS A YOUTH EXPERIENCES AGENCY BUILT AROUND INDIA’S NEXT GENERATION.
          </motion.h2>
        </div>

        {/* =========================================================================
            PHASE 2: MANIFESTO & MISSION
           ========================================================================= */}
        <div className="relative flex flex-col pt-10 sm:pt-14 border-t border-white/20">
          
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
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-syne font-extrabold uppercase text-white tracking-tight leading-[1.12] mt-4 sm:mt-6"
          >
            TURNING THE CULTURE AROUND THEM INTO EXPERIENCES THEY REMEMBER &amp; RESONATE WITH.
          </motion.h3>
        </div>

      </div>
    </section>
  );
}

