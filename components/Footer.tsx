import { useState, useEffect } from 'react'
import { Github, Info, Sparkles } from 'lucide-react'
import { marked } from 'marked'
import { useLanguage } from './LanguageContext'
import Changelog from './Changelog/Changelog'

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
    <footer className="pb-6 text-sm">
      <div className="surface-panel px-5 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[1rem] bg-primary/10 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              <span className="font-semibold text-foreground">Game Score</span>{' '}
              {version} ({t('beta')})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowChangelog(!showChangelog)}
              className="btn btn-secondary h-11 px-4"
              aria-label="Show changelog"
            >
              <Info className="h-4 w-4" />
              {version || 'release'}
            </button>
            <a
              href="https://github.com/chrsmendes/game-score"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary h-11 px-4"
              aria-label="GitHub Repository"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
      {showChangelog &&
        (error ? (
          <div className="surface-panel mt-4 p-4">
            <p className="text-center text-sm text-destructive">
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
