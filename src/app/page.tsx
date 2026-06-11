"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scene from "@/components/canvas/Scene";
import SpectalExperience from "@/components/canvas/SpectalExperience";
import Preloader from "@/components/ui/Preloader";
import Footer from "@/components/layout/Footer";
import { useExperience } from "@/lib/experienceStore";
import RotatingArch from "@/components/ui/RotatingArch";
import SocialFeed from "@/components/ui/SocialFeed";

export default function Home() {
  const [hoveredProjectImage, setHoveredProjectImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { setEnergy } = useExperience();

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <main className="relative w-full overflow-hidden" onMouseMove={handleMouseMove}>
      <Preloader />
      
      {/* Global 3D Canvas Background */}
      <Scene>
        <ambientLight intensity={0.5} />
        <SpectalExperience />
      </Scene>

      {/* Foreground HTML overlay for scrolling and text content */}
      <div className="relative w-full z-10 flex flex-col pointer-events-none">
        
        {/* Section 1: Arrival (Summit Portal Entry) */}
        <section id="arrival" className="w-full h-screen flex items-center justify-center pointer-events-none relative">
          
          {/* MDNT-Inspired Spinning Circular Text Badge */}
          <div className="absolute right-6 md:right-16 top-24 md:top-32 w-28 h-28 md:w-36 md:h-36 select-none pointer-events-none z-10 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full text-spectal-mint/20 fill-current">
              <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="none" />
              <text className="font-mono text-[7px] uppercase tracking-[0.17em]">
                <textPath href="#circlePath">
                  SPECTAL MANAGEMENT • NEW DELHI • EST. 2015 •
                </textPath>
              </text>
            </svg>
          </div>

          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full select-none pt-24 pb-12">
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-4 animate-pulse">
              SPECTAL MANAGEMENT // TALENT &amp; EVENTS AGENCY
            </span>
            <h1 className="text-5xl md:text-[5.5rem] lg:text-[7rem] font-bold tracking-tighter mix-blend-difference text-white leading-none">
              We manage <span className="text-spectal-red">exceptional talent</span> <br />
              &amp; produce <span className="text-spectal-mint font-serif italic text-white/95">unforgettable events</span>.
            </h1>
            <p className="max-w-md text-sm md:text-base font-light tracking-wide text-spectal-mint/70 mt-6 md:mt-8 leading-relaxed">
              A boutique agency for 360° talent management, live concerts, college festivals, and brand activation across 30+ cities in India.
            </p>
            <div className="mt-8 pointer-events-auto">
              <a
                href="#silence"
                data-interactive="true"
                className="px-8 py-4 bg-spectal-red text-spectal-charcoal text-xs font-mono tracking-widest uppercase hover:bg-white transition-all duration-300 rounded-none shadow-[0_4px_15px_rgba(201,73,61,0.2)] font-bold"
              >
                Book With Us
              </a>
            </div>
          </div>
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
                <div className="flex items-center gap-8">
                  <span className="text-sm font-mono text-spectal-red">01 / SERVICE</span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight group-hover:text-spectal-red transition-colors duration-300">TALENT MANAGEMENT</h3>
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
                <div className="flex items-center gap-8">
                  <span className="text-sm font-mono text-white">02 / SERVICE</span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight group-hover:text-spectal-mint transition-colors duration-300">EVENT PRODUCTION</h3>
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
                <div className="flex items-center gap-8">
                  <span className="text-sm font-mono text-spectal-red">03 / SERVICE</span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight group-hover:text-spectal-red transition-colors duration-300">BRAND ACTIVATION</h3>
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
                className="md:col-span-7 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[400px] transition-all duration-500 hover:border-spectal-red/40 hover:shadow-[0_0_30px_rgba(201,73,61,0.1)]"
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
                className="md:col-span-5 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[400px] transition-all duration-500 hover:border-spectal-mint/40 hover:shadow-[0_0_30px_rgba(221,236,196,0.1)]"
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
                className="md:col-span-5 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[350px] transition-all duration-500 hover:border-spectal-mint/40 hover:shadow-[0_0_30px_rgba(221,236,196,0.1)]"
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
                className="md:col-span-7 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[350px] transition-all duration-500 hover:border-spectal-red/40 hover:shadow-[0_0_30px_rgba(201,73,61,0.1)]"
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
        <section id="silence" className="w-full h-screen flex flex-col items-center justify-center bg-black pointer-events-none relative z-20 py-24">
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

        {/* Section 8: Work Teaser — removed text overlay */}
        <section id="work-teaser" className="w-full min-h-[50vh] pointer-events-none" />

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
              x: mousePos.x + 20, 
              y: mousePos.y - 120 
            }}
            exit={{ opacity: 0, scale: 0.8, rotate: -4 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed top-0 left-0 pointer-events-none z-[800] w-64 h-40 bg-white/5 border border-white/20 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-sm"
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
