"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Home, User, Briefcase, Code, FileText, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", to: "hero", icon: Home },
  { label: "About", to: "about", icon: User },
  { label: "Work", to: "work", icon: Briefcase },
  { label: "Skills", to: "skills", icon: Code },
  { label: "Experience", to: "experience", icon: FileText },
  { label: "Contact", to: "contact", icon: Mail },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.to);

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return activeSection;
}

export function Navigation() {
  const activeSection = useActiveSection();

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: 0.3,
        }}
        className="pointer-events-auto bg-white/80 dark:bg-primary-950/80 backdrop-blur-md border border-primary-100 dark:border-primary-800 dark:shadow-[0_0_15px_rgba(142,68,173,0.15),0_0_30px_rgba(52,152,219,0.08),0_0_10px_rgba(46,204,113,0.06)] rounded-2xl shadow-lg p-2 flex items-center gap-1 sm:gap-2"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.to;
          return (
            <button
              key={item.to}
              onClick={() => {
                document.getElementById(item.to)?.scrollIntoView();
              }}
              className={cn(
                "group relative p-3 rounded-xl cursor-pointer",
                "text-primary-700 dark:text-primary-400",
                "hover:bg-primary-50 dark:hover:bg-primary-900/50",
                "transition-colors duration-150",
                isActive &&
                  "!bg-primary-100 dark:!bg-primary-900 !text-primary-900 dark:!text-primary-100 dark:shadow-[0_0_8px_var(--glow-primary)]"
              )}
            >
              <Icon className="w-5 h-5" />
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-primary-900 dark:bg-primary-100 text-white dark:text-primary-900">
                {item.label}
              </span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
}
