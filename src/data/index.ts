// ============================================
// CENTRALIZED SITE CONTENT
// ============================================

export const personalInfo = {
  name: "Dardan Demiri",
  role: "Full-Stack Engineer",
  email: "dardandemiridev@gmail.com",
  status: "Available for new projects",
  experienceYears: "5+",
  about: [
    "I'm a full-stack engineer with 5+ years designing, building, and scaling customer-facing web applications across e-commerce and ed-tech. I've delivered production systems that reduce costs, automate workflows, and measurably improve performance — from a Shopify-to-MedusaJS platform migration to a containerized LMS and headless storefronts serving 200+ products.",
    "I combine production engineering with first-hand business operations experience — co-managing a restaurant has given me real-world insight into customer retention, loyalty incentives, and the operational constraints that software has to actually solve for.",
    "I thrive in Agile product teams, communicate clearly across disciplines, and care about shipping work I'm genuinely proud of. Whether you need a scalable e-commerce platform, an internal tooling system, or a content-driven application, I'd love to help bring your vision to life.",
  ],
  heroIntro:
    "Full-stack engineer with 5+ years designing, building, and scaling customer-facing web applications across e-commerce and ed-tech.",
  profileImage: "/images/profile.jpeg",
  socials: {
    github: "https://github.com/princessdardan",
    linkedin: "https://linkedin.com/in/dardan-demiri",
  },
  resumeUrl: "/dardan-demiri-resume.pdf",
};

export const features = [
  {
    title: "User-Focused",
    description:
      "I believe great software starts with understanding the people who use it. Every decision I make prioritizes the user experience.",
  },
  {
    title: "Detail-Oriented",
    description:
      "The small things matter. I obsess over pixel-perfect implementations, smooth animations, and polished interactions.",
  },
  {
    title: "Performance-Driven",
    description:
      "Speed is a feature. I build applications that are fast, accessible, and work beautifully on any device.",
  },
  {
    title: "Clean Code Advocate",
    description:
      "I write code that's readable, maintainable, and built to last. Today's shortcuts become tomorrow's headaches.",
  },
];

export const projects = [
  {
    title: "Danny's Fish and Chips Website",
    subtitle: "Danny's Fish and Chips",
    description:
      "A modern restaurant website for a beloved Barrie, Ontario fish and chips establishment serving Simcoe County since 1975. Features server-rendered pages with dynamic content management through a headless CMS.",
    image: "/images/projects/dannys-fish-and-chips-site.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Radix UI",
      "Strapi CMS",
    ],
    features: [
      "Complete redesign modernizing a 50-year-old brand for the digital age",
      "Server-rendered pages with optimal Core Web Vitals scores",
      "Easy content management for menu updates and specials",
    ],
    links: {
      live: "https://dannys-fish-and-chips.vercel.app/",
      code: "https://github.com/princessdardan/dannys-fish-and-chips",
    },
  },
  {
    title: "Aira Publishing E-Commerce Platform",
    subtitle: "Aira Publishing",
    description:
      "A custom headless commerce platform for Ontario's educational market, enabling teachers to easily find and purchase curriculum-aligned resources for Math, English, and French classrooms.",
    image: "/images/projects/aira-publishing-site.png",
    tags: ["React", "GraphQL", "Next.js", "TypeScript", "Headless CMS"],
    features: [
      "Replaced legacy workflows with a scalable React + GraphQL system",
      "Metadata-driven product models supporting bundles and multi-format SKUs",
      "Grade-level segmentation reducing catalog maintenance effort",
    ],
    links: {
      live: "https://airapublishing.com",
      code: "https://github.com/princessdardan/aira-publishing",
    },
  },
  {
    title: "Lash Her Beauty Platform",
    subtitle: "Lash Her",
    description:
      "A modern beauty services website offering bespoke lash artistry booking and professional training programs. Features an elegant design with booking integration and training course showcases.",
    image: "/images/projects/lash-her-site.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Playwright",
      "Analytics-driven UX",
    ],
    features: [
      "Streamlined booking experience for lash services",
      "Professional training program showcase with course details",
      "Mobile-responsive design for on-the-go booking",
    ],
    links: {
      live: "https://lashher.ca",
      code: "https://github.com/princessdardan/lash-her",
    },
  },
];

export const skills = {
  languages: [
    "TypeScript",
    "JavaScript",
    "Ruby",
    "Python",
    "Java",
    "SQL",
    "HTML",
    "CSS",
  ],
  frontend: [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Motion.dev",
    "GSAP",
    "Component-Based Architecture",
  ],
  backend: [
    "Ruby on Rails",
    "Django",
    "Django REST Framework",
    "Node.js",
    "RESTful APIs",
    "GraphQL",
  ],
  databases: [
    "PostgreSQL",
    "Redis",
    "Active Record",
    "Data Modeling",
  ],
  devops: [
    "AWS",
    "Docker",
    "Nginx",
    "Vercel",
    "Git",
    "GitHub Actions",
    "CI/CD",
    "S3",
  ],
  testing: [
    "Jest",
    "React Testing Library",
    "RSpec",
    "Code Review",
    "Debugging",
    "Automated Test Pipelines",
  ],
};

export const experience = [
  {
    role: "Senior Software Engineer",
    company: "Aira Publishing",
    period: "June 2024 — Present",
    points: [
      "Spearheading platform migration from Shopify to Next.js + MedusaJS, eliminating vendor lock-in and gaining full control over the deployment pipeline, codebase, and payment processing workflows",
      "Architecting and deploying a containerized application stack using Docker, Nginx reverse proxy, and Redis caching, enabling zero-configuration environment parity across development, staging, and production",
      "Designing and building a full-featured learning management system (LMS) with Django and Django REST Framework, featuring course management, enrolment workflows, lesson progress tracking, and role-based access control",
      "Engineered a headless e-commerce storefront with React, TypeScript, and GraphQL, integrating REST APIs with reusable UI components to support 200+ products with server-side rendering that improved Largest Contentful Paint",
      "Collaborating with cross-functional product and content teams to translate complex business requirements into scalable data models and reusable component libraries, accelerating time to market",
    ],
    tags: ["Next.js", "TypeScript", "React", "GraphQL", "MedusaJS", "Docker", "Nginx", "Redis", "Django", "Django REST Framework", "GitHub Actions"],
  },
  {
    role: "Software Engineer",
    company: "Scholarly Elite Tutoring",
    period: "June 2020 — June 2024",
    points: [
      "Designed and shipped an API-driven content platform in Ruby on Rails that automated personalized tutoring packet generation, replacing a manual workflow and reducing document assembly time from hours to seconds",
      "Developed educator-facing admin tools for managing hierarchical curriculum structures (Closure Tree) and file attachments (Active Storage), enabling personalized learning materials at scale",
      "Refactored monolithic controller logic into a testable service layer with versioned RESTful APIs, improving code maintainability, test coverage (RSpec), and onboarding speed for new developers",
      "Implemented asynchronous PDF compilation using Sidekiq background jobs with real-time progress feedback via Server-Sent Events (SSE), cutting export wait times for large document batches",
      "Mentored junior developers through pair-programming sessions and code reviews, establishing coding standards that improved team velocity and code quality",
    ],
    tags: ["Ruby on Rails", "PostgreSQL", "JavaScript", "REST APIs", "RSpec", "Sidekiq", "Active Storage"],
  },
  {
    role: "Co-Managing Partner",
    company: "Danny's Fish & Chips",
    period: "May 2019 — Present",
    points: [
      "Co-managed daily operations of a high-volume restaurant with a long-standing repeat customer base",
      "Built first-hand understanding of customer retention, promotions, loyalty incentives, and real-world operational constraints",
      "Evaluated and adopted digital tools for marketing, operations, and customer engagement with strict focus on ROI, reliability, and staff usability",
    ],
    tags: ["Operations", "Customer Engagement", "Digital Marketing"],
  },
  {
    role: "Business Development Manager",
    company: "Scholarly Elite Tutoring",
    period: "Mar 2018 — May 2024",
    points: [
      "Leveraged data-driven strategies to optimize the client conversion process, resulting in a 14.7% increase in conversion rates",
      "Designed and executed a strategic brand extension plan for the company's educational publishing division",
      "Conducted in-depth research and led the implementation of CRM software to strengthen data collection; collaborated with the marketing team to refine client acquisition strategies in alignment with the company's long-term vision",
    ],
    tags: ["CRM", "Data Analysis", "Strategic Planning", "Marketing"],
  },
];

export const education = [
  {
    degree: "Honours BSc in Mathematics, Statistics, Economics",
    school: "University of Toronto",
    period: "2022",
  },
];
