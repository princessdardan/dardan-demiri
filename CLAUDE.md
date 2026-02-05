# CLAUDE.md

This file provides guidance to Claude Code when working with this portfolio website.

## Project Overview

A professional portfolio website built with Next.js 16, featuring a dual-layer project presentation (visual + technical views), animated sections with Framer Motion, and a contact form with Resend integration.

## Commands

```bash
# Development
npm run dev          # Start development server at http://localhost:3000

# Build
npm run build        # Production build
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── api/contact/     # Contact form API route
│   ├── globals.css      # Design tokens and base styles
│   ├── layout.tsx       # Root layout with fonts and metadata
│   ├── page.tsx         # Main page composing all sections
│   ├── not-found.tsx    # Custom 404 page
│   ├── robots.ts        # Dynamic robots.txt
│   └── sitemap.ts       # Dynamic sitemap
├── components/
│   ├── sections/        # Page sections (Hero, About, Portfolio, etc.)
│   ├── seo/             # JSON-LD structured data
│   └── ui/              # Reusable UI components
├── lib/
│   └── utils.ts         # Utility functions (cn helper)
├── types/
│   └── index.ts         # TypeScript type definitions
└── content/
    └── projects/        # Project content (planned for MDX)
```

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 with CSS custom properties
- **Animation**: Framer Motion (with CSS fallbacks for progressive enhancement)
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend
- **Icons**: Lucide React

## Key Design Decisions

### From Interview Session

1. **Visual Priority**: Optimized for clients (Sarah persona) - visual-first, clean layouts
2. **Color Palette**: Coral/warm accent (#ff6b47 primary)
3. **Dual-Layer Projects**: Visual layer default, technical layer expands accordion-style
4. **Skills Filtering**: Clicking featured skill icons filters portfolio
5. **Progressive Enhancement**: CSS animations as base, Framer Motion enhances
6. **Reduced Motion**: Completely disabled animations when `prefers-reduced-motion` is set
7. **Dark Mode Ready**: CSS variables structured for future dark mode (currently light only)

### Typography

- **Display**: Space Grotesk (headlines)
- **Body**: Inter (content)
- **Code**: JetBrains Mono (code snippets)

### Animation Patterns

All animations use `ease: [0, 0, 0.2, 1] as const` (ease-entrance curve).

```tsx
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  },
};
```

## Content Customization

### Personal Information

Update in `src/components/sections/hero.tsx`:
- Name, title, tagline
- Availability status
- Stats (years, projects, clients)

### Projects

Update sample projects in `src/components/sections/portfolio.tsx`:
- Add real project data with thumbnails
- Include technical details, challenges, testimonials

### Skills

Update in `src/components/sections/skills.tsx`:
- Modify `defaultSkills` array
- Link skills to project slugs for filtering

### Resume

Update in `src/components/sections/resume.tsx`:
- Work experience (supports manual reordering via `order` property)
- Education

## Environment Variables

Copy `.env.example` to `.env.local`:

```bash
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=Contact Form <contact@yourdomain.com>
CONTACT_EMAIL=hello@yourdomain.com
```

## Adding Images

1. Profile photo: `public/images/profile.jpg`
2. Project screenshots: `public/images/projects/[project-slug].jpg`
3. OG image: `public/og-image.png` (1200x630)

## Deployment

Recommended: Vercel

1. Connect GitHub repository
2. Add environment variables
3. Deploy

## Anti-Patterns

- **Don't add `"use client"` unnecessarily** - Only for hooks, event handlers, browser APIs
- **Don't inline styles** - Use Tailwind classes or CSS variables
- **Don't skip `as const`** - Required for Framer Motion ease arrays
- **Don't commit `.env.local`** - Contains secrets

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/app/globals.css` | All design tokens and CSS variables |
| `src/types/index.ts` | TypeScript interfaces |
| `src/components/index.ts` | Component exports |
| `src/app/api/contact/route.ts` | Contact form handler |
