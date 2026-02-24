"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { useEffect, useState, useCallback } from "react";

// Section-aware color config: each section gets distinct orb colors
const SECTION_COLORS: Record<
  string,
  { orb1: string; orb2: string; orb3: string }
> = {
  hero: {
    orb1: "bg-emerald-300/30 dark:bg-emerald-500/20",
    orb2: "bg-teal-200/25 dark:bg-teal-600/15",
    orb3: "bg-cyan-200/20 dark:bg-cyan-700/10",
  },
  about: {
    orb1: "bg-emerald-200/35 dark:bg-emerald-600/20",
    orb2: "bg-teal-300/20 dark:bg-teal-500/15",
    orb3: "bg-emerald-100/30 dark:bg-emerald-800/20",
  },
  work: {
    orb1: "bg-teal-300/25 dark:bg-teal-500/20",
    orb2: "bg-emerald-200/30 dark:bg-emerald-600/15",
    orb3: "bg-cyan-300/20 dark:bg-cyan-600/15",
  },
  skills: {
    orb1: "bg-cyan-200/30 dark:bg-cyan-600/20",
    orb2: "bg-emerald-300/25 dark:bg-emerald-500/15",
    orb3: "bg-teal-200/20 dark:bg-teal-700/10",
  },
  experience: {
    orb1: "bg-emerald-300/25 dark:bg-emerald-500/20",
    orb2: "bg-indigo-200/15 dark:bg-indigo-800/10",
    orb3: "bg-teal-200/20 dark:bg-teal-600/15",
  },
  contact: {
    orb1: "bg-teal-200/30 dark:bg-teal-600/20",
    orb2: "bg-emerald-200/25 dark:bg-emerald-700/15",
    orb3: "bg-cyan-100/20 dark:bg-cyan-800/10",
  },
};

const SECTION_IDS = ["hero", "about", "work", "skills", "experience", "contact"];
const DEFAULT_COLORS = SECTION_COLORS.hero;

const SPRING_CONFIG = { stiffness: 60, damping: 20, mass: 1 };

// Orb wrapper: accepts separate scroll-based and mouse-based motion values
function Orb({
  className,
  colorClass,
  scrollY,
  mouseX,
  mouseY,
}: {
  className: string;
  colorClass: string;
  scrollY: MotionValue<string>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      style={{ y: scrollY, x: mouseX, translateY: mouseY } as object}
    >
      <div
        className={`h-full w-full rounded-full blur-3xl transition-colors duration-700 ${colorClass}`}
      />
    </motion.div>
  );
}

export function BackgroundEffect() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const [activeSection, setActiveSection] = useState<string>("hero");

  // Mouse position raw values (normalized -0.5 to 0.5)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Smoothed mouse values
  const smoothMouseX = useSpring(rawMouseX, SPRING_CONFIG);
  const smoothMouseY = useSpring(rawMouseY, SPRING_CONFIG);

  // Scroll-based parallax Y for each orb
  const orb1ScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-30%"]
  );
  const orb2ScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-50%"]
  );
  const orb3ScrollY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ["0%", "0%"] : ["0%", "-20%"]
  );

  // Mouse-offset X transforms
  const orb1MouseX = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    shouldReduceMotion ? [0, 0] : [-30, 30]
  );
  const orb2MouseX = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    shouldReduceMotion ? [0, 0] : [20, -20]
  );
  const orb3MouseX = useTransform(
    smoothMouseX,
    [-0.5, 0.5],
    shouldReduceMotion ? [0, 0] : [-15, 15]
  );

  // Mouse-offset Y transforms (used as additional translateY)
  const orb1MouseY = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    shouldReduceMotion ? [0, 0] : [-20, 20]
  );
  const orb2MouseY = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    shouldReduceMotion ? [0, 0] : [15, -15]
  );
  const orb3MouseY = useTransform(
    smoothMouseY,
    [-0.5, 0.5],
    shouldReduceMotion ? [0, 0] : [-25, 25]
  );

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // Track mouse position as normalized [-0.5, 0.5] values
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (shouldReduceMotion) return;
      rawMouseX.set(e.clientX / window.innerWidth - 0.5);
      rawMouseY.set(e.clientY / window.innerHeight - 0.5);
    },
    [rawMouseX, rawMouseY, shouldReduceMotion]
  );

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const colors = SECTION_COLORS[activeSection] ?? DEFAULT_COLORS;

  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-emerald-50 via-white to-emerald-100 dark:from-emerald-950 dark:via-black dark:to-emerald-900 transition-colors duration-700" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.8) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orb 1 - top-left quadrant */}
      <Orb
        className="-top-32 -left-32 h-150 w-150"
        colorClass={colors.orb1}
        scrollY={orb1ScrollY}
        mouseX={orb1MouseX}
        mouseY={orb1MouseY}
      />

      {/* Orb 2 - center-right */}
      <Orb
        className="top-1/3 -right-48 h-175 w-175"
        colorClass={colors.orb2}
        scrollY={orb2ScrollY}
        mouseX={orb2MouseX}
        mouseY={orb2MouseY}
      />

      {/* Orb 3 - bottom-left */}
      <Orb
        className="-bottom-48 left-1/4 h-125 w-125"
        colorClass={colors.orb3}
        scrollY={orb3ScrollY}
        mouseX={orb3MouseX}
        mouseY={orb3MouseY}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
