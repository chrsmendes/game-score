import './globals.css'
import { Inter } from 'next/font/google'
import { LanguageProvider } from '../components/LanguageContext'
import Script from 'next/script'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

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

export const viewport = {
  themeColor: '#4a90e2',
  viewport:
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4a90e2" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="Game Score" />
        <meta name="apple-mobile-web-app-title" content="Game Score" />
        <meta name="msapplication-starturl" content="/" />
        <meta name="msapplication-TileColor" content="#4a90e2" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>{children}</LanguageProvider>
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
