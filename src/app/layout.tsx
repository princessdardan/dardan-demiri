import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { PersonJsonLd } from "@/components/seo/json-ld";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://dardandemiri.com"
  ),
  title: {
    default: "Dardan Demiri | Full-Stack Engineer",
    template: "%s | Dardan Demiri",
  },
  description:
    "Full-stack engineer with 5+ years building React applications and Ruby on Rails systems. Specializing in content delivery, internal tooling, and customer engagement.",
  keywords: [
    "full-stack engineer",
    "software engineer",
    "React developer",
    "Ruby on Rails developer",
    "Next.js",
    "TypeScript",
    "Toronto",
    "portfolio",
  ],
  authors: [{ name: "Dardan Demiri" }],
  creator: "Dardan Demiri",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://dardandemiri.com",
    siteName: "Dardan Demiri",
    title: "Dardan Demiri | Full-Stack Engineer",
    description:
      "Full-stack engineer with 5+ years building React applications and Ruby on Rails systems. Specializing in content delivery, internal tooling, and customer engagement.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dardan Demiri - Full-Stack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dardan Demiri | Full-Stack Engineer",
    description:
      "Full-stack engineer building React and Ruby on Rails systems.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <PersonJsonLd />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
