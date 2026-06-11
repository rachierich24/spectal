"use client";

import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Solutions", href: "#solutions" },
  { label: "Products", href: "#products" },
  { label: "Case Studies", href: "#impact" },
  { label: "About", href: "#about" },
];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 left-0 w-full z-50 pt-6 pointer-events-none"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center pointer-events-auto relative">
        {/* Left: Brand Logo */}
        <div className="flex-shrink-0">
          <a
            href="/"
            data-interactive="true"
            className="group text-2xl font-bold tracking-[0.2em] transition-all duration-300 ease-out inline-block"
          >
            <span className="inline-block text-spectal-red group-hover:-translate-y-0.5 transition-transform duration-300">
              SPEC
            </span>
            <span className="inline-block text-spectal-mint group-hover:translate-y-0.5 transition-transform duration-300">
              TAL
            </span>
          </a>
        </div>

        {/* Center: Navigation Pill with exact glassmorphism styles */}
        <div 
          style={{
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8 rounded-full px-8 py-3 shadow-lg whitespace-nowrap"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-interactive="true"
              className="text-xs font-mono tracking-widest uppercase text-white/70 hover:text-white transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Right: Solid White CTA Button */}
        <div className="flex-shrink-0">
          <a
            href="#contact"
            data-interactive="true"
            className="group px-6 py-3 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-white/90 transition-all duration-300 rounded-full inline-flex items-center shadow-lg whitespace-nowrap"
          >
            Get In Touch 
            <span className="group-hover:translate-x-1 ml-2 inline-block transition-transform duration-300">→</span>
          </a>
        </div>

      </div>
    </motion.header>
  );
}

