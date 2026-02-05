// ============================================
// SITE CONTENT TYPES
// ============================================

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  email: string;
  socials: {
    github?: string;
    linkedin?: string;
  };
}

export interface NavItem {
  label: string;
  href: string;
}

// ============================================
// HERO SECTION
// ============================================

export interface HeroContent {
  name: string;
  title: string;
  tagline: string;
  availability: {
    status: "available" | "busy" | "open";
    message: string;
  };
  stats: {
    years: string;
    projects: string;
    clients: string;
  };
}

// ============================================
// ABOUT SECTION
// ============================================

export interface AboutContent {
  photo: string;
  photoAlt: string;
  bio: string;
  strengths: Array<{
    title: string;
    description: string;
  }>;
}

// ============================================
// PORTFOLIO SECTION
// ============================================

export type SkillCategory = "frontend" | "backend" | "tools" | "practices";

export interface Project {
  slug: string;
  title: string;
  client?: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;

  // Visual layer
  outcomes?: string[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  liveUrl?: string;

  // Technical layer
  techStack: string[];
  architecture: string[];
  challenges: Array<{
    challenge: string;
    solution: string;
  }>;
  codeSnippet?: {
    language: string;
    code: string;
    description: string;
  };
  githubUrl?: string;

  // Meta
  featured: boolean;
  dateCompleted: string;
  status: "live" | "archived" | "nda";
}

// ============================================
// SKILLS SECTION
// ============================================

export type SkillTier = "primary" | "familiar" | "learning";

export interface Skill {
  name: string;
  icon?: string;
  tier: SkillTier;
  category: SkillCategory;
  projectSlugs?: string[]; // For filtering portfolio
}

export interface SkillsContent {
  skills: Skill[];
}

// ============================================
// RESUME SECTION
// ============================================

export interface Experience {
  id: string;
  company: string;
  companyLogo?: string;
  role: string;
  startDate: string;
  endDate?: string; // undefined = "Present"
  achievements: string[];
  technologies: string[];
  order: number; // For manual reordering
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface ResumeContent {
  experiences: Experience[];
  education: Education[];
}

// ============================================
// CONTACT SECTION
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactContent {
  heading: string;
  description: string;
  responseTime: string;
}

// ============================================
// COMPONENT PROPS
// ============================================

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export interface ProjectCardProps {
  project: Project;
  onTechClick?: (tech: string) => void;
}
