import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { PersonJsonLd } from "@/components/seo/json-ld";
import { Analytics } from "@vercel/analytics/next"
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
    "Toronto-based full-stack engineer with 5+ years building and scaling customer-facing web applications across e-commerce and ed-tech. Proven track record delivering production systems that reduce costs, automate workflows, and improve performance.",
  keywords: [
    "full-stack engineer",
    "senior software engineer",
    "React developer",
    "Ruby on Rails developer",
    "Next.js",
    "TypeScript",
    "Django",
    "MedusaJS",
    "e-commerce developer",
    "ed-tech",
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
      "Toronto-based full-stack engineer with 5+ years building and scaling customer-facing web applications across e-commerce and ed-tech. Proven track record delivering production systems that reduce costs, automate workflows, and improve performance.",
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
      "Toronto-based full-stack engineer building scalable e-commerce and ed-tech applications with React, Ruby on Rails, and Django.",
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
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PersonJsonLd />
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
