"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AboutSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  const PILLARS = [
    {
      num: "01",
      tag: "TALENT & ROSTER",
      title: "Raw Talent ➔ Cultural Icons",
      desc: "Full-spectrum 360° artist management guiding breakthrough musicians, producers, and creators into mainstream festival headliners and culturally resonant brands.",
      metric: "50+ Artists",
      metricLabel: "360° Managed & Toured",
      highlight: "from-spectal-red/20 to-transparent",
      accentColor: "text-spectal-red",
      borderColor: "group-hover:border-spectal-red/40",
      icon: (
        <svg className="w-5 h-5 text-spectal-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      ),
    },
    {
      num: "02",
      tag: "CAMPUS & FESTIVALS",
      title: "Campus Footfall ➔ Fanatic Advocacy",
      desc: "India's highest-octane campus festival powerhouse. We program, architect, and produce stadium-scale college experiences where raw youth memories are forged.",
      metric: "200+ Festivals",
      metricLabel: "Across 30+ Cities",
      highlight: "from-spectal-mint/20 to-transparent",
      accentColor: "text-spectal-mint",
      borderColor: "group-hover:border-spectal-mint/40",
      icon: (
        <svg className="w-5 h-5 text-spectal-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      num: "03",
      tag: "BRANDS & EXPERIENCES",
      title: "Attention ➔ Cultural Gravity",
      desc: "Bridging ambitious brands directly with next-gen audiences through bespoke campus pop-ups, immersive experiential IP, and high-conversion artist collaborations.",
      metric: "50+ Brands",
      metricLabel: "Experiential Activations",
      highlight: "from-spectal-red/20 to-transparent",
      accentColor: "text-spectal-red",
      borderColor: "group-hover:border-spectal-red/40",
      icon: (
        <svg className="w-5 h-5 text-spectal-red" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="2" x2="12" y2="6" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
          <line x1="2" y1="12" x2="6" y2="12" />
          <line x1="18" y1="12" x2="22" y2="12" />
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="about"
      className="w-full py-24 md:py-36 relative z-20 pointer-events-auto border-t border-white/5 bg-gradient-to-b from-black/80 via-spectal-charcoal/95 to-black/90 backdrop-blur-md overflow-hidden select-none"
    >
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-spectal-red/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-48 w-96 h-96 bg-spectal-mint/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Subtle geometric dot grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative z-10 flex flex-col">
        {/* Archrival-Inspired Main Headline Statement */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-col items-start max-w-5xl mb-12 md:mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-2xl sm:text-3xl md:text-[2.75rem] lg:text-[3.25rem] font-medium leading-[1.35] tracking-tight text-white uppercase font-boldonse"
          >
            We help{" "}
            {/* Inline Interactive Badge 1: Live Pulse */}
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              data-interactive="true"
              data-cursor="ENERGY"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 my-1 mx-1.5 align-middle rounded-full bg-spectal-red/15 border border-spectal-red/40 text-spectal-red text-xs sm:text-sm font-mono tracking-wider font-semibold normal-case shadow-[0_0_15px_rgba(201,73,61,0.25)] transition-all duration-300 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 animate-pulse text-spectal-red" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              <span>live experiences</span>
            </motion.span>{" "}
            earn their place{" "}
            {/* Inline Interactive Badge 2: Starburst Culture */}
            <motion.span
              whileHover={{ scale: 1.05, y: -2 }}
              data-interactive="true"
              data-cursor="CULTURE"
              className="inline-flex items-center gap-1.5 px-3.5 py-1 my-1 mx-1.5 align-middle rounded-full bg-spectal-mint/15 border border-spectal-mint/40 text-spectal-mint text-xs sm:text-sm font-mono tracking-wider font-semibold normal-case shadow-[0_0_15px_rgba(221,236,196,0.2)] transition-all duration-300 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 animate-spin-slow text-spectal-mint" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
              <span>in culture</span>
            </motion.span>{" "}
            — not just show up on a poster.
          </motion.h2>
        </motion.div>

        {/* 3 Creative Pillar Cards (Seed Framework) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              onMouseEnter={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
              data-interactive="true"
              data-cursor="DISCOVER"
              className={`group relative rounded-2xl p-8 bg-white/[0.02] hover:bg-white/[0.05] border border-white/10 ${pillar.borderColor} transition-all duration-500 flex flex-col justify-between overflow-hidden cursor-pointer`}
            >
              {/* Card Ambient Hover Glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${pillar.highlight} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
              />

              {/* Card Top Row: Index & Tag & Icon */}
              <div className="relative z-10 flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold ${pillar.accentColor}`}>
                    {pillar.num}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase">
                    {pillar.tag}
                  </span>
                </div>
                <div className="p-2.5 rounded-full bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
              </div>

              {/* Card Body */}
              <div className="relative z-10 flex flex-col gap-4 mb-10">
                <h3 className="text-xl lg:text-2xl font-boldonse font-medium text-white tracking-tight leading-snug group-hover:text-white transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              {/* Card Bottom: Metric Counter Badge */}
              <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className={`text-xl lg:text-2xl font-boldonse font-bold ${pillar.accentColor} tracking-wide`}>
                    {pillar.metric}
                  </span>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">
                    {pillar.metricLabel}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:text-white group-hover:border-white/40 group-hover:translate-x-1 transition-all duration-300">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Horizontal Quick-Attributes Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6 text-[10px] font-mono uppercase tracking-[0.25em] text-white/40"
        >
          <div className="flex items-center gap-2">
            <span className="text-spectal-mint font-bold">&#10022;</span>
            <span>BORN ON CAMPUSES</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-spectal-red font-bold">&#10022;</span>
            <span>ELEVATED ON MAIN STAGES</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-spectal-mint font-bold">&#10022;</span>
            <span>DATA & PASSION POWERED</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-spectal-red font-bold">&#10022;</span>
            <span>PAN-INDIA REACH</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
