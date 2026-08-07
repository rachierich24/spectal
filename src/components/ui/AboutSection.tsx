"use client";

import React, { useRef, useState, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ============================================================================
// SCATTERED CORNER & MARGIN VECTOR DOODLES (Spacious, Zero Text Overlap)
// ============================================================================

// DOODLE 1: Three Hand-drawn Radiating Energy Shards (Far Top-Left Margin)
const StickerBurstShards = memo(function StickerBurstShards() {
  return (
    <motion.div
      data-interactive="true"
      data-cursor="ENERGY"
      whileHover={{ scale: 1.35, rotate: -15 }}
      animate={{ y: [0, -10, 0], rotate: [-6, 3, -6] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="cursor-pointer select-none will-change-transform transform-gpu drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
    >
      <svg
        viewBox="0 0 54 48"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-13 md:h-13 lg:w-16 lg:h-16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 32 C 9 18, 14 12, 20 8 C 16 20, 11 30, 8 32 Z"
          fill="#FF5E3A"
          stroke="#DE382B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M26 6 C 28 1, 33 1, 35 6 C 33 17, 28 23, 26 6 Z"
          fill="#FFE600"
          stroke="#DE382B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M44 12 C 49 18, 49 25, 43 30 C 39 23, 38 17, 44 12 Z"
          fill="#FF5E3A"
          stroke="#DE382B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
});

// DOODLE 2: Pop-Art Electric Lightning Bolt (Far Top-Right Margin)
const StickerLightning = memo(function StickerLightning() {
  return (
    <motion.div
      data-interactive="true"
      data-cursor="PULSE"
      whileHover={{ scale: 1.4, rotate: -25 }}
      animate={{ y: [0, -12, 0], rotate: [8, 18, 8] }}
      transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
      className="cursor-pointer select-none will-change-transform transform-gpu drop-shadow-[0_12px_28px_rgba(255,230,0,0.4)]"
    >
      <svg
        viewBox="0 0 42 46"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-15 lg:h-15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24 3 L8 24 L20 24 L16 43 L34 20 L22 20 Z"
          fill="#FFE600"
          stroke="#111111"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
});

// DOODLE 3: Scalloped Starburst Cultural Badge (Far Mid-Right Margin)
const IconStarBadge = memo(function IconStarBadge() {
  return (
    <motion.div
      data-interactive="true"
      data-cursor="CULTURE"
      whileHover={{ scale: 1.3, rotate: 60 }}
      whileTap={{ scale: 0.95 }}
      animate={{ y: [0, -9, 0], rotate: [-4, 6, -4] }}
      transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut" }}
      className="cursor-pointer select-none will-change-transform transform-gpu drop-shadow-[0_12px_28px_rgba(0,0,0,0.45)]"
    >
      <svg
        viewBox="0 0 60 60"
        className="w-8 h-8 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-16 lg:h-16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 4L34.6 10.1L42.2 9.4L44.5 16.7L51.9 18.7L51.3 26.4L57.5 29.8L51.3 33.2L51.9 40.9L44.5 42.9L42.2 50.2L34.6 49.5L30 55.6L25.4 49.5L17.8 50.2L15.5 42.9L8.1 40.9L8.7 33.2L2.5 29.8L8.7 26.4L8.1 18.7L15.5 16.7L17.8 9.4L25.4 10.1L30 4Z"
          fill="#FFFFFF"
        />
        <circle cx="30" cy="30" r="7" fill="#DE382B" />
      </svg>
    </motion.div>
  );
});

// DOODLE 4: 4-Point Doodle Sparkle Star (Far Mid-Left Margin)
const StickerSparkle = memo(function StickerSparkle() {
  return (
    <motion.div
      data-interactive="true"
      data-cursor="SPARK"
      whileHover={{ scale: 1.4, rotate: 90 }}
      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.08, 1], y: [0, -8, 0] }}
      transition={{ repeat: Infinity, duration: 3.8, ease: "easeInOut" }}
      className="cursor-pointer select-none will-change-transform transform-gpu drop-shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
    >
      <svg
        viewBox="0 0 44 44"
        className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-15 lg:h-15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 3 C 23 13, 31 21, 41 22 C 31 23, 23 31, 22 41 C 21 31, 13 23, 3 22 C 13 21, 21 13, 22 3 Z"
          fill="#C5F3A2"
          stroke="#0B0B0B"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
});

// DOODLE 5: Rotating Sunburst Asterisk (Far Lower-Right Margin)
const IconSunburst = memo(function IconSunburst() {
  return (
    <motion.div
      data-interactive="true"
      data-cursor="EXPERIENCE"
      whileHover={{ scale: 1.35, rotate: "+=180", transition: { duration: 0.4 } }}
      className="cursor-pointer select-none will-change-transform transform-gpu drop-shadow-[0_10px_26px_rgba(197,243,162,0.35)]"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
      >
        <svg
          viewBox="0 0 60 60"
          className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-16 lg:h-16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = (i * 360) / 16;
            return (
              <line
                key={i}
                x1="30"
                y1="6"
                x2="30"
                y2="54"
                stroke="#C5F3A2"
                strokeWidth="3.2"
                strokeLinecap="round"
                transform={`rotate(${angle} 30 30)`}
              />
            );
          })}
        </svg>
      </motion.div>
    </motion.div>
  );
});

// DOODLE 6: Stylized Crescent Moon with Sparkle (Far Lower-Left Margin)
const StickerMoonZzz = memo(function StickerMoonZzz() {
  return (
    <motion.div
      data-interactive="true"
      data-cursor="NIGHTLIFE"
      whileHover={{ scale: 1.35, rotate: 20 }}
      animate={{ y: [0, -10, 0], rotate: [-4, 6, -4] }}
      transition={{ repeat: Infinity, duration: 4.4, ease: "easeInOut" }}
      className="cursor-pointer select-none will-change-transform transform-gpu drop-shadow-[0_10px_28px_rgba(164,123,255,0.4)]"
    >
      <svg
        viewBox="0 0 54 54"
        className="w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-16 lg:h-16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27 6C16.507 6 8 14.507 8 25C8 35.493 16.507 44 27 44C32.842 44 38.053 41.347 41.521 37.172C33.908 38.181 27 32.167 27 24.485C27 17.773 32.201 12.275 38.747 11.396C35.358 8.051 31.05 6 27 6Z"
          stroke="#111111"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#A47BFF"
        />
        <path
          d="M38 11 L43 11 L38 17 L44 17"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
});

// Circular Rotating Orbit Seal Badge
const RotatingConnectSeal = memo(function RotatingConnectSeal() {
  return (
    <motion.div
      data-interactive="true"
      data-cursor="SPECTAL"
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full bg-[#111111] shadow-[0_20px_45px_rgba(0,0,0,0.5)] border border-white/20 flex items-center justify-center cursor-pointer select-none flex-shrink-0 will-change-transform transform-gpu"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        className="absolute inset-0 w-full h-full"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <path
              id="orbitCircle"
              d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            />
          </defs>
          <text className="text-[9.5px] font-mono font-bold tracking-[0.22em] uppercase fill-white">
            <textPath href="#orbitCircle" startOffset="0%">
              YOUTH • CULTURE • BRANDS •
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center Arrow */}
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 sm:w-7 sm:h-7 text-[#DE382B]"
        fill="currentColor"
      >
        <path d="M19 19H8V15H13.17L4.58 6.41L7.41 3.58L16 12.17V7H19V19Z" />
      </svg>
    </motion.div>
  );
});

const PILLARS = [
  "360° TALENT ROSTER",
  "200+ CAMPUS FESTIVALS",
  "PAN-INDIA ACTIVATIONS",
  "CULTURAL IP & TOURS",
  "STADIUM PRODUCTION",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activePill, setActivePill] = useState<number | null>(null);

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

  // Dynamic text color for subtle metadata elements
  const metaTextColor = useTransform(
    smoothProgress,
    [0, 0.18, 0.44, 0.74, 1],
    ["#DDECC4", "#121212", "#FFFFFF", "#FFFFFF", "#DDECC4"]
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
      className="w-full min-h-[145vh] py-24 sm:py-32 md:py-44 relative z-20 pointer-events-auto overflow-hidden select-none"
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

      {/* =========================================================================
          SCATTERED CORNER DOODLES (Placed across the outer margins of the section)
         ========================================================================= */}
      {/* 1. Far Top-Left Margin */}
      <div className="absolute left-4 sm:left-8 md:left-12 lg:left-16 top-16 sm:top-24 md:top-28 pointer-events-auto z-30">
        <StickerBurstShards />
      </div>

      {/* 2. Far Top-Right Margin */}
      <div className="absolute right-4 sm:right-8 md:right-14 lg:right-20 top-12 sm:top-20 md:top-24 pointer-events-auto z-30">
        <StickerLightning />
      </div>

      {/* 3. Far Mid-Right Margin */}
      <div className="absolute right-3 sm:right-6 md:right-10 lg:right-16 top-[40%] pointer-events-auto z-30 hidden sm:block">
        <IconStarBadge />
      </div>

      {/* 4. Far Mid-Left Margin */}
      <div className="absolute left-3 sm:left-6 md:left-10 lg:left-14 top-[54%] pointer-events-auto z-30">
        <StickerSparkle />
      </div>

      {/* 5. Far Lower-Right Margin */}
      <div className="absolute right-4 sm:right-8 md:right-14 lg:right-20 bottom-32 sm:bottom-40 md:bottom-48 pointer-events-auto z-30">
        <IconSunburst />
      </div>

      {/* 6. Far Lower-Left Margin */}
      <div className="absolute left-4 sm:left-8 md:left-12 lg:left-18 bottom-20 sm:bottom-28 md:bottom-36 pointer-events-auto z-30 hidden sm:block">
        <StickerMoonZzz />
      </div>

      {/* Main Content Container with Breathable Margins */}
      <div className="max-w-6xl mx-auto px-8 sm:px-14 md:px-20 lg:px-24 relative z-20 flex flex-col gap-16 sm:gap-24 md:gap-32">
        
        {/* =========================================================================
            PHASE 1: 01 / WHO WE ARE (PRIMARY STATEMENT)
           ========================================================================= */}
        <div className="relative pt-4 sm:pt-8 flex flex-col md:flex-row md:items-start justify-between gap-8">
          <div className="flex flex-col max-w-4xl">
            {/* Pure Headline: 100% Clean Typography Without Any Inline Icons */}
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

          {/* Rotating Circular Orbit Seal Badge on the right */}
          <div className="hidden lg:flex items-center justify-center pt-8 flex-shrink-0">
            <RotatingConnectSeal />
          </div>
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

          {/* Bottom Bar: Goal Statement Card + Interactive Capability Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-12 sm:mt-18 pt-6 sm:pt-8 border-t border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8"
          >
            {/* Left: Catch Them Young Mission Box */}
            <div className="flex items-start sm:items-center gap-4 sm:gap-5 max-w-2xl bg-black/45 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/15 shadow-2xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl border border-white/15">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5F3A2]"
                  fill="currentColor"
                >
                  <path d="M19 19H8V15H13.17L4.58 6.41L7.41 3.58L16 12.17V7H19V19Z" />
                </svg>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-spectal-mint font-semibold">
                  OUR GOAL &amp; MISSION
                </span>
                <p className="text-sm sm:text-base md:text-lg font-syne font-bold text-white leading-snug">
                  Our goal is to catch them young.{" "}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#C5F3A2]/20 text-[#C5F3A2] text-xs font-mono font-bold border border-[#C5F3A2]/30 mx-1">
                    Gen-Z
                  </span>{" "}
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/15 text-white text-xs font-mono font-bold border border-white/25 mx-1">
                    Gen-Alpha
                  </span>{" "}
                  <span className="text-white/80">Gen-whoever-comes-next.</span>
                </p>
              </div>
            </div>

            {/* Right: Capability Tags */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 max-w-lg">
              {PILLARS.map((tag, idx) => {
                const isActive = activePill === idx;
                return (
                  <motion.button
                    key={tag}
                    type="button"
                    data-interactive="true"
                    data-cursor="VIEW"
                    onClick={() => setActivePill(isActive ? null : idx)}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-xs font-mono tracking-wider uppercase transition-all duration-300 border ${
                      isActive
                        ? "bg-[#C5F3A2] text-black border-[#C5F3A2] shadow-lg font-bold"
                        : "bg-black/40 text-white/90 border-white/20 hover:bg-[#C5F3A2] hover:text-black hover:border-[#C5F3A2]"
                    }`}
                  >
                    {tag}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
