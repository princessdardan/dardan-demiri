"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Briefcase, GraduationCap } from "lucide-react";
import { experience, education } from "@/data";

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
      className="py-24 bg-emerald-50/30 dark:bg-emerald-900/30"
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
          <h2 className="text-4xl font-bold text-emerald-950 dark:text-white mb-4 font-space-grotesk">
            Experience &amp; Education
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            My professional journey
          </p>
        </motion.div>

        {/* Work Experience Timeline */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-800">
              <Briefcase className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-space-grotesk font-semibold text-emerald-950 dark:text-white">
              Work Experience
            </h3>
          </div>

          <div className="relative border-l-2 border-emerald-100 dark:border-emerald-800 space-y-10">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="relative pl-8 md:pl-12"
              >
                {/* Timeline dot */}
                <span className="absolute -left-2.25 top-2 w-4 h-4 rounded-full bg-emerald-500 dark:bg-emerald-400 border-2 border-white dark:border-emerald-900" />

                <div className="bg-white dark:bg-emerald-900/50 rounded-xl border border-emerald-100 dark:border-emerald-800 p-6">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                    <div>
                      <h3 className="font-space-grotesk font-semibold text-lg text-emerald-950 dark:text-white">
                        {exp.role}
                      </h3>
                      <h4 className="text-emerald-600 dark:text-emerald-400 font-medium">
                        {exp.company}
                      </h4>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 whitespace-nowrap">
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
                        <span className="text-emerald-500 dark:text-emerald-400 mt-1">•</span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-800/60 text-xs text-emerald-700 dark:text-emerald-300"
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-800">
              <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-xl font-space-grotesk font-semibold text-emerald-950 dark:text-white">
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
                className="bg-white dark:bg-emerald-800/50 p-6 rounded-xl border border-emerald-100 dark:border-emerald-700"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-space-grotesk font-semibold text-lg text-emerald-950 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                      {edu.school}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200 whitespace-nowrap">
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
