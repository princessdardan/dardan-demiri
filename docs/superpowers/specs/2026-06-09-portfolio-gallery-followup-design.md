# Portfolio Featured Work Gallery Follow-up Design

## Purpose

Address review feedback on the Featured Work section by improving screenshot coverage, removing repetitive “Live production” wording from project labels, and replacing a problematic Lash Her homepage image that shows a contact pop-up over the site content.

The update should build on the production case-study portfolio work already in the PR and preserve the same one-page architecture, dark visual identity, accessibility standards, and reduced-motion behavior.

## Confirmed Scope

### In scope

- Replace the Lash Her primary homepage screenshot with a clean capture that does not show the contact form pop-up.
- Add a three-image gallery treatment for each public Featured Work project:
  - One large primary screenshot.
  - Two smaller secondary screenshots below it.
- Use the following secondary screenshot sources:
  - Lash Her: `https://lashher.com/training-programs/beginner-private-training` and `https://lashher.com/services/lash-fill/booking`.
  - Drenova Group: `https://drenova.ca/sellers-guide` and `https://drenova.ca/home-evaluation`.
  - Aira Publishing: `https://airapublishing.com/airamath` and `https://airapublishing.com/airaliteracy`.
  - Danny’s Fish & Chips: convert the provided `public/dannys-fish-and-chips-about-us.png` and `public/dannys-fish-and-chips-menu.png` to optimized `.webp` project assets.
- Remove references to “Live production” from Featured Work project status labels.
- Keep public live links visible.
- Keep PLP private and representative. It may continue using a single representative visual unless a safe second/third private visual is provided.
- Extend portfolio verification to cover gallery assets and reject “Live production” status wording.

### Out of scope

- Adding a carousel or interactive slideshow.
- Creating public links for PLP.
- Adding individual project pages.
- Changing case-study copy beyond status label cleanup.
- Including private PLP screenshots.

## Data Model

Keep the existing `visual` field as the primary visual for compatibility with SEO and skill modal consumers.

Add a new optional field to projects:

```ts
visuals?: ProjectVisual[];
```

For public projects, `visuals` should contain exactly three visuals in display order:

1. Primary homepage or project overview screenshot.
2. Secondary screenshot A.
3. Secondary screenshot B.

The first `visuals` item should match the existing `visual` information so existing consumers remain consistent.

PLP can omit `visuals` or provide a one-item representative gallery using the existing private-platform visual. The renderer must handle one or three visuals without broken layout.

## Asset Plan

Create the following new or refreshed assets under `public/images/projects/`:

- `lash-her.webp` — refreshed clean homepage screenshot without contact pop-up.
- `lash-her-training.webp` — Lash Her beginner private training page.
- `lash-her-booking.webp` — Lash Her lash fill booking page.
- `drenova-group-sellers-guide.webp` — Drenova sellers guide page.
- `drenova-group-home-evaluation.webp` — Drenova home evaluation page.
- `aira-publishing-airamath.webp` — AiraMath page.
- `aira-publishing-airaliteracy.webp` — AiraLiteracy page.
- `dannys-fish-and-chips-about-us.webp` — converted from provided PNG.
- `dannys-fish-and-chips-menu.webp` — converted from provided PNG.

Existing primary screenshots for Drenova, Aira, Danny’s, and PLP may remain if they still render cleanly.

The provided Danny’s PNG files in `public/` are source inputs. The committed project assets should be optimized WebP files in `public/images/projects/`. The source PNGs should not be staged unless they are intentionally retained as source material.

## Featured Work UI Design

Use the approved option B layout.

### Desktop

- Keep the existing alternating text/visual rhythm.
- Replace the single visual with a static gallery:
  - Large primary screenshot in a 16:9 frame.
  - Two smaller screenshots below in a two-column grid.
- Keep captions or `aria-label`/alt text descriptive enough to identify the page shown.
- Avoid hover-only important interactions.

### Mobile

- Preserve the current readable order:
  1. Status / organization label.
  2. Title.
  3. Summary.
  4. Gallery.
  5. Case-study sections.
  6. Stack.
  7. Links.
- Stack the large screenshot first, followed by two smaller screenshots.
- Avoid horizontal overflow.
- Keep images lazy-loaded where appropriate.

## Status Label Wording

Remove “Live production” from displayed Featured Work labels and data statuses.

Use concise labels such as:

- `Real-estate platform`
- `Education publishing platform`
- `Booking and commerce platform`
- `Restaurant platform`
- `Private education workflow platform`

The projects can still be described as live public work through visible live links and screenshot captions. Verification should reject status strings containing `Live production`.

## Verification Requirements

Implementation should verify:

- Lash Her primary screenshot no longer shows the contact form pop-up.
- Public projects render a three-image gallery.
- PLP renders safely without a required public gallery.
- All gallery images have descriptive alt text.
- All referenced WebP assets exist.
- “Live production” does not appear in Featured Work status labels.
- Featured Work order remains Drenova, Aira, Lash Her, Danny’s, PLP.
- PLP still has no public live link.
- Mobile layout has no horizontal overflow.
- `npm run verify:portfolio`, `npm run lint`, and `npm run build` pass.
