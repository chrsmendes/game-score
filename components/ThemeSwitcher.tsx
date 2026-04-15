import { useState, useEffect, useRef } from 'react'
import { useLanguage } from './LanguageContext'
import { Check, ChevronDown, Monitor, Moon, Sun } from 'lucide-react'

type Theme = 'system' | 'dark' | 'light'

export default function ThemeSwitcher() {
  const { t } = useLanguage()
  const [theme, setTheme] = useState<Theme>('system')
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') as Theme) ?? 'system'
    setTheme(savedTheme)
    applyTheme(savedTheme)
    setIsMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement

    if (newTheme === 'system') {
      newTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }

    if (!root.classList.contains(newTheme)) {
      root.classList.remove('light', 'dark')
      root.classList.add(newTheme)
    }
  }

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
    setIsOpen(false)
  }

  const themeIcons = {
    system: Monitor,
    dark: Moon,
    light: Sun,
  } satisfies Record<Theme, typeof Monitor>

  const ThemeIcon = themeIcons[theme]

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-secondary min-w-[9.5rem] justify-between px-4 py-3"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <ThemeIcon className="h-4 w-4" />
          {isMounted && <span>{t(theme)}</span>}
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isMounted && isOpen && (
        <div className="absolute right-0 z-50 mt-3 w-52 rounded-[1.5rem] border border-border/70 bg-popover/95 p-2 text-popover-foreground shadow-[0_24px_60px_-32px_hsl(var(--foreground)/0.5)] backdrop-blur-xl">
          {(
            [
              ['system', Monitor],
              ['dark', Moon],
              ['light', Sun],
            ] as const
          ).map(([option, Icon]) => (
            <button
              key={option}
              type="button"
              onClick={() => handleThemeChange(option)}
              className={`flex w-full items-center justify-between rounded-[1rem] px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                theme === option
                  ? 'bg-primary text-primary-foreground'
                  : 'text-popover-foreground hover:bg-accent/15'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon className="h-4 w-4" />
                {t(option)}
              </span>
              {theme === option && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
