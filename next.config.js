/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Disable basePath in development for easier data file access
  ...(process.env.NODE_ENV === 'production' && {
    basePath: '/wecreate3_lp',
    assetPrefix: '/wecreate3_lp',
  }),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
