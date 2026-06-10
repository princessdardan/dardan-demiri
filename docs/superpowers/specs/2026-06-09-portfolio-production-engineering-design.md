# Portfolio Production Engineering Update Design

## Purpose

Reposition the portfolio from a design-forward project showcase into evidence of production full-stack engineering. The updated homepage should immediately communicate that Dardan builds real business platforms across commerce, CMS, booking, payment, real-estate data, restaurants, and education workflows.

This design updates the homepage hero, Featured Work ordering, project copy, case-study structure, and portfolio visuals while keeping the existing one-page site architecture.

## Confirmed Scope

### In scope

- Replace the hero positioning copy with the approved production-engineering copy.
- Add Drenova Group as the first Featured Work project.
- Render Featured Work in this exact order:
  1. Drenova Group
  2. Aira Publishing
  3. Lash Her
  4. Danny’s Fish & Chips
  5. PLP — Personalized Learning Plan
- Use Scholarly Elite Tutoring as the company/organization for PLP.
- Exclude the Aira Medusa migration from Featured Work.
- Convert each project to a consistent case-study structure:
  - Problem
  - System built
  - Key technical work
  - Business value
  - Stack
- Capture and store fresh local screenshots for public live projects.
- Use a representative private-platform visual for PLP.
- Keep business value claims truthful and qualitative unless verified metrics are available.

### Out of scope

- Full individual project pages under `/work/[slug]`.
- Adding Aira Medusa as a Featured Work item.
- Claiming unverified quantitative outcomes.
- Publishing private PLP source code or exposing private platform screenshots unless separately provided.

## Verified Project Status and URLs

| Project | Status | URL / Visibility |
| --- | --- | --- |
| Drenova Group | Live production platform | `https://drenova.ca` |
| Aira Publishing | Live production platform | `https://airapublishing.com` |
| Lash Her | Live production platform | `https://lashher.com` |
| Danny’s Fish & Chips | Live production platform | `https://dannysfishandchips.com` |
| PLP — Personalized Learning Plan | Private education platform authored for Scholarly Elite Tutoring | Private repo/platform |
| Aira Medusa migration | Not live | Excluded from Featured Work |

## Hero Design

The hero should replace generic full-stack wording with the approved production-platform positioning.

Primary hero line:

> Full-stack engineer building commerce, CMS, booking, payment, and business workflow platforms.

Supporting copy:

> I design and ship production web systems with Next.js, TypeScript, Rails, Sanity, Strapi, PostgreSQL, Redis, Docker, and CI/CD — from client-facing websites to backend workflows, payment integrations, admin tools, and content platforms.

The existing hero visual system, dark theme, calls to action, and reduced-motion behavior should remain intact unless implementation reveals a layout issue caused by the longer copy.

## Content and Data Architecture

Keep portfolio content centralized, but upgrade the project model from generic showcase cards into structured case-study records.

Each featured project should include:

- `slug`
- `title`
- `subtitle` or organization name
- `status`
- `summary`
- `caseStudy.problem`
- `caseStudy.systemBuilt`
- `caseStudy.keyTechnicalWork`
- `caseStudy.businessValue`
- `stack`
- `visual.src`
- `visual.alt`
- `visual.sourceUrl` for public projects
- `visual.caption` when helpful, especially for PLP
- `links.live` for public projects
- `links.code` when safe and available

Featured Work should use an explicit order rather than relying on incidental array position where practical. If implementation keeps a single ordered array, tests or review should still verify the exact order.

## Featured Work UI Design

The Featured Work section should keep the current homepage rhythm while making each project read as production evidence.

### Desktop

- Keep each project as a semantic `article`.
- Preserve the alternating screenshot/content layout.
- Show the project status and organization near the top.
- Show title, summary, screenshot, case-study sections, stack, and links.
- Keep live links visible below content; do not make important links hover-only.

### Mobile

Use a predictable stacked order for every project:

1. Status / organization label
2. Title
3. Summary
4. Visual
5. Problem
6. System built
7. Key technical work
8. Business value
9. Stack
10. Links

Mobile readability rules:

- Keep paragraphs short.
- Use visible labels for each case-study section.
- Limit technical bullets to the strongest items.
- Let stack pills wrap cleanly.
- Avoid horizontal overflow.
- Preserve accessible contrast on the existing dark theme.

### Section intro

Replace the current generic line, “A selection of projects I’m proud of,” with production-oriented wording such as:

> Production systems spanning real estate, publishing, bookings, restaurants, and education workflows.

Exact wording can be refined during implementation as long as the meaning remains production-engineering focused.

## Project Content Direction

### Drenova Group

Position as a live real-estate platform for GTA/York Region.

Key evidence to include:

- Sanity CMS.
- AMPRE/MLS listing sync.
- Redis-backed listing cache.
- Lead capture and listing inquiry flows.
- ISR revalidation.
- Compliance-aware address suppression.
- Resend email workflows.

Example summary direction:

> Built a real-estate platform for GTA/York Region with Sanity CMS, AMPRE/MLS listing sync, Redis-backed listing cache, lead capture workflows, listing inquiry forms, ISR revalidation, and compliance-aware address suppression.

### Aira Publishing

Position as a live education publishing platform connecting content, checkout, fulfillment, and admin workflows.

Key evidence to include:

- CMS-driven education publishing content.
- Helcim payment validation.
- Schoology fulfillment.
- Credential delivery.
- Admin operations.
- Audit logging.
- Playwright-tested storefront/admin flows.

Example summary direction:

> Built an education publishing platform connecting CMS content, checkout, Helcim payment validation, Schoology fulfillment, credential delivery, admin operations, audit logging, and Playwright-tested storefront/admin flows.

### Lash Her

Replace generic beauty-site wording with booking and commerce platform language.

Approved direction:

> A booking and commerce platform for a beauty-services business, integrating CMS-managed content, Google Calendar availability, Helcim checkout, Redis idempotency, PostgreSQL order storage, and Resend confirmation emails.

### Danny’s Fish & Chips

Replace generic restaurant-site wording with CMS-backed production-platform language.

Approved direction:

> A production CMS-backed restaurant platform with Strapi-managed menus, specials, announcements, gallery content, contact forms, mailing-list signup, CI/CD, and Playwright preview testing.

### PLP — Personalized Learning Plan

Position as private education workflow software/platform authored for Scholarly Elite Tutoring.

Key evidence to include:

- Rails API.
- Curriculum trees.
- Admin/creator workflows.
- Sidekiq background jobs.
- ActiveStorage attachments.
- PDF/ZIP export workflows.
- RSpec/RSwag API documentation and testing.
- React/TypeScript frontend where relevant.

Because PLP is private, it should not have a public live-link button unless a safe public URL is later provided.

## Screenshot and Visual Asset Strategy

Capture fresh screenshots from the verified live production sites and store them as local assets:

- `https://drenova.ca` → `public/images/projects/drenova-group.webp`
- `https://airapublishing.com` → `public/images/projects/aira-publishing.webp`
- `https://lashher.com` → `public/images/projects/lash-her.webp`
- `https://dannysfishandchips.com` → `public/images/projects/dannys-fish-and-chips.webp`

For PLP, use a representative private-platform visual:

- `public/images/projects/plp-personalized-learning-plan.webp`

PLP alt text or caption should make clear that this is a representative private-platform visual, not a public screenshot.

Implementation should avoid broken image states. If screenshot capture fails, retain a safe existing visual or render the neutral fallback rather than referencing a missing file.

## Accuracy and Wording Rules

- Avoid phrases like “modern website” when a project is better described as a system or platform.
- Prefer concrete engineering language: CMS, caching, sync pipelines, payments, bookings, fulfillment, admin tools, workflows, tests, deployment.
- Drenova, Aira Publishing, Lash Her, and Danny’s Fish & Chips may be labeled as live production work.
- PLP should be labeled as a private education platform/software system for Scholarly Elite Tutoring.
- Aira Medusa should not appear in Featured Work.
- Business value should describe operational changes and platform capability without fabricated metrics.

## Testing and QA Focus

Implementation should verify:

- Featured Work order is exactly Drenova, Aira, Lash Her, Danny’s, PLP.
- Aira Medusa does not appear in Featured Work.
- Every featured project renders Problem, System built, Key technical work, Business value, and Stack.
- Public projects have visible live links.
- PLP does not render a public live link.
- All visuals have descriptive alt text.
- Missing assets do not create broken images.
- The project section is readable at mobile and desktop widths.
- Stack pills wrap without horizontal overflow.
- Existing reduced-motion behavior remains respected.
- `npm run lint` and `npm run build` pass after implementation.

## Implementation Notes

- Follow existing Tailwind and Framer Motion patterns.
- Keep motion easing arrays typed with `as const`.
- Avoid adding `"use client"` unless required by hooks, browser APIs, or event handlers.
- Keep content in data files rather than hardcoding project copy in rendering components.
- Preserve the existing dark visual identity and typography unless small spacing/layout adjustments are necessary for readability.
