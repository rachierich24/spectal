"use client";

import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import { motion } from "framer-motion";

const WORK_ITEMS = [
  {
    title: "Red Bull Jukebox",
    description: "Engaged over 500 consumers in person, providing a polished show-day experience.",
    tag: "Brands",
    color: "bg-spectal-red/20",
  },
  {
    title: "Patron Tequila Golf",
    description: "High-end brand activation reaching luxury demographics with precision.",
    tag: "Activations",
    color: "bg-white/10",
  },
  {
    title: "VFX Summit Mainstage",
    description: "Technical stage production with projection mapping and spatial sound.",
    tag: "Production",
    color: "bg-spectal-mint/20",
  },
  {
    title: "Nike SNKRS Pop-up",
    description: "Urban drop activation merging physical spaces with digital scarcity.",
    tag: "Retail",
    color: "bg-blue-500/20",
  }
];

export default function WorkPage() {
  return (
    <main className="relative w-full min-h-screen bg-[#050505] overflow-hidden text-white">
      <Preloader />
      
      {/* Content */}
      <div className="relative w-full z-10 pt-40 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-20"
          >
            <span className="text-xs font-mono tracking-[0.4em] text-spectal-red mb-4 block">
              PORTFOLIO //
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
              Featured <span className="text-spectal-mint font-serif italic text-white/95">Work</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {WORK_ITEMS.map((item, i) => (
              <motion.a
                key={i}
                href="#"
                data-interactive="true"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group block cursor-pointer"
              >
                {/* Image Placeholder */}
                <div className={`w-full aspect-[4/3] ${item.color} mb-6 overflow-hidden relative flex items-center justify-center`}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                  <span className="text-spectal-mint/50 font-mono tracking-widest text-xs uppercase z-10">Image Placeholder</span>
                  
                  {/* Tag */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest uppercase text-white flex items-center gap-2 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-spectal-red"></span>
                    {item.tag}
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold tracking-tight uppercase group-hover:text-spectal-red transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm font-light text-spectal-mint/60 mt-3 max-w-md leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
