import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The site is deployed to Cloudflare as plain static files, so `next build`
   * writes a fully prerendered site to `out/`. There is no server at runtime:
   * no proxy, no redirects/rewrites/headers config, no request-time APIs.
   */
  output: "export",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
