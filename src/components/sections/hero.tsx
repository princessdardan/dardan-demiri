"use client";

import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowDown, Download } from "lucide-react";
import { personalInfo } from "@/data";

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
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10"
    >
      {/* Animated background blobs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-emerald-300/30 dark:bg-emerald-600/20 blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-teal-200/25 dark:bg-teal-700/15 blur-3xl pointer-events-none"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Availability Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-emerald-900/80 border border-emerald-200 dark:border-emerald-700 text-sm font-medium text-emerald-800 dark:text-emerald-200 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              {personalInfo.status}
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-4 text-emerald-950 dark:text-white"
          >
            {personalInfo.name}
          </motion.h1>

          {/* Role */}
          <motion.p
            variants={itemVariants}
            className="text-2xl md:text-3xl text-emerald-600 dark:text-emerald-400 font-space-grotesk font-semibold mb-6"
          >
            {personalInfo.role}
          </motion.p>

          {/* Intro */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
          >
            {personalInfo.heroIntro}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <ScrollLink to="work" smooth={true} offset={-50} duration={500}>
              <Button size="lg">
                View My Work
              </Button>
            </ScrollLink>
            <Button variant="outline" size="lg" asChild>
              <a href={personalInfo.resumeUrl} download>
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-2"
          >
            <div className="text-3xl font-bold text-emerald-950 dark:text-white">
              {personalInfo.experienceYears}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Years Experience
            </div>
            <ArrowDown className="w-5 h-5 text-emerald-500 dark:text-emerald-400 animate-bounce mt-2" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
