"use client";

import Scene from "@/components/canvas/Scene";
import SpectalExperience from "@/components/canvas/SpectalExperience";
import Preloader from "@/components/ui/Preloader";
import AudioEngine from "@/components/audio/AudioEngine";

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
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-mint/70 font-bold mb-4 animate-pulse">
              SPECTAL 2026 // DIGITAL EVENT & TALENT SUMMIT
            </span>
            <h1 className="text-5xl md:text-[8rem] font-bold tracking-tighter  text-spectal-mint leading-none">
              We connect <span className="text-spectal-mint/70 font-bold">student talent</span> <br />
              to <span className="text-spectal-mint font-serif italic text-spectal-mint/95">staging engines</span>.
            </h1>
            <p className="max-w-md text-sm md:text-base font-light tracking-wide text-spectal-mint/70 mt-6 leading-relaxed">
              The ultimate gathering of student creators, digital artists, tech developers, and forward-thinking recruiters.
            </p>
            <div className="mt-8 pointer-events-auto">
              <a
                href="#silence"
                data-interactive="true"
                className="px-8 py-4 bg-spectal-mint text-spectal-charcoal text-xs font-mono tracking-widest uppercase hover:bg-white transition-all duration-300 rounded-none shadow-[0_4px_15px_rgba(201,73,61,0.2)] font-bold"
              >
                Request Invitation Pass
              </a>
            </div>
          </div>
        </section>

        {/* MDNT-Inspired Infinite Scrolling Marquee Banner */}
        <div className="w-full py-6 bg-spectal-mint/10 border-spectal-mint/20 border-y border-white/5 overflow-hidden flex select-none relative z-20">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8 pr-8">
            <span className="text-xs font-mono tracking-widest text-spectal-mint/70 font-bold uppercase">VFX & Generative Shaders</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-mint uppercase">AI Hackathons</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-mint/70 font-bold uppercase">Sound Synthesis</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-mint uppercase">Direct Placements</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-mint/70 font-bold uppercase">Technical Stage Production</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            
            {/* Duplicated for seamless loop */}
            <span className="text-xs font-mono tracking-widest text-spectal-mint/70 font-bold uppercase">VFX & Generative Shaders</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-mint uppercase">AI Hackathons</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-mint/70 font-bold uppercase">Sound Synthesis</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-mint uppercase">Direct Placements</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
            <span className="text-xs font-mono tracking-widest text-spectal-mint/70 font-bold uppercase">Technical Stage Production</span>
            <span className="w-1.5 h-1.5 rounded-full bg-spectal-mint"></span>
          </div>
        </div>

        {/* Section 2: Metrics (Anticipation) */}
        <section id="anticipation" className="w-full min-h-screen flex items-center justify-center pointer-events-none py-24">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full select-none">
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-mint/70 font-bold mb-4">
              02 // METRICS & SCALE
            </span>
            <h2 className="text-4xl md:text-7xl font-medium  text-spectal-mint leading-none mb-12">
              SUMMIT REACH & <span className="text-spectal-mint/70 font-bold">SCALABILITY</span>
            </h2>
            
            {/* Simple Borderless Stats Row */}
            <div className="border-y border-white/10 py-12 w-full grid grid-cols-2 md:grid-cols-4 gap-8 pointer-events-auto">
              <div className="flex flex-col">
                <span className="text-4xl md:text-6xl font-mono text-spectal-mint/70 font-bold font-bold tracking-tighter">15K+</span>
                <span className="text-[10px] font-mono tracking-widest text-spectal-mint/50 uppercase mt-2">Attendees</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-6xl font-mono text-spectal-mint font-bold tracking-tighter">120+</span>
                <span className="text-[10px] font-mono tracking-widest text-spectal-mint/50 uppercase mt-2">Colleges</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-6xl font-mono text-spectal-mint font-bold tracking-tighter">50+</span>
                <span className="text-[10px] font-mono tracking-widest text-spectal-mint/50 uppercase mt-2">Sponsors</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl md:text-6xl font-mono text-spectal-mint/70 font-bold font-bold tracking-tighter">10M+</span>
                <span className="text-[10px] font-mono tracking-widest text-spectal-mint/50 uppercase mt-2">Impressions</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Summit Tracks (Energy) */}
        <section id="energy" className="w-full min-h-screen flex items-center justify-center pointer-events-none py-24">
          <div className="max-w-4xl w-full mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full select-none">
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-mint/70 font-bold mb-4">
              03 // EVENT SERVICES
            </span>
            <h2 className="text-4xl md:text-7xl font-medium  text-spectal-mint leading-none mb-12">
              CORE EVENT <span className="text-spectal-mint font-serif italic text-spectal-mint/95">SERVICES</span>
            </h2>

            {/* Clean Typographic Stack */}
            <div className="w-full flex flex-col divide-y divide-white/5 pointer-events-auto">
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-2 group">
                <span className="text-xs font-mono text-spectal-mint/70 font-bold group-hover:translate-x-2 transition-transform duration-300">01 // ARTIST & CELEBRITY BOOKING</span>
                <span className="text-sm font-light text-spectal-mint/60">Mainstage artist curation, scheduling, and talent logistics.</span>
              </div>
              
              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-2 group">
                <span className="text-xs font-mono text-spectal-mint group-hover:translate-x-2 transition-transform duration-300">02 // TECHNICAL STAGE PRODUCTION</span>
                <span className="text-sm font-light text-spectal-mint/60">Visual projection mapping, trussing, spatial sound.</span>
              </div>

              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-2 group">
                <span className="text-xs font-mono text-spectal-mint group-hover:translate-x-2 transition-transform duration-300">03 // SPONSOR ACQUISITION</span>
                <span className="text-sm font-light text-spectal-mint/60">Sponsorship pitching, brand booths, corporate alignments.</span>
              </div>

              <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-2 group">
                <span className="text-xs font-mono text-spectal-mint/70 font-bold group-hover:translate-x-2 transition-transform duration-300">04 // CAMPAIGN & AUDIENCE REACH</span>
                <span className="text-sm font-light text-spectal-mint/60">Digital media amplification, college ticketing networks.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Talent Placements & Roots (Impact) */}
        <section id="impact" className="w-full min-h-screen flex items-center justify-center pointer-events-none py-24">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row items-start justify-between h-full select-none gap-12 md:gap-24">
            <div className="w-full md:w-1/3 text-left">
              <span className="text-xs font-mono tracking-[0.4em] text-spectal-mint/70 font-bold mb-4 block">
                04 // PLACEMENTS & HERITAGE
              </span>
              <h2 className="text-4xl md:text-6xl font-medium  text-spectal-mint leading-none">
                TALENT & CREATIVE <span className="text-spectal-mint/70 font-bold">ROOTS</span>
              </h2>
            </div>
            
            <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 text-left pointer-events-auto">
              <div>
                <h3 className="text-xs font-mono text-spectal-mint uppercase tracking-widest mb-3 border-b border-white/10 pb-2">Our Mission</h3>
                <p className="text-sm font-light text-spectal-mint/70 leading-relaxed">
                  Spectal serves as a talent portal. By screening student portfolios and hackathon submissions, we bridge university developers with premier digital design and stage production agencies for turnkey projects and direct recruitment.
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono text-spectal-mint/70 font-bold uppercase tracking-widest mb-3 border-b border-spectal-red/20 pb-2">Our Roots (Engifest Heritage)</h3>
                <p className="text-sm font-light text-spectal-mint/70 leading-relaxed">
                  Founded by alumni of DTU's legendary Engifest team, we bring a decade of experience managing one of Asia's largest college cultural festivals (100K+ attendees). We translate that real-world logistics scale into cutting-edge digital engines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Archives (Legacy) */}
        <section id="legacy" className="w-full min-h-screen py-24 flex flex-col items-center justify-center pointer-events-none">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-center justify-between h-full select-none">
            <div className="text-center mb-16">
              <span className="text-xs font-mono tracking-[0.4em] text-spectal-mint/70 font-bold block mb-4">
                05 // CHRONICLES
              </span>
              <h2 className="text-4xl md:text-7xl font-medium  text-spectal-mint leading-none">
                LEGACY
              </h2>
              <p className="max-w-md text-xs font-mono tracking-widest text-spectal-mint/70 font-bold uppercase mt-4">
                [ HOVER PORTALS TO PEER INSIDE ]
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Culture Engine (Event Timeline & Schedule) */}
        <section id="culture-engine" className="w-full min-h-[200vh] relative flex flex-col md:flex-row pointer-events-none">
          {/* Left Column: Sticky Title */}
          <div className="w-full md:w-1/2 md:h-screen md:sticky md:top-0 flex items-center justify-start px-6 md:px-12 py-12 md:py-0 select-none">
            <div className="flex flex-col items-start justify-center">
              <span className="text-xs font-mono tracking-[0.4em] text-spectal-mint/70 font-bold mb-4">
                06 // TIMELINE
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter  text-spectal-mint leading-none">
                SCHEDULE
              </h2>
            </div>
          </div>

          {/* Right Column: Sliding Content Blocks */}
          <div className="w-full md:w-1/2 flex flex-col px-6 md:px-12 select-none">
            {/* Block 1: Day 1 */}
            <div className="h-screen flex flex-col justify-center items-start border-l border-white/5 pl-6 md:pl-12">
              <span className="text-[10px] font-mono tracking-widest text-spectal-mint/70 font-bold uppercase mb-2">
                JUNE 25 // DAY 01
              </span>
              <h3 className="text-2xl font-medium text-spectal-mint tracking-tight mb-4">
                Spatial computing panels, stage service reviews, opening keynotes.
              </h3>
              <span className="text-xs font-mono text-spectal-mint/40">09:00 AM — Check-in & Openings</span>
            </div>

            {/* Block 2: Day 2 */}
            <div className="h-screen flex flex-col justify-center items-start border-l border-white/5 pl-6 md:pl-12">
              <span className="text-[10px] font-mono tracking-widest text-spectal-mint/70 font-bold uppercase mb-2">
                JUNE 26 // DAY 02
              </span>
              <h3 className="text-2xl font-medium text-spectal-mint tracking-tight mb-4">
                24-Hour dev sprints, spatial shader builds, portfolio review rounds.
              </h3>
              <span className="text-xs font-mono text-spectal-mint/40">09:00 AM — Sprints & VIP Mixer</span>
            </div>
          </div>
        </section>

        {/* Section 7: Registration Portal (Silence) */}
        <section id="silence" className="w-full h-screen flex flex-col items-center justify-center bg-spectal-red pointer-events-none relative z-20 py-24">
          <div className="max-w-xl w-full mx-auto px-6 text-center flex flex-col items-center select-none">
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-mint/70 font-bold mb-6">
              07 // ADMISSION
            </span>
            <h2 className="text-4xl md:text-6xl font-serif text-spectal-mint tracking-widest uppercase mb-10 leading-tight">
              REQUEST INVITATION <span className="text-spectal-mint font-serif italic text-spectal-mint/95">PASS</span>
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
                  className="flex-grow bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm text-spectal-mint focus:outline-none focus:border-spectal-mint focus:ring-1 focus:ring-spectal-mint transition-all duration-300"
                />
                <input 
                  type="text" 
                  placeholder="College / Company"
                  required
                  className="flex-grow bg-white/5 border border-white/10 rounded-lg px-5 py-4 text-sm text-spectal-mint focus:outline-none focus:border-spectal-mint focus:ring-1 focus:ring-spectal-mint transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                data-interactive="true"
                className="w-full py-4 bg-spectal-mint text-spectal-charcoal text-xs font-mono tracking-widest uppercase hover:bg-white hover:shadow-[0_0_20px_rgba(201,73,61,0.3)] transition-all duration-500 rounded-lg font-bold text-center"
              >
                Submit Request
              </button>
            </form>
            <p className="text-[10px] font-mono text-spectal-mint/30 mt-6 tracking-wider uppercase">
              Powered by Unifesta Events framework. Review rounds occur weekly.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
