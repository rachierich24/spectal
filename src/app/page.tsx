"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import Scene from "@/components/canvas/Scene";
import SpectalExperience from "@/components/canvas/SpectalExperience";
import Preloader from "@/components/ui/Preloader";
import Footer from "@/components/layout/Footer";
import { useExperience } from "@/lib/experienceStore";
import RotatingArch from "@/components/ui/RotatingArch";
import SocialFeed from "@/components/ui/SocialFeed";

const CLIENT_LOGOS = [
  {
    name: "Red Bull",
    svg: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 120 24">
        <text x="0" y="18" className="font-sans font-black tracking-widest text-base">RED BULL</text>
      </svg>
    )
  },
  {
    name: "Spotify",
    svg: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.485 17.306c-.215.352-.676.467-1.028.252-2.857-1.748-6.452-2.143-10.686-1.176-.402.093-.805-.162-.897-.564-.093-.402.162-.805.564-.897 4.636-1.06 8.594-.606 11.794 1.352.352.215.467.676.253 1.028v.005zm1.464-3.26c-.27 1.02-.756 1.488-1.57 1.155-3.272-2.012-8.258-2.593-12.132-1.416-.453.137-.923-.12-.1.06-.576.453-.137.923.12 1.06.576.453 4.428-1.34 10.02-1.06 13.8 2.01c.21.34.46.74.8 1.01.34-.1.44-.45.8-.8zm.126-3.414c-4.32-2.565-11.436-2.8-15.534-1.556-.66.2-1.36-.18-1.56-.84-.2-.66.18-1.36.84-1.56 4.716-1.428 12.576-1.14 17.544 1.812.594.354.792 1.12.438 1.716-.354.594-1.12.792-1.716.438z"/>
      </svg>
    )
  },
  {
    name: "Budweiser",
    svg: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 120 24">
        <text x="0" y="18" className="font-sans font-black tracking-widest text-base">BUDWEISER</text>
      </svg>
    )
  },
  {
    name: "OnePlus",
    svg: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 120 24">
        <text x="0" y="18" className="font-sans font-bold tracking-widest text-base">ONEPLUS</text>
      </svg>
    )
  },
  {
    name: "Coca-Cola",
    svg: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 120 24">
        <text x="0" y="18" className="font-serif italic font-black tracking-wider text-base">Coca-Cola</text>
      </svg>
    )
  },
  {
    name: "Bacardi",
    svg: (
      <svg className="h-5 w-auto fill-current" viewBox="0 0 120 24">
        <text x="0" y="18" className="font-sans font-black tracking-widest text-base">BACARDI</text>
      </svg>
    )
  }
];

export default function Home() {
  const [hoveredProjectImage, setHoveredProjectImage] = useState<string | null>(null);
  const { setEnergy } = useExperience();

  // Motion values for the floating project preview (avoids re-rendering the entire Home page on mouse move!)
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);

  // Springs for buttery smooth follow animation
  const previewXSpring = useSpring(previewX, { damping: 25, stiffness: 250, mass: 0.5 });
  const previewYSpring = useSpring(previewY, { damping: 25, stiffness: 250, mass: 0.5 });

  // Compute offset translations (preview is 256px wide by 160px tall, offset keeps it offset from cursor)
  const previewTranslateX = useTransform(previewXSpring, (x) => x + 20);
  const previewTranslateY = useTransform(previewYSpring, (y) => y - 120);

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
    // Floating project preview follow
    previewX.set(e.clientX);
    previewY.set(e.clientY);
    
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
    hidden: { filter: "blur(12px)", y: 30, opacity: 0 },
    visible: {
      filter: "blur(0px)",
      y: 0,
      opacity: 1,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] as const, delay: 0.8 }
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
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const }
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
        
        {/* Section 1: Arrival Hero Section */}
        <section id="arrival" className="w-full h-screen flex items-center justify-center pointer-events-none relative overflow-hidden bg-black">
          
          {/* Background Video with subtle parallax and zoom */}
          <motion.div 
            style={{ x: videoX, y: videoY }}
            className="absolute inset-0 w-[108%] h-[108%] -left-[4%] -top-[4%] z-0 pointer-events-none opacity-40 select-none overflow-hidden"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover animate-video-zoom"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-glowing-plexus-connections-background-loop-33319-large.mp4" type="video/mp4" />
              <source src="/loader.mp4" type="video/mp4" />
            </video>
          </motion.div>

          {/* Cinematic Overlay mask */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black z-0 pointer-events-none" />

          {/* Grid Layout Container */}
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col lg:flex-row justify-between items-start lg:items-end h-full select-none pt-32 pb-32 relative z-10 gap-8 lg:gap-12">
            
            {/* Left Column: Huge bold headline with blur to sharp entry */}
            <motion.div 
              style={{ x: headlineX, y: headlineY }}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-start w-full lg:w-[62%] xl:w-[65%] lg:max-w-[760px] pointer-events-auto mt-auto mb-8 lg:mb-0"
            >
              <motion.span 
                variants={wordVariants}
                className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-6 block uppercase"
              >
                [ SPECTAL MANAGEMENT ]
              </motion.span>
              
              <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] lg:text-[4.8rem] xl:text-[5.8rem] font-black tracking-tighter text-white leading-[0.9] font-inter-tight uppercase">
                <motion.span variants={wordVariants} className="block">WE MANAGE</motion.span>
                <motion.span variants={wordVariants} className="block">EXCEPTIONAL TALENT</motion.span>
                <motion.span variants={wordVariants} className="block">&amp; PRODUCE</motion.span>
                <motion.span 
                  variants={wordVariants} 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-spectal-red to-spectal-mint drop-shadow-[0_0_25px_rgba(221,236,196,0.25)]"
                >
                  UNFORGETTABLE
                </motion.span>
                <motion.span 
                  variants={wordVariants} 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-spectal-red to-spectal-mint drop-shadow-[0_0_25px_rgba(221,236,196,0.25)]"
                >
                  EVENTS.
                </motion.span>
              </h1>
            </motion.div>

            {/* Right Column: Supporting text & CTAs */}
            <div className="flex flex-col items-start lg:items-end text-left lg:text-right w-full lg:w-[33%] xl:w-[30%] lg:max-w-[320px] xl:max-w-[380px] pointer-events-auto lg:mt-auto mb-16 lg:mb-0">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] as const, delay: 0.7 }}
                className="text-lg text-white/80 font-light leading-relaxed mb-8"
              >
                Spectal is a boutique agency curating 360° talent management, live concerts, college festivals, and brand activations across India.
              </motion.p>
              
              {/* Buttons with premium scale & shadow effects */}
              <motion.div 
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4 w-full justify-start lg:justify-end"
              >
                {/* Primary: Glass button with glow */}
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(221,236,196,0.35)", background: "rgba(255,255,255,0.12)" }}
                  whileTap={{ scale: 0.98 }}
                  data-interactive="true"
                  className="px-6 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-full font-bold shadow-lg"
                >
                  Book With Us
                </motion.a>
                
                {/* Secondary: Transparent outline button */}
                <motion.a
                  href="#showcase"
                  whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.05)" }}
                  whileTap={{ scale: 0.98 }}
                  data-interactive="true"
                  className="px-6 py-4 border border-white/20 text-white text-xs font-mono tracking-widest uppercase transition-all duration-300 rounded-full font-bold"
                >
                  View Services
                </motion.a>
              </motion.div>
            </div>
          </div>

          {/* Client Logos Ticker - Staggered fade in */}
          <motion.div 
            variants={logosContainerVariants}
            initial="hidden"
            animate="visible"
            className="absolute bottom-6 left-0 w-full z-20 border-t border-white/5 pt-6 overflow-hidden pointer-events-auto"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <span className="text-[9px] font-mono tracking-[0.27em] text-white/30 uppercase whitespace-nowrap">
                TRUSTED BY LEADING BRANDS &amp; PARTNERS
              </span>
              
              {/* Logo horizontal ticker */}
              <div className="flex-1 overflow-hidden relative w-full select-none">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24">
                  {CLIENT_LOGOS.map((logo, idx) => (
                    <motion.div 
                      key={idx}
                      variants={logoItemVariants}
                      whileHover={{ scale: 1.08 }}
                      className="text-white/40 hover:text-white transition-all duration-300 cursor-pointer flex-shrink-0"
                    >
                      {logo.svg}
                    </motion.div>
                  ))}
                  {/* Duplicate logos for seamless infinite scroll */}
                  {CLIENT_LOGOS.map((logo, idx) => (
                    <motion.div 
                      key={`dup-${idx}`}
                      whileHover={{ scale: 1.08 }}
                      className="text-white/40 hover:text-white transition-all duration-300 cursor-pointer flex-shrink-0"
                    >
                      {logo.svg}
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
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">360° Talent Management</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">College Festivals</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Brand Activation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Live Performances</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Tour Curation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Music & Comedy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Digital Content</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>

            {/* Duplicated for seamless loop */}
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">360° Talent Management</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">College Festivals</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Brand Activation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Live Performances</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Tour Curation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Music & Comedy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Digital Content</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
          </div>
        </div>

        {/* Section 4: Project Showcase — Editorial Project Grid */}
        <section id="showcase" className="w-full min-h-screen py-24 flex items-center justify-center relative z-20 pointer-events-auto border-t border-white/5">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col select-none">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="flex flex-col items-start">
                <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-3">
                  04 // SERVICES
                </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none">
                  WHAT WE <span className="text-spectal-mint font-serif italic font-light">DO</span>
                </h2>
              </div>
              <p className="max-w-md text-xs font-mono text-spectal-mint/50 uppercase tracking-widest">
                [ End-to-end solutions for artists, brands &amp; campuses ]
              </p>
            </div>
            {/* List Table of Projects */}
            <div className="w-full flex flex-col divide-y divide-white/10 mt-6">
              <div
                data-interactive="true"
                data-cursor="EXPLORE"
                onMouseEnter={() => setHoveredProjectImage("/event_spatial.png")}
                onMouseLeave={() => setHoveredProjectImage(null)}
                className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-mono text-spectal-red">01 / SERVICE</span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight group-hover:text-spectal-red transition-colors duration-300">TALENT MANAGEMENT</h3>
                  </div>
                  {/* Mobile-only inline preview image */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden md:hidden border border-white/10 relative">
                    <img src="/event_spatial.png" alt="Talent Management" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm text-spectal-mint font-light">Full 360° artist representation — live show bookings, brand deals, social media strategy, tour curation, and complete legal &amp; commercial affairs.</span>
                  <span className="text-[10px] font-mono text-spectal-mint/40 uppercase tracking-wider">50+ Artists // Music // Comedy // Brand Associations</span>
                </div>
              </div>

              <div
                data-interactive="true"
                data-cursor="EXPLORE"
                onMouseEnter={() => setHoveredProjectImage("/event_mainstage.png")}
                onMouseLeave={() => setHoveredProjectImage(null)}
                className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-mono text-white">02 / SERVICE</span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight group-hover:text-spectal-mint transition-colors duration-300">EVENT PRODUCTION</h3>
                  </div>
                  {/* Mobile-only inline preview image */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden md:hidden border border-white/10 relative">
                    <img src="/event_mainstage.png" alt="Event Production" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm text-spectal-mint font-light">End-to-end production of live concerts and campus festivals. We manage logistics, stage, artist booking, and crowd experience across India.</span>
                  <span className="text-[10px] font-mono text-spectal-mint/40 uppercase tracking-wider">200+ Events // 30+ Cities // College Festivals // Concerts</span>
                </div>
              </div>

              <div
                data-interactive="true"
                data-cursor="EXPLORE"
                onMouseEnter={() => setHoveredProjectImage("/event_hackathon.png")}
                onMouseLeave={() => setHoveredProjectImage(null)}
                className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300 pointer-events-auto"
              >
                <div className="flex flex-col gap-4 w-full md:w-auto">
                  <div className="flex items-center gap-8">
                    <span className="text-sm font-mono text-spectal-red">03 / SERVICE</span>
                    <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight group-hover:text-spectal-red transition-colors duration-300">BRAND ACTIVATION</h3>
                  </div>
                  {/* Mobile-only inline preview image */}
                  <div className="w-full aspect-[16/10] rounded-xl overflow-hidden md:hidden border border-white/10 relative">
                    <img src="/event_hackathon.png" alt="Brand Activation" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm text-spectal-mint font-light">Unique branded experiences and artist partnerships that connect young brands to engaged audiences. Digital content, social campaigns, and live integrations.</span>
                  <span className="text-[10px] font-mono text-spectal-mint/40 uppercase tracking-wider">50+ Brand Experiences // Digital Content // Social Strategy</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Energy — scroll spacer for WebGL wave */}
        <section id="energy" className="w-full min-h-screen pointer-events-none" />

        {/* Transition Gap between Energy and Impact */}
        <div className="w-full h-screen pointer-events-none" />

        {/* Section 3: Impact — Interactive Event Gallery */}
        <section id="impact" className="w-full min-h-screen py-24 flex items-center justify-center relative z-20 pointer-events-auto">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col select-none">
            <div className="flex flex-col items-start mb-16">
              <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-3">
                03 // OUR EVENTS
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none">
                EVENTS &amp; <span className="text-spectal-mint font-serif italic font-light">PRODUCTIONS</span>
              </h2>
              <p className="text-xs font-mono text-white/40 mt-4 tracking-wider uppercase">
                [ From college campuses to mainstage arenas ]
              </p>
            </div>

            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
              {/* Image 1: Mainstage (7-col card) */}
              <div
                data-cursor="VIEW"
                className="md:col-span-7 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[280px] sm:h-[340px] md:h-[400px] transition-all duration-500 hover:border-spectal-red/40 hover:shadow-[0_0_30px_rgba(201,73,61,0.1)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('/event_mainstage.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-spectal-red uppercase block mb-1">Live Concert</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Mainstage Live Productions</h3>
                  <p className="text-xs text-spectal-mint/70 mt-2 font-light max-w-md">High-energy concert productions featuring India's top independent artists, managed end-to-end by Spectal.</p>
                </div>
              </div>

              {/* Image 2: Spatial (5-col card) */}
              <div
                data-cursor="VIEW"
                className="md:col-span-5 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[280px] sm:h-[340px] md:h-[400px] transition-all duration-500 hover:border-spectal-mint/40 hover:shadow-[0_0_30px_rgba(221,236,196,0.1)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('/event_spatial.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-spectal-mint uppercase block mb-1">Campus Festival</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">College Campus Festivals</h3>
                  <p className="text-xs text-spectal-mint/70 mt-2 font-light">End-to-end campus festival management bringing popular artists to college audiences across 30+ cities.</p>
                </div>
              </div>

              {/* Image 3: Hackathon (5-col card) */}
              <div
                data-cursor="VIEW"
                className="md:col-span-5 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[240px] sm:h-[300px] md:h-[350px] transition-all duration-500 hover:border-spectal-mint/40 hover:shadow-[0_0_30px_rgba(221,236,196,0.1)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('/event_hackathon.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-spectal-mint uppercase block mb-1">Brand Activation</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Brand &amp; Artist Collabs</h3>
                  <p className="text-xs text-spectal-mint/70 mt-2 font-light">Custom branded experiences connecting India's young brands with engaged audiences through live event integrations.</p>
                </div>
              </div>

              {/* Image 4: Networking (7-col card) */}
              <div
                data-cursor="VIEW"
                className="md:col-span-7 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[240px] sm:h-[300px] md:h-[350px] transition-all duration-500 hover:border-spectal-red/40 hover:shadow-[0_0_30px_rgba(201,73,61,0.1)]"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('/event_networking.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-spectal-red uppercase block mb-1">Networking</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Industry Networking Events</h3>
                  <p className="text-xs text-spectal-mint/70 mt-2 font-light">VIP mixers and industry forums connecting artists, label heads, brand managers, and event directors.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Legacy — scroll spacer for WebGL galaxy */}
        <section id="legacy" className="w-full min-h-screen pointer-events-none" />

        {/* Section 7: Registration Portal (Silence) */}
        <section id="silence" className="w-full min-h-screen lg:h-screen flex flex-col items-center justify-center bg-black pointer-events-none relative z-20 py-16 lg:py-24">
          <div className="max-w-xl w-full mx-auto px-6 text-center flex flex-col items-center select-none">
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-6">
              07 // CONTACT
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase mb-10 leading-tight">
              BOOK WITH <span className="text-spectal-mint font-serif italic text-white/95">US</span>
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
                placeholder="What are you looking for? (Talent booking, event, brand activation…)"
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-spectal-mint focus:ring-1 focus:ring-spectal-mint transition-all duration-300"
              />
              <button
                type="submit"
                data-interactive="true"
                className="w-full py-4 bg-spectal-red text-spectal-charcoal text-xs font-mono tracking-widest uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(201,73,61,0.3)] transition-all duration-500 rounded-lg font-bold text-center"
              >
                Send Inquiry
              </button>
            </form>
            <p className="text-[10px] font-mono text-spectal-mint/30 mt-6 tracking-wider uppercase">
              Or email us directly at bookings@spectalmanagement.com
            </p>
          </div>
        </section>

        <SocialFeed />
        <RotatingArch />
        <Footer />
      </div>

      {/* Floating Reveal on Hover Image Preview for Project Showcase */}
      <AnimatePresence>
        {hoveredProjectImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -4 }}
            animate={{
              opacity: 1,
              scale: 1.05,
              rotate: 3,
            }}
            style={{
              x: previewTranslateX,
              y: previewTranslateY,
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: -4 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed top-0 left-0 pointer-events-none z-[800] w-64 h-40 bg-white/5 border border-white/20 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-sm will-change-transform"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${hoveredProjectImage})` }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
