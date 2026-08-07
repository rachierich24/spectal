"use client";

import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import { motion } from "framer-motion";

export default function WorkWithUsPage() {
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
              CAREERS //
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
              Work With <span className="text-spectal-mint font-serif italic text-white/95">Us</span>
            </h1>
          </motion.div>

          <div className="prose prose-invert max-w-3xl">
            <p className="text-xl text-spectal-mint/80 font-light leading-relaxed mb-8">
              We are always looking for passionate individuals who understand the power of experiential marketing. If you thrive in fast-paced environments and love creating unforgettable moments, you belong here.
            </p>
            <a
              href="mailto:bookings@spectalmanagement.com"
              className="inline-block px-8 py-4 border border-white/20 text-xs font-mono tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-300"
            >
              Contact Us &bull; bookings@spectalmanagement.com
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
