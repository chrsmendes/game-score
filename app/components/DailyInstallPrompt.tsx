'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function DailyInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const { t } = useLanguage()

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }

    window.addEventListener('beforeinstallprompt', handler)

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  useEffect(() => {
    const checkLastPrompt = () => {
      const lastPrompt = localStorage.getItem('lastInstallPrompt')
      const today = new Date().toDateString()

      if (!lastPrompt || lastPrompt !== today) {
        setShowPrompt(true)
        localStorage.setItem('lastInstallPrompt', today)
      }
    }

    checkLastPrompt()
  }, [])

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt')
        } else {
          console.log('User dismissed the install prompt')
        }
        setDeferredPrompt(null)
      })
    }
    setShowPrompt(false)
  }

  if (!showPrompt) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{t('installApp')}</h2>
        <p className="mb-4">{t('installBenefits')}</p>
        <ul className="list-disc pl-5 mb-4">
          <li>{t('offlineAccess')}</li>
          <li>{t('fasterLoading')}</li>
          <li>{t('homeScreenAccess')}</li>
          <li>{t('regularUpdates')}</li>
        </ul>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowPrompt(false)}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {t('notNow')}
          </button>
          <button
            onClick={handleInstall}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {t('installNow')}
          </button>
        </div>
      </div>
    </div>
  )
}

