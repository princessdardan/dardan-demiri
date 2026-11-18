import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ProjectCta } from "@/components/ui/project-cta";
import { ProjectImage } from "@/components/ui/project-image";
import { servicePages } from "@/data/marketing";
import { marketingMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}

async function getService(params: Props["params"]) {
  const { slug } = await params;
  const service = servicePages.find((page) => page.slug === slug);
  if (!service) notFound();
  return service;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { seoTitle, description, path } = await getService(params);
  return marketingMetadata(seoTitle, description, path);
}

export default async function ServicePage({ params }: Props) {
  const page = await getService(params);

  return (
    <>
      <header className="border-b border-border bg-[radial-gradient(ellipse_at_18%_100%,#294C60_0%,#001B2E_70%)]">
        <Container className="py-12 sm:py-20">
          <Link href="/#services" className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm text-accent hover:underline">
            <ArrowLeft aria-hidden="true" className="size-4" /> All services
          </Link>
          <h1 className="max-w-4xl text-4xl text-white sm:text-5xl lg:text-6xl">{page.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-foreground-muted sm:text-xl">{page.intro}</p>
          <div className="mt-7">
            <ProjectCta placement="service_page" service={page.service} />
          </div>
        </Container>
      </header>

      <section aria-labelledby="scope-title" className="py-12 sm:py-16">
        <Container>
          <h2 id="scope-title" className="mb-6 text-3xl text-white">What’s included</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {page.scope.map(({ title, description }) => (
              <li key={title} className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
                <h3 className="mb-2 text-xl text-white">{title}</h3>
                <p className="text-foreground-muted">{description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="examples-title" className="border-y border-border bg-surface py-12 sm:py-16">
        <Container>
          <h2 id="examples-title" className="mb-6 text-3xl text-white">Relevant work</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {page.caseStudies.map((study) => (
              <article key={study.slug} className="rounded-2xl border border-border bg-background p-4 sm:p-5">
                <ProjectImage visual={study.visual} sizes="(min-width: 1152px) 520px, (min-width: 640px) 45vw, 90vw" />
                <h3 className="mb-2 mt-4 text-xl text-white">{study.project.subtitle}</h3>
                <p className="text-foreground-muted">{study.description}</p>
                <Link
                  href={study.path}
                  className="mt-2 inline-flex min-h-11 items-center gap-2 font-medium text-accent hover:underline"
                  aria-label={`Read the case study for ${study.project.subtitle}`}
                >
                  Read the case study <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="next-step-title" className="py-12 sm:py-16">
        <Container>
          <h2 id="next-step-title" className="text-3xl text-white">How to get started</h2>
          <p className="mb-6 mt-3 max-w-2xl text-foreground-muted">{page.nextStep}</p>
          <ProjectCta placement="service_page" service={page.service} />
        </Container>
      </section>
    </>
  );
}
