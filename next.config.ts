import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
        pathname: '/99y1fc9mh/Aauraa/**', // allow all images in this folder
      },
    ],
  },
};

export default nextConfig;
