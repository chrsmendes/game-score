'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'
import pt from '../locales/pt'
import en from '../locales/en'
import es from '../locales/es'

type Locale = 'pt' | 'en' | 'es'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

const translations = { pt, en, es }

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale
    if (savedLocale && Object.keys(translations).includes(savedLocale)) {
      setLocale(savedLocale)
    } else {
      const browserLocale = navigator.language.split('-')[0] as Locale
      const defaultLocale = Object.keys(translations).includes(browserLocale) ? browserLocale : 'en'
      setLocale(defaultLocale)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('locale', locale)
  }, [locale])

  const t = (key: string, params?: Record<string, string>) => {
    let translation = translations[locale][key] || key
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{${param}}`, value)
      })
    }
    return translation
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

