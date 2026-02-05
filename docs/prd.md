# Product Requirements Document: Portfolio Website

## 1. Executive Summary

### Project Overview
A professional portfolio website for a web developer/software engineer that showcases development work while serving as a light resume/CV. The site will feature a bold, creative design that makes a strong visual impression while providing depth for those who want to explore technical details.

### Vision Statement
Create a portfolio that speaks two languages: one that resonates with non-technical clients seeking a trustworthy developer with great design sense, and another that impresses technical recruiters looking for engineering excellence.

### Key Differentiator
**Dual-Layer Project Presentation** — Each project showcases both the visual/UX outcomes (default view) and technical implementation details (expandable view), allowing visitors to engage at their preferred depth.

---

## 2. Goals & Success Metrics

### Primary Goals
1. **Attract Clients**: Convert visitors into inquiries for freelance/contract work
2. **Impress Recruiters**: Demonstrate technical competence and problem-solving ability
3. **Build Personal Brand**: Establish a memorable, professional online presence

### Success Metrics
| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load Time | < 2 seconds | Lighthouse Performance |
| Mobile Usability | 100% score | Lighthouse Mobile |
| Contact Form Submissions | Track all | Analytics events |
| Average Session Duration | > 2 minutes | Analytics |
| Portfolio Project Views | Track clicks | Analytics events |
| Resume Downloads | Track all | Analytics events |

---

## 3. Target Audiences & User Personas

### Persona 1: The Non-Technical Client
**"Sarah, Marketing Director"**

- **Background**: Runs a growing e-commerce brand, needs a developer for website improvements
- **Tech Comfort**: Low — uses Shopify, knows basic marketing tools
- **What She Looks For**:
  - Beautiful, professional design work
  - Clear communication style
  - Evidence of successful projects with real outcomes
  - Trustworthiness and reliability indicators
- **Key Questions**:
  - "Will this developer understand my business needs?"
  - "Can they make something that looks this good for me?"
  - "Are they easy to work with?"

**Design Implications**:
- Lead with visuals, not jargon
- Show project outcomes and client testimonials
- Make contact incredibly easy
- Use approachable, confident language

---

### Persona 2: The Technical Recruiter
**"Marcus, Senior Engineering Recruiter"**

- **Background**: Recruits for tech companies, reviews 50+ portfolios weekly
- **Tech Comfort**: High — understands stacks, architectures, and engineering challenges
- **What He Looks For**:
  - Evidence of real technical skills
  - Problem-solving ability
  - Code quality and best practices
  - Modern tech stack familiarity
- **Key Questions**:
  - "Can this person actually code, or just design?"
  - "Do they understand architecture and scalability?"
  - "Would they pass our technical interview?"

**Design Implications**:
- Provide technical depth on demand
- Show code snippets or GitHub links
- Detail tech stacks and architectural decisions
- Include a downloadable resume for ATS systems

---

### Persona 3: The Hiring Manager
**"David, VP of Engineering"**

- **Background**: Final decision maker, limited time, needs quick assessment
- **Tech Comfort**: High — former developer turned manager
- **What He Looks For**:
  - Rapid assessment of capabilities
  - Evidence of ownership and impact
  - Communication skills
  - Cultural fit indicators

**Design Implications**:
- Scannable layout with clear hierarchy
- Quantifiable achievements where possible
- Professional but personable tone

---

## 4. Site Architecture & Pages

### Information Architecture

```
Home (Single Page Application)
├── Hero Section
├── About Section
├── Portfolio Section
│   └── Project Cards (3-5 projects)
│       ├── Visual Layer (default)
│       └── Technical Layer (expandable)
├── Skills Section
├── Resume Section
└── Contact Section

Additional Routes:
├── /project/[slug] — Individual project deep-dive (optional)
└── /resume.pdf — Downloadable CV
```

### Navigation
- **Desktop**: Fixed header with smooth scroll navigation
- **Mobile**: Hamburger menu with full-screen overlay
- **Sections**: Hero, About, Work, Skills, Resume, Contact
- **CTA**: Persistent "Get in Touch" button

---

## 5. Feature Requirements

### 5.1 Hero Section

**Purpose**: Create immediate impact and communicate value proposition

**Requirements**:
| ID | Requirement | Priority |
|----|-------------|----------|
| H1 | Animated headline with name and title | Must Have |
| H2 | Brief tagline (1-2 sentences) | Must Have |
| H3 | Primary CTA button ("View My Work" or "Get in Touch") | Must Have |
| H4 | Secondary CTA ("Download Resume") | Should Have |
| H5 | Subtle background animation or visual element | Should Have |
| H6 | Social proof indicator (years experience, projects completed) | Could Have |

**Content**:
- Name and professional title
- Value proposition tagline
- Quick stats (e.g., "5+ years • 30+ projects • 15+ happy clients")

---

### 5.2 About Section

**Purpose**: Build personal connection and trust

**Requirements**:
| ID | Requirement | Priority |
|----|-------------|----------|
| A1 | Professional photo | Must Have |
| A2 | Bio paragraph (150-200 words) | Must Have |
| A3 | Key strengths/values (3-4 items) | Should Have |
| A4 | Personal touch (hobbies, interests) | Could Have |

**Content Guidelines**:
- Write in first person
- Balance professional credentials with personality
- Mention approach to client collaboration
- Keep technical jargon minimal

---

### 5.3 Portfolio Section (Dual-Layer Projects)

**Purpose**: Showcase work with appropriate depth for each audience

**Requirements**:
| ID | Requirement | Priority |
|----|-------------|----------|
| P1 | 3-5 featured projects | Must Have |
| P2 | Project cards with thumbnail, title, brief description | Must Have |
| P3 | Visual layer: screenshots, outcomes, testimonials | Must Have |
| P4 | Technical layer: stack, challenges, solutions | Must Have |
| P5 | Toggle/expand mechanism between layers | Must Have |
| P6 | Live demo links where available | Should Have |
| P7 | GitHub links where applicable | Should Have |
| P8 | Project filtering by type/technology | Could Have |

#### Visual Layer (Default View)
- Hero image/screenshot of the project
- Project title and client/context
- Brief description (2-3 sentences)
- Key outcomes or metrics
- Client testimonial (if available)
- "View Live Site" button

#### Technical Layer (Expanded View)
- Tech stack with icons
- Architecture overview
- Key challenges faced
- Solutions implemented
- Code snippets (syntax highlighted)
- GitHub repository link
- Development timeline

**Interaction**:
- Cards show visual layer by default
- "View Technical Details" button expands to technical layer
- Smooth animation between states
- Option to view full case study page

---

### 5.4 Skills Section

**Purpose**: Quickly communicate technical capabilities

**Requirements**:
| ID | Requirement | Priority |
|----|-------------|----------|
| S1 | Categorized skill display | Must Have |
| S2 | Visual skill representation (icons, not progress bars) | Must Have |
| S3 | Skill categories (Frontend, Backend, Tools, etc.) | Must Have |
| S4 | Brief context for primary skills | Should Have |

**Skill Categories**:
1. **Frontend**: React, Next.js, TypeScript, HTML/CSS, Tailwind
2. **Backend**: Node.js, Python, PostgreSQL, REST APIs, GraphQL
3. **Tools & Platforms**: Git, Docker, AWS, Vercel, Figma
4. **Practices**: Responsive Design, Accessibility, Performance Optimization

**Design Note**: Avoid skill "progress bars" — they're arbitrary and meaningless. Use clear categories with tech logos/icons instead.

---

### 5.5 Resume Section

**Purpose**: Provide professional history and downloadable CV

**Requirements**:
| ID | Requirement | Priority |
|----|-------------|----------|
| R1 | Work experience timeline | Must Have |
| R2 | Downloadable PDF resume | Must Have |
| R3 | Education section | Should Have |
| R4 | Certifications (if applicable) | Could Have |

**Timeline Display**:
- Company name and logo (if available)
- Role title
- Date range
- 2-3 bullet points of key achievements
- Technologies used

---

### 5.6 Contact Section

**Purpose**: Convert interest into inquiries

**Requirements**:
| ID | Requirement | Priority |
|----|-------------|----------|
| C1 | Contact form (name, email, message) | Must Have |
| C2 | Form validation with helpful errors | Must Have |
| C3 | Success confirmation message | Must Have |
| C4 | Email link as alternative | Must Have |
| C5 | Social media links | Should Have |
| C6 | Response time expectation | Should Have |
| C7 | Spam protection (honeypot or reCAPTCHA) | Must Have |

**Form Fields**:
1. Name (required)
2. Email (required, validated)
3. Project Type (optional dropdown: Website, Web App, Consultation, Other)
4. Message (required, min 20 characters)

**Form Behavior**:
- Client-side validation before submission
- Loading state during submission
- Clear success message with expected response time
- Error handling with retry option

---

## 6. Design Requirements

### 6.1 Visual Direction: Bold & Creative

**Overall Aesthetic**:
- Confident, expressive, memorable
- Not afraid of color and movement
- Professional but not corporate
- Modern without being trendy

**Color Palette**:
```
Primary:      #[TBD] — Bold, vibrant accent (electric blue, coral, etc.)
Secondary:    #[TBD] — Complementary accent
Background:   #[TBD] — Light or dark base
Surface:      #[TBD] — Card/section backgrounds
Text Primary: #[TBD] — High contrast body text
Text Muted:   #[TBD] — Secondary text
```

**Typography**:
- **Display Font**: Bold, expressive sans-serif for headlines (e.g., Space Grotesk, Clash Display, or similar)
- **Body Font**: Readable sans-serif for content (e.g., Inter, DM Sans)
- **Monospace**: For code snippets (e.g., JetBrains Mono, Fira Code)

**Layout Principles**:
- Asymmetric grids where appropriate
- Generous whitespace with intentional density shifts
- Bold section dividers or transitions
- Overlapping elements for depth
- Full-bleed images and backgrounds

---

### 6.2 Responsive Breakpoints

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| Mobile | < 640px | Phones |
| Tablet | 640px - 1024px | Tablets, small laptops |
| Desktop | 1024px - 1440px | Laptops, monitors |
| Large | > 1440px | Large monitors |

**Mobile-First Approach**:
- Design for mobile first, enhance for larger screens
- Touch-friendly tap targets (min 44x44px)
- Simplified navigation on mobile
- Stacked layouts on smaller screens

---

### 6.3 Animation Guidelines

**Principles**:
- Animations should enhance, not distract
- Performance-first: use CSS transforms and opacity
- Respect reduced motion preferences
- Consistent timing and easing

**Animation Types**:
| Element | Animation | Duration | Trigger |
|---------|-----------|----------|---------|
| Page sections | Fade up on scroll | 400-600ms | Scroll into view |
| Project cards | Scale + shadow on hover | 200ms | Hover |
| Buttons | Color/scale transition | 150ms | Hover |
| Navigation | Smooth scroll | 500ms | Click |
| Technical layer | Expand/collapse | 300ms | Click |
| Hero elements | Staggered entrance | 800ms total | Page load |

**Easing**:
- Standard: `cubic-bezier(0.4, 0, 0.2, 1)`
- Entrance: `cubic-bezier(0, 0, 0.2, 1)`
- Exit: `cubic-bezier(0.4, 0, 1, 1)`

---

### 6.4 Accessibility Standards

**Target**: WCAG 2.1 Level AA

**Requirements**:
| Requirement | Standard |
|-------------|----------|
| Color contrast | Min 4.5:1 for text, 3:1 for large text |
| Keyboard navigation | Full site navigable via keyboard |
| Focus indicators | Visible focus states on all interactive elements |
| Alt text | All images have descriptive alt text |
| Semantic HTML | Proper heading hierarchy, landmarks |
| Screen reader | Compatible with NVDA, VoiceOver |
| Reduced motion | Respect `prefers-reduced-motion` |
| Form labels | All inputs have associated labels |

---

## 7. Technical Specifications

### 7.1 Tech Stack

**Core Framework**:
- **Next.js 14+** (App Router)
- **React 18+**
- **TypeScript**

**Styling**:
- **Tailwind CSS** — Utility-first styling
- **CSS Modules** — For complex component styles (if needed)
- **Framer Motion** — Animation library

**Form Handling**:
- **React Hook Form** — Form state management
- **Zod** — Schema validation
- **Resend** or **SendGrid** — Email delivery

**Content Management** (optional):
- **MDX** — For project case studies
- Or **Contentlayer** — Type-safe content

**Development Tools**:
- **ESLint** — Code linting
- **Prettier** — Code formatting
- **Husky** — Git hooks

---

### 7.2 Performance Targets

| Metric | Target | Tool |
|--------|--------|------|
| Lighthouse Performance | > 90 | Lighthouse |
| Lighthouse Accessibility | 100 | Lighthouse |
| Lighthouse Best Practices | 100 | Lighthouse |
| Lighthouse SEO | 100 | Lighthouse |
| First Contentful Paint | < 1.5s | Web Vitals |
| Largest Contentful Paint | < 2.5s | Web Vitals |
| Cumulative Layout Shift | < 0.1 | Web Vitals |
| First Input Delay | < 100ms | Web Vitals |

**Optimization Strategies**:
- Static generation (SSG) for all pages
- Image optimization with Next.js Image
- Font optimization with next/font
- Code splitting and lazy loading
- Minimal JavaScript bundle

---

### 7.3 SEO Requirements

**On-Page SEO**:
- Unique title tags per page
- Meta descriptions
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD) for Person schema

**Technical SEO**:
- XML sitemap
- robots.txt
- Clean URL structure
- Mobile-friendly (responsive)
- Fast load times
- HTTPS

**Content SEO**:
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Internal linking

---

### 7.4 Deployment Strategy

**Recommended Platform**: Vercel

**Reasoning**:
- Native Next.js support
- Automatic HTTPS
- Edge network (CDN)
- Preview deployments
- Analytics built-in
- Easy custom domain setup

**Alternatives**:
- Netlify
- AWS Amplify
- Cloudflare Pages

**Domain**:
- Custom domain (e.g., firstname-lastname.dev)
- SSL certificate (automatic with Vercel)

---

## 8. Content Requirements

### 8.1 Project Case Study Template

Each project should include:

```markdown
## [Project Name]

### Overview
- **Client/Context**: Who was this for?
- **Timeline**: How long did it take?
- **Role**: What was your specific role?
- **Live URL**: [link]
- **GitHub**: [link] (if public)

### The Challenge
What problem needed solving? What were the constraints?

### The Solution
How did you approach it? What key decisions did you make?

### Visual Showcase
- Hero screenshot
- 2-4 additional screenshots showing key features
- Mobile views

### Technical Implementation
- **Tech Stack**: [list with icons]
- **Architecture**: Brief overview
- **Key Features**:
  - Feature 1: How it was built
  - Feature 2: How it was built

### Challenges & Solutions
1. **Challenge**: Description
   **Solution**: How you solved it

### Results & Impact
- Quantifiable outcomes (if available)
- Client feedback/testimonial

### Learnings
What did you learn from this project?
```

---

### 8.2 Copy Guidelines

**Voice & Tone**:
- Confident but not arrogant
- Approachable but professional
- Clear and jargon-free (except in technical sections)
- First person ("I build..." not "We build...")

**Writing Principles**:
- Lead with benefits, not features
- Use active voice
- Keep sentences concise
- Show, don't just tell

**Avoid**:
- Buzzwords ("synergy," "leverage," "cutting-edge")
- Vague claims ("passionate developer")
- Self-deprecation
- Excessive exclamation marks

---

## 9. Project Phases & Milestones

### Phase 1: Foundation
- [ ] Project setup (Next.js, TypeScript, Tailwind)
- [ ] Design system setup (colors, typography, components)
- [ ] Basic layout and navigation
- [ ] Responsive structure

### Phase 2: Core Sections
- [ ] Hero section with animations
- [ ] About section
- [ ] Skills section
- [ ] Resume section with timeline

### Phase 3: Portfolio
- [ ] Project card component
- [ ] Dual-layer interaction (visual/technical)
- [ ] 3-5 project case studies
- [ ] Project detail pages (optional)

### Phase 4: Contact & Polish
- [ ] Contact form with validation
- [ ] Email integration
- [ ] Animation refinements
- [ ] Accessibility audit
- [ ] Performance optimization

### Phase 5: Launch
- [ ] SEO setup (meta tags, sitemap, etc.)
- [ ] Analytics integration
- [ ] Final testing (cross-browser, devices)
- [ ] Deployment to Vercel
- [ ] Custom domain setup

---

## Appendix A: Inspiration & References

**Portfolio Inspiration** (to research):
- Brittany Chiang (brittanychiang.com)
- Josh Comeau (joshwcomeau.com)
- Cassie Evans (cassie.codes)
- Lynn Fisher (lynnandtonic.com)

**Design Resources**:
- Dribbble (portfolio designs)
- Awwwards (award-winning sites)
- Refero (component inspiration)

---

## Appendix B: Future Considerations

**Post-Launch Enhancements** (not in initial scope):
- Blog section for technical writing
- Dark/light mode toggle
- Multilingual support
- CMS integration for easier updates
- Project filtering and search
- Testimonials carousel
- Case study detail pages

---

*Document Version: 1.0*
*Last Updated: [Current Date]*
