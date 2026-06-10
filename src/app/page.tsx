"use client";

import Scene from "@/components/canvas/Scene";
import SpectalExperience from "@/components/canvas/SpectalExperience";
import Preloader from "@/components/ui/Preloader";
import AudioEngine from "@/components/audio/AudioEngine";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <Preloader />
      <AudioEngine />
      
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
                  SPECTAL SUMMIT 2026 • CREATIVE CORES •
                </textPath>
              </text>
            </svg>
          </div>

          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full select-none">
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-4 animate-pulse">
              SPECTAL 2026 // DIGITAL EVENT &amp; TALENT SUMMIT
            </span>
            <h1 className="text-5xl md:text-[8rem] font-bold tracking-tighter mix-blend-difference text-white leading-none">
              We connect <span className="text-spectal-red">student talent</span> <br />
              to <span className="text-spectal-mint font-serif italic text-white/95">staging engines</span>.
            </h1>
            <p className="max-w-md text-sm md:text-base font-light tracking-wide text-spectal-mint/70 mt-6 leading-relaxed">
              The ultimate gathering of student creators, digital artists, tech developers, and forward-thinking recruiters.
            </p>
            <div className="mt-8 pointer-events-auto">
              <a
                href="#silence"
                data-interactive="true"
                className="px-8 py-4 bg-spectal-red text-spectal-charcoal text-xs font-mono tracking-widest uppercase hover:bg-white transition-all duration-300 rounded-none shadow-[0_4px_15px_rgba(201,73,61,0.2)] font-bold"
              >
                Request Invitation Pass
              </a>
            </div>
          </div>
        </section>

        {/* MDNT-Inspired Infinite Scrolling Marquee Banner */}
        <div className="w-full py-6 bg-black/60 border-y border-white/5 overflow-hidden flex select-none relative z-20">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 pr-8">
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">VFX & Generative Shaders</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">AI Hackathons</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Sound Synthesis</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Direct Placements</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Technical Stage Production</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            
            {/* Duplicated for seamless loop */}
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">VFX & Generative Shaders</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">AI Hackathons</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Sound Synthesis</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-white uppercase">Direct Placements</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-red uppercase">Technical Stage Production</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
          </div>
        </div>

        {/* Section 2: Energy — scroll spacer for WebGL wave */}
        <section id="energy" className="w-full min-h-screen pointer-events-none" />

        {/* Transition Gap between Energy and Impact */}
        <div className="w-full h-screen pointer-events-none" />

        {/* Section 3: Impact — Interactive Event Gallery */}
        <section id="impact" className="w-full min-h-screen py-24 flex items-center justify-center relative z-20 pointer-events-auto">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col select-none">
            <div className="flex flex-col items-start mb-16">
              <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-3">
                03 // ARCHIVE GALLERY
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none">
                SUMMIT <span className="text-spectal-mint font-serif italic font-light">MOMENTS</span>
              </h2>
              <p className="text-xs font-mono text-white/40 mt-4 tracking-wider uppercase">
                [ Hover grid items to explore spatial scale ]
              </p>
            </div>
            
            {/* Bento Grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">
              {/* Image 1: Mainstage (7-col card) */}
              <div className="md:col-span-7 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[400px] transition-all duration-500 hover:border-spectal-red/40 hover:shadow-[0_0_30px_rgba(201,73,61,0.1)]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('/event_mainstage.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-spectal-red uppercase block mb-1">Live Stage</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Mainstage Audio-Visual Arena</h3>
                  <p className="text-xs text-spectal-mint/70 mt-2 font-light max-w-md">15,000+ attendees experiencing real-time projection mapping, trussing automation, and spatial audio arrays.</p>
                </div>
              </div>
              
              {/* Image 2: Spatial (5-col card) */}
              <div className="md:col-span-5 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[400px] transition-all duration-500 hover:border-spectal-mint/40 hover:shadow-[0_0_30px_rgba(221,236,196,0.1)]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('/event_spatial.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-spectal-mint uppercase block mb-1">Installation</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Spectral Flux Portal</h3>
                  <p className="text-xs text-spectal-mint/70 mt-2 font-light">Interactive holographic visualization mapping crowd densities into kinetic node simulations.</p>
                </div>
              </div>

              {/* Image 3: Hackathon (5-col card) */}
              <div className="md:col-span-5 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[350px] transition-all duration-500 hover:border-spectal-mint/40 hover:shadow-[0_0_30px_rgba(221,236,196,0.1)]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('/event_hackathon.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-spectal-mint uppercase block mb-1">Creative Cores</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Talent Co-Creation</h3>
                  <p className="text-xs text-spectal-mint/70 mt-2 font-light">24-hour creative coding sprint where developers collaborate live with stage production designers.</p>
                </div>
              </div>

              {/* Image 4: Networking (7-col card) */}
              <div className="md:col-span-7 group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl h-[350px] transition-all duration-500 hover:border-spectal-red/40 hover:shadow-[0_0_30px_rgba(201,73,61,0.1)]">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url('/event_networking.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] font-mono tracking-widest text-spectal-red uppercase block mb-1">Forum</span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Industry VIP Mixer</h3>
                  <p className="text-xs text-spectal-mint/70 mt-2 font-light">Direct talent placement networks linking college creators with lead stage design directors.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Project Showcase — Editorial Project Grid */}
        <section id="showcase" className="w-full min-h-screen py-24 flex items-center justify-center relative z-20 pointer-events-auto border-t border-white/5">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col select-none">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="flex flex-col items-start">
                <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-3">
                  04 // SHOWCASE
                </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-none">
                  TALENT <span className="text-spectal-mint font-serif italic font-light">ENGINES</span>
                </h2>
              </div>
              <p className="max-w-md text-xs font-mono text-spectal-mint/50 uppercase tracking-widest">
                [ Custom productions created by student placement talent ]
              </p>
            </div>

            {/* List Table of Projects */}
            <div className="w-full flex flex-col divide-y divide-white/10 mt-6">
              <div className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300">
                <div className="flex items-center gap-8">
                  <span className="text-sm font-mono text-spectal-red">01 / PROJECT</span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight group-hover:text-spectal-red transition-colors duration-300">HYPER-TRUSS</h3>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm text-spectal-mint font-light">Real-time projection mapping mapping visual streams into mechanical truss arrays.</span>
                  <span className="text-[10px] font-mono text-spectal-mint/40 uppercase tracking-wider">WebGL // WebVR // ThreeJS // Arduino</span>
                </div>
              </div>

              <div className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300">
                <div className="flex items-center gap-8">
                  <span className="text-sm font-mono text-white">02 / PROJECT</span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight group-hover:text-spectal-mint transition-colors duration-300">WAVE-SYNTH</h3>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm text-spectal-mint font-light">Custom DSP engine converting spatial crowd density and velocity maps into live ambient soundtrack modulations.</span>
                  <span className="text-[10px] font-mono text-spectal-mint/40 uppercase tracking-wider">Web Audio API // Computer Vision // Node</span>
                </div>
              </div>

              <div className="py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 group cursor-pointer hover:bg-white/[0.02] px-6 transition-all duration-300">
                <div className="flex items-center gap-8">
                  <span className="text-sm font-mono text-spectal-red">03 / PROJECT</span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white tracking-tight group-hover:text-spectal-red transition-colors duration-300">CHROMA-FLUX</h3>
                </div>
                <div className="flex flex-col md:items-end gap-2 max-w-lg">
                  <span className="text-sm text-spectal-mint font-light">An open-source generative particle engine built for live concerts, designed to render 1M+ nodes dynamically at 60FPS.</span>
                  <span className="text-[10px] font-mono text-spectal-mint/40 uppercase tracking-wider">WebGL Shader // GLSL // Canvas API</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Legacy — scroll spacer for WebGL galaxy */}
        <section id="legacy" className="w-full min-h-screen pointer-events-none" />

        {/* Section 6: Culture Engine — extended scroll spacer for WebGL culture animation */}
        <section id="culture-engine" className="w-full min-h-[200vh] pointer-events-none" />

        {/* Section 7: Registration Portal (Silence) */}
        <section id="silence" className="w-full h-screen flex flex-col items-center justify-center bg-black pointer-events-none relative z-20 py-24">
          <div className="max-w-xl w-full mx-auto px-6 text-center flex flex-col items-center select-none">
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-6">
              07 // ADMISSION
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase mb-10 leading-tight">
              REQUEST INVITATION <span className="text-spectal-mint font-serif italic text-white/95">PASS</span>
            </h2>
            
            {/* Sleek Two-Field Invitation Request Form */}
            <form 
              onSubmit={(e) => e.preventDefault()}
              className="pointer-events-auto w-full flex flex-col space-y-4 mt-4 text-left"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter email address"
                  required
                  className="flex-grow bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-spectal-mint focus:ring-1 focus:ring-spectal-mint transition-all duration-300"
                />
                <input 
                  type="text" 
                  placeholder="College / Company"
                  required
                  className="flex-grow bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm text-white focus:outline-none focus:border-spectal-mint focus:ring-1 focus:ring-spectal-mint transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                data-interactive="true"
                className="w-full py-4 bg-spectal-red text-spectal-charcoal text-xs font-mono tracking-widest uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(201,73,61,0.3)] transition-all duration-500 rounded-lg font-bold text-center"
              >
                Submit Request
              </button>
            </form>
            <p className="text-[10px] font-mono text-spectal-mint/30 mt-6 tracking-wider uppercase">
              Powered by Unifesta Events framework. Review rounds occur weekly.
            </p>
          </div>
        </section>

        {/* Section 8: Work Teaser — removed text overlay */}
        <section id="work-teaser" className="w-full min-h-[50vh] pointer-events-none" />

        <Footer />
      </div>
    </main>
  );
}
