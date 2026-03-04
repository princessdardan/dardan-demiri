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
  jobTitle = "Full-Stack Engineer",
  description = "Full-stack engineer with 5+ years designing, building, and scaling customer-facing web applications across e-commerce and ed-tech. Proven track record delivering production systems that reduce costs, automate workflows, and improve performance.",
  url = "https://dardandemiri.com",
  email = "dardandemiridev@gmail.com",
  sameAs = [
    "https://github.com/princessdardan",
    "https://linkedin.com/in/dardan-demiri",
  ],
  image = "https://dardandemiri.com/images/profile.jpeg",
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
      "Ruby on Rails",
      "TypeScript",
      "JavaScript",
      "Full-Stack Development",
      "PostgreSQL",
      "GraphQL",
      "Django",
      "Docker",
      "Redis",
      "MedusaJS",
      "Python",
      "Nginx",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
