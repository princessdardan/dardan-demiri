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

// Work experience from resume - ordered by manual priority
const sampleExperiences: Experience[] = [
  {
    id: "1",
    company: "Aira Publishing",
    role: "Software Engineer",
    startDate: "2024-06",
    endDate: undefined, // Present
    achievements: [
      "Architected and shipped a custom headless commerce platform for digital and physical educational products, replacing brittle legacy workflows with a scalable React + GraphQL system",
      "Designed metadata-driven product models supporting bundles, multi-format SKUs, and grade-level segmentation, reducing catalog maintenance effort and error rates",
      "Delivered server-rendered and aggressively cached storefronts using modern React tooling, improving page load performance while constraining infrastructure spend",
      "Converted curriculum and publishing requirements from non-technical stakeholders into durable data models and intuitive UI flows",
    ],
    technologies: ["React", "GraphQL", "Next.js", "TypeScript", "Headless CMS"],
    order: 1,
  },
  {
    id: "2",
    company: "Scholarly Elite Tutoring",
    role: "Software Engineer",
    startDate: "2020-06",
    endDate: "2024-06",
    achievements: [
      "Designed and maintained a Ruby on Rails content-authoring platform that automated the creation of client-specific tutoring materials, eliminating manual document assembly",
      "Built admin tooling and configurable templates enabling educators to generate personalized learning content at scale with consistent quality",
      "Replaced error-prone manual workflows with structured data models and automation, significantly reducing operational overhead",
      "Drove continuous system improvement by incorporating direct educator feedback into product and technical decisions",
    ],
    technologies: ["Ruby on Rails", "PostgreSQL", "JavaScript", "REST APIs"],
    order: 2,
  },
  {
    id: "3",
    company: "Danny's Fish & Chips",
    role: "Co-Managing Partner",
    startDate: "2019-05",
    endDate: undefined, // Present (concurrent role)
    achievements: [
      "Co-managed daily operations of a high-volume restaurant with a long-standing repeat customer base",
      "Built first-hand understanding of customer retention, promotions, loyalty incentives, and real-world operational constraints",
      "Evaluated and adopted digital tools for marketing, operations, and customer engagement with strict focus on ROI, reliability, and staff usability",
    ],
    technologies: ["Operations", "Customer Engagement", "Digital Marketing"],
    order: 3,
  },
  {
    id: "4",
    company: "Scholarly Elite Tutoring",
    role: "Business Development Manager",
    startDate: "2018-04",
    endDate: "2024-06",
    achievements: [
      "Leveraged data-driven strategies to optimize the client conversion process, resulting in a 14.7% increase in conversion rates",
      "Designed and executed a strategic brand extension plan for the company's educational publishing division",
      "Conducted in-depth research and led the implementation of CRM software to strengthen data collection; collaborated with the marketing team to refine client acquisition strategies in alignment with the company's long-term vision",
    ],
    technologies: ["CRM", "Data Analysis", "Strategic Planning", "Marketing"],
    order: 4,
  },
];

const sampleEducation: Education[] = [
  {
    institution: "University of Toronto",
    degree: "Honours BSc",
    field: "Mathematics, Statistics, Economics",
    startDate: "2018-09",
    endDate: "2022-05",
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
            <div className="absolute left-4.75 top-0 bottom-0 w-px bg-border" />

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
                  <div className="absolute left-3.75 top-1.5 w-2.25 h-2.25 rounded-full bg-accent border-2 border-background" />

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
