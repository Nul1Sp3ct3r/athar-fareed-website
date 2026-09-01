import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Root-locale redirect.
   *
   * `src/proxy.ts` already sends unprefixed paths to a locale, but in Next 16
   * the proxy runs on the Node runtime *behind* the CDN cache (Edge Middleware
   * used to run in front of it). On Netlify a request for `/` is therefore
   * answered by the CDN before the proxy sees it, and since every page lives
   * under `/[locale]` there is nothing at `/` to serve — hence the generic 404.
   * Declaring the redirect here puts it in `routes-manifest.json`, which the
   * host applies at the edge, so `/` resolves without depending on the proxy.
   *
   * The proxy stays in place and still does this job locally and on hosts that
   * run it. `source: "/"` matches the root only, so `/en` and `/ar` are never
   * matched and the redirect cannot loop.
   *
   * Note: the `value` regex deliberately avoids backslash escapes — this file
   * is TypeScript, so "\b" would compile to a backspace character rather than
   * a word boundary and the rule would silently never match.
   */
  async redirects() {
    return [
      {
        // Arabic-first browsers: "ar", "ar-SA", "ar;q=0.9", "ar-EG,en;q=0.8".
        source: "/",
        has: [
          {
            type: "header",
            key: "accept-language",
            value: "^ar([-;,].*)?$",
          },
        ],
        destination: "/ar",
        permanent: false,
      },
      {
        // Everyone else falls back to the default locale.
        source: "/",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
