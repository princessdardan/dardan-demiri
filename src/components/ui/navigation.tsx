"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
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

export function Navigation() {
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
        className="pointer-events-auto bg-white/80 dark:bg-emerald-950/80 backdrop-blur-md border border-emerald-100 dark:border-emerald-800 rounded-2xl shadow-lg p-2 flex items-center gap-1 sm:gap-2"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <ScrollLink
              key={item.to}
              to={item.to}
              spy={true}
              smooth={true}
              duration={500}
              offset={-50}
              className={cn(
                "group relative p-3 rounded-xl cursor-pointer",
                "text-emerald-700 dark:text-emerald-400",
                "hover:bg-emerald-50 dark:hover:bg-emerald-900/50",
                "transition-colors duration-150"
              )}
              activeClass="!bg-emerald-100 dark:!bg-emerald-900 !text-emerald-900 dark:!text-emerald-100"
            >
              <Icon className="w-5 h-5" />
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 bg-emerald-900 dark:bg-emerald-100 text-white dark:text-emerald-900">
                {item.label}
              </span>
            </ScrollLink>
          );
        })}
      </motion.nav>
    </div>
  );
}
