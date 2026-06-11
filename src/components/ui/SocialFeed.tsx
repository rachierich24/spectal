"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

const FEED_ITEMS = [
  { location: "New Delhi, DL", year: "2025", src: "/feed_delhi.png", alt: "Delhi Live Concert" },
  { location: "Mumbai, MH", year: "2024", src: "/feed_mumbai.png", alt: "Mumbai Club Show" },
  { location: "Bengaluru, KA", year: "2024", src: "/feed_bengaluru.png", alt: "Bengaluru Live Music Festival" },
  { location: "Goa, GA", year: "2023", src: "/feed_goa.png", alt: "Goa Sunset Beach Festival" },
  { location: "Pune, MH", year: "2023", src: "/feed_pune.png", alt: "Pune College Festival" },
];

export default function SocialFeed() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let isInteracting = false;

    const startInteraction = () => {
      isInteracting = true;
    };
    const endInteraction = () => {
      isInteracting = false;
    };

    container.addEventListener("mouseenter", startInteraction);
    container.addEventListener("mouseleave", endInteraction);
    container.addEventListener("touchstart", startInteraction, { passive: true });
    container.addEventListener("touchend", endInteraction, { passive: true });

    const scrollSpeed = 0.8; // Speed of scroll (pixels per frame)

    const updateScroll = () => {
      if (!isInteracting) {
        container.scrollLeft += scrollSpeed;
        
        // Wrap around when reaching half of the scrollWidth
        const halfWidth = container.scrollWidth / 2;
        if (container.scrollLeft >= halfWidth) {
          container.scrollLeft -= halfWidth;
        }
      }
      animationId = requestAnimationFrame(updateScroll);
    };

    animationId = requestAnimationFrame(updateScroll);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", startInteraction);
      container.removeEventListener("mouseleave", endInteraction);
      container.removeEventListener("touchstart", startInteraction);
      container.removeEventListener("touchend", endInteraction);
    };
  }, []);

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
              Our Instagram is the unfiltered reality of the events world, including behind-the-scenes of branded activations and exciting events across India.
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
            className="flex space-x-6 overflow-x-auto pb-8 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Render duplicated items for seamless loop */}
            {[...FEED_ITEMS, ...FEED_ITEMS].map((item, i) => (
              <div 
                key={i} 
                className="flex-none w-[85vw] md:w-[400px] lg:w-[450px] group cursor-pointer"
              >
                {/* Card Header (Location & Year) */}
                <div className="flex items-center justify-between py-4 border-b border-white/20 mb-4 text-xs font-mono tracking-widest uppercase text-spectal-mint/60 group-hover:text-spectal-red transition-colors duration-300">
                  <span>{item.location}</span>
                  <span>{item.year}</span>
                </div>
                
                {/* Card Image */}
                <div className="w-full aspect-[4/5] bg-white/5 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
