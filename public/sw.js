if (!self.define) {
  let e,
    s = {}
  const i = (i, n) => (
    (i = new URL(i + '.js', n).href),
    s[i] ||
      new Promise((s) => {
        if ('document' in self) {
          const e = document.createElement('script')
          ;(e.src = i), (e.onload = s), document.head.appendChild(e)
        } else (e = i), importScripts(i), s()
      }).then(() => {
        let e = s[i]
        if (!e) throw new Error(`Module ${i} didn’t register its module`)
        return e
      })
  )
  self.define = (n, a) => {
    const t =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href
    if (s[t]) return
    let c = {}
    const r = (e) => i(e, t),
      o = { module: { uri: t }, exports: c, require: r }
    s[t] = Promise.all(n.map((e) => o[e] || r(e))).then((e) => (a(...e), c))
  }
}
define(['./workbox-4754cb34'], function (e) {
  'use strict'
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: '/CNAME', revision: '795a0dbd17ba3213038a96bc07fb1df0' },
        {
          url: '/_next/app-build-manifest.json',
          revision: '87164d6ede3aef732e9d1943a0863b5b',
        },
        {
          url: '/_next/dynamic-css-manifest.json',
          revision: 'd751713988987e9331980363e24189ce',
        },
        {
          url: '/_next/static/32WiZ8ZfFE3k4sO-6Jx-h/_buildManifest.js',
          revision: '02e77d4067627be4a12cb5bcd3c94716',
        },
        {
          url: '/_next/static/32WiZ8ZfFE3k4sO-6Jx-h/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js',
          revision: '2b4c1ee4fbe3a7cf',
        },
        {
          url: '/_next/static/chunks/218.d8ec56f1948566fd.js',
          revision: 'd8ec56f1948566fd',
        },
        {
          url: '/_next/static/chunks/289-e43185dc16bc746e.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/4bd1b696-6b2175b880587e5e.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/517-434f6eb4a8819b69.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-e95bd59ba734a10f.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/app/layout-a18ab2d9a4d37293.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/app/page-962438a29aa326a3.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/framework-d29117d969504448.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/main-app-42089d5e1ea8ae15.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/main-d5b0cfe187f0fb6f.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/pages/_app-60989c630625b0d6.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/pages/_error-8a20a8cc0e244b4c.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-171dd1fa6922e1bd.js',
          revision: '32WiZ8ZfFE3k4sO-6Jx-h',
        },
        {
          url: '/_next/static/css/74ee9884ab437960.css',
          revision: '74ee9884ab437960',
        },
        {
          url: '/_next/static/media/26a46d62cd723877-s.woff2',
          revision: 'befd9c0fdfa3d8a645d5f95717ed6420',
        },
        {
          url: '/_next/static/media/55c55f0601d81cf3-s.woff2',
          revision: '43828e14271c77b87e3ed582dbff9f74',
        },
        {
          url: '/_next/static/media/581909926a08bbc8-s.woff2',
          revision: 'f0b86e7c24f455280b8df606b89af891',
        },
        {
          url: '/_next/static/media/6d93bde91c0c2823-s.woff2',
          revision: '621a07228c8ccbfd647918f1021b4868',
        },
        {
          url: '/_next/static/media/97e0cb1ae144a2a9-s.woff2',
          revision: 'e360c61c5bd8d90639fd4503c829c2dc',
        },
        {
          url: '/_next/static/media/a34f9d1faa5f3315-s.p.woff2',
          revision: 'd4fe31e6a2aebc06b8d6e558c9141119',
        },
        {
          url: '/_next/static/media/df0a9ae256c0569c-s.woff2',
          revision: 'd54db44de5ccb18886ece2fda72bdfe0',
        },
        { url: '/favicon.ico', revision: 'cd40bc6de56b1ec58605760cba8a7b7c' },
        {
          url: '/images/android-chrome-192x192.png',
          revision: '42e58eb1f2dab9d7dcc0f922b81f2944',
        },
        {
          url: '/images/android-chrome-512x512.png',
          revision: '6bf97346521f0c57531752f2ba108236',
        },
        {
          url: '/images/apple-touch-icon.png',
          revision: 'd4ade4cf4596924511185841d490bf66',
        },
        {
          url: '/images/favicon-16x16.png',
          revision: 'c2328c8b6a2825956fe21206f15ff0a0',
        },
        {
          url: '/images/favicon-32x32.png',
          revision: 'e40909d4b240e7f8e12bd688b3a10507',
        },
        { url: '/manifest.json', revision: '95bb7c368797ab4c7d728356cfd9e410' },
        { url: '/offline.html', revision: '094625c622eec4f32120bbfc1f140576' },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: i,
              state: n,
            }) =>
              s && 'opaqueredirect' === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: 'OK',
                    headers: s.headers,
                  })
                : s,
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        const s = e.pathname
        return !s.startsWith('/api/auth/') && !!s.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1
        return !e.pathname.startsWith('/api/')
      },
      new e.NetworkFirst({
        cacheName: 'others',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    )
})
