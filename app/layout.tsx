import './globals.css'
import { Inter } from 'next/font/google'
import { LanguageProvider } from './contexts/LanguageContext'
import DailyInstallPrompt from './components/DailyInstallPrompt'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Score Keeper',
  description: 'An app to keep track of scores in games',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          {children}
          <DailyInstallPrompt />
        </LanguageProvider>
      </body>
    </html>
  )
}

