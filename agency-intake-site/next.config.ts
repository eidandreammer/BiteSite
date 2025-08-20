import type { NextConfig } from "next";

// Enable static export for GitHub Pages
// Disable GitHub Pages static export since we have API routes
const basePath = ''

const nextConfig: NextConfig = {
  // Use default output so API routes work
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
