"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "For Brands", href: "/brands" },
  { label: "For Events", href: "/events" },
  { label: "Case Studies", href: "/work" },
  { label: "Work With Us", href: "/work-with-us" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Highlight color helper depending on route
  const getActiveColorClass = (href: string) => {
    if (href === "/brands") return "text-mdn-lime";
    if (href === "/events") return "text-mdn-purple";
    if (href === "/work") return "text-spectal-red";
    return "text-white";
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="fixed top-0 left-0 w-full z-50 pt-6 pointer-events-none"
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center pointer-events-auto relative">
          
          {/* Left: Brand Logo */}
          <div className="flex-shrink-0">
            <Link
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
            </Link>
          </div>

          {/* Center: Navigation Pill with glassmorphism & sliding active indicator */}
          <div 
            style={{
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
            className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center space-x-1 rounded-full p-1.5 shadow-lg whitespace-nowrap z-20"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const activeColorClass = getActiveColorClass(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-interactive="true"
                  className={`text-[11px] font-mono tracking-widest uppercase px-6 py-2.5 rounded-full transition-colors duration-300 relative ${
                    isActive ? `${activeColorClass} font-bold` : "text-white/60 hover:text-white"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavbarPill"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 350, damping: 26 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side controls: CTA & Hamburger */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Solid White CTA Button */}
            <Link
              href="/contact"
              data-interactive="true"
              className={`hidden sm:inline-flex group px-6 py-3 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-300 rounded-full items-center shadow-lg whitespace-nowrap ${
                pathname === "/contact"
                  ? "bg-spectal-red text-white hover:bg-white hover:text-black"
                  : "bg-white text-black hover:bg-white/90"
              }`}
            >
              {pathname === "/contact" ? "Inquiry Sent" : "Get In Touch"}
              <span className="group-hover:translate-x-1 ml-2 inline-block transition-transform duration-300">→</span>
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex lg:hidden flex-col items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white transition-all duration-300 focus:outline-none relative z-50 pointer-events-auto"
              aria-label="Toggle Menu"
              data-interactive="true"
            >
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[6px]" : "mb-1.5"}`} />
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "mb-1.5"}`} />
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </button>
          </div>

        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-center items-center pointer-events-auto px-6"
          >
            <div className="flex flex-col items-center space-y-8 text-center">
              {NAV_ITEMS.map((item, index) => {
                const isActive = pathname === item.href;
                const activeColorClass = getActiveColorClass(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.5 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2.5xl font-medium font-boldonse tracking-widest uppercase block transition-all duration-300 ${
                        isActive ? `${activeColorClass} scale-105 font-bold` : "text-white/60 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + NAV_ITEMS.length * 0.05, duration: 0.5 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-8 py-4 text-xs font-mono font-bold tracking-widest uppercase transition-all duration-500 rounded-full shadow-lg inline-block mt-4 ${
                    pathname === "/contact"
                      ? "bg-white text-black"
                      : "bg-spectal-red text-white hover:bg-white hover:text-black"
                  }`}
                >
                  Get In Touch →
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
