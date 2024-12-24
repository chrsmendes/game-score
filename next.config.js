/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
  },
  // Add any development-specific configurations here
  webpack: (config, { dev, isServer }) => {
    // Custom webpack config for development
    if (dev && !isServer) {
      const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }
    return config
  },
}

module.exports = nextConfig

