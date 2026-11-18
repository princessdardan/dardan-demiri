import { buildJsonLdGraph } from "@/lib/seo";

export function JsonLd() {
  const schema = buildJsonLdGraph();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
