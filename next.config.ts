import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/learn", destination: "/technology", permanent: true },
      { source: "/arco", destination: "/technology", permanent: true },
      // Old multi-page docs collapsed into a single scrolling /docs page.
      { source: "/docs/:path+", destination: "/docs", permanent: false },
    ];
  },
};

export default nextConfig;
