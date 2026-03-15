import { cn } from "@/lib/utils";

interface ParticleDisplayFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function ParticleDisplayFrame({
  children,
  className,
}: ParticleDisplayFrameProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-[#294C60]/50 overflow-hidden h-full",
        className
      )}
      style={{
        boxShadow:
          "0 0 30px rgba(255, 196, 155, 0.08), 0 0 60px rgba(41, 76, 96, 0.06), 0 0 90px rgba(173, 182, 196, 0.04)",
      }}
    >
      {children}
    </div>
  );
}
