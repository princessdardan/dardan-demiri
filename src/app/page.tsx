import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { Container } from "@/components/ui/container";
import { Footer } from "@/components/ui/footer";
import { Navigation } from "@/components/ui/navigation";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    types: {
      "text/plain": [
        { url: "/llms.txt", title: "LLMs.txt" },
        { url: "/llms-full.txt", title: "Full LLM context" },
      ],
      "application/ld+json": [
        { url: "/structured-data.json", title: "Structured data graph" },
      ],
    },
  },
};

export default function Home() {
  return (
    <>
      <JsonLd />
      <Navigation />
      <main id="main-content">
        <Hero />
        <Services />
        <Portfolio />
        <Contact />
        <section id="about" className="border-t border-border bg-surface py-12">
          <Container>
            <h2 className="mb-3 text-2xl text-white">About Dardan</h2>
            <p className="max-w-2xl text-foreground-muted">
              I’m a full-stack engineer with first-hand restaurant operations experience. That shapes how
              I build: customers should find what they need quickly, and staff should be able to keep the site up to date.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5">
              <a id="experience" href="/resume#experience" className="inline-flex min-h-11 items-center font-medium text-accent hover:underline">
                Experience and education
              </a>
              <a id="skills" href="/resume#skills" className="inline-flex min-h-11 items-center font-medium text-accent hover:underline">
                Technical skills
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
