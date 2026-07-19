import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output keeps the Docker runtime image small (see docker/frontend.Dockerfile).
  output: "standalone",
  // Pin the workspace root; the monorepo root has its own lockfile (husky).
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
