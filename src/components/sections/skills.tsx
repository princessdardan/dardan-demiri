"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Layout, Database, Wrench, Terminal } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SkillCloud } from "@/components/ui/skill-cloud";
import { SkillDetailModal } from "@/components/ui/skill-detail-modal";
import { skills, projects } from "@/data";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

const categories = [
  { name: "frontend", label: "Primary Stack", icon: Layout, skills: skills.frontend },
  { name: "backend", label: "Backend", icon: Database, skills: skills.backend },
  { name: "tools", label: "Tools & Platforms", icon: Wrench, skills: skills.tools },
  { name: "practices", label: "Practices", icon: Terminal, skills: skills.practices },
] as const;

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      className="py-24 bg-white/60 dark:bg-emerald-950/60 backdrop-blur-xl"
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
          <h2 className="text-4xl font-bold text-emerald-950 dark:text-white mb-4 font-space-grotesk">
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

              return (
                <motion.div
                  key={category.name}
                  variants={fadeInUp}
                  onMouseEnter={() => setActiveCategory(category.name)}
                  onMouseLeave={() => setActiveCategory(null)}
                  className={cn(
                    "p-6 rounded-2xl border cursor-default transition-all duration-200",
                    isActive
                      ? "bg-emerald-100/50 dark:bg-emerald-900/60 border-emerald-300 dark:border-emerald-500"
                      : "bg-white/40 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800"
                  )}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200",
                        isActive
                          ? "bg-emerald-200 dark:bg-emerald-700"
                          : "bg-emerald-50 dark:bg-emerald-800"
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 transition-colors duration-200",
                          isActive
                            ? "text-emerald-800 dark:text-emerald-200"
                            : "text-emerald-600 dark:text-emerald-400"
                        )}
                      />
                    </div>
                    <h3 className="font-space-grotesk font-semibold text-emerald-900 dark:text-emerald-100">
                      {category.label}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-300"
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
