"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Brands", href: "/brands" },
  { label: "For Events", href: "/events" },
  { label: "Work With Us", href: "/work-with-us" },
  { label: "Get In Touch", href: "/contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 pt-6 pointer-events-none">
<<<<<<< Updated upstream
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center pointer-events-auto relative">
        
=======
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-3 items-center pointer-events-auto">

>>>>>>> Stashed changes
        {/* Left: Brand Logo */}
        <div className="flex-shrink-0">
          <a
            href="/"
            data-interactive="true"
            className="group text-2xl font-bold tracking-[0.2em] transition-all duration-300 ease-out inline-block"
          >
            <span className="inline-block text-spectal-red group-hover:-translate-y-1 group-hover:-rotate-6 transition-transform duration-300">
              SPEC
            </span>
            <span className="inline-block text-white group-hover:translate-y-1 group-hover:rotate-6 transition-transform duration-300">
              TAL
            </span>
          </a>
        </div>

        {/* Center: Navigation Pill */}
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-8 bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 shadow-lg whitespace-nowrap">
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
            href="/contact"
            data-interactive="true"
            className="group px-6 py-3 bg-white text-black text-xs font-mono font-bold tracking-widest uppercase hover:bg-white/90 transition-all duration-300 rounded-full inline-flex items-center shadow-lg whitespace-nowrap"
          >
            GET IN TOUCH
            <span className="text-spectal-red group-hover:text-black ml-2 inline-block transition-colors duration-300">●</span>
          </a>
        </div>

      </div>
    </header>
  );
}
