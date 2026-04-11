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
    <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-2xl rounded-[1.8rem] border border-border/70 bg-card/92 p-4 shadow-[0_24px_60px_-36px_hsl(var(--foreground)/0.55)] backdrop-blur-xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-card-foreground">
          {t('cookieMessage')}
        </p>
        <button
          type="button"
          onClick={handleUnderstand}
          className="btn btn-primary shrink-0"
        >
          {t('understood')}
        </button>
      </div>
    </div>
  )
}
