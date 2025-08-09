import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.eyewebmaster.com',
        port: '',
        pathname: '/media/posts/**',
      },
      {
        protocol: 'https',
        hostname: 'api.eyewebmaster.com',
      },
      {
        protocol: 'http', // Allow old http images too
        hostname: 'www.eyewebmaster.com',
      },      
    ],
  },
};

export default nextConfig;
