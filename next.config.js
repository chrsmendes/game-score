const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  buildExcludes: [/middleware-manifest\.json$/],
  disable: process.env.NODE_ENV === 'development', // Desativa PWA em desenvolvimento
});

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'pt', 'es'],
    defaultLocale: 'en',
    localeDetection: false, // Evita redirecionamentos automáticos baseados no idioma do navegador
  },
  async rewrites() {
    return [];
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
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }
    if (!dev && !isServer) {
      console.warn(
        '⚠ GenerateSW has been chamado várias vezes. Verifique o precache manifest para garantir que não há duplicações!'
      );
    }
    return config;
  },
};

module.exports = withPWA(nextConfig);
