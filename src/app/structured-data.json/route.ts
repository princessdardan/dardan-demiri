import { buildJsonLdGraph, getBaseUrl } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildJsonLdGraph(getBaseUrl()), {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
