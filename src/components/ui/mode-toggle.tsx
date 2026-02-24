"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Hydration guard: setState inside callback satisfies react-hooks/set-state-in-effect
  useEffect(() => {
    const id = setTimeout(setMounted, 0, true);
    return () => clearTimeout(id);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  if (!mounted) {
    // Render a skeleton placeholder to avoid layout shift
    return (
      <div className="fixed top-6 right-6 z-50 h-10 w-10 rounded-full bg-white/80 dark:bg-emerald-900/80 border border-emerald-100 dark:border-emerald-800" />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div ref={containerRef} className="fixed top-6 right-6 z-50">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Toggle theme"
        aria-expanded={open}
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-full",
          "bg-white/80 dark:bg-emerald-900/80 backdrop-blur-md",
          "border border-emerald-100 dark:border-emerald-700",
          "shadow-md hover:shadow-lg",
          "transition-shadow duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.span
              key="moon"
              initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] as const }}
              className="absolute"
            >
              <Moon className="h-4 w-4 text-emerald-300" />
            </motion.span>
          ) : (
            <motion.span
              key="sun"
              initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] as const }}
              className="absolute"
            >
              <Sun className="h-4 w-4 text-emerald-700" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ duration: 0.15, ease: [0, 0, 0.2, 1] as const }}
            className={cn(
              "absolute right-0 top-12 min-w-[140px]",
              "rounded-xl border border-emerald-100 dark:border-emerald-700",
              "bg-white/90 dark:bg-emerald-900/90 backdrop-blur-md",
              "shadow-xl py-1.5 overflow-hidden"
            )}
          >
            {themes.map(({ value, label, icon: Icon }) => {
              const isActive = theme === value;
              return (
                <button
                  key={value}
                  onClick={() => {
                    setTheme(value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3.5 py-2 text-sm",
                    "transition-colors duration-150",
                    "hover:bg-emerald-50 dark:hover:bg-emerald-800/60",
                    isActive
                      ? "text-emerald-700 dark:text-emerald-300 font-medium"
                      : "text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" />
                  <span className="flex-1 text-left">{label}</span>
                  {/* Active indicator dot */}
                  {isActive && (
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
