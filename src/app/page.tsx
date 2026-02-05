"use client";

import { useState, useCallback } from "react";
import {
  Navigation,
  Hero,
  About,
  Portfolio,
  Skills,
  Resume,
  Contact,
  Footer,
} from "@/components";

export default function Home() {
  const [filterTech, setFilterTech] = useState<string | null>(null);

  const handleTechClick = useCallback((tech: string) => {
    // Scroll to portfolio section when filtering
    if (tech) {
      setFilterTech(tech);
      const portfolioSection = document.getElementById("portfolio");
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setFilterTech(null);
    }
  }, []);

  return (
    <>
      <Navigation />

      <main id="main-content">
        <Hero />
        <About />
        <Portfolio filterTech={filterTech} onTechClick={handleTechClick} />
        <Skills onSkillClick={handleTechClick} />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
