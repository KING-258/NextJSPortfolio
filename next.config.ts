import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // If deploying to https://<user>.github.io/<repo>, set basePath:
  // basePath: "/portfolio",
};

export default nextConfig;
