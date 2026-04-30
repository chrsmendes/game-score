import './globals.css'
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import { LanguageProvider } from '../components/LanguageContext'
import Script from 'next/script'
import { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-ibm-plex-mono',
})

const shouldLoadVercelAnalytics =
  process.env.VERCEL === '1' || Boolean(process.env.NEXT_PUBLIC_VERCEL_ENV)

export const metadata: Metadata = {
  title: 'Game Score - Track Your Game Scores',
  description:
    'An app to keep track of scores in various games. Perfect for board games, card games, and more!',
  keywords: 'game score, score tracker, board games, card games, score keeper',
  openGraph: {
    title: 'Game Score - Track Your Game Scores',
    description:
      'An app to keep track of scores in various games. Perfect for board games, card games, and more!',
    url: 'https://game-score.chmendes.com.br',
    siteName: 'Game Score',
    images: [
      {
        url: 'https://game-score.chmendes.com.br/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Score - Track Your Game Scores',
    description:
      'An app to keep track of scores in various games. Perfect for board games, card games, and more!',
    images: ['https://game-score.chmendes.com.br/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5efe3' },
    { media: '(prefers-color-scheme: dark)', color: '#091a21' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Game Score" />
        <meta name="apple-mobile-web-app-title" content="Game Score" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-TileColor" content="#163847" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} font-sans`}
        suppressHydrationWarning
      >
        <LanguageProvider>{children}</LanguageProvider>
        {shouldLoadVercelAnalytics ? <Analytics /> : null}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('Service Worker registration successful with scope: ', registration.scope);
                  },
                  function(err) {
                    console.log('Service Worker registration failed: ', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  )
}
