"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { Experience, Education } from "@/types";
import { Download, Briefcase, GraduationCap } from "lucide-react";

interface ResumeProps {
  experiences?: Experience[];
  education?: Education[];
  resumeUrl?: string;
}

// Sample experiences - ordered by manual priority, not just chronological
const sampleExperiences: Experience[] = [
  {
    id: "1",
    company: "Tech Startup Inc.",
    role: "Senior Frontend Developer",
    startDate: "2022-03",
    endDate: undefined, // Present
    achievements: [
      "Led the rebuild of the main product from jQuery to React, improving performance by 60%",
      "Established frontend architecture patterns and coding standards for a team of 5 developers",
      "Implemented automated testing pipeline reducing production bugs by 40%",
    ],
    technologies: ["React", "TypeScript", "Next.js", "GraphQL", "Tailwind CSS"],
    order: 1,
  },
  {
    id: "2",
    company: "Digital Agency Co.",
    role: "Full Stack Developer",
    startDate: "2020-06",
    endDate: "2022-02",
    achievements: [
      "Delivered 15+ client projects including e-commerce sites and web applications",
      "Built custom CMS solutions reducing content update time by 70%",
      "Mentored junior developers and conducted code reviews",
    ],
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Docker"],
    order: 2,
  },
  {
    id: "3",
    company: "Freelance",
    role: "Web Developer",
    startDate: "2019-01",
    endDate: "2020-05",
    achievements: [
      "Developed websites and applications for 10+ small business clients",
      "Specialized in responsive design and performance optimization",
      "Built long-term client relationships with 90% repeat business rate",
    ],
    technologies: ["JavaScript", "React", "WordPress", "CSS", "PHP"],
    order: 3,
  },
];

const sampleEducation: Education[] = [
  {
    institution: "University of Technology",
    degree: "Bachelor of Science",
    field: "Computer Science",
    startDate: "2015-09",
    endDate: "2019-05",
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

function formatDate(dateString: string): string {
  const date = new Date(dateString + "-01");
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function Resume({
  experiences = sampleExperiences,
  education = sampleEducation,
  resumeUrl = "/dardan-demiri-resume.pdf",
}: ResumeProps) {
  // Sort experiences by manual order
  const sortedExperiences = [...experiences].sort((a, b) => a.order - b.order);

  return (
    <Section id="resume">
      <Container size="narrow">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey and education"
        />

        {/* Download Button */}
        <div className="flex justify-center mb-12">
          <Button size="lg" asChild>
            <a href={resumeUrl} download>
              <Download className="w-5 h-5 mr-2" />
              Download Full Resume (PDF)
            </a>
          </Button>
        </div>

        {/* Work Experience Timeline */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-accent-muted text-accent flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">
              Work Experience
            </h3>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

            <div className="space-y-8">
              {sortedExperiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeInUp}
                  className="relative pl-12"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-[15px] top-1.5 w-[9px] h-[9px] rounded-full bg-accent border-2 border-background" />

                  <div className="bg-surface rounded-xl border border-border p-6">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                      <div>
                        <h4 className="font-display font-semibold text-lg text-foreground">
                          {exp.role}
                        </h4>
                        <p className="text-accent font-medium">{exp.company}</p>
                      </div>
                      <span className="text-sm text-foreground-muted whitespace-nowrap">
                        {formatDate(exp.startDate)} —{" "}
                        {exp.endDate ? formatDate(exp.endDate) : "Present"}
                      </span>
                    </div>

                    {/* Achievements */}
                    <ul className="space-y-2 mb-4">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-foreground-muted"
                        >
                          <span className="text-accent mt-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded bg-background text-xs text-foreground-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-accent-muted text-accent flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-display font-semibold text-foreground">
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
                className="bg-surface rounded-xl border border-border p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h4 className="font-display font-semibold text-lg text-foreground">
                      {edu.degree} in {edu.field}
                    </h4>
                    <p className="text-accent font-medium">{edu.institution}</p>
                  </div>
                  <span className="text-sm text-foreground-muted whitespace-nowrap">
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
