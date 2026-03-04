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
    orb1: "bg-primary-300/35 dark:bg-primary-500/30",
    orb2: "bg-secondary-300/30 dark:bg-secondary-500/25",
    orb3: "bg-green-300/20 dark:bg-green-500/15",
  },
  about: {
    orb1: "bg-primary-200/35 dark:bg-primary-600/30",
    orb2: "bg-red-300/20 dark:bg-red-500/15",
    orb3: "bg-secondary-400/25 dark:bg-secondary-400/22",
  },
  work: {
    orb1: "bg-secondary-400/30 dark:bg-secondary-400/28",
    orb2: "bg-green-300/20 dark:bg-green-500/15",
    orb3: "bg-tertiary-400/25 dark:bg-tertiary-400/20",
  },
  skills: {
    orb1: "bg-tertiary-300/35 dark:bg-tertiary-400/28",
    orb2: "bg-red-300/20 dark:bg-red-500/15",
    orb3: "bg-secondary-300/25 dark:bg-secondary-500/20",
  },
  experience: {
    orb1: "bg-primary-300/30 dark:bg-primary-500/28",
    orb2: "bg-green-300/20 dark:bg-green-500/15",
    orb3: "bg-red-200/15 dark:bg-red-500/12",
  },
  contact: {
    orb1: "bg-secondary-300/35 dark:bg-secondary-500/28",
    orb2: "bg-primary-200/25 dark:bg-primary-700/22",
    orb3: "bg-red-200/20 dark:bg-red-500/15",
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
      <div className="absolute inset-0 bg-linear-to-br from-primary-50 via-white to-primary-100 dark:from-primary-950 dark:via-black dark:to-primary-900 transition-colors duration-700" />

      {/* Grid pattern overlay - two-tone synthwave grid */}
      <div
        className="absolute inset-0 animate-glow-pulse"
        style={{
          backgroundImage: `
            linear-gradient(rgba(142, 68, 173, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52, 152, 219, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
          opacity: 0.05,
          maskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 30%, black 70%, transparent 100%)",
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

      {/* Scanline overlay - dark mode only, very subtle CRT effect */}
      <div
        className="absolute inset-0 hidden dark:block pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(52, 152, 219, 0.015) 2px,
            rgba(52, 152, 219, 0.015) 4px
          )`,
        }}
      />

      {/* Horizon glow line - 5-color gradient */}
      <div
        className="absolute left-0 right-0 h-px bottom-1/3 opacity-30 dark:opacity-55"
        style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            var(--glow-green) 12%,
            var(--glow-secondary) 28%,
            var(--glow-primary) 50%,
            var(--glow-red) 72%,
            var(--glow-tertiary) 88%,
            transparent 100%
          )`,
        }}
      />
    </div>
  );
}
