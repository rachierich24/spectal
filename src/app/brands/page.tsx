"use client";

import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import { motion } from "framer-motion";

export default function BrandsPage() {
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
              PARTNERS //
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
              Trusted <span className="text-spectal-mint font-serif italic text-white/95">Brands</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Placeholder Brand Logos/Cards */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="w-full aspect-square bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors duration-300"
              >
                <span className="text-spectal-mint/50 font-mono tracking-widest text-[10px] uppercase">Brand {item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
