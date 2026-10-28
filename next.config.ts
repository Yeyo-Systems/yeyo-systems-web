import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export served by Firebase Hosting (develop: yeyo-systems-web,
  // production: yeyo-systems). Server features (POST route handlers, SSR,
  // Server Actions) are unavailable until a server runtime is approved (#2).
  output: "export",
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
