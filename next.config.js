/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/wecreate3_lp',
  assetPrefix: '/wecreate3_lp',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
