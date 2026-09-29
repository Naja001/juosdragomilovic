import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.os-dragomilovic.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "os-dragomilovic.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;