"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ExternalLink, Github } from "lucide-react";
import { useEffect, useCallback } from "react";
import type { SkillDetailModalProps, SkillCategory } from "@/types";
import { CATEGORY_COLOR_MAP } from "@/types";
import { skills } from "@/data";
import { cn } from "@/lib/utils";

// Reverse lookup: skill name -> category
function getSkillCategory(skillName: string): SkillCategory | null {
  for (const [category, skillList] of Object.entries(skills)) {
    if (skillList.some((s) => s.toLowerCase() === skillName.toLowerCase())) {
      return category as SkillCategory;
    }
  }
  return null;
}

// Color theme classes for modal accent
const MODAL_ACCENT_COLORS: Record<string, {
  label: string;
  highlight: string;
  tagMatch: string;
  emptyIcon: string;
}> = {
  primary: {
    label: "text-primary-500 dark:text-primary-400",
    highlight: "text-primary-600 dark:text-primary-400",
    tagMatch: "bg-primary-200 dark:bg-primary-700 text-primary-800 dark:text-primary-100",
    emptyIcon: "bg-primary-100 dark:bg-primary-800",
  },
  secondary: {
    label: "text-secondary-500 dark:text-secondary-400",
    highlight: "text-secondary-600 dark:text-secondary-400",
    tagMatch: "bg-secondary-200 dark:bg-secondary-700 text-secondary-800 dark:text-secondary-100",
    emptyIcon: "bg-secondary-100 dark:bg-secondary-800",
  },
  tertiary: {
    label: "text-tertiary-500 dark:text-tertiary-400",
    highlight: "text-tertiary-600 dark:text-tertiary-400",
    tagMatch: "bg-tertiary-200 dark:bg-tertiary-700 text-tertiary-800 dark:text-tertiary-100",
    emptyIcon: "bg-tertiary-100 dark:bg-tertiary-800",
  },
  red: {
    label: "text-red-500 dark:text-red-400",
    highlight: "text-red-600 dark:text-red-400",
    tagMatch: "bg-red-200 dark:bg-red-700 text-red-800 dark:text-red-100",
    emptyIcon: "bg-red-100 dark:bg-red-800",
  },
  green: {
    label: "text-green-500 dark:text-green-400",
    highlight: "text-green-600 dark:text-green-400",
    tagMatch: "bg-green-200 dark:bg-green-700 text-green-800 dark:text-green-100",
    emptyIcon: "bg-green-100 dark:bg-green-800",
  },
};

export function SkillDetailModal({ skill, onClose, projects }: SkillDetailModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!skill) return;
    document.addEventListener("keydown", handleKeyDown);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [skill, handleKeyDown]);

  // SSR guard: portals require document
  if (typeof document === "undefined") return null;

  // Filter projects where any tag matches the skill (case-insensitive partial match)
  const matchingProjects = skill
    ? projects.filter((project) =>
        project.tags.some((tag) =>
          tag.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(tag.toLowerCase())
        )
      )
    : [];

  // Resolve category-based accent color
  const category = skill ? getSkillCategory(skill) : null;
  const colorTheme = category ? CATEGORY_COLOR_MAP[category] : "primary";
  const accentColors = MODAL_ACCENT_COLORS[colorTheme] ?? MODAL_ACCENT_COLORS.primary;

  return createPortal(
    <AnimatePresence>
      {skill && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal card */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-label={`Projects using ${skill}`}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] as const }}
            className={cn(
              "fixed left-1/2 top-1/2 z-[101] w-full max-w-2xl -translate-x-1/2 -translate-y-1/2",
              "max-h-[90vh] overflow-hidden",
              "bg-white dark:bg-primary-950",
              "rounded-2xl shadow-2xl",
              "border border-primary-100 dark:border-primary-800",
              "flex flex-col"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-primary-100 dark:border-primary-800 px-6 py-4">
              <div>
                <p className={cn("text-xs font-medium uppercase tracking-wider mb-0.5", accentColors.label)}>
                  Skill highlight
                </p>
                <h2 className="font-space-grotesk text-lg font-bold text-primary-900 dark:text-primary-50">
                  Projects using{" "}
                  <span className={accentColors.highlight}>{skill}</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full",
                  "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200",
                  "bg-neutral-100 hover:bg-neutral-200 dark:bg-primary-800 dark:hover:bg-primary-700",
                  "transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                )}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto flex-1 px-6 py-4">
              {matchingProjects.length > 0 ? (
                <ul className="space-y-4">
                  {matchingProjects.map((project) => (
                    <li
                      key={project.title}
                      className={cn(
                        "flex gap-4 rounded-xl p-4",
                        "bg-primary-50/60 dark:bg-primary-900/40",
                        "border border-primary-100 dark:border-primary-800"
                      )}
                    >
                      {/* Thumbnail */}
                      {project.image && (
                        <div className="hidden sm:block h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-primary-100 dark:bg-primary-800">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {/* Text content */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-space-grotesk font-semibold text-primary-900 dark:text-primary-50 truncate">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Tag pills */}
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className={cn(
                                "rounded-full px-2 py-0.5 text-xs font-medium",
                                tag.toLowerCase().includes(skill!.toLowerCase()) ||
                                  skill!.toLowerCase().includes(tag.toLowerCase())
                                  ? accentColors.tagMatch
                                  : "bg-neutral-100 dark:bg-primary-900/60 text-neutral-600 dark:text-neutral-400"
                              )}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Links */}
                        <div className="mt-3 flex gap-3">
                          {project.links.live && (
                            <a
                              href={project.links.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "inline-flex items-center gap-1 text-xs font-medium",
                                "text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300",
                                "transition-colors duration-150"
                              )}
                            >
                              <ExternalLink className="h-3 w-3" />
                              View live
                            </a>
                          )}
                          {project.links.code && (
                            <a
                              href={project.links.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                "inline-flex items-center gap-1 text-xs font-medium",
                                "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200",
                                "transition-colors duration-150"
                              )}
                            >
                              <Github className="h-3 w-3" />
                              Source code
                            </a>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                /* Empty state */
                <div className="py-10 text-center">
                  <div className={cn("mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full", accentColors.emptyIcon)}>
                    <span className="text-2xl" aria-hidden="true">
                      🛠️
                    </span>
                  </div>
                  <h3 className="font-space-grotesk font-semibold text-primary-900 dark:text-primary-100 mb-2">
                    Part of the toolkit
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                    <strong className={accentColors.highlight}>{skill}</strong>{" "}
                    is actively used across projects, though no featured case studies are tagged
                    with it yet.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-primary-100 dark:border-primary-800 px-6 py-3">
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                {matchingProjects.length} project{matchingProjects.length !== 1 ? "s" : ""} found
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
