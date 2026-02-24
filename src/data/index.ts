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
    "I'm a full-stack engineer with 5+ years building React applications and Ruby on Rails systems that power content delivery, internal tooling, and customer engagement. My strong mathematical foundation from the University of Toronto supports scalable system design and pragmatic, ROI-driven technical decisions.",
    "I combine production engineering with first-hand business operations experience—running a restaurant has given me unique insight into customer retention, loyalty incentives, and real-world operational constraints. This perspective helps me build software that actually solves problems for the people using it.",
    "I approach every project as a partnership. I listen carefully, communicate clearly, and deliver work I'm genuinely proud of. Whether you need a content authoring platform, an e-commerce solution, or analytics-driven tooling, I'm here to help bring your vision to life.",
  ],
  heroIntro:
    "Full-stack engineer with 5+ years building React applications and Ruby on Rails systems that power content delivery, internal tooling, and customer engagement.",
  profileImage: "/images/profile.jpeg",
  socials: {
    github: "https://github.com/princessdardan",
    linkedin: "https://linkedin.com/in/dardan-demiri",
  },
  resumeUrl: "/resume.pdf",
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
      live: "https://dannysfc.ca",
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
  frontend: [
    "TypeScript",
    "JavaScript",
    "React",
    "Next.js",
    "Remix",
    "Tailwind CSS",
  ],
  backend: [
    "Ruby",
    "Ruby on Rails",
    "Python",
    "Java",
    "SQL",
    "PostgreSQL",
    "GraphQL",
    "REST APIs",
  ],
  tools: [
    "Vercel",
    "AWS",
    "Git",
    "GitHub Actions",
    "Docker",
    "Headless CMS",
    "Supabase",
    "Railway",
    "Shopify",
  ],
  practices: ["CI/CD", "Analytics-driven UX", "Content Systems"],
};

export const experience = [
  {
    role: "Software Engineer",
    company: "Aira Publishing",
    period: "May 2024 — Present",
    points: [
      "Architected and shipped a custom headless commerce platform for digital and physical educational products, replacing brittle legacy workflows with a scalable React + GraphQL system",
      "Designed metadata-driven product models supporting bundles, multi-format SKUs, and grade-level segmentation, reducing catalog maintenance effort and error rates",
      "Delivered server-rendered and aggressively cached storefronts using modern React tooling, improving page load performance while constraining infrastructure spend",
      "Converted curriculum and publishing requirements from non-technical stakeholders into durable data models and intuitive UI flows",
    ],
    tags: ["React", "GraphQL", "Next.js", "TypeScript", "Headless CMS"],
  },
  {
    role: "Software Engineer",
    company: "Scholarly Elite Tutoring",
    period: "May 2020 — May 2024",
    points: [
      "Designed and maintained a Ruby on Rails content-authoring platform that automated the creation of client-specific tutoring materials, eliminating manual document assembly",
      "Built admin tooling and configurable templates enabling educators to generate personalized learning content at scale with consistent quality",
      "Implemented role-based access control (RBAC) and secure content delivery pipelines to protect proprietary educational resources",
      "Drove continuous system improvement by incorporating direct educator feedback into product and technical decisions",
    ],
    tags: ["Ruby on Rails", "PostgreSQL", "JavaScript", "REST APIs"],
  },
  {
    role: "Co-Managing Partner",
    company: "Danny's Fish & Chips",
    period: "Apr 2019 — Present",
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
    period: "Aug 2018 — Apr 2022",
  },
];
