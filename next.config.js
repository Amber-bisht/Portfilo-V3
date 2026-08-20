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
  // output: 'export', // Removed to enable API routes for AI chat
  images: {
    unoptimized: false, // Enabled for Vercel
    formats: ['image/avif', 'image/webp'],
    qualities: [60, 75],
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
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tensorik.in',
        pathname: '/**',
      },
    ],
  },
  // trailingSlash: true, // Removed as Vercel handles trailing slashes natively and causes 404.html chmod build error
  // Optimize for modern browsers - reduce polyfills
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable experimental features for better tree shaking
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons'],
  },
  async headers() {
    return [
      {
        source: '/:all*(mp3|wav|ogg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
    ];
  },
}

module.exports = withBundleAnalyzer(nextConfig)

