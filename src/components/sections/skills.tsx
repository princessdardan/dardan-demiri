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

// Skills data aligned with resume's Technical Core section
// projectSlugs link skills to portfolio projects for filtering
const defaultSkills: Skill[] = [
  // Primary tier - Languages from resume
  { name: "TypeScript", tier: "primary", category: "frontend", projectSlugs: ["dannys-fish-and-chips", "aira-publishing", "lash-her"] },
  { name: "JavaScript", tier: "primary", category: "frontend" },
  { name: "React", tier: "primary", category: "frontend", projectSlugs: ["aira-publishing"] },
  { name: "Next.js", tier: "primary", category: "frontend", projectSlugs: ["dannys-fish-and-chips", "aira-publishing", "lash-her"] },
  { name: "Ruby", tier: "primary", category: "backend" },
  { name: "Python", tier: "primary", category: "backend" },
  { name: "Java", tier: "primary", category: "backend" },
  { name: "SQL", tier: "primary", category: "backend" },

  // Primary tier - Frameworks from resume
  { name: "Ruby on Rails", tier: "primary", category: "backend" },
  { name: "Remix", tier: "primary", category: "frontend" },

  // Primary tier - Data & APIs from resume
  { name: "PostgreSQL", tier: "primary", category: "backend", projectSlugs: ["dannys-fish-and-chips"] },
  { name: "GraphQL", tier: "primary", category: "backend", projectSlugs: ["aira-publishing"] },
  { name: "REST APIs", tier: "primary", category: "backend" },

  // Primary tier - Infrastructure from resume
  { name: "Vercel", tier: "primary", category: "tools", projectSlugs: ["dannys-fish-and-chips", "lash-her"] },
  { name: "AWS", tier: "primary", category: "tools" },
  { name: "Git", tier: "primary", category: "tools", projectSlugs: ["dannys-fish-and-chips", "aira-publishing", "lash-her"] },
  { name: "GitHub Actions", tier: "primary", category: "tools", projectSlugs: ["dannys-fish-and-chips"] },
  { name: "Headless CMS", tier: "primary", category: "tools", projectSlugs: ["dannys-fish-and-chips", "aira-publishing"] },
  { name: "Supabase", tier: "primary", category: "tools", projectSlugs: ["dannys-fish-and-chips"] },
  { name: "Railway", tier: "primary", category: "tools", projectSlugs: ["dannys-fish-and-chips"] },
  { name: "Shopify", tier: "primary", category: "tools", projectSlugs: ["aira-publishing"] },
  { name: "Docker", tier: "primary", category: "tools" },
  { name: "Tailwind CSS", tier: "primary", category: "frontend", projectSlugs: ["dannys-fish-and-chips", "lash-her"] },
  { name: "CI/CD", tier: "primary", category: "practices", projectSlugs: ["dannys-fish-and-chips"] },
  { name: "Analytics-driven UX", tier: "primary", category: "practices", projectSlugs: ["aira-publishing", "lash-her"] },
  { name: "Content Systems", tier: "primary", category: "practices", projectSlugs: ["dannys-fish-and-chips", "aira-publishing"] },
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
