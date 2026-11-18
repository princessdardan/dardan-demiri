import { ArrowDown } from "lucide-react";
import { personalInfo } from "@/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProjectCta } from "@/components/ui/project-cta";

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-[radial-gradient(ellipse_at_22%_100%,#294C60_0%,#001B2E_65%)]">
      <Container className="relative py-16 sm:py-24 lg:py-32">
        <p className="mb-5 text-sm font-medium text-primary-300 sm:text-base">
          {personalInfo.name} <span aria-hidden="true">·</span> Freelance web developer in Toronto
        </p>
        <h1 className="max-w-4xl text-4xl text-white sm:text-5xl lg:text-7xl">
          Websites that turn visits into <span className="text-accent">inquiries and bookings.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground-muted sm:text-xl">
          I build websites, booking systems, and online stores for Toronto-area businesses and remote teams.
          I also help with technical SEO and email setup so customers can find you, sign up, and hear from you again.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ProjectCta placement="hero" />
          <Button asChild size="lg" variant="secondary">
            <a href="#work">
              See selected work <ArrowDown aria-hidden="true" className="ml-2 size-4" />
            </a>
          </Button>
        </div>
      </Container>
    </section>
  );
}
