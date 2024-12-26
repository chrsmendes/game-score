import { useState } from 'react'
import { useLanguage } from './LanguageContext'
import { Info } from 'lucide-react'

export default function Footer() {
  const { t } = useLanguage()
  const [showChangelog, setShowChangelog] = useState(false)

  return (
    <footer className="mt-8 text-center text-sm text-gray-500">
      <div className="flex justify-center items-center space-x-2">
        <p>Game Score v0.34 ({t('beta')})</p>
        <button
          onClick={() => setShowChangelog(!showChangelog)}
          className="text-blue-500 hover:text-blue-600"
          aria-label="Show changelog"
        >
          <Info size={16} />
        </button>
      </div>
      {showChangelog && (
        <div className="mt-2 p-2 bg-gray-100 rounded-md">
          <h3 className="font-bold">v0.34 Changelog:</h3>
          <ul className="list-disc list-inside">
            <li>Improved dark mode contrast for player list items</li>
          </ul>
          <h4 className="font-semibold mt-2">Previous updates:</h4>
          <ul className="list-disc list-inside">
            <li>Cookie message now appears only once</li>
            <li>Added theme switcher (system/dark/light)</li>
            <li>Improved PWA functionality</li>
            <li>Various bug fixes and performance improvements</li>
          </ul>
        </div>
      )}
    </footer>
  )
}
