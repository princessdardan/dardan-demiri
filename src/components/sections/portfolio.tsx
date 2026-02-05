"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import {
  ExternalLink,
  Github,
  ChevronDown,
  Code2,
  Quote,
} from "lucide-react";

interface PortfolioProps {
  projects?: Project[];
  filterTech?: string | null;
  onTechClick?: (tech: string) => void;
}

// Sample projects for demonstration
const sampleProjects: Project[] = [
  {
    slug: "project-one",
    title: "E-Commerce Platform",
    client: "Fashion Brand",
    description:
      "A modern e-commerce platform with real-time inventory management, personalized recommendations, and seamless checkout experience.",
    thumbnail: "/images/projects/project-1.jpg",
    thumbnailAlt: "E-commerce platform screenshot",
    outcomes: [
      "40% increase in conversion rate",
      "60% faster page load times",
      "Reduced cart abandonment by 25%",
    ],
    testimonial: {
      quote:
        "Dardan transformed our online presence. The new platform exceeded our expectations and our customers love it.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "Fashion Brand Co.",
    },
    liveUrl: "https://example.com",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe", "PostgreSQL"],
    architecture: [
      "Next.js App Router with server components for optimal performance",
      "Headless CMS integration for product management",
      "Stripe for secure payment processing",
      "Redis caching for inventory and session management",
    ],
    challenges: [
      {
        challenge: "Real-time inventory sync across multiple warehouses",
        solution:
          "Implemented WebSocket connections with Redis pub/sub for instant inventory updates",
      },
      {
        challenge: "Handling high traffic during flash sales",
        solution:
          "Added edge caching, queue-based checkout, and horizontal scaling with Kubernetes",
      },
    ],
    codeSnippet: {
      language: "typescript",
      description: "Real-time inventory hook",
      code: `const useInventory = (productId: string) => {
  const [stock, setStock] = useState<number>(0);

  useEffect(() => {
    const ws = new WebSocket(INVENTORY_WS_URL);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.productId === productId) {
        setStock(data.quantity);
      }
    };
    return () => ws.close();
  }, [productId]);

  return stock;
};`,
    },
    githubUrl: "https://github.com",
    featured: true,
    dateCompleted: "2024-06",
    status: "live",
  },
  {
    slug: "project-two",
    title: "Healthcare Dashboard",
    client: "Medical Startup",
    description:
      "A comprehensive healthcare analytics dashboard helping medical professionals track patient outcomes and optimize treatment plans.",
    thumbnail: "/images/projects/project-2.jpg",
    thumbnailAlt: "Healthcare dashboard screenshot",
    outcomes: [
      "Reduced data retrieval time by 80%",
      "Improved patient outcome tracking",
      "HIPAA compliant architecture",
    ],
    liveUrl: undefined, // NDA project
    techStack: ["React", "D3.js", "Node.js", "MongoDB", "AWS"],
    architecture: [
      "React with Redux for complex state management",
      "D3.js for interactive data visualizations",
      "Node.js API with HIPAA-compliant data handling",
      "MongoDB for flexible medical record storage",
    ],
    challenges: [
      {
        challenge: "Visualizing complex medical data intuitively",
        solution:
          "Created custom D3.js components with drill-down capabilities and contextual tooltips",
      },
      {
        challenge: "Ensuring HIPAA compliance throughout",
        solution:
          "Implemented end-to-end encryption, audit logging, and role-based access control",
      },
    ],
    featured: true,
    dateCompleted: "2024-03",
    status: "nda",
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

export function Portfolio({
  projects = sampleProjects,
  filterTech = null,
  onTechClick,
}: PortfolioProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const filteredProjects = filterTech
    ? projects.filter((p) =>
        p.techStack.some(
          (t) => t.toLowerCase() === filterTech.toLowerCase()
        )
      )
    : projects;

  const toggleExpand = (slug: string) => {
    setExpandedProject(expandedProject === slug ? null : slug);
  };

  return (
    <Section id="portfolio">
      <Container>
        <SectionHeader
          title="Featured Work"
          subtitle="A selection of projects I'm proud of"
        />

        {filterTech && (
          <div className="mb-8 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-muted text-accent text-sm">
              Filtered by: {filterTech}
              <button
                onClick={() => onTechClick?.("")}
                className="hover:text-accent-hover"
              >
                ×
              </button>
            </span>
          </div>
        )}

        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              isExpanded={expandedProject === project.slug}
              onToggle={() => toggleExpand(project.slug)}
              onTechClick={onTechClick}
              index={index}
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground-muted">
              No projects found with this technology.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}

interface ProjectCardProps {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
  onTechClick?: (tech: string) => void;
  index: number;
}

function ProjectCard({
  project,
  isExpanded,
  onToggle,
  onTechClick,
  index,
}: ProjectCardProps) {
  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={fadeInUp}
      className="bg-surface rounded-2xl border border-border overflow-hidden"
    >
      {/* Visual Layer (always visible) */}
      <div className="grid md:grid-cols-2 gap-0">
        {/* Project Image */}
        <div className="relative aspect-video md:aspect-auto">
          <div className="absolute inset-0 bg-accent-muted flex items-center justify-center">
            {/* Placeholder - replace with actual image */}
            <div className="text-center text-accent p-8">
              <Code2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-sm text-foreground-muted">
                Project screenshot
                <br />
                <code className="text-xs">
                  /public/images/projects/{project.slug}.jpg
                </code>
              </p>
            </div>
            {/* Uncomment when images are added:
            <Image
              src={project.thumbnail}
              alt={project.thumbnailAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            */}
          </div>
        </div>

        {/* Project Info */}
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex-1">
            {/* Client/Context */}
            {project.client && (
              <p className="text-sm text-foreground-muted mb-2">
                {project.client}
              </p>
            )}

            {/* Title */}
            <h3 className="text-2xl font-bold text-foreground mb-3">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-foreground-muted mb-4 leading-relaxed">
              {project.description}
            </p>

            {/* Outcomes */}
            {project.outcomes && project.outcomes.length > 0 && (
              <ul className="space-y-2 mb-4">
                {project.outcomes.map((outcome, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <span className="text-accent mt-1">✓</span>
                    {outcome}
                  </li>
                ))}
              </ul>
            )}

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 5).map((tech) => (
                <button
                  key={tech}
                  onClick={() => onTechClick?.(tech)}
                  className="px-3 py-1 rounded-full bg-background text-foreground-muted text-xs font-medium hover:bg-accent-muted hover:text-accent transition-colors"
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border">
            {/* Live URL */}
            {project.status === "live" && project.liveUrl ? (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Site
                </a>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled
                className="cursor-not-allowed"
                title={
                  project.status === "nda"
                    ? "Live site unavailable (NDA)"
                    : "Live site no longer available"
                }
              >
                <ExternalLink className="w-4 h-4 mr-2 opacity-50" />
                {project.status === "nda" ? "Under NDA" : "Archived"}
              </Button>
            )}

            {/* GitHub */}
            {project.githubUrl && (
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}

            {/* Expand Technical Details */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="ml-auto"
            >
              Technical Details
              <ChevronDown
                className={cn(
                  "w-4 h-4 ml-2 transition-transform duration-300",
                  isExpanded && "rotate-180"
                )}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Technical Layer (expandable accordion) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
            style={{ minHeight: isExpanded ? "400px" : 0 }}
          >
            <div className="p-6 md:p-8 bg-background-secondary border-t border-border">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Architecture */}
                <div>
                  <h4 className="font-display font-semibold text-lg text-foreground mb-4">
                    Architecture Overview
                  </h4>
                  <ul className="space-y-3">
                    {project.architecture.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-foreground-muted"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Challenges & Solutions */}
                <div>
                  <h4 className="font-display font-semibold text-lg text-foreground mb-4">
                    Challenges & Solutions
                  </h4>
                  <div className="space-y-4">
                    {project.challenges.map((item, i) => (
                      <div key={i} className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          Challenge: {item.challenge}
                        </p>
                        <p className="text-sm text-foreground-muted">
                          Solution: {item.solution}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Code Snippet */}
              {project.codeSnippet && (
                <div className="mt-8">
                  <h4 className="font-display font-semibold text-lg text-foreground mb-2">
                    Code Highlight
                  </h4>
                  <p className="text-sm text-foreground-muted mb-4">
                    {project.codeSnippet.description}
                  </p>
                  <pre className="text-sm overflow-x-auto">
                    <code>{project.codeSnippet.code}</code>
                  </pre>
                </div>
              )}

              {/* Testimonial */}
              {project.testimonial && (
                <div className="mt-8 p-6 bg-surface rounded-xl border border-border">
                  <Quote className="w-8 h-8 text-accent mb-4" />
                  <blockquote className="text-lg text-foreground italic mb-4">
                    "{project.testimonial.quote}"
                  </blockquote>
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">
                      {project.testimonial.author}
                    </p>
                    <p className="text-foreground-muted">
                      {project.testimonial.role}, {project.testimonial.company}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
