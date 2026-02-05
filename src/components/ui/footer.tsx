import { Github, Linkedin } from "lucide-react";

interface FooterProps {
  name?: string;
  github?: string;
  linkedin?: string;
}

export function Footer({
  name = "Dardan Demiri",
  github = "https://github.com/dardandemiri",
  linkedin = "https://linkedin.com/in/dardandemiri",
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-foreground-muted">
            © {currentYear} {name}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-accent transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-muted hover:text-accent transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
