"use client";

import { track } from "@vercel/analytics";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { contactServices, type ContactService } from "@/lib/contact";

export function ProjectCta({
  placement,
  service,
  compact = false,
}: (
  | { placement: "services"; service: ContactService; compact?: never }
  | { placement: "navigation" | "hero" | "work"; service?: never; compact?: boolean }
)) {
  const trackClick = () => track("project_cta_clicked", { placement, service: service ?? "unspecified" });

  if (placement === "services") {
    return (
      <Link
        href={`/?service=${service}#contact`}
        onClick={trackClick}
        className="inline-flex min-h-11 items-center gap-1.5 self-start font-medium text-accent hover:underline"
      >
        Ask about this service <ArrowUpRight aria-hidden="true" className="size-4" />
        <span className="sr-only">: {contactServices[service]}</span>
      </Link>
    );
  }

  return (
    <Button asChild size={compact ? "sm" : "lg"} className={compact ? "min-h-11 px-2 text-xs min-[375px]:text-sm sm:px-4" : undefined}>
      <Link href="/#contact" onClick={trackClick}>
        Discuss your project
        {!compact && <ArrowUpRight aria-hidden="true" className="ml-2 size-5" />}
      </Link>
    </Button>
  );
}
