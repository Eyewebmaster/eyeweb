import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.eyewebmaster.com',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'api.eyewebmaster.com',
      },
      {
        protocol: 'http', // Allow old http images too
        hostname: 'www.eyewebmaster.com',
        pathname: '/**',
      },    
      {
        protocol: 'https', 
        hostname: 'www.eyewebmaster.com',
        pathname: '/**',
      },    
    ],
  },
};
module.exports = nextConfig;
export default nextConfig;
