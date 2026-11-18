import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { projects } from "@/data";
import { Container } from "@/components/ui/container";
import { ProjectCta } from "@/components/ui/project-cta";
import type { Project, ProjectVisual } from "@/types";

function ProjectImage({ visual }: { visual: ProjectVisual }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-background">
      <Image
        src={visual.src}
        alt={visual.alt}
        fill
        className="object-cover object-top"
        sizes="(min-width: 1152px) 340px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 90vw"
      />
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [cover, ...gallery] = project.visuals?.length ? project.visuals : [project.visual];
  const { problem, systemBuilt, keyTechnicalWork, businessValue } = project.caseStudy;

  return (
    <article id={project.slug} className="self-start rounded-2xl border border-border bg-background p-4 sm:p-5">
      <figure>
        <ProjectImage visual={cover} />
        {cover.caption && <figcaption className="mt-2 text-xs text-foreground-muted">{cover.caption}</figcaption>}
      </figure>
      <h3 className="mb-2 mt-5 text-xl text-white">{project.title}</h3>
      <p className="text-sm leading-relaxed text-foreground-muted">{businessValue}</p>
      <div className="mt-3 flex flex-wrap gap-x-4">
        {project.links.live && (
          <a
            href={project.links.live}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-accent hover:underline"
          >
            View live site <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        )}
        {project.links.code && (
          <a
            href={project.links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-foreground-muted hover:text-accent hover:underline"
          >
            View code <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        )}
      </div>
      <details className="group mt-2 border-t border-border pt-1">
        <summary className="flex min-h-11 cursor-pointer items-center justify-between gap-2 text-sm font-medium text-accent [&::-webkit-details-marker]:hidden">
          Project details <ChevronDown aria-hidden="true" className="size-4 group-open:rotate-180" />
        </summary>
        <div className="space-y-4 pt-2 text-sm text-foreground-muted">
          <div>
            <h4 className="mb-1 text-base text-white">What the client needed</h4>
            <p>{problem}</p>
          </div>
          <div>
            <h4 className="mb-1 text-base text-white">What I built</h4>
            <p>{systemBuilt}</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {keyTechnicalWork.map((work) => <li key={work}>{work}</li>)}
            </ul>
          </div>
          <p><strong className="text-white">Stack</strong> {project.stack.join(" · ")}</p>
          {gallery.map((visual) => <ProjectImage key={visual.src} visual={visual} />)}
        </div>
      </details>
    </article>
  );
}

export function Portfolio() {
  return (
    <section id="work" aria-labelledby="work-title" className="bg-surface py-14 sm:py-20">
      <Container>
        <h2 id="work-title" className="mb-7 text-3xl text-white sm:text-4xl">Selected work</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
        <div className="mt-8">
          <ProjectCta placement="work" />
        </div>
      </Container>
    </section>
  );
}
