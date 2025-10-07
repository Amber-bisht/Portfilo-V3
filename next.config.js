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
  },
  // Generate static files for better crawling
  generateStaticParams: true,
  // Optimize for static export
  distDir: 'out',
  // Add headers for better SEO (will be applied during static generation)
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/portfolio-data.json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json; charset=utf-8'
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow'
          }
        ]
      },
      {
        source: '/sitemap.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/xml; charset=utf-8'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400'
          }
        ]
      }
    ];
  }
}

module.exports = nextConfig
