"use client";

import { motion, useReducedMotion, useScroll } from "framer-motion";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[150] h-1 origin-left bg-[#f5c64d]"
      style={{ scaleX: reduceMotion ? 0 : scrollYProgress }}
    />
  );
}
