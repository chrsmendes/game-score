import { useState, useEffect } from 'react'
import { useLanguage } from './LanguageContext'
import { Info, Github } from 'lucide-react'
import Changelog from './Changelog/Changelog'
import { marked } from 'marked'

export default function Footer() {
  const { t } = useLanguage()
  const [showChangelog, setShowChangelog] = useState(false)
  const [version, setVersion] = useState('')
  const [changelog, setChangelog] = useState('')
  const [error, setError] = useState(false)
  const urlReleaseInfo =
    'https://api.github.com/repos/chrsmendes/game-score/releases/latest'

  useEffect(() => {
    const fetchReleaseInfo = async () => {
      try {
        const response = await fetch(urlReleaseInfo)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const changelogHtml = marked(data.body) as string
        const releaseInfo = {
          version: data.tag_name,
          changelog: changelogHtml,
          timestamp: new Date().getTime(),
        }
        localStorage.setItem('releaseInfo', JSON.stringify(releaseInfo))
        setVersion(data.tag_name)
        setChangelog(changelogHtml)
      } catch (error) {
        console.error('Failed to fetch release info:', error)
        setError(true)
      }
    }

    const releaseInfo = localStorage.getItem('releaseInfo')
    if (releaseInfo) {
      const { version, changelog, timestamp } = JSON.parse(releaseInfo)
      const oneDay = 24 * 60 * 60 * 1000
      if (new Date().getTime() - timestamp < oneDay) {
        setVersion(version)
        setChangelog(changelog)
        return
      }
    }

    fetchReleaseInfo()
  }, [])

  return (
    <footer className="mt-8 text-sm">
      <div className="flex justify-center items-center space-x-2 text-center">
        <p>
          Game Score {version} ({t('beta')})
        </p>
        <button
          onClick={() => setShowChangelog(!showChangelog)}
          className="text-blue-500 hover:text-blue-600"
          aria-label="Show changelog"
        >
          <Info size={16} />
        </button>
        <a
          href="https://github.com/chrsmendes/game-score"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-600"
          aria-label="GitHub Repository"
        >
          <Github size={16} />
        </a>
      </div>
      {showChangelog &&
        (error ? (
          <div className="mt-2 p-2 shadow-lg rounded-lg">
            <p className="text-center text-red-500">
              Failed to load changelog. Please try again later.
            </p>
          </div>
        ) : (
          <Changelog
            version={version}
            changelog={changelog}
            urlReleaseInfo={urlReleaseInfo}
          />
        ))}
    </footer>
  )
}
