interface PersonSchemaProps {
  name?: string;
  jobTitle?: string;
  description?: string;
  url?: string;
  email?: string;
  sameAs?: string[];
  image?: string;
}

export function PersonJsonLd({
  name = "Dardan Demiri",
  jobTitle = "Web Developer",
  description = "Web developer specializing in modern React applications. Building fast, accessible, and beautifully crafted digital experiences.",
  url = "https://dardandemiri.com",
  email = "hello@dardandemiri.com",
  sameAs = [
    "https://github.com/dardandemiri",
    "https://linkedin.com/in/dardandemiri",
  ],
  image = "https://dardandemiri.com/images/profile.jpg",
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url,
    email,
    sameAs,
    image,
    knowsAbout: [
      "Web Development",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Frontend Development",
      "User Interface Design",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
