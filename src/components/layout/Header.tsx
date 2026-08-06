"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

export default function Header() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="fixed top-0 left-0 w-full z-50 pt-6 pointer-events-none"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex justify-between items-center pointer-events-auto relative">
        
        {/* Left: Empty div to balance flexbox */}
        <div className="flex-1"></div>

        {/* Center: Brand Logo */}
        <div className="flex-shrink-0 flex justify-center items-center flex-1">
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

        {/* Right: Social Icons */}
        <div className="flex items-center justify-end gap-6 flex-1">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            data-interactive="true"
            className="text-white hover:text-spectal-mint transition-colors duration-300 text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            data-interactive="true"
            className="text-white hover:text-spectal-mint transition-colors duration-300 text-xl"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noreferrer"
            data-interactive="true"
            className="text-white hover:text-spectal-mint transition-colors duration-300 text-xl"
          >
            <FaYoutube />
          </a>
        </div>

      </div>
    </motion.header>
  );
}
