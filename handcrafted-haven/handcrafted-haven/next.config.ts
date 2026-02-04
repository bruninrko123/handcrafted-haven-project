import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // this makes it so that all HTTP domains are allowed
      },
    ],
  },
};



export default nextConfig;
