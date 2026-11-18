import { ArrowRight, CalendarDays, Mail, Search } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ProjectCta } from "@/components/ui/project-cta";
import { servicePages } from "@/data/marketing";
import { contactServices } from "@/lib/contact";

const services = [
  {
    id: "website",
    icon: CalendarDays,
    description: "Launch or rebuild a site that makes it easy to request a quote, book a service, or pay online.",
  },
  {
    id: "seo",
    icon: Search,
    description: "Find and fix technical issues that affect how search engines discover and understand your website.",
  },
  {
    id: "email",
    icon: Mail,
    description: "Set up mailing-list signup and automated emails for bookings, orders, and other customer interactions.",
  },
] as const;

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-14 sm:py-20">
      <Container>
        <h2 id="services-title" className="mb-7 text-3xl text-white sm:text-4xl">How I can help</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {services.map(({ id, icon: Icon, description }) => {
            const page = servicePages.find(({ service }) => service === id);

            return (
              <article key={id} className="flex flex-col rounded-2xl border border-border bg-surface p-6">
                <Icon aria-hidden="true" className="mb-4 size-6 text-accent" />
                <h3 className="mb-2 text-xl text-white">{contactServices[id]}</h3>
                <p className="mb-4 grow text-foreground-muted">{description}</p>
                {page && (
                  <Link
                    href={page.path}
                    className="inline-flex min-h-11 items-center gap-2 self-start font-semibold text-white hover:text-accent hover:underline"
                    aria-label={`View service details for ${page.name}`}
                  >
                    View service details <ArrowRight aria-hidden="true" className="size-4" />
                  </Link>
                )}
                <ProjectCta placement="services" service={id} />
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
