"use client";

import React from "react";
import { motion } from "framer-motion";

export default function RotatingArch() {
  return (
    <section className="w-full relative bg-[#050505] overflow-hidden pt-16 pb-12 flex flex-col items-center justify-center border-b border-spectal-mint/50">
      {/* The Container for the arch effect */}
      <div className="relative w-full max-w-[1400px] h-[50vw] md:h-[30vw] max-h-[420px] overflow-hidden flex items-end justify-center pointer-events-none">

        {/* The SVG Circle - Hardware accelerated motion.div for buttery smooth spinning */}
        <motion.div
          className="absolute top-0 left-[50%] w-[120vw] h-[120vw] md:w-[75vw] md:h-[75vw] max-w-[1100px] max-h-[1100px] will-change-transform"
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
            <text className="text-[48px] font-black tracking-widest uppercase font-sans">
              <textPath href="#giantTextCircle" textLength="2513" startOffset="0%">
                LET&apos;S BUILD SOMETHING <tspan fill="#C9493D">TOGETHER</tspan> • LET&apos;S BUILD SOMETHING <tspan fill="#C9493D">TOGETHER</tspan> •
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* Inner Content (Text and CTA) */}
        <div className="relative z-10 text-center flex flex-col items-center justify-end pb-6 md:pb-10 pointer-events-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-black tracking-tighter text-white mb-6 max-w-2xl leading-[0.9]">
            Tell us what you&apos;re working on.<br />
            We&apos;ll show you what&apos;s possible.
          </h2>
          <a
            href="/contact"
            className="group px-7 py-3 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-spectal-red hover:text-white transition-all duration-300 rounded-sm inline-flex items-center"
          >
            GET IN TOUCH
            <span className="text-spectal-red group-hover:text-white ml-3 inline-block animate-pulse text-[10px]">●</span>
          </a>
        </div>
      </div>
    </section>
  );
}
