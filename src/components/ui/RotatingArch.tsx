"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RotatingArch() {
  return (
    <section className="w-full relative bg-[#050505] overflow-hidden pt-12 pb-10 sm:pt-20 sm:pb-16 md:pt-28 md:pb-24 flex flex-col items-center justify-center border-b border-spectal-mint/40">
      {/* Responsive Container for the Arch Effect */}
      <div className="relative w-full max-w-[1500px] h-[260px] sm:h-[340px] md:h-[42vw] max-h-[560px] overflow-hidden flex items-end justify-center pointer-events-none">

        {/* The SVG Circle - Scaled & Positioned for Mobile & Desktop */}
        <motion.div
          className="absolute top-[-10px] sm:top-[-40px] md:top-[-60px] left-[50%] w-[440px] h-[440px] sm:w-[640px] sm:h-[640px] md:w-[85vw] md:h-[85vw] max-w-[1280px] max-h-[1280px] will-change-transform transform-gpu"
          initial={{ x: "-50%", rotate: 0 }}
          animate={{ x: "-50%", rotate: 360 }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          style={{ transformOrigin: "center center" }}
        >
          <svg
            viewBox="0 0 1000 1000"
            className="w-full h-full fill-white"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "translate3d(0,0,0)",
            }}
          >
            <path
              id="giantTextCircle"
              d="M 500, 500 m -400, 0 a 400,400 0 1,1 800,0 a 400,400 0 1,1 -800,0"
              fill="none"
            />
            {/* The text inside the circle path */}
            <text className="text-[44px] md:text-[48px] font-black tracking-widest uppercase font-sans">
              <textPath href="#giantTextCircle" textLength="2513" startOffset="0%">
                LET&apos;S BUILD SOMETHING <tspan fill="#C9493D">TOGETHER</tspan> • LET&apos;S BUILD SOMETHING <tspan fill="#C9493D">TOGETHER</tspan> •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Inner Content (Heading & CTA Button) */}
        <div className="relative z-10 text-center flex flex-col items-center justify-end pb-4 sm:pb-8 md:pb-14 px-6 pointer-events-auto">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-4 sm:mb-6 max-w-3xl leading-[1.1] md:leading-[0.95] uppercase">
            Get In Touch<br />
            <span className="text-spectal-mint font-serif italic font-light lowercase text-base sm:text-2xl md:text-3xl lg:text-4xl block mt-2">
              Work with us, build with us, partner with us, but first…
            </span>
          </h2>
          <a
            id="bookings"
            href="mailto:bookings@spectalmanagement.com"
            data-interactive="true"
            className="group px-6 py-3 sm:px-8 sm:py-3.5 bg-white text-black text-[11px] sm:text-xs font-bold tracking-widest uppercase hover:bg-spectal-red hover:text-white transition-all duration-300 rounded-sm inline-flex items-center shadow-2xl"
          >
            Talk to us
            <span className="text-spectal-red group-hover:text-white ml-2.5 sm:ml-3 inline-block animate-pulse text-[10px]">●</span>
          </a>
        </div>
      </div>
    </section>
  );
}
