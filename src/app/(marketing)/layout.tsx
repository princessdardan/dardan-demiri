import type { ReactNode } from "react";
import { Footer } from "@/components/ui/footer";
import { Navigation } from "@/components/ui/navigation";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navigation />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
