import type { Metadata } from "next";
import { personalInfo } from "@/data";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Navigation } from "@/components/ui/navigation";
import { contactMessages, type ContactResult } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Project inquiry",
  robots: { index: false, follow: true },
};

export default async function ContactStatus({
  searchParams,
}: {
  searchParams: Promise<{ result?: string | string[] }>;
}) {
  const { result } = await searchParams;
  const status = typeof result === "string" && Object.hasOwn(contactMessages, result)
    ? result as ContactResult
    : "invalid";
  const received = status === "received";

  return (
    <>
      <Navigation />
      <main id="main-content">
        <Container size="narrow" className="py-16">
          <h1 className="text-4xl text-white">{received ? "Inquiry received" : "Inquiry could not be sent"}</h1>
          <p className="mb-6 mt-4 text-foreground-muted">{contactMessages[status]}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={received ? "/#work" : "/#contact"}>{received ? "Browse selected work" : "Back to the form"}</a>
            </Button>
            {!received && <Button asChild variant="outline"><a href={`mailto:${personalInfo.email}`}>Email me directly</a></Button>}
          </div>
        </Container>
      </main>
    </>
  );
}
