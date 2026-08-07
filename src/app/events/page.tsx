"use client";

import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import { motion } from "framer-motion";

export default function EventsPage() {
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
              EXPERIENCES //
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
              For <span className="text-spectal-mint font-serif italic text-white/95">Events</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {[1, 2, 3, 4].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group block"
              >
                {/* Image Placeholder */}
                <div className="w-full aspect-[16/9] bg-white/5 border border-white/10 mb-6 overflow-hidden relative flex items-center justify-center">
                  <span className="text-spectal-mint/50 font-mono tracking-widest text-xs uppercase z-10">Event Image</span>
                </div>

                {/* Details */}
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold tracking-tight uppercase group-hover:text-spectal-red transition-colors duration-300">
                    Event Type {item}
                  </h3>
                  <p className="text-sm font-light text-spectal-mint/60 mt-3 max-w-md leading-relaxed">
                    Connecting consumer brands to their consumers through unique in-real-life experiences.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
