import { useCallback, useEffect, useRef, useState } from 'react'
import { useLanguage } from './LanguageContext'
import { Check, ChevronDown, Globe2 } from 'lucide-react'

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
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

  const toggleDropdown = () => {
    setIsOpen((currentIsOpen) => {
      const nextIsOpen = !currentIsOpen

      if (nextIsOpen) {
        requestAnimationFrame(updateDropdownAlignment)
      }

      return nextIsOpen
    })
  }

  const changeLanguage = (newLocale: 'pt' | 'en' | 'es') => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
    setIsOpen(false)
  }

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

  const languages = [
    { value: 'pt', label: 'Português' },
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
  ] as const

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        className="btn btn-secondary min-w-[9.5rem] justify-between px-4 py-3"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <Globe2 className="h-4 w-4" />
          <span className="uppercase">{locale}</span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div
          className={`absolute top-full z-50 mt-3 w-52 max-w-[calc(100vw-2rem)] rounded-[1.5rem] border border-border/70 bg-popover/95 p-2 text-popover-foreground shadow-[0_24px_60px_-32px_hsl(var(--foreground)/0.5)] backdrop-blur-xl ${
            dropdownAlign === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          {languages.map((language) => (
            <button
              key={language.value}
              type="button"
              className={`flex w-full items-center justify-between rounded-[1rem] px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                locale === language.value
                  ? 'bg-primary text-primary-foreground'
                  : 'text-popover-foreground hover:bg-accent/15'
              }`}
              onClick={() => changeLanguage(language.value)}
            >
              <span>{language.label}</span>
              {locale === language.value && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
