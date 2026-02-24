"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, ExternalLink, Github } from "lucide-react";
import { useEffect, useCallback } from "react";
import type { SkillDetailModalProps } from "@/types";
import { cn } from "@/lib/utils";

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
              "bg-white dark:bg-emerald-950",
              "rounded-2xl shadow-2xl",
              "border border-emerald-100 dark:border-emerald-800",
              "flex flex-col"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-emerald-100 dark:border-emerald-800 px-6 py-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-emerald-500 dark:text-emerald-400 mb-0.5">
                  Skill highlight
                </p>
                <h2 className="font-space-grotesk text-lg font-bold text-emerald-900 dark:text-emerald-50">
                  Projects using{" "}
                  <span className="text-emerald-600 dark:text-emerald-400">{skill}</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full",
                  "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200",
                  "bg-neutral-100 hover:bg-neutral-200 dark:bg-emerald-800 dark:hover:bg-emerald-700",
                  "transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
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
                        "bg-emerald-50/60 dark:bg-emerald-900/40",
                        "border border-emerald-100 dark:border-emerald-800"
                      )}
                    >
                      {/* Thumbnail */}
                      {project.image && (
                        <div className="hidden sm:block h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-emerald-100 dark:bg-emerald-800">
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
                        <h3 className="font-space-grotesk font-semibold text-emerald-900 dark:text-emerald-50 truncate">
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
                                  ? "bg-emerald-200 dark:bg-emerald-700 text-emerald-800 dark:text-emerald-100"
                                  : "bg-neutral-100 dark:bg-emerald-900/60 text-neutral-600 dark:text-neutral-400"
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
                                "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300",
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
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-800">
                    <span className="text-2xl" aria-hidden="true">
                      🛠️
                    </span>
                  </div>
                  <h3 className="font-space-grotesk font-semibold text-emerald-900 dark:text-emerald-100 mb-2">
                    Part of the toolkit
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
                    <strong className="text-emerald-600 dark:text-emerald-400">{skill}</strong>{" "}
                    is actively used across projects, though no featured case studies are tagged
                    with it yet.
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-emerald-100 dark:border-emerald-800 px-6 py-3">
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
