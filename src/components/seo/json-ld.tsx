import { buildJsonLdGraph, getBaseUrl } from "@/lib/seo";

export function JsonLd() {
  const schema = buildJsonLdGraph(getBaseUrl());

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
