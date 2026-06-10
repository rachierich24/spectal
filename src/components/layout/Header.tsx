"use client";

import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "Summit", href: "#arrival" },
  { label: "Metrics", href: "#anticipation" },
  { label: "Tracks", href: "#energy" },
  { label: "Talent", href: "#impact" },
  { label: "Archives", href: "#legacy" },
  { label: "Schedule", href: "#culture-engine" },
];

export default function Header() {
  const [isVip, setIsVip] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Listen to VIP state changes from the canvas
    const handleVipChanged = (e: Event) => {
      setIsVip((e as CustomEvent).detail);
    };
    window.addEventListener("vip-changed", handleVipChanged);

    // Add sticky navbar styling on scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("vip-changed", handleVipChanged);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleVip = () => {
    window.dispatchEvent(new Event("toggle-vip"));
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 pointer-events-none ${
        scrolled
          ? "py-3 bg-spectal-charcoal/80 backdrop-blur-xl border-b border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between pointer-events-auto">
        {/* Brand Logo */}
        <a
          href="#arrival"
          data-interactive="true"
          className="group text-2xl font-bold tracking-[0.2em] transition-all duration-300 ease-out"
        >
          <span className="inline-block text-spectal-red group-hover:-translate-y-1 group-hover:-rotate-6 transition-transform duration-300">
            SPEC
          </span>
          <span className="inline-block text-white group-hover:translate-y-1 group-hover:rotate-6 transition-transform duration-300">
            TAL
          </span>
        </a>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-interactive="true"
              className="text-xs font-mono tracking-widest uppercase text-spectal-mint/60 hover:text-white transition-colors duration-300 relative py-1 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-spectal-red scale-x-0 origin-right group-hover:scale-x-100 group-hover:origin-left transition-transform duration-500 ease-out" />
            </a>
          ))}
        </nav>

        {/* Action Button: VIP Deck Toggle */}
        <button
          onClick={toggleVip}
          data-interactive="true"
          className={`px-4 py-2 rounded-full border text-[10px] font-mono tracking-widest uppercase transition-all duration-500 ${
            isVip
              ? "bg-spectal-red/20 border-spectal-red text-spectal-red shadow-[0_0_15px_rgba(201,73,61,0.4)] animate-pulse"
              : "border-spectal-mint/20 text-spectal-mint/80 hover:border-spectal-red hover:text-spectal-red"
          }`}
          title="Type 'VIP' on keyboard to toggle"
        >
          WIRE DECK: {isVip ? "ON" : "OFF"}
        </button>
      </div>
    </header>
  );
}
