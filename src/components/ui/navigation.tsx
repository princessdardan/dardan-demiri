import Link from "next/link";
import { personalInfo } from "@/data";
import { Container } from "@/components/ui/container";
import { ProjectCta } from "@/components/ui/project-cta";

export function Navigation() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <Container className="flex min-h-16 items-center justify-between gap-2 px-3 sm:px-6">
        <Link href="/" className="hidden shrink-0 font-display font-bold text-white hover:text-accent sm:inline-flex">
          {personalInfo.name}
        </Link>
        <nav aria-label="Main navigation" className="flex flex-1 items-center justify-between gap-1 sm:flex-none sm:gap-4">
          <Link className="flex min-h-11 items-center px-1 text-xs hover:text-accent min-[375px]:text-sm sm:px-2" href="/#services">Services</Link>
          <Link className="flex min-h-11 items-center px-1 text-xs hover:text-accent min-[375px]:text-sm sm:px-2" href="/#work">Work</Link>
          <Link className="flex min-h-11 items-center px-1 text-xs hover:text-accent min-[375px]:text-sm sm:px-2" href="/resume">Résumé</Link>
          <ProjectCta placement="navigation" compact />
        </nav>
      </Container>
    </header>
  );
}
