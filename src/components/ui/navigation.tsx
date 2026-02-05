"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#portfolio" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Handle scroll for header background and bottom bar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Header background on scroll
      setIsScrolled(currentScrollY > 50);

      // Bottom bar auto-hide: hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsBottomBarVisible(false);
      } else {
        setIsBottomBarVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Intersection Observer for active section highlighting
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        // Check if section is already fully visible
        const rect = targetElement.getBoundingClientRect();
        const isFullyVisible =
          rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (isFullyVisible) {
          e.preventDefault();
          // Section already visible, do nothing (per interview decision)
          return;
        }
      }
      setIsMenuOpen(false);
    },
    []
  );

  return (
    <>
      {/* Desktop Header */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-surface/80 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              className="font-display font-bold text-xl text-foreground hover:text-accent transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              DD
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    activeSection === item.href
                      ? "text-accent bg-accent-muted"
                      : "text-foreground-muted hover:text-foreground hover:bg-background-secondary"
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button asChild size="sm">
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={isMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-foreground/20 backdrop-blur-sm transition-opacity",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-surface shadow-xl">
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <span className="font-display font-bold text-xl">Menu</span>
              <button
                className="p-2 text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Links */}
            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item, index) => (
                  <li
                    key={item.href}
                    className="opacity-0 animate-fade-in"
                    style={{ animationDelay: `${(index + 1) * 50}ms` }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={cn(
                        "block px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                        activeSection === item.href
                          ? "text-accent bg-accent-muted"
                          : "text-foreground hover:bg-background-secondary"
                      )}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Menu Footer */}
            <div className="p-4 border-t border-border">
              <Button className="w-full" size="lg" asChild>
                <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                  Get in Touch
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom CTA Bar */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300",
          "bg-surface/95 backdrop-blur-md border-t border-border shadow-lg",
          "safe-area-inset-bottom",
          isBottomBarVisible ? "translate-y-0" : "translate-y-full"
        )}
      >
        <div className="flex items-center justify-center gap-3 p-3">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href="#portfolio">View Work</a>
          </Button>
          <Button size="sm" className="flex-1" asChild>
            <a href="#contact">Get in Touch</a>
          </Button>
        </div>
      </div>
    </>
  );
}
