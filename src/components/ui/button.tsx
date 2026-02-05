import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import type { ButtonProps } from "@/types";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", asChild = false, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center font-semibold rounded-lg transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",

          // Size variants
          {
            "px-3 py-1.5 text-sm": size === "sm",
            "px-5 py-2.5 text-base": size === "md",
            "px-7 py-3.5 text-lg": size === "lg",
          },

          // Style variants
          {
            // Primary - coral accent
            "bg-accent text-accent-foreground hover:bg-accent-hover active:scale-[0.98]":
              variant === "primary",

            // Secondary - subtle
            "bg-surface border border-border text-foreground hover:bg-background-secondary hover:border-foreground-subtle":
              variant === "secondary",

            // Outline - border only
            "border-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground":
              variant === "outline",

            // Ghost - minimal
            "text-foreground hover:bg-accent-muted hover:text-accent":
              variant === "ghost",
          },

          className
        )}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };
