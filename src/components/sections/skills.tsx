"use client";

import { motion } from "framer-motion";
import { FileCode, Layout, Server, Database, Cloud, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { GlowCard } from "@/components/ui/spotlight-card";
import { skills } from "@/data";

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

export function Skills() {
  return (
    <section
      id="skills"
      className="py-24 section-overlay-medium"
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
          <h2 className="text-4xl font-bold mb-4 font-space-grotesk brand-gradient-text inline-block">
            Skills &amp; Technologies
          </h2>
          <p className="text-lg text-foreground-muted">
            The tools and technologies I work with
          </p>
        </motion.div>

        {/* Category cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <GlowCard
                key={category.name}
                as={motion.div}
                glowColor="pink"
                variants={fadeInUp}
                className="p-6 cursor-default"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-800">
                    <Icon className="w-5 h-5 text-primary-400" />
                  </div>
                  <h3 className="font-space-grotesk font-semibold text-primary-100">
                    {category.label}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md text-xs font-medium bg-primary-200 text-primary-900"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlowCard>
            );
          })}
        </motion.div>
      </Container>

    </section>
  );
}
