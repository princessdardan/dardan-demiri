import type { Metadata } from "next";
import { Download } from "lucide-react";
import { personalInfo } from "@/data";
import { Resume } from "@/components/sections/resume";
import { Skills } from "@/components/sections/skills";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Footer } from "@/components/ui/footer";
import { Navigation } from "@/components/ui/navigation";
import { socialMetadata } from "@/lib/seo";

const description = "Dardan Demiri’s software engineering résumé, work experience, education, and technical skills.";

export const metadata: Metadata = {
  title: "Résumé",
  description,
  alternates: { canonical: "/resume" },
  ...socialMetadata(`Résumé | ${personalInfo.name}`, description, "/resume"),
};

export default function ResumePage() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <div className="border-b border-border bg-surface">
          <Container size="narrow" className="py-12 sm:py-16">
            <p className="mb-2 font-medium text-accent">{personalInfo.name}</p>
            <h1 className="mb-5 text-4xl text-white sm:text-5xl">Résumé</h1>
            <Button asChild>
              <a href={personalInfo.resumeUrl} download>
                <Download aria-hidden="true" className="mr-2 size-4" /> Download résumé (PDF)
              </a>
            </Button>
          </Container>
        </div>
        <Resume />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
