import Image from "next/image";
import type { ProjectVisual } from "@/types";

export function ProjectImage({ visual, sizes }: { visual: ProjectVisual; sizes: string }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-background">
      <Image src={visual.src} alt={visual.alt} fill className="object-cover object-top" sizes={sizes} />
    </div>
  );
}
