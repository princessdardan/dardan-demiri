import { projects } from "@/data";
import type { ContactService } from "@/lib/contact";
import type { Project } from "@/types";

const caseStudyContent = [
  {
    slug: "drenova-group",
    title: "A real estate website built around buyer and seller inquiries",
    description: "How Drenova Group combined MLS listings, editable market content, and buyer and seller inquiry forms in one website.",
    brief: "Drenova Group needed a website for its GTA and York Region brokerage that could keep listings current and give buyers and sellers clear ways to get in touch.",
    delivery: "I built editable team and market pages, synced listings from the MLS feed, and applied address display rules to the public listings. I added individual listing inquiry forms and a home evaluation form with email notifications.",
    outcome: "The brokerage can publish market content and direct visitors to the right inquiry form. Buyers can ask about a specific property, while sellers can request a home evaluation.",
    service: "website",
    visualSrc: "/images/projects/drenova-group-home-evaluation.webp",
  },
  {
    slug: "lash-her",
    title: "Online booking and payments for Lash Her",
    description: "How Lash Her connected service pages, calendar availability, online payments, and booking confirmations.",
    brief: "Lash Her needed one place to present beauty services, products, and training while making it easier for customers to book and pay online.",
    delivery: "I connected the booking flow to Google Calendar, added lead-time and buffer rules, and checked for scheduling conflicts before bookings were finalized. I integrated Helcim payments and automated booking and order confirmations.",
    outcome: "Customers can find a service, see available times, book, pay, and receive a confirmation through the same website. Lash Her can manage its service and training content through the CMS.",
    service: "website",
    visualSrc: "/images/projects/lash-her-booking.webp",
  },
  {
    slug: "dannys-fish-and-chips",
    title: "An editable restaurant website for Danny’s Fish & Chips",
    description: "How Danny’s Fish & Chips got editable menus and specials, with technical SEO foundations for its restaurant website.",
    brief: "Danny’s needed a website where customers could find current menus, specials, hours, and location details, and where staff could publish updates without a developer.",
    delivery: "I built pages backed by Strapi for menus, specials, and announcements, plus contact and mailing-list signup forms. I added search metadata, an XML sitemap, and robots rules to help search engines discover the public pages.",
    outcome: "Staff can keep menus and specials current in one place. Customers can find the practical details they need before visiting, and the public pages have a crawlable structure.",
    service: "seo",
    visualSrc: "/images/projects/dannys-fish-and-chips-menu.webp",
  },
] as const satisfies readonly {
  slug: string;
  title: string;
  description: string;
  brief: string;
  delivery: string;
  outcome: string;
  service: ContactService;
  visualSrc: string;
}[];

type CaseStudySlug = (typeof caseStudyContent)[number]["slug"];

export const caseStudyPages = caseStudyContent.map(({ visualSrc, ...study }) => {
  const project: Project | undefined = projects.find(({ slug }) => slug === study.slug);
  const visual = project?.visuals?.find(({ src }) => src === visualSrc);

  if (!project || !visual) throw new Error(`Missing portfolio content for ${study.slug}`);

  return { ...study, project, visual, path: `/work/${study.slug}` };
});

const serviceContent = [
  {
    slug: "website-and-booking",
    service: "website",
    name: "Website and booking builds",
    seoTitle: "Website and Booking System Development in Toronto",
    title: "Websites and booking systems for service businesses",
    description: "Custom websites and online booking systems for Toronto-area businesses and remote teams. Give customers an easier way to inquire, schedule, and pay.",
    intro: "I build and rebuild websites for Toronto-area service businesses and remote teams. If customers struggle to find current information or scheduling takes too much back-and-forth, I can build the site and the workflow that supports it.",
    scope: [
      {
        title: "Website your team can update",
        description: "Mobile-friendly pages for your services, location, pricing, or frequently asked questions, with an editor for day-to-day updates.",
      },
      {
        title: "Inquiries, booking, and payments",
        description: "Inquiry forms or online scheduling, with calendar integration, availability rules, payments, and confirmation emails where the project requires them.",
      },
      {
        title: "Launch and handoff",
        description: "Test the main paths customers will use, set up page titles and a sitemap, and show your team how to manage the site after launch.",
      },
    ],
    nextStep: "Share your current site if you have one and describe what customers should be able to do. We’ll define the pages, booking rules, and integrations before I put together a proposal.",
    examples: ["lash-her", "drenova-group"],
  },
  {
    slug: "technical-seo",
    service: "seo",
    name: "Technical SEO",
    seoTitle: "Technical SEO Audits and Implementation in Toronto",
    title: "Technical SEO audits and fixes for existing websites",
    description: "Technical SEO audits and implementation for Toronto-area and remote businesses, covering crawlability, indexing, redirects, site structure, and performance.",
    intro: "I help businesses find technical issues that make their websites harder to discover or use. This is useful when important pages are missing from search, a redesign changed your URLs, or the mobile site feels slow.",
    scope: [
      {
        title: "Crawling and indexing",
        description: "Review the sitemap, robots directives, canonicals, redirects, broken links, and internal navigation. Check indexing in Google Search Console when access is available.",
      },
      {
        title: "Page structure and performance",
        description: "Review titles, descriptions, headings, mobile performance, and structured data where it applies.",
      },
      {
        title: "Prioritized findings and fixes",
        description: "Get a list of issues with affected pages, priorities, and next steps. I can implement agreed fixes and verify them after release.",
      },
    ],
    nextStep: "Send your site URL and tell me which pages matter most or what changed recently. We’ll agree on the audit scope and whether you need implementation as well.",
    examples: ["dannys-fish-and-chips"],
  },
] as const satisfies readonly {
  slug: string;
  service: ContactService;
  name: string;
  seoTitle: string;
  title: string;
  description: string;
  intro: string;
  scope: readonly { title: string; description: string }[];
  nextStep: string;
  examples: readonly CaseStudySlug[];
}[];

export const servicePages = serviceContent.map(({ examples, ...page }) => ({
  ...page,
  path: `/services/${page.slug}`,
  caseStudies: examples.map((slug) => {
    const study = caseStudyPages.find((study) => study.slug === slug);
    if (!study) throw new Error(`Missing case study for ${slug}`);
    return study;
  }),
}));
