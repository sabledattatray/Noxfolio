import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: true,
    clientSegmentCache: true,
    serverActions: {
      bodySizeLimit: '10mb'
    }
  }
};

export default nextConfig;
