/** @type {import('next').NextConfig} */
const stylexPlugin = require('@stylexjs/nextjs-plugin')
const nextConfig = {
  productionBrowserSourceMaps: false,
  optimizeFonts: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.canto.com',
        port: '',
        pathname: '/api_binary/v1/image/**',
      },
      {
        protocol: 'https',
        hostname: '*.canto.com',
        port: '',
        pathname: '/direct/image/**',
      },
    ],
    formats: ['image/webp'],
  },
}

module.exports = stylexPlugin({
  // useCSSLayers: true,
  rootDir: __dirname,
})(nextConfig)
