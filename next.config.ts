import type { NextConfig } from "next";

// Always use basePath for GitHub Pages deployment
const basePath = "/mebel-kamyshin";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
