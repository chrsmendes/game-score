import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageContext'
import { Check, ChevronDown, Monitor, Moon, Sun } from 'lucide-react'

type Theme = 'system' | 'dark' | 'light'

export default function ThemeSwitcher() {
  const { t } = useLanguage()
  const [theme, setTheme] = useState<Theme>('system')
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [dropdownAlign, setDropdownAlign] = useState<'left' | 'right'>('right')
  const dropdownRef = useRef<HTMLDivElement>(null)

  const updateDropdownAlignment = useCallback(() => {
    if (!dropdownRef.current) {
      return
    }

    const triggerRect = dropdownRef.current.getBoundingClientRect()
    const dropdownWidth = 208
    const viewportPadding = 16
    const spaceRight = window.innerWidth - triggerRect.left - viewportPadding
    const spaceLeft = triggerRect.right - viewportPadding

    setDropdownAlign(
      spaceRight >= dropdownWidth || spaceRight >= spaceLeft ? 'left' : 'right'
    )
  }, [])

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

  useEffect(() => {
    if (!isOpen) {
      return
    }

    updateDropdownAlignment()
    window.addEventListener('resize', updateDropdownAlignment)

    return () => {
      window.removeEventListener('resize', updateDropdownAlignment)
    }
  }, [isOpen, updateDropdownAlignment])

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

  const toggleDropdown = () => {
    setIsOpen((currentIsOpen) => {
      const nextIsOpen = !currentIsOpen

      if (nextIsOpen) {
        requestAnimationFrame(updateDropdownAlignment)
      }

      return nextIsOpen
    })
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
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
        <div
          className={`absolute top-full z-50 mt-3 w-52 max-w-[calc(100vw-2rem)] rounded-[1.5rem] border border-border/70 bg-popover/95 p-2 text-popover-foreground shadow-[0_24px_60px_-32px_hsl(var(--foreground)/0.5)] backdrop-blur-xl ${
            dropdownAlign === 'left' ? 'left-0' : 'right-0'
          }`}
        >
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
