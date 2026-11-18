import type { NextConfig } from "next";
import { apexHost, canonicalOrigin } from "./src/lib/site-url";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: apexHost.replaceAll(".", "\\.") }],
        destination: `${canonicalOrigin}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
