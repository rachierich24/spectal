"use client";

import React, { useRef, useState, memo } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// ============================================================================
// MEMOIZED GPU-ACCELERATED POP-ART & EDITORIAL STICKER SVGS
// ============================================================================

// STICKER 1: Three Hand-drawn Radiating Energy Shards (Top-left accent)
const StickerBurstShards = memo(function StickerBurstShards() {
  return (
    <motion.span
      data-interactive="true"
      data-cursor="BURST"
      whileHover={{ scale: 1.25, rotate: -10 }}
      animate={{ y: [0, -4, 0], rotate: [-2, 3, -2] }}
      transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
      className="inline-block align-middle select-none cursor-pointer flex-shrink-0 will-change-transform transform-gpu"
    >
      <svg
        viewBox="0 0 50 45"
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 30 C 9 18, 14 12, 19 9 C 15 20, 11 28, 8 30 Z"
          fill="#FF5E3A"
          stroke="#DE382B"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M24 6 C 26 1, 30 1, 32 6 C 30 16, 26 21, 24 6 Z"
          fill="#FF5E3A"
          stroke="#DE382B"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="M40 12 C 45 18, 45 24, 40 28 C 36 22, 35 17, 40 12 Z"
          fill="#FF5E3A"
          stroke="#DE382B"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
});

// STICKER 2: Stylized Lavender Crescent Moon with Sleeping ZZZs
const StickerMoonZzz = memo(function StickerMoonZzz() {
  return (
    <motion.span
      data-interactive="true"
      data-cursor="DREAM"
      whileHover={{ scale: 1.25, rotate: 12 }}
      animate={{ y: [0, -4, 0], rotate: [0, 4, 0] }}
      transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
      className="inline-flex items-center align-middle select-none cursor-pointer mx-1.5 sm:mx-2.5 flex-shrink-0 will-change-transform transform-gpu"
    >
      <svg
        viewBox="0 0 54 54"
        className="w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M27 6C16.507 6 8 14.507 8 25C8 35.493 16.507 44 27 44C32.842 44 38.053 41.347 41.521 37.172C33.908 38.181 27 32.167 27 24.485C27 17.773 32.201 12.275 38.747 11.396C35.358 8.051 31.05 6 27 6Z"
          stroke="#6839BB"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#A47BFF"
        />
        <path
          d="M38 10 H45 L38 18 H46"
          stroke="#6839BB"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M44 20 H49 L44 25 H50"
          stroke="#6839BB"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
});

// STICKER 3: Chunky 4-Point Doodle Sparkle Star
const StickerSparkle = memo(function StickerSparkle() {
  return (
    <motion.span
      data-interactive="true"
      data-cursor="SPARKLE"
      whileHover={{ scale: 1.3, rotate: 90 }}
      animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.05, 1] }}
      transition={{ repeat: Infinity, duration: 3.4, ease: "easeInOut" }}
      className="inline-flex items-center align-middle select-none cursor-pointer mx-1.5 sm:mx-2.5 flex-shrink-0 will-change-transform transform-gpu"
    >
      <svg
        viewBox="0 0 44 44"
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 drop-shadow-[0_4px_10px_rgba(0,0,0,0.18)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M22 3 C 23 13, 31 21, 41 22 C 31 23, 23 31, 22 41 C 21 31, 13 23, 3 22 C 13 21, 21 13, 22 3 Z"
          fill="#FFD23F"
          stroke="#111111"
          strokeWidth="2.6"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
});

// STICKER 4: Chunky Pop-Art Yellow Lightning Bolt
const StickerLightning = memo(function StickerLightning() {
  return (
    <motion.span
      data-interactive="true"
      data-cursor="ZAP"
      whileHover={{ scale: 1.3, rotate: -15 }}
      animate={{ y: [0, -3, 0], rotate: [0, 4, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      className="inline-flex items-center align-middle select-none cursor-pointer mx-1.5 sm:mx-2.5 flex-shrink-0 will-change-transform transform-gpu"
    >
      <svg
        viewBox="0 0 40 44"
        className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 drop-shadow-[0_4px_10px_rgba(0,0,0,0.2)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23 3 L8 23 L19 23 L15 41 L32 19 L21 19 Z"
          fill="#FFE600"
          stroke="#111111"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
});

// STICKER 5: Crossed Bandage / Pill Icon (with CSS group hover tooltip for zero re-render overhead)
const IconCrossBadge = memo(function IconCrossBadge() {
  return (
    <div className="relative group inline-flex items-center justify-center align-middle flex-shrink-0">
      <motion.span
        data-interactive="true"
        data-cursor="CLICK"
        whileHover={{ scale: 1.18, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
        className="inline-flex items-center justify-center mx-1 sm:mx-2 cursor-pointer select-none will-change-transform transform-gpu"
      >
        <svg
          viewBox="0 0 60 60"
          className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-13 lg:h-13 drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="14"
            y="23"
            width="32"
            height="14"
            rx="7"
            transform="rotate(45 30 30)"
            fill="#F5F5F5"
            stroke="#121212"
            strokeWidth="2.5"
          />
          <rect
            x="14"
            y="23"
            width="32"
            height="14"
            rx="7"
            transform="rotate(-45 30 30)"
            fill="#FFFFFF"
            stroke="#121212"
            strokeWidth="2.5"
          />
          <g fill="#121212">
            <circle cx="30" cy="30" r="1.5" />
            <circle cx="25" cy="30" r="1.2" />
            <circle cx="35" cy="30" r="1.2" />
            <circle cx="30" cy="25" r="1.2" />
            <circle cx="30" cy="35" r="1.2" />
          </g>
        </svg>
      </motion.span>

      {/* Zero-state CSS Hover Tooltip */}
      <span className="opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 transition-all duration-200 pointer-events-none absolute left-1/2 -translate-x-1/2 -top-1 whitespace-nowrap bg-black text-white text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded border border-white/20 z-40 shadow-xl">
        CAREER ARCHITECTURE
      </span>
    </div>
  );
});

// STICKER 6: White Scalloped Starburst Badge
const IconStarBadge = memo(function IconStarBadge() {
  return (
    <div className="relative group inline-flex items-center justify-center align-middle flex-shrink-0">
      <motion.span
        data-interactive="true"
        data-cursor="ENERGY"
        whileHover={{ scale: 1.22, rotate: [0, -15, 15, -8, 0] }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className="inline-flex items-center justify-center mx-1 sm:mx-2 cursor-pointer select-none will-change-transform transform-gpu"
      >
        <svg
          viewBox="0 0 60 60"
          className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-13 lg:h-13 drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M30 4L34.6 10.1L42.2 9.4L44.5 16.7L51.9 18.7L51.3 26.4L57.5 29.8L51.3 33.2L51.9 40.9L44.5 42.9L42.2 50.2L34.6 49.5L30 55.6L25.4 49.5L17.8 50.2L15.5 42.9L8.1 40.9L8.7 33.2L2.5 29.8L8.7 26.4L8.1 18.7L15.5 16.7L17.8 9.4L25.4 10.1L30 4Z"
            fill="#FFFFFF"
          />
          <circle cx="30" cy="30" r="6" fill="#121212" />
        </svg>
      </motion.span>

      <span className="opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 transition-all duration-200 pointer-events-none absolute left-1/2 -translate-x-1/2 -top-1 whitespace-nowrap bg-black text-white text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded border border-white/20 z-40 shadow-xl">
        CULTURE FIRST
      </span>
    </div>
  );
});

// STICKER 7: Crisp Radiating White Asterisk
const IconSunburst = memo(function IconSunburst() {
  return (
    <div className="relative group inline-flex items-center justify-center align-middle flex-shrink-0">
      <motion.span
        data-interactive="true"
        data-cursor="BURST"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
        whileHover={{ scale: 1.28, rotate: "+=180", transition: { duration: 0.5 } }}
        className="inline-flex items-center justify-center ml-1 sm:ml-2 cursor-pointer select-none will-change-transform transform-gpu"
      >
        <svg
          viewBox="0 0 60 60"
          className="w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11 lg:w-13 lg:h-13 drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {Array.from({ length: 18 }).map((_, i) => {
            const angle = (i * 360) / 18;
            return (
              <line
                key={i}
                x1="30"
                y1="4"
                x2="30"
                y2="56"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeLinecap="round"
                transform={`rotate(${angle} 30 30)`}
              />
            );
          })}
        </svg>
      </motion.span>

      <span className="opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 transition-all duration-200 pointer-events-none absolute left-1/2 -translate-x-1/2 -top-1 whitespace-nowrap bg-black text-white text-[10px] font-mono tracking-widest uppercase px-2.5 py-1 rounded border border-white/20 z-40 shadow-xl">
        YOUTH ENERGY
      </span>
    </div>
  );
});

// Circular Rotating Orbit Seal
const RotatingConnectSeal = memo(function RotatingConnectSeal() {
  return (
    <motion.div
      data-interactive="true"
      data-cursor="CONNECT"
      whileHover={{ scale: 1.12, rotate: 15 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className="w-22 h-22 sm:w-26 sm:h-26 md:w-30 md:h-30 rounded-full bg-[#111111] shadow-[0_20px_45px_rgba(0,0,0,0.45)] border border-white/15 flex items-center justify-center cursor-pointer select-none flex-shrink-0 will-change-transform transform-gpu"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 16, ease: "linear" }}
        className="absolute inset-0 w-full h-full"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full">
          <defs>
            <path
              id="orbitCircle"
              d="M 60,60 m -42,0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
            />
          </defs>
          <text className="text-[9.5px] font-mono font-bold tracking-[0.24em] uppercase fill-white">
            <textPath href="#orbitCircle" startOffset="0%">
              CONNECT / CONNECT / CONNECT /
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* Center Angled Red Arrow */}
      <svg
        viewBox="0 0 24 24"
        className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#DE382B]"
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

  // Slow, multi-phase color morph: Deep Black -> Pale Lime-Mint -> Rich Vibrant Red -> Deep Black
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.18, 0.44, 0.74, 1],
    ["#0B0B0B", "#C5F3A2", "#DE382B", "#DE382B", "#0B0B0B"]
  );

  // Ambient atmospheric glow opacity
  const ambientGlowOpacity = useTransform(
    smoothProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 0.35, 0.45, 0.3, 0]
  );

  // Dynamic text color for subtle metadata elements
  const metaTextColor = useTransform(
    smoothProgress,
    [0, 0.18, 0.44, 0.74, 1],
    ["#DDECC4", "#121212", "#FFFFFF", "#FFFFFF", "#DDECC4"]
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

      {/* Floating Ambient Glow spheres for organic lighting depth */}
      <motion.div
        style={{ opacity: ambientGlowOpacity }}
        className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-[#C5F3A2] blur-[140px] pointer-events-none will-change-transform transform-gpu"
      />
      <motion.div
        style={{ opacity: ambientGlowOpacity }}
        className="absolute bottom-1/4 right-10 w-[28rem] h-[28rem] rounded-full bg-[#DE382B] blur-[160px] pointer-events-none will-change-transform transform-gpu"
      />

      {/* Subtle Architectural Pinstripe Grid Lines */}
      <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-4 md:grid-cols-6 divide-x divide-black/[0.05] dark:divide-white/[0.05]" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-20 relative z-20 flex flex-col gap-20 sm:gap-28 md:gap-36">
        
        {/* =========================================================================
            PHASE 1: THE INVITATION & PURPOSE (WE HELP BRANDS EARN THEIR PLACE)
           ========================================================================= */}
        <div className="relative pt-4 sm:pt-8 flex flex-col md:flex-row md:items-start justify-between gap-8">
          
          <div className="flex flex-col max-w-5xl">
            {/* Metadata Bar + Eyebrow */}
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <StickerBurstShards />
              <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
                <span className="w-2 h-2 rounded-full bg-[#DE382B] animate-pulse" />
                <motion.span
                  style={{ color: metaTextColor }}
                  className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase font-bold"
                >
                  [ 02 // CULTURAL MANIFESTO ]
                </motion.span>
                <span className="text-black/30 hidden sm:inline">•</span>
                <motion.p
                  style={{ color: metaTextColor }}
                  className="text-xl sm:text-2xl md:text-3xl font-instrument italic font-normal tracking-tight"
                >
                  sounds good?
                </motion.p>
              </div>
            </div>

            {/* Headline Line 1: WE HELP [Bandage] BRANDS [Sparkle] */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65 }}
              className="flex flex-wrap items-center gap-x-2 sm:gap-x-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] 2xl:text-[6.2rem] font-syne font-extrabold uppercase text-[#DE382B] tracking-[-0.035em] leading-[0.92]"
            >
              <span>WE HELP</span>
              <IconCrossBadge />
              <span>BRANDS</span>
              <StickerSparkle />
            </motion.div>

            {/* Headline Line 2: EARN THEIR PLACE [Lightning] */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.08 }}
              className="flex flex-wrap items-center gap-x-2 sm:gap-x-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] 2xl:text-[6.2rem] font-syne font-extrabold italic uppercase text-[#DE382B] tracking-[-0.035em] leading-[0.92] mt-1 sm:mt-2"
            >
              <span>EARN THEIR PLACE</span>
              <StickerLightning />
            </motion.div>
          </div>

          {/* Rotating Circular Orbit Seal Badge on the right */}
          <div className="hidden lg:flex items-center justify-center pt-6">
            <RotatingConnectSeal />
          </div>
        </div>

        {/* =========================================================================
            PHASE 2: THE CULTURAL IMPACT (IN CULTURE — NOT JUST SHOW UP!)
           ========================================================================= */}
        <div className="flex flex-col pt-8 sm:pt-12 border-t border-white/20">
          
          {/* Sub-label index */}
          <div className="flex items-center gap-3 mb-3 sm:mb-5">
            <span className="text-[10px] font-mono tracking-[0.35em] text-white/70 uppercase">
              INDEX 02 // ACTIVATION
            </span>
          </div>

          {/* Headline Line 1: IN CULTURE — */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="flex flex-wrap items-center gap-x-2 sm:gap-x-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] 2xl:text-[6.2rem] font-syne font-bold uppercase text-[#C5F3A2] tracking-[-0.035em] leading-[0.92]"
          >
            <span>IN CULTURE —</span>
          </motion.div>

          {/* Headline Line 2: NOT JUST SHOW UP! [Star] [Sunburst] [MoonZZZ] */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] 2xl:text-[6.2rem] font-syne font-extrabold uppercase text-white tracking-[-0.035em] leading-[0.92] mt-1 sm:mt-2"
          >
            <span>NOT JUST SHOW UP!</span>
            <IconStarBadge />
            <IconSunburst />
            <StickerMoonZzz />
          </motion.div>

          {/* Bottom Bar: Angled Tile + Editorial Summary + Interactive Capsule Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/20 flex flex-col md:flex-row md:items-center justify-between gap-6 sm:gap-8"
          >
            {/* Left: Black Angled Tile + Narrative */}
            <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 max-w-xl">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-xl border border-white/15">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-6 sm:h-6 text-[#C5F3A2]"
                  fill="currentColor"
                >
                  <path d="M19 19H8V15H13.17L4.58 6.41L7.41 3.58L16 12.17V7H19V19Z" />
                </svg>
              </div>

              <p className="text-xs sm:text-sm md:text-base font-sans font-light text-white/95 leading-relaxed">
                A curation of experiences and cultural IP we&apos;ve built over the past decade connecting youth, culture &amp; brands across India.
              </p>
            </div>

            {/* Right: Capability Tags Pills */}
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
                        : "bg-black/30 text-white/90 border-white/20 hover:bg-[#C5F3A2] hover:text-black hover:border-[#C5F3A2]"
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
