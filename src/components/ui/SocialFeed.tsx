"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

const FEED_ITEMS = [
  { location: "Nashville, TN", year: "2025", type: "img" },
  { location: "Nashville, TN", year: "2024", type: "img" },
  { location: "Nashville, TN", year: "2023", type: "img" },
  { location: "Nashville, TN", year: "2023", type: "img" },
  { location: "Nashville, TN", year: "2022", type: "img" },
];

export default function SocialFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="w-full bg-[#050505] text-white py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12">
        {/* Header Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-bold tracking-tighter leading-[0.9] mb-8">
              Enter the world <span className="text-spectal-red">we</span><br />
              <span className="text-spectal-red">create</span> after dark.
            </h2>
            <p className="text-lg md:text-xl text-spectal-mint/70 font-light leading-relaxed max-w-2xl">
              Our Instagram is the unfiltered reality of the events world, including behind-the-scenes of branded activations and exciting events around TN.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Feed */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full"
        >
          <div 
            ref={scrollRef}
            className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {FEED_ITEMS.map((item, i) => (
              <div 
                key={i} 
                className="flex-none w-[85vw] md:w-[400px] lg:w-[450px] snap-center md:snap-start group cursor-pointer"
              >
                {/* Card Header (Location & Year) */}
                <div className="flex items-center justify-between py-4 border-b border-white/20 mb-4 text-xs font-mono tracking-widest uppercase text-spectal-mint/60 group-hover:text-spectal-red transition-colors duration-300">
                  <span>{item.location}</span>
                  <span>{item.year}</span>
                </div>
                
                {/* Image Placeholder */}
                <div className="w-full aspect-[4/5] bg-white/5 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <div className="w-full h-full flex items-center justify-center border border-white/10">
                    <span className="text-spectal-mint/30 font-mono tracking-widest text-[10px] uppercase">
                      Feed Media {i + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
