const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
})

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: `https://game-score.chmendes.com.br/:path*`,
      },
    ]
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
    return config
  },
}

module.exports = withPWA(nextConfig)
