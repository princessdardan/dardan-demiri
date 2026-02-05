import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide";
}

export function Container({
  className,
  children,
  size = "default",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-5xl": size === "narrow",
          "max-w-6xl": size === "default",
          "max-w-7xl": size === "wide",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
