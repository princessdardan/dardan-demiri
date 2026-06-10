import { buildJsonLdGraph, buildLlmsTxt, getBaseUrl, siteConfig } from "@/lib/seo";
import { experience, personalInfo, projects } from "@/data";

export const dynamic = "force-static";

export function GET() {
  const baseUrl = getBaseUrl();
  const content = `${buildLlmsTxt(baseUrl)}
## Detailed profile

${personalInfo.about.join("\n\n")}

## Experience

${experience
  .map(
    (item) => `### ${item.role}, ${item.company}

Period: ${item.period}
Technologies and areas: ${item.tags.join(", ")}

${item.points.map((point) => `- ${point}`).join("\n")}`
  )
  .join("\n\n")}

## Project details

${projects
  .map(
    (project) => `### ${project.title}

${project.summary}

Case study:
- Problem: ${project.caseStudy.problem}
- System built: ${project.caseStudy.systemBuilt}
- Key technical work:
${project.caseStudy.keyTechnicalWork.map((point) => `  - ${point}`).join("\n")}
- Business value: ${project.caseStudy.businessValue}

Technologies: ${project.stack.join(", ")}
${project.links.live ? `Live site: ${project.links.live}` : "Live site: Private / Not publicly available"}
${project.links.code ? `Code: ${project.links.code}` : ""}`
  )
  .join("\n\n")}

## Structured data snapshot

Canonical structured data is available at ${new URL("/structured-data.json", baseUrl)}.

\`\`\`json
${JSON.stringify(buildJsonLdGraph(baseUrl), null, 2)}
\`\`\`

## Contact

${siteConfig.email}
${new URL("/#contact", baseUrl)}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
