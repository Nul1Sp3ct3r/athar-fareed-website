import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Railway runs the app as a plain Node process, so build a self-contained
   * server at .next/standalone/server.js that boots without installing
   * node_modules. That server reads PORT and HOSTNAME from the environment,
   * which is how Railway assigns a port.
   */
  output: "standalone",
};

export default nextConfig;
