import React from 'react'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { LanguageProvider } from '../components/LanguageContext'

export function renderWithLanguage(ui: ReactElement) {
  localStorage.setItem('locale', 'en')

  return render(<LanguageProvider>{ui}</LanguageProvider>)
}
