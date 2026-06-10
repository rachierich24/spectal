"use client";

import Footer from "@/components/layout/Footer";
import Preloader from "@/components/ui/Preloader";
import { motion } from "framer-motion";

export default function ContactPage() {
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
              CONNECT //
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-none">
              Get In <span className="text-spectal-mint font-serif italic text-white/95">Touch</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <p className="text-xl text-spectal-mint/80 font-light leading-relaxed mb-12">
                Tell us what you're working on. We'll show you what's possible. Let's build something together.
              </p>
              <div className="space-y-6 text-sm font-mono tracking-widest uppercase text-spectal-mint/60">
                <p>Email: hello@spectal.com</p>
                <p>HQ: Nashville, TN</p>
              </div>
            </div>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input type="text" placeholder="NAME" className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-spectal-red transition-colors" />
              </div>
              <div>
                <input type="email" placeholder="EMAIL" className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-spectal-red transition-colors" />
              </div>
              <div>
                <textarea placeholder="PROJECT DETAILS" rows={4} className="w-full bg-transparent border-b border-white/20 py-4 text-white placeholder:text-white/40 focus:outline-none focus:border-spectal-red transition-colors resize-none"></textarea>
              </div>
              <button type="submit" className="px-8 py-4 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-spectal-red hover:text-white transition-all duration-300">
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
