import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function CookieMessage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-blue-100 p-4 text-center">
      <p className="text-blue-800 mb-2">
        {t('cookieMessage')}
      </p>
      <button 
        onClick={() => setIsVisible(false)}
        className="btn btn-primary text-sm"
      >
        {t('understood')}
      </button>
    </div>
  )
}

