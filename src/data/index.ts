import type { Project } from "@/types";

// ============================================
// CENTRALIZED SITE CONTENT
// ============================================

export const personalInfo = {
  name: "Dardan Demiri",
  role: "Full-stack engineer building commerce, CMS, booking, payment, and business workflow platforms.",
  email: "dardandemiridev@gmail.com",
  status: "Available for new projects",
  experienceYears: "5+",
  about: [
    "I'm a full-stack engineer with 5+ years designing, building, and scaling customer-facing web applications across e-commerce and ed-tech. I've delivered production systems that reduce costs, automate workflows, and measurably improve performance. From a Shopify to MedusaJS platform migration to a containerized LMS and headless storefronts serving 200+ products.",
    "I combine production engineering with first-hand business operations experience. Co-managing a restaurant has given me real-world insight into customer retention, loyalty incentives, and the operational constraints that software has to actually solve for.",
    "I thrive in Agile product teams, communicate clearly across disciplines, and care about shipping work I'm genuinely proud of. Whether you need a scalable e-commerce platform, an internal tooling system, or a content-driven application, I'd love to help bring your vision to life.",
  ],
  heroIntro:
    "I design and ship production web systems with Next.js, TypeScript, Rails, Sanity, Strapi, PostgreSQL, Redis, Docker, and CI/CD — from client-facing websites to backend workflows, payment integrations, admin tools, and content platforms.",
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
    slug: "drenova-group",
    title: "Drenova Group Real Estate Platform",
    subtitle: "Drenova Group",
    status: "Live production real-estate platform",
    summary:
      "Built a real-estate platform for GTA/York Region with Sanity CMS, AMPRE/MLS listing sync, Redis-backed listing cache, lead capture workflows, listing inquiry forms, ISR revalidation, and compliance-aware address suppression.",
    caseStudy: {
      problem:
        "The brokerage needed a credible public platform that could present team content, capture buyer and seller leads, and handle real-estate listings without exposing compliance-sensitive listing details incorrectly.",
      systemBuilt:
        "A production Next.js and Sanity platform with CMS-managed pages, team profiles, listing pages, AMPRE/MLS data sync, cached listing reads, lead capture flows, and server-side revalidation paths.",
      keyTechnicalWork: [
        "Integrated AMPRE/MLS listing data with cron-authorized sync routes and public listing fetch layers.",
        "Designed Redis-backed listing caching with ISR tag revalidation for fast listing pages and controlled content freshness.",
        "Implemented compliance-aware address suppression, listing inquiry forms, lead capture workflows, and Resend email notifications.",
      ],
      businessValue:
        "Gives the real-estate team a maintainable platform for publishing local market content, surfacing listings, and routing qualified buyer, seller, and listing inquiries through structured workflows.",
    },
    stack: ["Next.js", "TypeScript", "Sanity", "GROQ", "Redis", "AMPRE/MLS", "Resend", "Playwright"],
    tags: ["Next.js", "TypeScript", "Sanity", "Redis", "Resend", "Playwright"],
    visual: {
      src: "/images/projects/drenova-group.webp",
      alt: "Drenova Group live real-estate platform homepage screenshot",
      sourceUrl: "https://drenova.ca",
      caption: "Screenshot captured from the live Drenova Group production site.",
    },
    links: {
      live: "https://drenova.ca",
      code: "https://github.com/princessdardan/drenova-group",
    },
  },
  {
    slug: "aira-publishing",
    title: "Aira Publishing Platform",
    subtitle: "Aira Publishing",
    status: "Live production education publishing platform",
    summary:
      "Built an education publishing platform connecting CMS content, checkout, Helcim payment validation, Schoology fulfillment, credential delivery, admin operations, audit logging, and Playwright-tested storefront/admin flows.",
    caseStudy: {
      problem:
        "The publisher needed a platform that could connect public curriculum content, checkout, secure payment confirmation, fulfillment, and internal operations instead of relying on disconnected manual workflows.",
      systemBuilt:
        "A full-stack Next.js, Sanity, and PostgreSQL platform with storefront content, checkout confirmation, Schoology fulfillment, credential delivery, and a separate admin operations surface.",
      keyTechnicalWork: [
        "Implemented Helcim checkout confirmation, webhook reconciliation, payment validation, and idempotent paid-order fulfillment.",
        "Modeled products, orders, payment events, customers, Schoology accounts, course entitlements, admin sessions, audit events, leads, and support workflows in PostgreSQL.",
        "Built admin authentication, RBAC, step-up challenges, audit logging, manual fulfillment operations, and Playwright coverage across storefront and admin flows.",
      ],
      businessValue:
        "Connects marketing, commerce, course access, and internal operations so education products can move from CMS-managed content to paid fulfillment with clearer auditability and less manual coordination.",
    },
    stack: ["Next.js", "TypeScript", "Sanity", "PostgreSQL", "Helcim", "Schoology", "Resend", "Playwright"],
    tags: ["Next.js", "TypeScript", "Sanity", "PostgreSQL", "Resend", "Playwright"],
    visual: {
      src: "/images/projects/aira-publishing.webp",
      alt: "Aira Publishing live education publishing platform screenshot",
      sourceUrl: "https://airapublishing.com",
      caption: "Screenshot captured from the live Aira Publishing production site.",
    },
    links: {
      live: "https://airapublishing.com",
    },
  },
  {
    slug: "lash-her",
    title: "Lash Her Booking and Commerce Platform",
    subtitle: "Lash Her",
    status: "Live production booking and commerce platform",
    summary:
      "A booking and commerce platform for a beauty-services business, integrating CMS-managed content, Google Calendar availability, Helcim checkout, Redis idempotency, PostgreSQL order storage, and Resend confirmation emails.",
    caseStudy: {
      problem:
        "The business needed more than a brochure site: service booking, product and training content, payment flow reliability, confirmation emails, and editable marketing content had to work together.",
      systemBuilt:
        "A Next.js and Sanity platform with CMS-managed pages, booking flows, product and training content, Google Calendar availability, Helcim checkout, private order storage, and transactional email workflows.",
      keyTechnicalWork: [
        "Integrated Google Calendar OAuth availability with lead-time rules, buffer logic, and server-side conflict checks.",
        "Implemented Helcim session creation, payment validation, Redis-backed idempotency, and PostgreSQL order/payment event storage with Drizzle.",
        "Connected Sanity-managed content, booking confirmations, checkout emails, and Playwright coverage for critical booking and commerce paths.",
      ],
      businessValue:
        "Turns a service-business website into an operational platform where clients can discover services, book time, buy products or training, and receive confirmations through reliable backend workflows.",
    },
    stack: ["Next.js", "TypeScript", "Sanity", "Google Calendar", "Helcim", "PostgreSQL", "Redis", "Resend"],
    tags: ["Next.js", "TypeScript", "Sanity", "PostgreSQL", "Redis", "Resend", "Playwright"],
    visual: {
      src: "/images/projects/lash-her.webp",
      alt: "Lash Her live booking and commerce platform screenshot",
      sourceUrl: "https://lashher.com",
      caption: "Screenshot captured from the live Lash Her production site.",
    },
    links: {
      live: "https://lashher.com",
      code: "https://github.com/princessdardan/lash-her-frontend",
    },
  },
  {
    slug: "dannys-fish-and-chips",
    title: "Danny’s Fish & Chips Restaurant Platform",
    subtitle: "Danny’s Fish & Chips",
    status: "Live production restaurant platform",
    summary:
      "A production CMS-backed restaurant platform with Strapi-managed menus, specials, announcements, gallery content, contact forms, mailing-list signup, CI/CD, and Playwright preview testing.",
    caseStudy: {
      problem:
        "The restaurant needed a maintainable digital presence for a long-running local brand, including menus, specials, announcements, contact flows, gallery content, and operational updates without developer-only edits.",
      systemBuilt:
        "A deployed Next.js frontend and Strapi backend with CMS-managed pages, dynamic content blocks, menu and specials content, announcements, gallery media, contact forms, and mailing-list signup.",
      keyTechnicalWork: [
        "Built typed data loaders and a dynamic Strapi block renderer for CMS-managed home, menu, specials, location, about, gallery, and contact pages.",
        "Implemented contact and mailing-list flows with Resend, SEO metadata, sitemap, robots, and responsive UI across restaurant content pages.",
        "Configured split frontend/backend deployment with Vercel, Railway, GitHub Actions CI, and Playwright preview E2E testing.",
      ],
      businessValue:
        "Gives staff a practical CMS-backed way to keep restaurant content current while customers can quickly find menus, specials, hours, location details, and contact paths.",
    },
    stack: ["Next.js", "TypeScript", "Strapi", "Tailwind CSS", "Resend", "Vercel", "Railway", "GitHub Actions"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Strapi CMS", "Resend", "GitHub Actions", "Playwright"],
    visual: {
      src: "/images/projects/dannys-fish-and-chips.webp",
      alt: "Danny’s Fish & Chips live CMS-backed restaurant platform screenshot",
      sourceUrl: "https://dannysfishandchips.com",
      caption: "Screenshot captured from the live Danny’s Fish & Chips production site.",
    },
    links: {
      live: "https://dannysfishandchips.com",
      code: "https://github.com/princessdardan/dannys-fish-and-chips",
    },
  },
  {
    slug: "plp-personalized-learning-plan",
    title: "PLP — Personalized Learning Plan",
    subtitle: "Scholarly Elite Tutoring",
    status: "Private education workflow platform",
    summary:
      "A private education platform for Scholarly Elite Tutoring that manages personalized curriculum trees, admin and creator workflows, file attachments, asynchronous PDF/ZIP exports, API documentation, and tested Rails/React workflows.",
    caseStudy: {
      problem:
        "The tutoring organization needed software to manage personalized curriculum content and document-generation workflows that were too complex and time-consuming for manual assembly.",
      systemBuilt:
        "A Rails API and React/TypeScript platform for curriculum management, role-based admin and creator workflows, hierarchical content trees, file attachments, background exports, and API-documented operations.",
      keyTechnicalWork: [
        "Modeled hierarchical curriculum structures with Rails, PostgreSQL, authorization policies, and admin/creator authentication scopes.",
        "Implemented Sidekiq workflows for curriculum import/export, PDF merging, ZIP generation, ActiveStorage attachments, and progress-aware long-running jobs.",
        "Supported tested API workflows with RSpec, RSwag documentation, and a React/TypeScript frontend for education operations.",
      ],
      businessValue:
        "Transforms personalized tutoring material assembly into a structured workflow system, reducing manual document handling and giving education staff clearer tools for managing curriculum operations.",
    },
    stack: ["Ruby on Rails", "React", "TypeScript", "PostgreSQL", "Redis", "Sidekiq", "ActiveStorage", "RSpec"],
    tags: ["Ruby on Rails", "React", "TypeScript", "PostgreSQL", "Redis", "RSpec", "REST APIs"],
    visual: {
      src: "/images/projects/plp-personalized-learning-plan.webp",
      alt: "Representative visual for the private PLP education workflow platform",
      caption: "Representative private-platform visual for PLP — Personalized Learning Plan.",
    },
    links: {},
  },
] satisfies Project[];

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
    company: "Danny’s Fish & Chips",
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
