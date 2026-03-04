"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitBranch } from "lucide-react";
import { projects, skills } from "@/data";
import { CATEGORY_COLOR_MAP, type SkillCategory } from "@/types";
import { cn } from "@/lib/utils";

// Determine a tag's color based on which skill category it best matches
function getTagColorTheme(tag: string): string {
  const lowerTag = tag.toLowerCase();
  for (const [category, skillList] of Object.entries(skills)) {
    if (skillList.some((s) => s.toLowerCase().includes(lowerTag) || lowerTag.includes(s.toLowerCase()))) {
      return CATEGORY_COLOR_MAP[category as SkillCategory] ?? "primary";
    }
  }
  return "primary";
}

const TAG_COLOR_CLASSES: Record<string, { bg: string; text: string }> = {
  primary: {
    bg: "bg-primary-100 dark:bg-primary-800",
    text: "text-primary-800 dark:text-primary-200",
  },
  secondary: {
    bg: "bg-secondary-100 dark:bg-secondary-800",
    text: "text-secondary-800 dark:text-secondary-200",
  },
  tertiary: {
    bg: "bg-tertiary-100 dark:bg-tertiary-800",
    text: "text-tertiary-800 dark:text-tertiary-200",
  },
  red: {
    bg: "bg-red-100 dark:bg-red-800",
    text: "text-red-800 dark:text-red-200",
  },
  green: {
    bg: "bg-green-100 dark:bg-green-800",
    text: "text-green-800 dark:text-green-200",
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

export function Portfolio() {
  return (
    <section
      id="work"
      className="py-24 bg-primary-50/40 dark:bg-primary-900/40"
    >
      <Container>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary-950 dark:text-white mb-4 font-space-grotesk">
            Featured Work
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            A selection of projects I&apos;m proud of
          </p>
        </motion.div>

        {/* Projects */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0, 0, 0.2, 1] as const,
                    delay: index * 0.1,
                  },
                },
              }}
              className={`flex flex-col md:flex-row gap-10 lg:gap-16 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className="w-full md:w-1/2 group relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  {project.links.live && (
                    <Button asChild size="sm">
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Site
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="w-full md:w-1/2 space-y-4">
                {/* Subtitle */}
                <p className="text-sm font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                  {project.subtitle}
                </p>

                {/* Title */}
                <h3 className="text-3xl font-bold text-primary-950 dark:text-white">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {project.description}
                </p>

                {/* Feature bullets */}
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <span className="w-2 h-2 rounded-full bg-primary-500 dark:bg-primary-400 mt-1.5 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Tag pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => {
                    const theme = getTagColorTheme(tag);
                    const colors = TAG_COLOR_CLASSES[theme];
                    return (
                      <span
                        key={tag}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          colors.bg,
                          colors.text
                        )}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Action links */}
                <div className="flex items-center gap-4 pt-2">
                  {project.links.live && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Live Site
                      </a>
                    </Button>
                  )}
                  {project.links.code && (
                    <Button variant="ghost" size="sm" asChild>
                      <a
                        href={project.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <GitBranch className="w-4 h-4 mr-2" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
