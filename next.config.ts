import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
    clientSegmentCache: true,
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
};

export default nextConfig;
