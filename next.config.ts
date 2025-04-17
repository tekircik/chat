import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  target: 'server',
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'avatar.vercel.sh',
      },
    ],
  },
};

export default nextConfig;
