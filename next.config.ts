import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/NextJSPortfolio",
  assetPrefix: "/NextJSPortfolio/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
