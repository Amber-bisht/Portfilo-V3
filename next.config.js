/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // SEO and Crawling Optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'react-icons']
  }
}

module.exports = nextConfig
