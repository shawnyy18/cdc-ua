import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress cross-origin warnings for LAN development
  // @ts-ignore
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.100.138:3000",
    "http://192.168.100.152:3000",
    "http://192.168.100.79:3000",
    "http://192.168.100.79",
    // Add additional LAN origins you access the dev server from (example: other devices on the LAN)
    "http://192.168.100.12:3000",
    "http://192.168.100.12",
  ],
  // Note: devIndicators removed due to typing changes in Next 16
  images: {
    unoptimized: true,
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
  // Reduce aggressive HMR refresh behavior in development
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      // @ts-ignore - internal flag to reduce refresh frequency
      webpackBuildWorker: false,
    },
  }),
};

export default nextConfig;
