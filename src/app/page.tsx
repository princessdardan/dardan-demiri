import {
  Navigation,
  Hero,
  About,
  Portfolio,
  Skills,
  Resume,
  Contact,
  Footer,
  BackgroundEffect,
} from "@/components";

export default function Home() {
  return (
    <div className="font-body bg-transparent text-foreground selection:bg-primary-500/20 selection:text-primary-100 overflow-x-hidden min-h-screen relative">
      <BackgroundEffect />
      <Navigation />
      <main id="main-content">
        <Hero />
        <div className="section-divider" aria-hidden="true" />
        <About />
        <div className="section-divider" aria-hidden="true" />
        <Portfolio />
        <div className="section-divider" aria-hidden="true" />
        <Skills />
        <div className="section-divider" aria-hidden="true" />
        <Resume />
        <div className="section-divider" aria-hidden="true" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
