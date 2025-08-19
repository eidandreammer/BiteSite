import type { NextConfig } from "next";

// Enable static export for GitHub Pages
const isProd = process.env.NODE_ENV === 'production'
const repoFull = process.env.GITHUB_REPOSITORY || ''
const repoName = repoFull.split('/')[1] || ''
const isUserOrOrgPages = /\.github\.io$/i.test(repoName)
const basePath = isProd && repoName && !isUserOrOrgPages ? `/${repoName}` : ''

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath ? `${basePath}/` : '',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
