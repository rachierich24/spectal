"use client";

import { motion, Variants } from "framer-motion";

interface AnimatedLetterProps {
  char: string;
  index: number;
}

const letterVariants: Variants = {
  hidden: {
    y: "120%",
    opacity: 0,
    scale: 0.8,
    rotate: 6,
  },
  visible: (index: number) => ({
    y: "18%", // Shifts resting state down so bottom 18% of the letters is hidden/clipped below the end
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      delay: 0.1 + index * 0.04,
    }
  })
};

function AnimatedLetter({ char, index }: AnimatedLetterProps) {
  return (
    <motion.span
      custom={index}
      variants={letterVariants}
      className="origin-bottom font-black font-sans select-none pointer-events-none text-spectal-red drop-shadow-[0_0_20px_rgba(201,73,61,0.4)] will-change-transform"
      style={{ display: "inline-block" }}
    >
      {char}
    </motion.span>
  );
}

export default function Footer() {
  const letters = "spectal".split("");

  return (
    <footer
      className="w-full bg-[#050505] text-spectal-mint pt-8 pb-0 border-t border-white/5 relative z-20 pointer-events-auto overflow-hidden flex flex-col justify-between"
    >
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12">
        {/* Link Grid - Styled like Quoti */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 mb-6 text-left font-sans">

          {/* Column 1: Agency Links */}
          <div className="flex flex-col space-y-2">
            {[
              { label: "HOME", href: "#arrival" },
              { label: "SERVICES", href: "#showcase" },
              { label: "REELS", href: "#reels" },
              { label: "CONTACT", href: "#silence" as string },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-interactive="true"
                className="font-black tracking-widest text-[12px] uppercase text-spectal-mint hover:text-spectal-red transition-all duration-300 w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 2: Social Links */}
          <div className="flex flex-col space-y-2">
            {[
              { label: "INSTAGRAM", href: "https://www.instagram.com/spectal.management/" },
              { label: "LINKEDIN", href: "https://in.linkedin.com/company/spectal-talent-management" },
              { label: "FACEBOOK", href: "https://www.facebook.com/spectalmanagement/" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                data-interactive="true"
                className="font-black tracking-widest text-[12px] uppercase text-spectal-mint hover:text-spectal-red transition-all duration-300 w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 3: Legal & Resources */}
          <div className="flex flex-col space-y-2">
            {[
              { label: "TERMS", href: "#" },
              { label: "PRIVACY", href: "#" },
              { label: "BOOK NOW", href: "#silence" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                data-interactive="true"
                className="font-black tracking-widest text-[12px] uppercase text-spectal-mint hover:text-spectal-red transition-all duration-300 w-fit"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 4: Credits & Copyright (Right side) */}
          <div className="flex flex-col space-y-2 md:items-end text-left md:text-right">
            <span className="font-black tracking-widest text-[12px] uppercase text-spectal-mint/60">
              ©SPECTAL MANAGEMENT 2026 - ALL RIGHTS RESERVED.
            </span>
          </div>

        </div>

        {/* Store Badges sitting on the left above the Logo */}
        <div className="flex items-center gap-3 mb-2 z-10">
          {/* Apple App Store */}
          <a
            href="#"
            data-interactive="true"
            className="flex items-center space-x-2 bg-black border border-white/10 hover:border-white/30 rounded-lg px-3 py-1.5 hover:bg-white/5 transition-all duration-300"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-.96.04-2.13.64-2.82 1.45-.6.69-1.12 1.84-.98 2.94.1.08.2.12.3.12.87 0 1.95-.57 2.51-1.45z" />
            </svg>
            <div className="flex flex-col text-left leading-none font-sans">
              <span className="text-[7px] uppercase tracking-wider text-white/50">Download on the</span>
              <span className="text-[11px] font-semibold text-white mt-0.5">App Store</span>
            </div>
          </a>

          {/* Google Play Store */}
          <a
            href="#"
            data-interactive="true"
            className="flex items-center space-x-2 bg-black border border-white/10 hover:border-white/30 rounded-lg px-3 py-1.5 hover:bg-white/5 transition-all duration-300"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M3.25 1.76c-.23.24-.36.61-.36 1.09v18.3c0 .48.13.85.36 1.09l.07.06L13.7 11.9v-.2L3.32 1.7l-.07.06zM17.13 8.5L13.7 11.7v.6l3.43 3.2.08-.04 4.06-2.31c1.16-.66 1.16-1.74 0-2.4l-4.06-2.3-.08.05zM13.7 11.7L3.68 21.72c.38.4 1 .42 1.69.03l11.76-6.7-3.43-3.35zM13.7 11.7l3.43-3.35L5.37 1.65c-.69-.39-1.31-.37-1.69.03L13.7 11.7z" />
            </svg>
            <div className="flex flex-col text-left leading-none font-sans">
              <span className="text-[7px] uppercase tracking-wider text-white/50">GET IT ON</span>
              <span className="text-[11px] font-semibold text-white mt-0.5">Google Play</span>
            </div>
          </a>
        </div>

      </div>

      {/* Massive Scroll-Reveal 'spectal' Text */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="w-full flex flex-col items-center justify-end overflow-hidden select-none relative z-10 pt-2 mt-0"
      >

        {/* Animated Summit Star logo symbol sitting above spectal, like Quoti's orange roof mark */}
        <motion.div
          variants={{
            hidden: {
              y: 100,
              scale: 0.5,
              opacity: 0,
              rotate: -15,
            },
            visible: {
              y: 0,
              scale: 1.1,
              opacity: 1,
              rotate: 0,
              transition: {
                duration: 1.0,
                ease: [0.16, 1, 0.3, 1] as const,
                delay: 0.05,
              }
            }
          }}
          className="mb-2 flex justify-center text-spectal-red drop-shadow-[0_0_15px_rgba(201,73,61,0.3)]"
        >
          <svg width="100" height="50" viewBox="0 0 100 50" fill="none" className="w-16 md:w-20 h-auto">
            {/* Geometric Summit star / double chevron */}
            <path d="M50 5 L85 35 L72 35 L50 16 L28 35 L15 35 Z" fill="#C9493D" />
            <path d="M50 20 L68 35 L59 35 L50 27 L41 35 L32 35 Z" fill="#DDECC4" />
          </svg>
        </motion.div>

        {/* Giant scroll-reveal letters */}
        <div className="flex justify-center items-end leading-[0.8] text-[16vw] tracking-tighter uppercase w-full max-w-[95%] text-center">
          {letters.map((char, index) => (
            <AnimatedLetter
              key={index}
              char={char}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
