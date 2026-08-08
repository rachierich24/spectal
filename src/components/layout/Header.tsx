"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const SOCIALS = [
  {
    href: "https://www.instagram.com/spectal.management/",
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    href: "https://in.linkedin.com/company/spectal-talent-management",
    label: "LinkedIn",
    path: "M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z",
  },
  {
    href: "https://www.youtube.com/@SpectalHQ",
    label: "YouTube",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
];

export default function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 left-0 w-full z-50 pt-6 pointer-events-none"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-center md:justify-between items-center relative">

        {/* Left: Empty div to balance flexbox */}
        <div className="flex-1 hidden md:block"></div>

        {/* Center: Brand Logo */}
        <div className="flex-shrink-0 flex justify-center items-center pointer-events-auto">
          <Link
            href="/"
            data-interactive="true"
            className="group inline-flex flex-row items-center gap-2 transition-all duration-300 ease-out"
          >
            <img 
              src="/spectallogo.jpg" 
              alt="Spectal" 
              className="h-9 md:h-11 w-auto object-contain rounded-[4px] group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Right: Social Icons */}
        <div className="flex-1 hidden md:flex items-center justify-end gap-6 pointer-events-auto">
          {SOCIALS.map(({ href, label, path }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              data-interactive="true"
              className="text-white/80 hover:text-spectal-mint hover:scale-110 transition-all duration-300"
              aria-label={label}
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d={path} />
              </svg>
            </a>
          ))}
        </div>

      </div>
    </motion.header>
  );
}
