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
  ModeToggle,
} from "@/components";

export default function Home() {
  return (
    <div className="font-body bg-transparent text-foreground selection:bg-emerald-500/20 selection:text-emerald-900 dark:selection:text-emerald-100 overflow-x-hidden min-h-screen relative">
      <BackgroundEffect />
      <ModeToggle />
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Portfolio />
        <Skills />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
