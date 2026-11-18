import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ProjectCta } from "@/components/ui/project-cta";
import { ProjectImage } from "@/components/ui/project-image";
import { caseStudyPages, servicePages } from "@/data/marketing";
import { marketingMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudyPages.map(({ slug }) => ({ slug }));
}

async function getStudy(params: Props["params"]) {
  const { slug } = await params;
  const study = caseStudyPages.find((page) => page.slug === slug);
  if (!study) notFound();
  return study;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { project, description, path } = await getStudy(params);
  return marketingMetadata(`${project.subtitle} Case Study`, description, path);
}

export default async function CaseStudyPage({ params }: Props) {
  const study = await getStudy(params);
  const service = servicePages.find((page) => page.service === study.service);
  const sections = [
    { title: "The brief", content: study.brief },
    { title: "What I delivered", content: study.delivery },
    { title: "What changed", content: study.outcome },
  ];

  return (
    <article>
      <header className="border-b border-border bg-surface">
        <Container className="py-12 sm:py-16">
          <Link href="/#work" className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline">
            <ArrowLeft aria-hidden="true" className="size-4" /> Selected work
          </Link>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-3 font-medium text-accent">{study.project.subtitle}</p>
              <h1 className="text-4xl text-white sm:text-5xl">{study.title}</h1>
              {study.project.links.live && (
                <Button asChild variant="secondary" className="mt-6 min-h-11">
                  <a href={study.project.links.live} target="_blank" rel="noopener noreferrer">
                    View the live site <ArrowUpRight aria-hidden="true" className="ml-2 size-4" />
                  </a>
                </Button>
              )}
            </div>
            <figure>
              <ProjectImage visual={study.visual} sizes="(min-width: 1152px) 530px, (min-width: 768px) 46vw, 92vw" />
              {study.visual.caption && (
                <figcaption className="mt-2 text-sm text-foreground-muted">{study.visual.caption}</figcaption>
              )}
            </figure>
          </div>
        </Container>
      </header>

      <Container size="narrow" className="space-y-7 py-12 sm:py-16">
        {sections.map(({ title, content }) => (
          <section key={title} className="max-w-2xl">
            <h2 className="mb-2 text-2xl text-white">{title}</h2>
            <p className="text-foreground-muted">{content}</p>
          </section>
        ))}
        <section className="max-w-2xl border-t border-border pt-6">
          <h2 className="mb-4 text-2xl text-white">Planning a similar project?</h2>
          <div className="flex flex-wrap items-center gap-4">
            <ProjectCta placement="case_study" service={study.service} />
            {service && (
              <Link href={service.path} className="inline-flex min-h-11 items-center font-medium text-accent hover:underline">
                Explore {service.name}
              </Link>
            )}
          </div>
        </section>
      </Container>
    </article>
  );
}
