"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import Scene from "@/components/canvas/Scene";
import SpectalExperience from "@/components/canvas/SpectalExperience";
import Preloader from "@/components/ui/Preloader";
import Footer from "@/components/layout/Footer";
import RotatingArch from "@/components/ui/RotatingArch";
import { CLIENT_LOGOS } from "@/components/ui/ClientLogos";
import SocialFeed from "@/components/ui/SocialFeed";
import AboutSection from "@/components/ui/AboutSection";

const MANIFESTO = ["CRAFTING", "EXPERIENCES", "THAT", "CONNECT", "YOUTH,", "CULTURE", "AND", "BRANDS."];

const STATS = [
  { target: 350, suffix: "+", label: "Campus Festivals" },
  { target: 2000, suffix: "+", label: "Campus Shows" },
  { target: 250, suffix: "+", label: "Brand Experiences" },
  { target: 10, suffix: "+ YRS", label: "In Youth Culture" },
];

const ARTIST_MARQUEE = [
  "Ritviz", "Nucleya", "Prateek Kuhad", "When Chai Met Toast", "Seedhe Maut",
  "Nikhil Dsouza", "Ankur Tewari", "The Local Train", "Taba Chake", "Mihail",
  "Ritviz", "Nucleya", "Prateek Kuhad", "When Chai Met Toast", "Seedhe Maut",
  "Nikhil Dsouza", "Ankur Tewari", "The Local Train", "Taba Chake", "Mihail",
];

function CountUp({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let raf: number;
    const start = performance.now();
    const duration = 1800;
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.floor(eased * target));
      if (t < 1) raf = requestAnimationFrame(step);
      else setCount(target);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <span className="text-5xl md:text-7xl font-black tabular-nums text-spectal-mint drop-shadow-[0_0_20px_rgba(221,236,196,0.3)]">
        {count}{suffix}
      </span>
      <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">{label}</span>
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
  const videoX = useTransform(springX, [-0.5, 0.5], [15, -15]);
  const videoY = useTransform(springY, [-0.5, 0.5], [15, -15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    // Normalize coordinates around screen center (-0.5 to 0.5)
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);
  };

  // Entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    }
  };

  const wordVariants = {
    hidden: { filter: "blur(12px)", y: 40, opacity: 0 },
    visible: {
      filter: "blur(0px)",
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as const, delay: 0.8 }
    }
  };

  const logosContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 1.0,
      }
    }
  };

  const logoItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.0, ease: [0.22, 1, 0.36, 1] as const }
    }
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

        {/* Hero: Arrival Section (unnumbered) */}
        <section id="arrival" className="w-full h-screen flex items-center justify-center relative overflow-hidden bg-black mt-20 md:mt-24">

          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/horizontalformat.mp4" media="(min-width: 768px)" type="video/mp4" />
              <source src="/verticalformat.mp4" media="(max-width: 767px)" type="video/mp4" />
            </video>
          </div>

          {/* Gradient Overlay for bottom text visibility */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/60 to-transparent z-10 pointer-events-none" />

          {/* Client Logos Ticker - Staggered fade in */}
          <motion.div
            variants={logosContainerVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-6 left-0 w-full z-20 border-t border-white/5 pt-6 overflow-hidden pointer-events-auto"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <span className="text-[9px] font-mono tracking-[0.27em] text-white/30 uppercase whitespace-nowrap">
                BRANDS WE&apos;VE PARTNERED WITH
              </span>

              {/* Logo horizontal ticker */}
              <div className="flex-1 overflow-hidden relative w-full select-none">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24">
                  {CLIENT_LOGOS.map((logo, idx) => (
                    <motion.div
                      key={idx}
                      variants={logoItemVariants}
                      whileHover={{ scale: 1.08 }}
                      className="opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer flex-shrink-0"
                    >
                      <img src={logo.src} alt={logo.name} className="h-5 md:h-6 w-auto object-contain" />
                    </motion.div>
                  ))}
                  {/* Duplicate logos for seamless infinite scroll */}
                  {CLIENT_LOGOS.map((logo, idx) => (
                    <motion.div
                      key={`dup-${idx}`}
                      whileHover={{ scale: 1.08 }}
                      className="opacity-40 hover:opacity-100 transition-all duration-300 cursor-pointer flex-shrink-0"
                    >
                      <img src={logo.src} alt={logo.name} className="h-5 md:h-6 w-auto object-contain" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* MDNT-Inspired Infinite Scrolling Marquee Banner */}
        <div className="w-full py-6 bg-black/60 border-y border-white/5 overflow-hidden flex select-none relative z-20">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 pr-8">
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Brand Solutions</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Campus Experiences</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Landmark Events</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Youth Culture</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Gen-Z</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Gen-Alpha</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Live Experiences</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>

            {/* Duplicated for seamless loop */}
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Brand Solutions</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Campus Experiences</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Landmark Events</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Youth Culture</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Gen-Z</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Gen-Alpha</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Live Experiences</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
          </div>
        </div>

        {/* Section 1: Services / What We Do */}
        <section id="showcase" className="w-full py-16 md:py-24 flex items-center justify-center relative z-20 pointer-events-auto border-t border-white/5 bg-black">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col select-none">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="flex flex-col items-start">
                <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-3">
                  01 // WHAT WE CREATE
                </span>
                <h2 className="text-xl md:text-[1.8rem] lg:text-[2.2rem] font-boldonse font-medium tracking-tight text-white leading-[1.2] uppercase">
                  WHAT WE <span className="text-spectal-mint font-serif italic font-light">CREATE</span>
                </h2>
              </div>
              <p className="max-w-md text-xs font-mono text-spectal-mint/50 uppercase tracking-widest">
                [ Built around India&apos;s next generation ]
              </p>
            </div>
            {/* List Table of Projects */}
            <div className="w-full flex flex-col divide-y divide-white/10 mt-6">
              <div
                data-interactive="true"
                data-cursor="EXPLORE"
                className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-mono text-spectal-red">01 / BRAND</span>
                    <h3 className="text-xl md:text-2xl font-boldonse font-medium text-white tracking-wide group-hover:text-spectal-red transition-colors duration-500">BRAND SOLUTIONS</h3>
                  </div>
                  {/* Mobile-only inline preview image */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden md:hidden border border-white/10 relative">
                    <img src="/event_spatial.png" alt="Brand Solutions" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm text-spectal-mint font-light">Campaigns, properties, and cultural interventions built around business objectives.</span>
                  <span className="text-[10px] font-mono text-spectal-mint/40 uppercase tracking-wider">250+ Brand Experiences // Campaigns // Properties</span>
                </div>
              </div>



              <div
                data-interactive="true"
                data-cursor="EXPLORE"
                className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-mono text-spectal-red">02 / CAMPUS</span>
                    <h3 className="text-xl md:text-2xl font-boldonse font-medium text-white tracking-wide group-hover:text-spectal-red transition-colors duration-500">CAMPUS EXPERIENCES</h3>
                  </div>
                  {/* Mobile-only inline preview image */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden md:hidden border border-white/10 relative">
                    <img src="/event_hackathon.png" alt="Campus Experiences" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm text-spectal-mint font-light">College festivals, freshers&apos; seasons, student communities, and campus-led properties shaped with institutions across India.</span>
                  <span className="text-[10px] font-mono text-spectal-mint/40 uppercase tracking-wider">350+ Campus Festivals // 2,000+ Campus Shows</span>
                </div>
              </div>

              <div
                data-interactive="true"
                data-cursor="EXPLORE"
                className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-mono text-spectal-red">03 / EVENTS</span>
                    <h3 className="text-xl md:text-2xl font-boldonse font-medium text-white tracking-wide group-hover:text-spectal-red transition-colors duration-500">LANDMARK EVENTS</h3>
                  </div>
                  {/* Mobile-only inline preview image */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden md:hidden border border-white/10 relative">
                    <img src="/event_mainstage.png" alt="Landmark Events" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm text-spectal-mint font-light">End-to-end live event creation across programming, production, partnerships, audience experience, and on-ground execution.</span>
                  <span className="text-[10px] font-mono text-spectal-mint/40 uppercase tracking-wider">End-to-end Event Creation // Audience Experience</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: About — Cultural Manifesto */}
        <AboutSection />

        {/* Section 3: Brand Belief & Statistics */}
        <section id="stats" className="w-full py-16 md:py-24 flex flex-col items-center justify-center relative bg-black border-t border-white/5 z-20 pointer-events-auto">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-center">

            {/* Label */}
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] font-mono tracking-[0.45em] text-spectal-red/70 uppercase mb-8 select-none"
            >
              03 // WHO WE ARE
            </motion.span>

            {/* Word-by-word manifesto */}
            <h2 className="max-w-5xl mx-auto px-4 md:px-6 text-center text-[2.2rem] md:text-5xl lg:text-7xl font-black uppercase leading-[1.1] md:leading-[1.2] tracking-tighter select-none mb-16">
              {MANIFESTO.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-8%" }}
                  transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block mr-[0.28em] ${i >= 6 ? "text-spectal-mint drop-shadow-[0_0_30px_rgba(221,236,196,0.3)]" : "text-white"}`}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* Stat counters */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 w-full border-t border-white/10 pt-12 pointer-events-auto"
            >
              {STATS.map((s) => (
                <CountUp key={s.label} target={s.target} suffix={s.suffix} label={s.label} />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Section 4: Instagram Reels & Showreels */}
        <SocialFeed />

        {/* Section 5: Registration & Contact Portal */}
        <section id="silence" className="w-full flex flex-col items-center justify-center bg-black pointer-events-auto relative z-20 py-16 md:py-24 border-t border-white/5">
          <div className="max-w-xl w-full mx-auto px-6 text-center flex flex-col items-center select-none">
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-6">
              05 // GET IN TOUCH
            </span>
            <h2 className="text-xl md:text-[1.8rem] lg:text-[2.2rem] font-serif text-white tracking-widest uppercase mb-12 leading-[1.2]">
              WORK WITH US, BUILD WITH US, PARTNER WITH US,{" "}
              <span className="text-spectal-mint font-serif italic text-white/95">BUT FIRST&hellip;</span>
            </h2>

            {/* Booking / Inquiry Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="pointer-events-auto w-full flex flex-col space-y-4 mt-4 text-left"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="flex-grow bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-spectal-mint focus:ring-1 focus:ring-spectal-mint transition-all duration-300"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  required
                  className="flex-grow bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-spectal-mint focus:ring-1 focus:ring-spectal-mint transition-all duration-300"
                />
              </div>
              <input
                type="text"
                placeholder="What are you looking for? (Brand solutions, campus experiences, landmark events…)"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-spectal-mint focus:ring-1 focus:ring-spectal-mint transition-all duration-300"
              />
              <button
                type="submit"
                data-interactive="true"
                className="w-full py-4 bg-spectal-red text-spectal-charcoal text-xs font-mono tracking-widest uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(201,73,61,0.3)] transition-all duration-500 rounded-lg font-bold text-center"
              >
                Talk to us.
              </button>
            </form>
            <p className="text-[10px] font-mono text-spectal-mint/30 mt-6 tracking-wider uppercase">
              Or email us directly at bookings@spectalmanagement.com
            </p>
          </div>
        </section>

        <RotatingArch />
        <Footer />
      </div>

    </main>
  );
}
