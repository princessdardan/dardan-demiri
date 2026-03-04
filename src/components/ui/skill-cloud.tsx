"use client";

import {
  motion,
  useSpring,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useState, useRef, useMemo, useCallback, useSyncExternalStore } from "react";
import {
  Code,
  Database,
  Cloud,
  Box,
  Layers,
  GitBranch,
  Globe,
  Terminal,
  Cpu,
  Workflow,
  BarChart,
  ShieldCheck,
  Zap,
  FileCode,
  Server,
  Package,
} from "lucide-react";
import type { SkillCloudProps } from "@/types";
import { cn } from "@/lib/utils";

// Category display names
const CATEGORY_LABELS: Record<string, string> = {
  languages: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases",
  devops: "DevOps & Cloud",
  testing: "Testing & Quality",
};

// Category-based color classes for skill pills
const CATEGORY_PILL_STYLES: Record<string, {
  bg: string;
  border: string;
  text: string;
  iconColor: string;
  hoverShadow: string;
}> = {
  languages: {
    bg: "bg-white/90 dark:bg-primary-900/90",
    border: "border-primary-200 dark:border-primary-700",
    text: "text-primary-800 dark:text-primary-200",
    iconColor: "text-primary-600 dark:text-primary-400",
    hoverShadow: "hover:shadow-[0_0_10px_var(--glow-primary)]",
  },
  frontend: {
    bg: "bg-white/90 dark:bg-secondary-900/50",
    border: "border-secondary-200 dark:border-secondary-700",
    text: "text-secondary-800 dark:text-secondary-200",
    iconColor: "text-secondary-600 dark:text-secondary-400",
    hoverShadow: "hover:shadow-[0_0_10px_var(--glow-secondary)]",
  },
  backend: {
    bg: "bg-white/90 dark:bg-red-950/50",
    border: "border-red-200 dark:border-red-700",
    text: "text-red-800 dark:text-red-200",
    iconColor: "text-red-600 dark:text-red-400",
    hoverShadow: "hover:shadow-[0_0_10px_var(--glow-red)]",
  },
  databases: {
    bg: "bg-white/90 dark:bg-tertiary-950/50",
    border: "border-tertiary-200 dark:border-tertiary-700",
    text: "text-tertiary-800 dark:text-tertiary-200",
    iconColor: "text-tertiary-600 dark:text-tertiary-300",
    hoverShadow: "hover:shadow-[0_0_10px_var(--glow-tertiary)]",
  },
  devops: {
    bg: "bg-white/90 dark:bg-green-950/50",
    border: "border-green-200 dark:border-green-700",
    text: "text-green-800 dark:text-green-200",
    iconColor: "text-green-600 dark:text-green-400",
    hoverShadow: "hover:shadow-[0_0_10px_var(--glow-green)]",
  },
  testing: {
    bg: "bg-white/90 dark:bg-neutral-900/50",
    border: "border-neutral-300 dark:border-neutral-600",
    text: "text-neutral-800 dark:text-neutral-200",
    iconColor: "text-neutral-600 dark:text-neutral-400",
    hoverShadow: "hover:shadow-[0_0_10px_var(--glow-neutral)]",
  },
};

const DEFAULT_PILL_STYLE = CATEGORY_PILL_STYLES.languages;

// Skill-to-icon keyword matching
function getSkillIcon(skill: string) {
  const lower = skill.toLowerCase();
  if (lower.includes("react") || lower.includes("next") || lower.includes("remix")) return Code;
  if (lower.includes("postgres") || lower.includes("sql") || lower.includes("database") || lower.includes("supabase")) return Database;
  if (lower.includes("aws") || lower.includes("vercel") || lower.includes("railway") || lower.includes("cloud")) return Cloud;
  if (lower.includes("docker") || lower.includes("container")) return Box;
  if (lower.includes("git") || lower.includes("github")) return GitBranch;
  if (lower.includes("graphql") || lower.includes("api") || lower.includes("rest")) return Layers;
  if (lower.includes("tailwind") || lower.includes("css")) return FileCode;
  if (lower.includes("typescript") || lower.includes("javascript")) return FileCode;
  if (lower.includes("ruby") || lower.includes("rails") || lower.includes("python") || lower.includes("java")) return Terminal;
  if (lower.includes("headless") || lower.includes("cms") || lower.includes("shopify")) return Globe;
  if (lower.includes("ci") || lower.includes("cd") || lower.includes("actions")) return Workflow;
  if (lower.includes("analytics") || lower.includes("content")) return BarChart;
  if (lower.includes("security") || lower.includes("auth") || lower.includes("rbac")) return ShieldCheck;
  if (lower.includes("performance") || lower.includes("speed")) return Zap;
  if (lower.includes("server") || lower.includes("node")) return Server;
  if (lower.includes("package") || lower.includes("npm")) return Package;
  if (lower.includes("cpu") || lower.includes("compute")) return Cpu;
  return Code;
}

// Fibonacci sphere distribution: evenly distributes N points on a unit sphere
function fibonacciSphere(n: number) {
  const points: { x: number; y: number; z: number }[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2; // y goes from 1 to -1
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    });
  }
  return points;
}

// Rotate a 3D point by x and y angles (in radians)
function rotatePoint(
  point: { x: number; y: number; z: number },
  angleX: number,
  angleY: number
) {
  // Rotate around X axis
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const y1 = point.y * cosX - point.z * sinX;
  const z1 = point.y * sinX + point.z * cosX;

  // Rotate around Y axis
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const x2 = point.x * cosY + z1 * sinY;
  const z2 = -point.x * sinY + z1 * cosY;

  return { x: x2, y: y1, z: z2 };
}

interface SkillPoint {
  skill: string;
  category: string;
  icon: React.ElementType;
  basePoint: { x: number; y: number; z: number };
}

export function SkillCloud({ skills, highlightCategory, onSkillClick }: SkillCloudProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isPointerDown = useRef(false);

  // Defer positioned rendering to avoid hydration mismatch
  // useSyncExternalStore with different server/client snapshots is the
  // React-recommended way to handle SSR vs client divergence without useEffect+setState
  const emptySubscribe = useCallback(() => () => {}, []);
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  // Fixed X tilt to show the sphere at a pleasant viewing angle
  const rotationX = 0.3;
  // Auto-rotation around Y axis
  const [rotationY, setRotationY] = useState(0);

  // Mouse-driven tilt using springs
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 80, damping: 25 });
  const springTiltY = useSpring(tiltY, { stiffness: 80, damping: 25 });

  // Flatten all skills into a single array with metadata
  const skillPoints: SkillPoint[] = useMemo(() => {
    const allSkills: { skill: string; category: string }[] = [];
    (Object.keys(skills) as (keyof typeof skills)[]).forEach((category) => {
      skills[category].forEach((skill) => {
        allSkills.push({ skill, category });
      });
    });

    const basePoints = fibonacciSphere(allSkills.length);

    return allSkills.map((item, i) => ({
      ...item,
      icon: getSkillIcon(item.skill),
      basePoint: basePoints[i],
    }));
  }, [skills]);

  // Auto-rotation animation loop
  useEffect(() => {
    if (shouldReduceMotion) return;

    let lastTime = performance.now();

    function animate(now: number) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      setRotationY((prev) => prev + delta * 0.4);
      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shouldReduceMotion]);

  // Pointer down: start drag for touch/pen (mouse tilts on hover without press)
  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === "mouse") return;
      isPointerDown.current = true;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    []
  );

  // Pointer move: tilt orb based on pointer position within container
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (shouldReduceMotion || !containerRef.current) return;
      if (e.pointerType !== "mouse" && !isPointerDown.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);
      tiltY.set(nx * 0.3);
      tiltX.set(-ny * 0.3);
    },
    [shouldReduceMotion, tiltX, tiltY]
  );

  const handlePointerUp = useCallback(() => {
    isPointerDown.current = false;
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  const handlePointerLeave = useCallback(() => {
    isPointerDown.current = false;
    tiltX.set(0);
    tiltY.set(0);
  }, [tiltX, tiltY]);

  // Get the current spring values for rendering
  const [currentTiltX, setCurrentTiltX] = useState(0);
  const [currentTiltY, setCurrentTiltY] = useState(0);

  useEffect(() => {
    const unsubX = springTiltX.on("change", setCurrentTiltX);
    const unsubY = springTiltY.on("change", setCurrentTiltY);
    return () => {
      unsubX();
      unsubY();
    };
  }, [springTiltX, springTiltY]);

  // Project each skill to 2D
  const RADIUS = 200; // sphere radius in px
  const CENTER = 250; // container center offset

  const projectedSkills = useMemo(() => {
    return skillPoints.map((sp) => {
      const totalX = rotationX + currentTiltX;
      const totalY = rotationY + currentTiltY;
      const rotated = rotatePoint(sp.basePoint, totalX, totalY);

      // Perspective projection
      const perspective = 800;
      const scale = perspective / (perspective + rotated.z * RADIUS);
      const px = CENTER + rotated.x * RADIUS * scale;
      const py = CENTER + rotated.y * RADIUS * scale;

      // Depth-based opacity and size
      const depthFactor = (rotated.z + 1) / 2; // 0 (far) to 1 (close)
      const opacity = 0.4 + depthFactor * 0.6;
      const fontSize = 0.7 + depthFactor * 0.4;

      return { ...sp, px, py, scale, opacity, fontSize, depthFactor, rotated };
    });
  }, [skillPoints, rotationX, rotationY, currentTiltX, currentTiltY]);

  // Sort by z so closer items render on top
  const sortedSkills = useMemo(
    () => [...projectedSkills].sort((a, b) => a.rotated.z - b.rotated.z),
    [projectedSkills]
  );

  return (
    <div
      ref={containerRef}
      className="relative mx-auto aspect-square max-w-[500px] cursor-grab active:cursor-grabbing"
      style={{ perspective: "800px", touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      aria-label="Interactive skill cloud"
    >
      {/* SVG connection lines (subtle) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-10 dark:opacity-5 pointer-events-none"
        viewBox="0 0 500 500"
        aria-hidden="true"
      >
        <circle
          cx="250"
          cy="250"
          r="198"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          className="text-primary-400 dark:text-secondary-700"
        />
      </svg>

      {/* Skill pills */}
      {sortedSkills.map((sp) => {
        const Icon = sp.icon;
        const categoryLabel = CATEGORY_LABELS[sp.category] ?? sp.category;
        const isDimmed =
          highlightCategory !== null && sp.category !== highlightCategory;
        const pillStyle = CATEGORY_PILL_STYLES[sp.category] ?? DEFAULT_PILL_STYLE;

        return (
          <motion.div
            key={`${sp.category}-${sp.skill}`}
            className="absolute"
            style={{
              left: isMounted ? sp.px : CENTER,
              top: isMounted ? sp.py : CENTER,
              transform: isMounted
                ? `translate(-50%, -50%) scale(${sp.scale})`
                : "translate(-50%, -50%) scale(0)",
              zIndex: isMounted ? Math.round(sp.depthFactor * 100) : 0,
            }}
            animate={{
              opacity: isMounted ? (isDimmed ? 0.15 : sp.opacity) : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => onSkillClick?.(sp.skill)}
              title={`${sp.skill} — ${categoryLabel}`}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-2.5 py-1",
                pillStyle.bg,
                "border", pillStyle.border,
                "shadow-sm",
                pillStyle.hoverShadow,
                pillStyle.text,
                "text-xs font-medium",
                "transition-all duration-200 whitespace-nowrap",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              )}
              style={{ fontSize: `${sp.fontSize ?? 0.85}rem` }}
            >
              <Icon className={cn("h-3 w-3 shrink-0", pillStyle.iconColor)} />
              <span>{sp.skill}</span>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
}
