"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import Scene from "@/components/canvas/Scene";
import SpectalExperience from "@/components/canvas/SpectalExperience";
import Preloader from "@/components/ui/Preloader";
import Footer from "@/components/layout/Footer";
import RotatingArch from "@/components/ui/RotatingArch";
import SocialFeed from "@/components/ui/SocialFeed";
import AboutSection from "@/components/ui/AboutSection";
import SpectalLogotype from "@/components/ui/SpectalLogotype";

const MANIFESTO = ["CRAFTING", "EXPERIENCES", "THAT", "CONNECT", "YOUTH,", "CULTURE", "AND", "BRANDS."];

const STATS = [
  { target: 50, suffix: "+", label: "Brand Partners" },
  { target: 270, suffix: "+", label: "Artists" },
  { target: 1.4, decimals: 1, suffix: "k+", label: "Events Curated" },
  { target: 3, suffix: "M+", label: "Youth Engaged" },
];

function CountUp({
  target,
  decimals = 0,
  prefix = "",
  suffix,
  label,
}: {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const displayRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!isInView) return;
    let raf: number;
    const start = performance.now();
    const duration = 1800;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = eased * target;
      // Write directly to DOM — zero React re-renders during animation
      if (displayRef.current) {
        displayRef.current.textContent =
          prefix +
          (decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toString()) +
          suffix;
      }
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, decimals, prefix, suffix]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <span
        ref={displayRef}
        className="text-4xl sm:text-5xl md:text-7xl font-black tabular-nums text-spectal-mint drop-shadow-[0_0_20px_rgba(221,236,196,0.3)] font-syne"
      >
        {prefix}0{suffix}
      </span>
      <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.25em] text-white/50 text-center">
        {label}
      </span>
    </div>
  );
}

export default function Home() {
  // Mouse position motion values for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring setup for high-fidelity interactive feel
  const springX = useSpring(mouseX, { stiffness: 85, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 85, damping: 22 });

  // Parallax offsets
  const headlineX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
  const headlineY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const normX = e.clientX / window.innerWidth - 0.5;
    const normY = e.clientY / window.innerHeight - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);
  };

  return (
    <main className="relative w-full overflow-hidden" onMouseMove={handleMouseMove}>
      <Preloader />
      {/* Film Grain Overlay */}
      <div className="film-grain" />

      {/* Global 3D Canvas Background */}
      <Scene>
        <ambientLight intensity={0.5} />
        <SpectalExperience />
      </Scene>

      {/* Foreground HTML overlay for scrolling and text content */}
      <div className="relative w-full z-10 flex flex-col pointer-events-none">

        {/* =====================================================================
            HERO: VIDEO WITH LOGO
           ===================================================================== */}
        <section
          id="arrival"
          className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-black"
        >
          {/* Background Video — single source; CSS positions for mobile/desktop */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            >
              <source src="/horizontalformat.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Transparent Spectal Logo Over Video */}
          <motion.div
            style={{ x: headlineX, y: headlineY }}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="absolute inset-x-0 bottom-20 md:bottom-24 z-20 flex items-center justify-center px-6 md:px-12 pointer-events-none select-none"
          >
            <div className="w-full max-w-[550px] md:max-w-[750px] lg:max-w-[900px]">
              <SpectalLogotype className="w-full h-auto text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]" />
            </div>
          </motion.div>

          {/* Gradient Overlay for subtle bottom blend */}
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />
        </section>

        {/* =====================================================================
            TRANSITION / MANIFESTO: CRAFTING EXPERIENCES THAT CONNECT YOUTH...
           ===================================================================== *        {/* =====================================================================
            TRANSITION / MANIFESTO: CRAFTING EXPERIENCES THAT CONNECT YOUTH...
           ===================================================================== */}
        <section className="w-full py-20 md:py-28 bg-black flex flex-col items-center justify-center relative z-20 pointer-events-auto border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 md:px-12 text-center select-none">
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-syne font-black uppercase leading-[1.08] tracking-tight">
              {MANIFESTO.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: false, margin: "-10%" }}
                  transition={{ duration: 0.65, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block mr-[0.28em] ${
                    i >= 4
                      ? "text-spectal-mint drop-shadow-[0_0_30px_rgba(221,236,196,0.3)]"
                      : "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>
        </section>

        {/* Infinite Scrolling Marquee Banner (What We Create Headings) */}
        <div className="w-full py-5 bg-black/90 border-y border-white/10 overflow-hidden flex select-none relative z-20">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 pr-8 will-change-transform transform-gpu">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-8">
                <span className="text-xs md:text-sm font-mono tracking-[0.25em] text-spectal-red uppercase font-bold">
                  Brand Solutions
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>

                <span className="text-xs md:text-sm font-mono tracking-[0.25em] text-white uppercase font-bold">
                  Campus Experiences
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>

                <span className="text-xs md:text-sm font-mono tracking-[0.25em] text-spectal-mint uppercase font-bold">
                  Landmark Events
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            01: WHO WE ARE
           ===================================================================== */}
        <AboutSection />

        {/* =====================================================================
            02: WHAT WE CREATE
           ===================================================================== */}
        <section
          id="showcase"
          className="w-full py-20 md:py-32 flex items-center justify-center relative z-20 pointer-events-auto border-t border-white/5 bg-black"
        >
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col select-none">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
            >
              <div className="flex flex-col items-start gap-2">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-boldonse font-medium tracking-tight text-white leading-[1.1] uppercase">
                  WHAT WE <span className="text-spectal-mint font-serif italic font-light">CREATE</span>
                </h2>
              </div>
              <p className="max-w-md text-xs font-mono text-spectal-mint/60 uppercase tracking-widest">
                [ Built around India&apos;s next generation ]
              </p>
            </motion.div>

            {/* List of Services */}
            <div className="w-full flex flex-col divide-y divide-white/10 mt-4">
              
              {/* Item 1: Brand Solutions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.7, delay: 0.05 }}
                data-interactive="true"
                data-cursor="EXPLORE"
                className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-8">
                    <h3 className="text-xl md:text-3xl font-boldonse font-medium text-white tracking-wide group-hover:text-spectal-red transition-colors duration-500">
                      BRAND SOLUTIONS
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm md:text-base text-spectal-mint font-light leading-relaxed">
                    Campaigns, properties, and cultural interventions built around business objectives.
                  </span>
                </div>
              </motion.div>

              {/* Item 2: Campus Experiences */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                data-interactive="true"
                data-cursor="EXPLORE"
                className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-8">
                    <h3 className="text-xl md:text-3xl font-boldonse font-medium text-white tracking-wide group-hover:text-spectal-red transition-colors duration-500">
                      CAMPUS EXPERIENCES
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm md:text-base text-spectal-mint font-light leading-relaxed">
                    College festivals, freshers&apos; seasons, student communities, and campus-led properties shaped with institutions across India.
                  </span>
                </div>
              </motion.div>

              {/* Item 3: Landmark Events */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.7, delay: 0.15 }}
                data-interactive="true"
                data-cursor="EXPLORE"
                className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-8">
                    <h3 className="text-xl md:text-3xl font-boldonse font-medium text-white tracking-wide group-hover:text-spectal-red transition-colors duration-500">
                      LANDMARK EVENTS
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm md:text-base text-spectal-mint font-light leading-relaxed">
                    End-to-end live event creation across programming, production, partnerships, audience experience, and on-ground execution.
                  </span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* =====================================================================
            03: STATS / IMPACT
           ===================================================================== */}
        <section
          id="stats"
          className="w-full py-20 md:py-32 flex flex-col items-center justify-center relative bg-black border-t border-white/5 z-20 pointer-events-auto"
        >
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-center">
            
            {/* Stat counters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 w-full pt-4 pointer-events-auto"
            >
              {STATS.map((s) => (
                <CountUp
                  key={s.label}
                  target={s.target}
                  decimals={s.decimals}
                  suffix={s.suffix}
                  label={s.label}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* =====================================================================
            04: BUILT BY SPECTAL (INSTAGRAM POSTS / REELS)
           ===================================================================== */}
        <SocialFeed />



        {/* Rotating Arch & Footer */}
        <RotatingArch />
        <Footer />
      </div>
    </main>
  );
}
