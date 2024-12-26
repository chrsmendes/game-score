import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageContext'

export default function CookieMessage() {
  const { t } = useLanguage()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const cookieMessageShown = localStorage.getItem('cookieMessageShown')
    if (!cookieMessageShown) {
      setIsVisible(true)
    }
  }, [])

  if (!isVisible) return null

  const handleUnderstand = () => {
    setIsVisible(false)
    localStorage.setItem('cookieMessageShown', 'true')
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-secondary p-4 text-center">
      <p className="text-secondary-foreground mb-2">{t('cookieMessage')}</p>
      <button onClick={handleUnderstand} className="btn btn-primary text-sm">
        {t('understood')}
      </button>
    </div>
  )
}
