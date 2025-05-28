import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable standalone output to avoid Windows symlink permission issues
  // Can be re-enabled for Docker builds if needed
  // ...(process.env.NODE_ENV === 'production' && { output: 'standalone' }),
};

export default nextConfig;
