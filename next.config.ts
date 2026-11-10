import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build plain HTML/CSS/JS into the `out/` folder so GitHub Pages can host it.
  output: "export",
  // Write /pipeline/index.html instead of /pipeline.html (works on any static host).
  trailingSlash: true,
  reactCompiler: true,
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
