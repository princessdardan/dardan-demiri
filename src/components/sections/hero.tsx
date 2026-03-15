"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { WaveGlow } from "@/components/ui/wave-glow";
import { DownloadButton } from "@/components/ui/download-animation";
import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/data";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

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

export function Hero() {
  const reducedMotion = useReducedMotion();
  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = personalInfo.resumeUrl;
    link.download = "";
    link.click();
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10"
    >
      {/* Animated wave glow background — static gradient fallback for reduced motion */}
      <div className="absolute inset-0 z-0 bg-[#001B2E]">
        {reducedMotion ? (
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(255,196,155,0.08), rgba(41,76,96,0.04) 40%, rgba(173,182,196,0.02) 70%)",
            }}
          />
        ) : (
          <WaveGlow
            waveSpeed={1}
            waveIntensity={10}
            pointSize={5}
            gridDistance={1.8}
            glowIntensity={1.3}
            colorA="#FFC49B"
            colorB="#FFD7B3"
            colorC="#FF9F5C"
            className="w-full h-full"
          />
        )}
      </div>

      <Container className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Availability Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white/90 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500 shadow-[0_0_6px_var(--glow-green)]" />
              </span>
              {personalInfo.status}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-white"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-3xl text-white/80 font-space-grotesk font-semibold mb-6 glow-text-primary"
          >
            {personalInfo.role}
          </motion.p>

          {/* Intro */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-8"
          >
            {personalInfo.heroIntro}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button size="lg" asChild>
              <a href="#work">
                View My Work
              </a>
            </Button>
            <DownloadButton onDownload={handleResumeDownload} />
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-2"
          >
            <div className="text-3xl font-bold text-white">
              {personalInfo.experienceYears}
            </div>
            <div className="text-sm text-white/60">
              Years Experience
            </div>
            <ArrowDown className="w-5 h-5 text-white/70 animate-bounce mt-2" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
