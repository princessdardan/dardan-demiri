"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import type { Skill, SkillTier, SkillCategory } from "@/types";

interface SkillsProps {
  skills?: Skill[];
  onSkillClick?: (skillName: string) => void;
  featuredSkills?: string[]; // Skills that have portfolio projects
}

// Default skills data organized by tier and category
const defaultSkills: Skill[] = [
  // Primary tier (6-8 per category max)
  // Frontend - Primary
  { name: "React", tier: "primary", category: "frontend", projectSlugs: ["project-one", "project-two"] },
  { name: "Next.js", tier: "primary", category: "frontend", projectSlugs: ["project-one"] },
  { name: "TypeScript", tier: "primary", category: "frontend", projectSlugs: ["project-one"] },
  { name: "Tailwind CSS", tier: "primary", category: "frontend", projectSlugs: ["project-one"] },
  { name: "HTML/CSS", tier: "primary", category: "frontend" },
  { name: "JavaScript", tier: "primary", category: "frontend" },

  // Backend - Primary
  { name: "Node.js", tier: "primary", category: "backend", projectSlugs: ["project-two"] },
  { name: "PostgreSQL", tier: "primary", category: "backend", projectSlugs: ["project-one"] },
  { name: "REST APIs", tier: "primary", category: "backend" },
  { name: "GraphQL", tier: "primary", category: "backend" },

  // Tools - Primary
  { name: "Git", tier: "primary", category: "tools" },
  { name: "VS Code", tier: "primary", category: "tools" },
  { name: "Figma", tier: "primary", category: "tools" },
  { name: "Vercel", tier: "primary", category: "tools" },

  // Practices - Primary
  { name: "Responsive Design", tier: "primary", category: "practices" },
  { name: "Accessibility", tier: "primary", category: "practices" },
  { name: "Performance", tier: "primary", category: "practices" },

  // Familiar tier (4-6 per category)
  // Frontend - Familiar
  { name: "Vue.js", tier: "familiar", category: "frontend" },
  { name: "Framer Motion", tier: "familiar", category: "frontend" },
  { name: "Redux", tier: "familiar", category: "frontend" },
  { name: "D3.js", tier: "familiar", category: "frontend", projectSlugs: ["project-two"] },

  // Backend - Familiar
  { name: "Python", tier: "familiar", category: "backend" },
  { name: "MongoDB", tier: "familiar", category: "backend", projectSlugs: ["project-two"] },
  { name: "Redis", tier: "familiar", category: "backend" },
  { name: "AWS", tier: "familiar", category: "backend", projectSlugs: ["project-two"] },

  // Tools - Familiar
  { name: "Docker", tier: "familiar", category: "tools" },
  { name: "GitHub Actions", tier: "familiar", category: "tools" },
  { name: "Stripe", tier: "familiar", category: "tools", projectSlugs: ["project-one"] },
  { name: "Playwright", tier: "familiar", category: "tools" },

  // Practices - Familiar
  { name: "Testing", tier: "familiar", category: "practices" },
  { name: "CI/CD", tier: "familiar", category: "practices" },
  { name: "SEO", tier: "familiar", category: "practices" },

  // Learning tier (3-4 per category)
  // Frontend - Learning
  { name: "Svelte", tier: "learning", category: "frontend" },
  { name: "Three.js", tier: "learning", category: "frontend" },

  // Backend - Learning
  { name: "Rust", tier: "learning", category: "backend" },
  { name: "Go", tier: "learning", category: "backend" },

  // Tools - Learning
  { name: "Kubernetes", tier: "learning", category: "tools" },
  { name: "Terraform", tier: "learning", category: "tools" },
];

const tierLabels: Record<SkillTier, string> = {
  primary: "Primary Stack",
  familiar: "Familiar With",
  learning: "Currently Learning",
};

const categoryLabels: Record<SkillCategory, string> = {
  frontend: "Frontend",
  backend: "Backend",
  tools: "Tools & Platforms",
  practices: "Practices",
};

const categoryOrder: SkillCategory[] = ["frontend", "backend", "tools", "practices"];
const tierOrder: SkillTier[] = ["primary", "familiar", "learning"];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};

export function Skills({
  skills = defaultSkills,
  onSkillClick,
  featuredSkills,
}: SkillsProps) {
  // Determine which skills are clickable (have portfolio projects)
  const clickableSkills = featuredSkills || skills
    .filter((s) => s.projectSlugs && s.projectSlugs.length > 0)
    .map((s) => s.name);

  // Group skills by tier
  const skillsByTier = tierOrder.reduce((acc, tier) => {
    acc[tier] = skills.filter((s) => s.tier === tier);
    return acc;
  }, {} as Record<SkillTier, Skill[]>);

  return (
    <Section id="skills" className="bg-background-secondary">
      <Container>
        <SectionHeader
          title="Skills & Technologies"
          subtitle="The tools and technologies I work with"
        />

        <div className="space-y-12">
          {tierOrder.map((tier) => {
            const tierSkills = skillsByTier[tier];
            if (tierSkills.length === 0) return null;

            // Group tier skills by category
            const byCategory = categoryOrder.reduce((acc, category) => {
              acc[category] = tierSkills.filter((s) => s.category === category);
              return acc;
            }, {} as Record<SkillCategory, Skill[]>);

            return (
              <motion.div
                key={tier}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
              >
                <h3 className="text-xl font-display font-semibold text-foreground mb-6">
                  {tierLabels[tier]}
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {categoryOrder.map((category) => {
                    const categorySkills = byCategory[category];
                    if (categorySkills.length === 0) return null;

                    return (
                      <div key={category}>
                        <h4 className="text-sm font-medium text-foreground-muted mb-3">
                          {categoryLabels[category]}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {categorySkills.map((skill) => {
                            const isClickable = clickableSkills.includes(skill.name);
                            return (
                              <SkillPill
                                key={skill.name}
                                skill={skill}
                                isClickable={isClickable}
                                onClick={
                                  isClickable
                                    ? () => onSkillClick?.(skill.name)
                                    : undefined
                                }
                              />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-foreground-muted text-center">
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              Click highlighted skills to filter portfolio
            </span>
          </p>
        </div>
      </Container>
    </Section>
  );
}

interface SkillPillProps {
  skill: Skill;
  isClickable: boolean;
  onClick?: () => void;
}

function SkillPill({ skill, isClickable, onClick }: SkillPillProps) {
  const Component = isClickable ? "button" : "span";

  return (
    <Component
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
        isClickable
          ? "bg-accent-muted text-accent hover:bg-accent hover:text-accent-foreground cursor-pointer"
          : "bg-surface border border-border text-foreground-muted",
        skill.tier === "learning" && "opacity-75"
      )}
      title={
        isClickable
          ? `View ${skill.name} projects`
          : undefined
      }
    >
      {skill.name}
    </Component>
  );
}
