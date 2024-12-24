import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Globe } from 'lucide-react'

export default function LanguageSelector() {
  const { locale, setLocale } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const changeLanguage = (newLocale: 'pt' | 'en' | 'es') => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200"
        aria-label="Select language"
      >
        <Globe size={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
          <button
            className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 w-full text-left ${
              locale === 'pt' ? 'font-bold' : ''
            }`}
            onClick={() => changeLanguage('pt')}
          >
            Português
          </button>
          <button
            className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 w-full text-left ${
              locale === 'en' ? 'font-bold' : ''
            }`}
            onClick={() => changeLanguage('en')}
          >
            English
          </button>
          <button
            className={`block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-gray-100 w-full text-left ${
              locale === 'es' ? 'font-bold' : ''
            }`}
            onClick={() => changeLanguage('es')}
          >
            Español
          </button>
        </div>
      )}
    </div>
  )
}

