import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['picsum.photos'],
  },
  output: 'standalone', // Optimizes for Docker
};

export default nextConfig;
