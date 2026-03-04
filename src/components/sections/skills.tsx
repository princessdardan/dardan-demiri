"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileCode, Layout, Server, Database, Cloud, ShieldCheck, Terminal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SkillCloud } from "@/components/ui/skill-cloud";
import { SkillDetailModal } from "@/components/ui/skill-detail-modal";
import { skills, projects } from "@/data";
import { cn } from "@/lib/utils";
import { CATEGORY_COLOR_MAP, type SkillCategory, type CategoryColorTheme } from "@/types";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

const categories = [
  { name: "languages", label: "Languages", icon: FileCode, skills: skills.languages },
  { name: "frontend", label: "Frontend", icon: Layout, skills: skills.frontend },
  { name: "backend", label: "Backend", icon: Server, skills: skills.backend },
  { name: "databases", label: "Databases", icon: Database, skills: skills.databases },
  { name: "devops", label: "DevOps & Cloud", icon: Cloud, skills: skills.devops },
  { name: "testing", label: "Testing & Quality", icon: ShieldCheck, skills: skills.testing },
] as const;

// Color classes keyed by the color theme
const CATEGORY_CARD_COLORS: Record<CategoryColorTheme, {
  activeBg: string;
  activeBorder: string;
  iconBgActive: string;
  iconColorActive: string;
  pillBg: string;
  pillText: string;
}> = {
  primary: {
    activeBg: "bg-primary-100/50 dark:bg-primary-900/60",
    activeBorder: "border-primary-300 dark:border-primary-500",
    iconBgActive: "bg-primary-200 dark:bg-primary-700",
    iconColorActive: "text-primary-800 dark:text-primary-200",
    pillBg: "bg-primary-100 dark:bg-primary-800/60",
    pillText: "text-primary-800 dark:text-primary-300",
  },
  secondary: {
    activeBg: "bg-secondary-100/50 dark:bg-secondary-900/40",
    activeBorder: "border-secondary-300 dark:border-secondary-500",
    iconBgActive: "bg-secondary-200 dark:bg-secondary-700",
    iconColorActive: "text-secondary-800 dark:text-secondary-200",
    pillBg: "bg-secondary-100 dark:bg-secondary-800/60",
    pillText: "text-secondary-800 dark:text-secondary-300",
  },
  tertiary: {
    activeBg: "bg-tertiary-100/50 dark:bg-tertiary-900/40",
    activeBorder: "border-tertiary-300 dark:border-tertiary-500",
    iconBgActive: "bg-tertiary-200 dark:bg-tertiary-700",
    iconColorActive: "text-tertiary-700 dark:text-tertiary-200",
    pillBg: "bg-tertiary-100 dark:bg-tertiary-800/60",
    pillText: "text-tertiary-800 dark:text-tertiary-300",
  },
  red: {
    activeBg: "bg-red-100/50 dark:bg-red-900/40",
    activeBorder: "border-red-300 dark:border-red-500",
    iconBgActive: "bg-red-200 dark:bg-red-700",
    iconColorActive: "text-red-800 dark:text-red-200",
    pillBg: "bg-red-100 dark:bg-red-800/60",
    pillText: "text-red-800 dark:text-red-300",
  },
  green: {
    activeBg: "bg-green-100/50 dark:bg-green-900/40",
    activeBorder: "border-green-300 dark:border-green-500",
    iconBgActive: "bg-green-200 dark:bg-green-700",
    iconColorActive: "text-green-800 dark:text-green-200",
    pillBg: "bg-green-100 dark:bg-green-800/60",
    pillText: "text-green-800 dark:text-green-300",
  },
  neutral: {
    activeBg: "bg-neutral-100/50 dark:bg-neutral-800/40",
    activeBorder: "border-neutral-300 dark:border-neutral-500",
    iconBgActive: "bg-neutral-200 dark:bg-neutral-700",
    iconColorActive: "text-neutral-800 dark:text-neutral-200",
    pillBg: "bg-neutral-100 dark:bg-neutral-700/60",
    pillText: "text-neutral-800 dark:text-neutral-300",
  },
};

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="py-24 bg-white/60 dark:bg-primary-950/60 backdrop-blur-xl"
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
            Skills &amp; Technologies
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            The tools and technologies I work with
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: SkillCloud */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeInUp}
            className="w-full lg:w-1/2 order-2 lg:order-1"
          >
            <SkillCloud
              skills={skills}
              highlightCategory={activeCategory}
              onSkillClick={setSelectedSkill}
            />
          </motion.div>

          {/* Right: Category cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="w-full lg:w-1/2 order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.name;
              const colorTheme = CATEGORY_COLOR_MAP[category.name as SkillCategory] ?? "primary";
              const colors = CATEGORY_CARD_COLORS[colorTheme];

              return (
                <motion.div
                  key={category.name}
                  variants={fadeInUp}
                  onMouseEnter={() => setActiveCategory(category.name)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={cn(
                    "p-6 rounded-2xl border cursor-default transition-all duration-200",
                    isActive
                      ? cn(colors.activeBg, colors.activeBorder)
                      : "bg-white/40 dark:bg-primary-900/20 border-primary-100 dark:border-primary-800"
                  )}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200",
                        isActive
                          ? colors.iconBgActive
                          : "bg-primary-50 dark:bg-primary-800"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-colors duration-200",
                          isActive
                            ? colors.iconColorActive
                            : "text-primary-600 dark:text-primary-400"
                        )}
                      />
                    </div>
                    <h3 className="font-space-grotesk font-semibold text-primary-900 dark:text-primary-100">
                      {category.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className={cn(
                          "px-2 py-0.5 rounded-full text-xs font-medium",
                          colors.pillBg,
                          colors.pillText
                        )}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>

      <SkillDetailModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
        projects={projects}
      />
    </section>
  );
}
