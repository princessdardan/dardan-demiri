"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Briefcase, GraduationCap } from "lucide-react";
import { experience, education } from "@/data";
import { cn } from "@/lib/utils";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

export function Resume() {
  return (
    <section
      id="experience"
      className="py-24 bg-primary-50/30 dark:bg-primary-900/30"
    >
      <Container size="narrow">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary-950 dark:text-white mb-4 font-space-grotesk">
            Experience &amp; Education
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            My professional journey
          </p>
        </motion.div>

        {/* Work Experience Timeline */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-800">
              <Briefcase className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-space-grotesk font-semibold text-primary-950 dark:text-white">
              Work Experience
            </h3>
          </div>

          <div className="relative border-l-2 border-primary-200 dark:border-secondary-800 space-y-10">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline dot - cycling colors */}
                <span className={cn(
                  "absolute -left-2.25 top-2 w-4 h-4 rounded-full border-2 border-white dark:border-primary-900",
                  index % 4 === 0 && "bg-primary-500 dark:bg-primary-400 dark:shadow-[0_0_8px_var(--glow-primary)]",
                  index % 4 === 1 && "bg-secondary-500 dark:bg-secondary-400 dark:shadow-[0_0_8px_var(--glow-secondary)]",
                  index % 4 === 2 && "bg-red-500 dark:bg-red-400 dark:shadow-[0_0_8px_var(--glow-red)]",
                  index % 4 === 3 && "bg-green-500 dark:bg-green-400 dark:shadow-[0_0_8px_var(--glow-green)]",
                )} />

                <div className="bg-white dark:bg-primary-900/50 rounded-xl border border-primary-100 dark:border-primary-800 p-6">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-space-grotesk font-semibold text-lg text-primary-950 dark:text-white">
                        {exp.role}
                      </h3>
                      <h4 className="text-primary-600 dark:text-primary-400 font-medium">
                        {exp.company}
                      </h4>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200 whitespace-nowrap">
                      {exp.period}
                    </span>
                  </div>

                  {/* Points */}
                  <ul className="space-y-2 mb-4">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                      >
                        <span className="text-primary-500 dark:text-primary-400 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-primary-50 dark:bg-primary-800/60 text-xs text-primary-700 dark:text-primary-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-800">
              <GraduationCap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="text-xl font-space-grotesk font-semibold text-primary-950 dark:text-white">
              Education
            </h3>
          </div>

          <div className="space-y-4">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="bg-white dark:bg-primary-800/50 p-6 rounded-xl border border-primary-100 dark:border-primary-700"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-space-grotesk font-semibold text-lg text-primary-950 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium">
                      {edu.school}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200 whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
