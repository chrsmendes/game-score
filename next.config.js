const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
  disable: process.env.NODE_ENV === 'development', // Add this line
})

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return []
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
    ]
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
      config.plugins.push(new ForkTsCheckerWebpackPlugin())
    }
    if (!dev && !isServer) {
      console.warn(
        '⚠ GenerateSW has been called multiple times, perhaps due to running webpack in --watch mode. The precache manifest generated after the first call may be inaccurate! Please see https://github.com/GoogleChrome/workbox/issues/1790 for more information.'
      )
    }
    return config
  },
}

module.exports = withPWA(nextConfig)
