// ============================================
// SITE CONTENT TYPES
// ============================================

export interface PersonalInfo {
  name: string;
  role: string;
  email: string;
  status: string;
  experienceYears: string;
  about: string[];
  heroIntro: string;
  profileImage: string;
  socials: {
    github?: string;
    linkedin?: string;
  };
  resumeUrl: string;
}

export interface Feature {
  title: string;
  description: string;
}

// ============================================
// PORTFOLIO SECTION
// ============================================

export interface Project {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  links: {
    live?: string;
    code?: string;
  };
}

// ============================================
// SKILLS SECTION
// ============================================

export type SkillCategory = "frontend" | "backend" | "tools" | "practices";

export interface Skills {
  frontend: string[];
  backend: string[];
  tools: string[];
  practices: string[];
}

export interface SkillCloudProps {
  skills: Skills;
  highlightCategory: string | null;
  onSkillClick?: (skill: string) => void;
}

export interface SkillDetailModalProps {
  skill: string | null;
  onClose: () => void;
  projects: Project[];
}

// ============================================
// RESUME SECTION
// ============================================

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
  tags: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
}

// ============================================
// CONTACT SECTION
// ============================================

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
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

export interface NavItem {
  name: string;
  to: string;
  icon: React.ComponentType<{ className?: string }>;
}
