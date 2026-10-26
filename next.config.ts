import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // SSR mode — deployed on Firebase App Hosting (develop) and Firebase Hosting (production).
  // Do NOT re-add `output: 'export'`; it disables API routes and server-side rendering.
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
