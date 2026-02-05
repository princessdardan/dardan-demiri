import { cn } from "@/lib/utils";
import type { SectionProps } from "@/types";

export function Section({ id, className, children }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-[var(--section-padding-y-mobile)] md:py-[var(--section-padding-y)]",
        className
      )}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  title,
  subtitle,
  className,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        {
          "text-center": align === "center",
          "text-left": align === "left",
        },
        className
      )}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
