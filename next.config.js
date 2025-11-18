// Conditionally load bundle analyzer
let withBundleAnalyzer = (config) => config;
try {
  if (require.resolve('@next/bundle-analyzer')) {
    withBundleAnalyzer = require('@next/bundle-analyzer')({
      enabled: process.env.ANALYZE === 'true',
    });
  }
} catch (e) {
  // Bundle analyzer not installed, skip it
  console.log('Bundle analyzer not available');
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minecraft.wiki',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-icons-png.flaticon.com',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: true,
  // Optimize for modern browsers - reduce polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable experimental features for better tree shaking
  experimental: {
    optimizePackageImports: ['lucide-react', '@tabler/icons-react', 'react-icons'],
  },
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Enable better tree shaking and minification
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }
    return config;
  },
}

module.exports = withBundleAnalyzer(nextConfig)

