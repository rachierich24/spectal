"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  // Motion values for raw mouse coordinates (no React state updates on move!)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Inertia springs for smooth custom follow-through
  // Ring: higher damping/mass for organic drag/lag effect
  const ringX = useSpring(cursorX, { damping: 30, stiffness: 220, mass: 0.65 });
  const ringY = useSpring(cursorY, { damping: 30, stiffness: 220, mass: 0.65 });

  // Dot: faster tracking with high stiffness and minimal mass
  const dotX = useSpring(cursorX, { damping: 25, stiffness: 450, mass: 0.2 });
  const dotY = useSpring(cursorY, { damping: 25, stiffness: 450, mass: 0.2 });

  // Center alignment offsets (Ring is 48px/2 = 24px, Dot is 16px/2 = 8px)
  const ringTranslateX = useTransform(ringX, (val) => val - 24);
  const ringTranslateY = useTransform(ringY, (val) => val - 24);
  const dotTranslateX = useTransform(dotX, (val) => val - 8);
  const dotTranslateY = useTransform(dotY, (val) => val - 8);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = 
        target.tagName?.toLowerCase() === "a" ||
        target.tagName?.toLowerCase() === "button" ||
        (typeof target.closest === "function" && (target.closest("a") || target.closest("button"))) ||
        (target.dataset && target.dataset.interactive);

      setIsHovering(!!isInteractive);

      const closestCursorText = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      const bodyCursorText = document.body.getAttribute("data-cursor-text");
      setCursorText(closestCursorText || bodyCursorText || "");
    };

    const interval = setInterval(() => {
      const bodyCursorText = document.body.getAttribute("data-cursor-text");
      if (bodyCursorText !== cursorText) {
        setCursorText(bodyCursorText || "");
      }
    }, 100);

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorText, cursorX, cursorY]);

  return (
    <>
      {/* Outer Glow Ring */}
      <motion.div
        className="hidden lg:flex fixed top-0 left-0 w-12 h-12 border border-spectal-mint rounded-full pointer-events-none z-[999] mix-blend-difference items-center justify-center will-change-transform"
        style={{
          x: ringTranslateX,
          y: ringTranslateY,
        }}
        animate={{
          scale: isClicked ? 0.75 : cursorText ? 2.0 : isHovering ? 1.5 : 1,
          opacity: isHovering && !cursorText ? 0 : 0.6,
          borderColor: cursorText ? "#C9493D" : "#DDECC4",
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 20,
          mass: 0.8,
        }}
      >
        <AnimatePresence>
          {cursorText && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-[8px] font-mono tracking-widest text-spectal-red font-bold uppercase whitespace-nowrap"
            >
              {cursorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-4 h-4 bg-spectal-red rounded-full pointer-events-none z-[1000] mix-blend-difference will-change-transform"
        style={{
          x: dotTranslateX,
          y: dotTranslateY,
        }}
        animate={{
          scale: isClicked ? 0.5 : cursorText ? 0 : isHovering ? 2.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      />
    </>
  );
}
