import Scene from "@/components/canvas/Scene";
import SpectalExperience from "@/components/canvas/SpectalExperience";
import Preloader from "@/components/ui/Preloader";
import AudioEngine from "@/components/audio/AudioEngine";

export default function Home() {
  return (
    <main className="relative w-full">
      <Preloader />
      <AudioEngine />
      
      {/* Global 3D Canvas Background */}
      <Scene>
        <ambientLight intensity={0.5} />
        <SpectalExperience />
      </Scene>

      {/* Foreground HTML overlay for scrolling and text content */}
      <div className="relative w-full z-10 flex flex-col pointer-events-none">
        
        {/* Section 1: Arrival */}
        <section id="arrival" className="w-full h-screen flex items-center justify-center pointer-events-auto">
          {/* Fluid Typography - mix-blend-difference makes text invert based on the 3D scene behind it */}
          <h1 className="text-8xl md:text-[12rem] font-bold tracking-tighter mix-blend-difference text-white">
            SPECTAL
          </h1>
        </section>

        {/* Section 2: Anticipation */}
        <section id="anticipation" className="w-full h-screen flex items-center justify-center pointer-events-auto">
          <h2 className="text-6xl md:text-8xl font-medium mix-blend-difference text-white">
            ANTICIPATION
          </h2>
        </section>

        {/* Section 3: Energy */}
        <section id="energy" className="w-full h-screen flex items-center justify-center pointer-events-auto">
          <h2 className="text-6xl md:text-8xl font-medium mix-blend-difference text-white">
            ENERGY
          </h2>
        </section>

        {/* Section 4: Impact */}
        <section id="impact" className="w-full h-screen flex items-center justify-center pointer-events-auto">
          <h2 className="text-6xl md:text-8xl font-medium mix-blend-difference text-white">
            IMPACT
          </h2>
        </section>

        {/* Section 5: Legacy */}
        <section id="legacy" className="w-full min-h-screen py-24 flex flex-col items-center justify-center pointer-events-auto">
          <h2 className="text-6xl md:text-8xl font-medium mb-12 mix-blend-difference text-white">
            LEGACY
          </h2>
        </section>

        {/* Section 6: Culture Engine */}
        <section id="culture-engine" className="w-full h-[200vh] flex items-center justify-center pointer-events-auto">
          <h2 className="text-6xl md:text-8xl font-medium sticky top-1/2 mix-blend-difference text-white">
            THE CULTURE ENGINE
          </h2>
        </section>

        {/* Section 7: Silence */}
        <section id="silence" className="w-full h-screen flex flex-col items-center justify-center bg-black pointer-events-auto relative z-20">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest uppercase mb-12 text-center max-w-4xl leading-tight">
            The next moment could be yours.
          </h1>
          <button data-interactive="true" className="px-10 py-5 bg-spectal-red text-white font-bold tracking-wider hover:bg-white hover:text-spectal-charcoal transition-colors duration-500 text-lg">
            CONTACT
          </button>
        </section>
      </div>
    </main>
  );
}
