import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/learn", destination: "/technology", permanent: true },
      { source: "/arco", destination: "/technology", permanent: true },
    ];
  },
};

export default nextConfig;
