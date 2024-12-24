import { useLanguage } from '../contexts/LanguageContext'

interface PlayerHistoryProps {
  history: { points: number; timestamp: number }[]
}

export default function PlayerHistory({ history }: PlayerHistoryProps) {
  const { t } = useLanguage()

  return (
    <div className="mt-4">
      <h3 className="font-bold mb-2">{t('pointHistory')}</h3>
      <ul className="space-y-1 max-h-40 overflow-y-auto">
        {history.slice().reverse().map((entry, index) => (
          <li key={index} className="text-sm">
            {new Date(entry.timestamp).toLocaleString()}: {entry.points > 0 ? '+' : ''}{entry.points}
          </li>
        ))}
      </ul>
    </div>
  )
}

