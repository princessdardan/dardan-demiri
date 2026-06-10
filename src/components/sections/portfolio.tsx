"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ExternalLink, GitBranch } from "lucide-react";
import { projects, skills } from "@/data";
import { CATEGORY_COLOR_MAP, type CategoryColorTheme, type Project, type SkillCategory } from "@/types";
import { cn } from "@/lib/utils";

function getTagColorTheme(tag: string): CategoryColorTheme {
  const lowerTag = tag.toLowerCase();
  for (const [category, skillList] of Object.entries(skills)) {
    if (skillList.some((s) => s.toLowerCase().includes(lowerTag) || lowerTag.includes(s.toLowerCase()))) {
      return CATEGORY_COLOR_MAP[category as SkillCategory] ?? "primary";
    }
  }
  return "primary";
}

const TAG_COLOR_CLASSES: Record<CategoryColorTheme, { bg: string; text: string }> = {
  primary: { bg: "bg-primary-800", text: "text-primary-200" },
  secondary: { bg: "bg-secondary-800", text: "text-secondary-200" },
  tertiary: { bg: "bg-tertiary-800", text: "text-tertiary-200" },
  red: { bg: "bg-red-800", text: "text-red-200" },
  green: { bg: "bg-green-800", text: "text-green-200" },
  neutral: { bg: "bg-neutral-800", text: "text-neutral-200" },
};

// Variants are defined inside the Portfolio component so they can read
// useReducedMotion. The `initial` prop is always "hidden" (stable on SSR)
// and the transition duration is set to 0 when reduced motion is enabled.
// This avoids a hydration mismatch that would occur if we branched `initial`
// directly on useReducedMotion().

function CaseStudySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-1.5">
      <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-300">
        {title}
      </h4>
      <div className="text-sm leading-relaxed text-foreground-muted">
        {children}
      </div>
    </section>
  );
}

function StackPills({ stack }: { stack: string[] }) {
  return (
    <div className="flex flex-wrap gap-2 pt-1">
      {stack.map((tag) => {
        const theme = getTagColorTheme(tag);
        const colors = TAG_COLOR_CLASSES[theme] ?? TAG_COLOR_CLASSES.primary;
        return (
          <span
            key={tag}
            className={cn("rounded-full px-3 py-1 text-xs font-medium", colors.bg, colors.text)}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
}

function ProjectVisual({ project, className }: { project: Project; className?: string }) {
  const visuals = project.visuals && project.visuals.length > 0 ? project.visuals : [project.visual];
  const [primaryVisual, ...secondaryVisuals] = visuals;

  return (
    <figure className={cn("w-full space-y-3 md:w-1/2", className)}>
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-primary-900 shadow-xl">
        <Image
          src={primaryVisual.src}
          alt={primaryVisual.alt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={false}
        />
      </div>

      {secondaryVisuals.length > 0 && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {secondaryVisuals.slice(0, 2).map((visual) => (
            <div
              key={visual.src}
              className="relative aspect-video overflow-hidden rounded-xl border border-white/10 bg-primary-900 shadow-lg"
            >
              <Image
                src={visual.src}
                alt={visual.alt}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      )}

      {primaryVisual.caption && (
        <figcaption className="text-xs leading-relaxed text-foreground-muted/80">
          {primaryVisual.caption}
        </figcaption>
      )}
    </figure>
  );
}

function ProjectDetails({ project }: { project: Project }) {
  return (
    <div className="w-full space-y-5 md:w-1/2">
      <div className="space-y-2">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary-400">
          {project.subtitle} · {project.status}
        </p>
        <h3 className="text-3xl font-bold text-white">
          {project.title}
        </h3>
        <p className="leading-relaxed text-foreground-muted">
          {project.summary}
        </p>
      </div>

      <ProjectVisual project={project} className="md:hidden" />

      <div className="grid gap-4">
        <CaseStudySection title="Problem">
          <p>{project.caseStudy.problem}</p>
        </CaseStudySection>

        <CaseStudySection title="System built">
          <p>{project.caseStudy.systemBuilt}</p>
        </CaseStudySection>

        <CaseStudySection title="Key technical work">
          <ul className="space-y-2">
            {project.caseStudy.keyTechnicalWork.map((work) => (
              <li key={work} className="flex items-start gap-3">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-400" />
                <span>{work}</span>
              </li>
            ))}
          </ul>
        </CaseStudySection>

        <CaseStudySection title="Business value">
          <p>{project.caseStudy.businessValue}</p>
        </CaseStudySection>

        <CaseStudySection title="Stack">
          <StackPills stack={project.stack} />
        </CaseStudySection>
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        {project.links.live && (
          <Button variant="outline" size="md" asChild>
            <a href={project.links.live} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Live Site
            </a>
          </Button>
        )}
        {project.links.code && (
          <Button variant="ghost" size="md" asChild>
            <a href={project.links.code} target="_blank" rel="noopener noreferrer">
              <GitBranch className="mr-2 h-4 w-4" />
              View Code
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}

export function Portfolio() {
  const reducedMotion = useReducedMotion();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0 : 0.5,
        ease: [0, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section id="work" className="py-24 section-overlay-light">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="mb-16 text-center"
        >
          <h2 className="brand-gradient-text mb-4 inline-block font-space-grotesk text-4xl font-bold">
            Featured Work
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-foreground-muted">
            Production systems spanning real estate, publishing, bookings, restaurants, and education workflows.
          </p>
        </motion.div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <motion.article
              key={project.slug}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: reducedMotion ? 0 : 0.5,
                    ease: [0, 0, 0.2, 1] as const,
                    delay: reducedMotion ? 0 : index * 0.1,
                  },
                },
              }}
              className={cn(
                "flex flex-col gap-8 lg:gap-14",
                index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row",
                "md:items-start"
              )}
            >
              <ProjectVisual project={project} className="hidden md:block" />
              <ProjectDetails project={project} />
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
