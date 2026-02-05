"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowDown, Download } from "lucide-react";

interface HeroProps {
  name?: string;
  title?: string;
  tagline?: string;
  availability?: {
    status: "available" | "busy" | "open";
    message: string;
  };
  stats?: {
    years: string;
    projects: string;
    clients: string;
  };
}

// Animation variants for staggered entrance (visual hierarchy order)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export function Hero({
  name = "Dardan Demiri",
  title = "Web Developer",
  tagline = "I craft fast, accessible, and beautifully designed web experiences that help businesses grow and users thrive.",
  availability = {
    status: "available",
    message: "Available for new projects",
  },
  stats = {
    years: "5+",
    projects: "30+",
    clients: "15+",
  },
}: HeroProps) {
  const availabilityColors = {
    available: "bg-green-500",
    busy: "bg-amber-500",
    open: "bg-blue-500",
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient - static fallback for performance */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 107, 71, 0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 50%, rgba(255, 140, 107, 0.1), transparent),
            linear-gradient(to bottom, var(--background), var(--background-secondary))
          `,
        }}
      />

      <Container className="py-20 md:py-32">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Availability Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-sm font-medium">
              <span
                className={`w-2 h-2 rounded-full ${availabilityColors[availability.status]} animate-pulse`}
              />
              {availability.message}
            </span>
          </motion.div>

          {/* Headline - highest visual priority */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
          >
            <span className="text-foreground">{name}</span>
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl md:text-3xl text-accent font-display font-semibold mb-6"
          >
            {title}
          </motion.p>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-8"
          >
            {tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button size="lg" asChild>
              <a href="#portfolio">View My Work</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="/dardan-demiri-resume.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-8 md:gap-12 text-center"
          >
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stats.years}
              </div>
              <div className="text-sm text-foreground-muted">
                Years Experience
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stats.projects}
              </div>
              <div className="text-sm text-foreground-muted">
                Projects Completed
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stats.clients}
              </div>
              <div className="text-sm text-foreground-muted">Happy Clients</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <a
            href="#about"
            className="flex flex-col items-center gap-2 text-foreground-muted hover:text-accent transition-colors"
            aria-label="Scroll to about section"
          >
            <span className="text-sm font-medium">Scroll</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </motion.div>
      </Container>
    </section>
  );
}

// CSS-only fallback component for no-JS users
export function HeroNoJS({
  name = "Dardan Demiri",
  title = "Web Developer",
  tagline = "I craft fast, accessible, and beautifully designed web experiences that help businesses grow and users thrive.",
  availability = {
    status: "available" as const,
    message: "Available for new projects",
  },
  stats = {
    years: "5+",
    projects: "30+",
    clients: "15+",
  },
}: HeroProps) {
  const availabilityColors = {
    available: "bg-green-500",
    busy: "bg-amber-500",
    open: "bg-blue-500",
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% -20%, rgba(255, 107, 71, 0.15), transparent),
            linear-gradient(to bottom, var(--background), var(--background-secondary))
          `,
        }}
      />

      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 opacity-0 animate-fade-in animate-delay-1">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border text-sm font-medium">
              <span
                className={`w-2 h-2 rounded-full ${availabilityColors[availability.status]}`}
              />
              {availability.message}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 opacity-0 animate-fade-in-up animate-delay-2">
            {name}
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-accent font-display font-semibold mb-6 opacity-0 animate-fade-in-up animate-delay-3">
            {title}
          </p>

          <p className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-8 opacity-0 animate-fade-in-up animate-delay-4">
            {tagline}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 opacity-0 animate-fade-in-up animate-delay-5">
            <Button size="lg" asChild>
              <a href="#portfolio">View My Work</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="/dardan-demiri-resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 md:gap-12 text-center opacity-0 animate-fade-in animate-delay-5">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stats.years}
              </div>
              <div className="text-sm text-foreground-muted">
                Years Experience
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stats.projects}
              </div>
              <div className="text-sm text-foreground-muted">
                Projects Completed
              </div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-2xl md:text-3xl font-bold text-foreground">
                {stats.clients}
              </div>
              <div className="text-sm text-foreground-muted">Happy Clients</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
