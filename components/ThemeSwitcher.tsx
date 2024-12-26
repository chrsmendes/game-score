import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { Sun, Moon, Monitor } from 'lucide-react'

type Theme = 'system' | 'dark' | 'light'

export default function ThemeSwitcher() {
  const { t } = useLanguage()
  const [theme, setTheme] = useState<Theme>('system')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    if (newTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(newTheme)
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 bg-secondary text-secondary-foreground px-3 py-2 rounded-md"
      >
        {theme === 'system' && <Monitor size={16} />}
        {theme === 'dark' && <Moon size={16} />}
        {theme === 'light' && <Sun size={16} />}
        <span>{t(theme)}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-popover text-popover-foreground rounded-md shadow-lg z-10">
          <button
            onClick={() => handleThemeChange('system')}
            className="block w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            <Monitor size={16} className="inline-block mr-2" />
            {t('system')}
          </button>
          <button
            onClick={() => handleThemeChange('dark')}
            className="block w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            <Moon size={16} className="inline-block mr-2" />
            {t('dark')}
          </button>
          <button
            onClick={() => handleThemeChange('light')}
            className="block w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground"
          >
            <Sun size={16} className="inline-block mr-2" />
            {t('light')}
          </button>
        </div>
      )}
    </div>
  )
}
