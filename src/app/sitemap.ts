import type { MetadataRoute } from "next";
import { caseStudyPages, servicePages } from "@/data/marketing";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/resume", ...servicePages.map(({ path }) => path), ...caseStudyPages.map(({ path }) => path)];
  return paths.map((path) => ({ url: absoluteUrl(path) }));
}
