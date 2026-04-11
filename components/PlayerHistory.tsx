import { useLanguage } from './LanguageContext'

interface PlayerHistoryProps {
  history: { points: number; timestamp: number }[]
}

export default function PlayerHistory({ history }: PlayerHistoryProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {t('pointHistory')}
      </h3>
      <ul className="grid max-h-48 gap-2 overflow-y-auto pr-1">
        {history
          .slice()
          .reverse()
          .map((entry, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-[1.1rem] border border-border/60 bg-card/70 px-3 py-2 text-sm"
            >
              <span className="text-muted-foreground">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
              <span className="font-mono font-semibold">
                {entry.points > 0 ? '+' : ''}
                {entry.points}
              </span>
            </li>
          ))}
      </ul>
    </div>
  )
}
