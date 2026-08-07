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
      className="w-full bg-[#050505] text-spectal-mint pt-8 pb-0 relative z-20 pointer-events-auto overflow-hidden flex flex-col justify-between"
    >
      {/* Contact & Email Direct Link Bar */}
      <div className="w-full flex items-center justify-center pb-6 border-b border-white/10 relative z-20">
        <a
          href="mailto:bookings@spectalmanagement.com"
          data-interactive="true"
          className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono tracking-widest text-spectal-mint hover:text-white hover:underline transition-colors duration-300 uppercase"
        >
          <svg className="w-4 h-4 fill-current text-spectal-red" viewBox="0 0 24 24">
            <path d="M1.5 4.5a3 3 0 013-3h15a3 3 0 013 3v15a3 3 0 01-3 3h-15a3 3 0 01-3-3v-15zm3 0v.656l7.5 4.687 7.5-4.687V4.5a1.5 1.5 0 00-1.5-1.5h-15a1.5 1.5 0 00-1.5 1.5zm16.5 2.844l-7.062 4.414a.75.75 0 01-.876 0L4.5 7.344V19.5a1.5 1.5 0 001.5 1.5h15a1.5 1.5 0 001.5-1.5V7.344z" />
          </svg>
          <span>bookings@spectalmanagement.com</span>
        </a>
      </div>


      {/* Massive Scroll-Reveal 'spectal' Text */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, margin: "-10%" }}
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
          <img 
            src="/spectallogo.jpg" 
            alt="Spectal Logo" 
            className="w-16 md:w-20 h-auto rounded-xl object-contain drop-shadow-[0_0_20px_rgba(201,73,61,0.5)]" 
          />
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
