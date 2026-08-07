"use client";

import { useRef, useState } from "react";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Experiential Services list
const SERVICES = [
  {
    title: "Pop-Up Branded Activations",
    description: "Temporary physical spaces designed to spark immediate attention and create memorable, highly shareable brand moments.",
    icon: (
      <svg className="h-6 w-6 text-spectal-red" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615 3.001 3.001 0 0 0 3.75.615 3.001 3.001 0 0 0 3.75-.615 3.001 3.001 0 0 0 3.75.615m-15 0h15m-15 0a3.001 3.001 0 0 1-3.75-.615 3.001 3.001 0 0 1 3.75-.615m15 0a3.001 3.001 0 0 0 3.75-.615 3.001 3.001 0 0 0-3.75-.615m-15 0V5.25A2.25 2.25 0 0 1 5.25 3h13.5A2.25 2.25 0 0 1 21 5.25v2.884" />
      </svg>
    ),
    accent: "border-spectal-red/25 hover:border-spectal-red/60"
  },
  {
    title: "Product Launches & Sampling Campaigns",
    description: "Strategic campaign moments that put your product directly into people's hands — and into their long-term memory.",
    icon: (
      <svg className="h-6 w-6 text-spectal-mint" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.63 2.25a14.98 14.98 0 0 0-6.16 12.12 14.98 14.98 0 0 0 12.12 6.16v-6.16m1.41-1.41-1.41 1.41m0 0-1.41-1.41m1.41 1.41-1.41-1.41m8.48-8.48a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
    accent: "border-spectal-mint/25 hover:border-spectal-mint/60"
  },
  {
    title: "Event Sponsorship Activations",
    description: "We turn sponsorship placements into immersive interactive experiences that festival and event audiences actively engage with.",
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.462M3 15h13.882c1.11 0 2.051-.836 2.242-1.927l1.089-6.223A2.25 2.25 0 0 0 18.98 4.25H5.77M3 15V4.25m0 0h2.77m0 0v10.283" />
      </svg>
    ),
    accent: "border-white/10 hover:border-white/40"
  },
  {
    title: "Mobile & Touring Experiences",
    description: "Scalable brand experiences on wheels that travel across multiple cities and markets while maintaining logistical consistency and brand impact.",
    icon: (
      <svg className="h-6 w-6 text-spectal-red" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25M3 14.25h12v4.5M3 14.25V6.375A1.125 1.125 0 0 1 4.125 5.25H12a1.125 1.125 0 0 1 1.125 1.125v1.875m-10.125 6H12m4.875-3H21m-4.875 0h-3.375m3.375 0V6.75m0 3.375h1.5m-1.5 0V11.25m-3.375 0v3m-1.5-3v3" />
      </svg>
    ),
    accent: "border-spectal-red/25 hover:border-spectal-red/60"
  },
  {
    title: "Field Marketing Campaigns",
    description: "On-the-ground, high-energy promoter teams delivering direct brand interactions where your target audience already lives, plays, and moves.",
    icon: (
      <svg className="h-6 w-6 text-spectal-mint" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    accent: "border-spectal-mint/25 hover:border-spectal-mint/60"
  },
  {
    title: "In-Real-Life Marketing",
    description: " experiential campaigns engineered to connect brand values with human emotions in authentic physical environments.",
    icon: (
      <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a2.25 2.25 0 0 0-1.544-1.544L15.165 7l1.032-.259a2.25 2.25 0 0 0 1.544-1.544L18 4.165l.259 1.032a2.25 2.25 0 0 0 1.544 1.544L20.835 7l-1.032.259a2.25 2.25 0 0 0-1.544 1.544L18 8.715ZM16.894 20.567 16.5 21.5l-.394-.933a1.125 1.125 0 0 0-.773-.773L14.4 19.4l.933-.394a1.125 1.125 0 0 0 .773-.773l.394-.933.394.933a1.125 1.125 0 0 0 .773.773l.933.394-.933.394a1.125 1.125 0 0 0-.773.773Z" />
      </svg>
    ),
    accent: "border-white/10 hover:border-white/40"
  }
];

// Select Brand Case Studies
const CASE_STUDIES = [
  {
    title: "Red Bull Jukebox",
    desc: "Engaged over 500 consumers in person, providing a polished show-day experience.",
    tag: "Brands",
    image: "/event_hackathon.png"
  },
  {
    title: "Patron Golf Activations",
    desc: "Offloading complete logistics and execution for Patrón's premium sales activations.",
    tag: "Activations",
    image: "/event_networking.png"
  },
  {
    title: "Buona Beef Sampling",
    desc: "Over 800 consumer conversations and samplings across 7 locations in two weeks.",
    tag: "Sampling",
    image: "/event_spatial.png"
  }
];

export default function BrandsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook scroll progress for sticky hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll transforms for sticky hero text
  const title1Opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const title1Y = useTransform(scrollYProgress, [0, 0.25], [0, -40]);

  const title2Opacity = useTransform(scrollYProgress, [0.22, 0.47], [0, 1]);
  const title2Y = useTransform(scrollYProgress, [0.22, 0.47], [40, 0]);

  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.15]);
  const bgScale = useTransform(scrollYProgress, [0, 0.8], [1, 1.08]);

  const introOpacity = useTransform(scrollYProgress, [0.45, 0.7], [0, 1]);
  const introY = useTransform(scrollYProgress, [0.45, 0.7], [30, 0]);

  return (
    <main className="relative w-full min-h-screen bg-[#030303] overflow-hidden text-white">
      <Preloader />

      {/* Sticky Hero Section (Container has height to let user scroll through frames) */}
      <div ref={containerRef} className="relative w-full h-[220vh] z-10">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center items-center">
          
          {/* Parallax Background Image */}
          <motion.div 
            style={{ opacity: bgOpacity, scale: bgScale }}
            className="absolute inset-0 z-0 bg-cover bg-center"
          >
            <div className="absolute inset-0 bg-black/75 z-10" />
            <img 
              src="/event_mainstage.png" 
              alt="Activation Crowd" 
              className="w-full h-full object-cover" 
            />
          </motion.div>

          {/* Frame 1: From Campaign Ideas */}
          <motion.div
            style={{ opacity: title1Opacity, y: title1Y }}
            className="absolute z-20 flex flex-col items-center text-center px-6"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-spectal-red uppercase mb-4">
              EXPERIENTIAL AGENCY
            </span>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              From <span className="text-spectal-mint font-serif italic text-white/95">campaign</span> ideas
            </h1>
          </motion.div>

          {/* Frame 2: To In-Real-Life Experiences */}
          <motion.div
            style={{ opacity: title2Opacity, y: title2Y }}
            className="absolute z-20 flex flex-col items-center text-center px-6"
          >
            <span className="text-[10px] font-mono tracking-[0.4em] text-spectal-red uppercase mb-4">
              SPECTAL ACTIVATIONS
            </span>
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              To in-real-life <span className="text-spectal-mint font-serif italic text-white/95">experiences</span>
            </h1>
          </motion.div>

          {/* Frame 3: Description & CTAs (Fades in at final scroll stage) */}
          <motion.div
            style={{ opacity: introOpacity, y: introY }}
            className="absolute z-20 flex flex-col items-center text-center max-w-2xl px-6"
          >
            <p className="text-base md:text-lg text-white/70 leading-relaxed font-sans">
              We connect consumer brands to their consumers through unique, immersive branded experiences. Strategic popup activations, product launches, sampling campaigns, and field marketing engineered to make audiences stop, interact, and remember.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:bookings@spectalmanagement.com"
                className="px-8 py-3.5 bg-spectal-red text-white text-xs font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 rounded-sm"
              >
                Get In Touch
              </a>
              <a
                href="#services"
                className="px-8 py-3.5 border border-white/20 text-white text-xs font-mono tracking-widest uppercase hover:border-white hover:bg-white/5 transition-all duration-300 rounded-sm"
              >
                Our Capabilities
              </a>
            </div>
          </motion.div>

          {/* Infinite Scrolling Tags Banner overlay */}
          <div className="absolute bottom-0 left-0 w-full py-4 bg-black/60 border-t border-white/5 overflow-hidden flex select-none z-30">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-8 pr-8">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span className="text-[10px] font-mono tracking-widest text-spectal-mint uppercase">FOR BRANDS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">EXPERIENTIAL</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/20"></span>
                  <span className="text-[10px] font-mono tracking-widest text-spectal-mint uppercase">ACTIVATIONS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Approach Section */}
      <section className="relative w-full py-24 md:py-32 border-b border-white/5 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
            <div className="lg:col-span-8">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight font-sans">
                An idea is only as good as it is <span className="text-spectal-red font-serif italic text-black/90">feasible</span>.
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-sm md:text-base text-black/60 leading-relaxed font-sans">
                Creative firepower is essential to construct engaging, memorable experiences, but it is only half the battle. At Spectal, we couple raw design with disciplined, execution-focused strategy.
              </p>
            </div>
          </div>

          {/* Approach Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="p-8 border border-black/10 hover:border-black/35 rounded-sm transition-all duration-300">
              <h3 className="text-lg font-bold uppercase tracking-tight mb-4">Strategic Feasibility</h3>
              <p className="text-xs md:text-sm text-black/60 leading-relaxed font-sans">
                Big activation ideas grounded in real-world budgets, local site timelines, and municipal logistics — ensuring long-term impact rather than short-term hype.
              </p>
            </div>

            <div className="p-8 border border-black/10 hover:border-black/35 rounded-sm transition-all duration-300">
              <h3 className="text-lg font-bold uppercase tracking-tight mb-4">Operational Expertise</h3>
              <p className="text-xs md:text-sm text-black/60 leading-relaxed font-sans">
                An internal event operations and site production team built to coordinate logistics, vendor rigs, and permit layouts seamlessly under tight windows.
              </p>
            </div>

            <div className="p-8 border border-black/10 hover:border-black/35 rounded-sm transition-all duration-300">
              <h3 className="text-lg font-bold uppercase tracking-tight mb-4">Disciplined Execution</h3>
              <p className="text-xs md:text-sm text-black/60 leading-relaxed font-sans">
                Clear milestones and progress checklines that keep timelines, budgets, and brand guidelines aligned — ensuring every experiential activation delivers.
              </p>
            </div>
          </div>

          {/* Parallax/Full-width Image */}
          <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden rounded-sm">
            <div className="absolute inset-0 bg-black/10 z-10" />
            <img 
              src="/event_networking.png" 
              alt="Operational Rigging" 
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700" 
            />
          </div>

        </div>
      </section>

      {/* Services/Capabilities Grid Section */}
      <section id="services" className="relative w-full py-24 md:py-32 bg-[#080808] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight font-sans">
              Here is some of <span className="text-spectal-mint font-serif italic text-white/95">what we do</span>
            </h2>
            <div className="w-12 h-0.5 bg-spectal-red mx-auto mt-6"></div>
          </div>

          {/* Services Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((srv, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                className={`p-8 bg-[#0b0b0b] border ${srv.accent} rounded-sm transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="w-12 h-12 rounded-sm bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                    {srv.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-4">
                    {srv.title}
                  </h3>
                  <p className="text-xs md:text-sm text-white/60 leading-relaxed font-sans mb-8">
                    {srv.description}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-spectal-mint hover:text-white transition-colors duration-300">
                  <a href="mailto:bookings@spectalmanagement.com">DISCUSS PROJECT &rarr;</a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Avatars Callout */}
          <div className="mt-20 p-8 border border-white/5 bg-[#0b0b0b] rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Stacked Avatars */}
              <div className="flex -space-x-3 overflow-hidden select-none">
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b0b0b] bg-spectal-red flex items-center justify-center font-mono text-[9px] font-bold">SP</div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b0b0b] bg-spectal-mint text-black flex items-center justify-center font-mono text-[9px] font-bold">EX</div>
                <div className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0b0b0b] bg-white text-black flex items-center justify-center font-mono text-[9px] font-bold">OP</div>
              </div>
              <p className="text-xs md:text-sm text-white/70 font-sans">
                If it lives in the real world and connects consumers to your brand, we execute it.
              </p>
            </div>
            <a
              href="mailto:bookings@spectalmanagement.com"
              className="px-6 py-3 bg-white text-black hover:bg-spectal-red hover:text-white transition-colors duration-300 text-[10px] font-mono tracking-widest uppercase rounded-sm flex-shrink-0"
            >
              Get In Touch
            </a>
          </div>

        </div>
      </section>

      {/* Case Studies Gallery Section */}
      <section className="relative w-full py-24 md:py-32 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight font-sans">
                Selected <span className="text-spectal-mint font-serif italic text-white/95">Brand Work</span>
              </h2>
            </div>
            <div>
              <p className="text-xs md:text-sm text-white/55 font-mono">
                REAL EXPERIENCES THAT MOVED THE NEEDLE.
              </p>
            </div>
          </div>

          {/* Grid Case Studies */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CASE_STUDIES.map((study, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="group relative cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden rounded-sm relative border border-white/5 mb-6">
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/80 border border-white/10 text-[9px] font-mono tracking-widest uppercase text-spectal-mint rounded-full">
                    {study.tag}
                  </div>
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-tight mb-2 group-hover:text-spectal-mint transition-colors duration-300">
                  {study.title}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-sans">
                  {study.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Story & Testimonial Section */}
      <section className="relative w-full py-24 md:py-32 bg-white text-black border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Story copy */}
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-8 font-sans">
                Built on <span className="text-spectal-red font-serif italic text-black/90">getting things done</span>.
              </h2>
              <div className="space-y-6 text-sm text-black/75 leading-relaxed font-sans">
                <p>
                  Spectal was founded not out of a board room, but in the field. We got our start moving heavy event infrastructure, managing complex site rigs, and coordinating strict local municipal rules under tight windows. 
                </p>
                <p>
                  We built our discipline on the ground, but our hearts were always with the creative and storytelling side of activations. We realized that raw branding ideas pair best with the rigorous operational precision we had already established. Today, we bridge these two worlds to deliver campaigns that execute flawlessly.
                </p>
              </div>
            </div>

            {/* Portrait Testimonial Card */}
            <div className="lg:col-span-5 p-8 bg-[#090909] text-white border border-white/5 rounded-sm relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-spectal-red/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col items-start">
                <img
                  src="/founder_portrait.png"
                  alt="Co-Founder"
                  className="w-16 h-16 rounded-full border-2 border-spectal-red object-cover mb-6 grayscale hover:grayscale-0 transition-all duration-300"
                />
                <p className="text-xs md:text-sm text-white/80 italic leading-relaxed font-sans mb-6">
                  &ldquo;As we expand experiential boundaries, our focus remains squarely on building authentic loyalty. We handle the logistical heavy-lifting so your brand can speak directly to people's hearts and minds.&rdquo;
                </p>
                <div className="text-[10px] font-mono tracking-widest text-spectal-mint uppercase">
                  JACOB LAURA &bull; GENERAL MANAGER
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Circle Rotating Text CTA Section */}
      <section className="relative w-full py-32 md:py-40 bg-black flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl px-6 relative z-10 flex flex-col items-center">
          
          {/* Rotating SVG text circle */}
          <div className="relative w-64 h-64 flex items-center justify-center select-none cursor-pointer">
            <svg viewBox="0 0 300 300" className="w-full h-full animate-[spin_25s_linear_infinite]">
              <defs>
                <path id="circlePath" d="M150,150 m-110,0 a110,110 0 1,1 220,0 a110,110 0 1,1 -220,0" />
              </defs>
              <text className="text-[11px] font-mono tracking-[0.24em] fill-white/80 uppercase">
                <textPath href="#circlePath">
                  READY TO BRING YOUR IDEAS TO LIFE? &bull; GET IN TOUCH &bull; READY TO BRING YOUR IDEAS TO LIFE? &bull; 
                </textPath>
              </text>
            </svg>
            <div className="absolute w-2.5 h-2.5 rounded-full bg-spectal-red"></div>
          </div>

          <p className="text-xs md:text-sm font-mono tracking-widest text-white/50 max-w-md mt-10 uppercase">
            Tell us about your campaign objectives. We will handle the logistics, execution, and design.
          </p>

          <div className="mt-8">
            <a
              href="mailto:bookings@spectalmanagement.com"
              className="px-10 py-4 bg-spectal-mint text-black font-mono text-[10px] tracking-widest uppercase hover:bg-white transition-colors duration-300 rounded-sm"
            >
              Get In Touch
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
