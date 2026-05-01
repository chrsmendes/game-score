import { Player } from '../app/types'
import { useLanguage } from './LanguageContext'
import { Medal } from 'lucide-react'

export default function ScoreBoard({ players }: { players: Player[] }) {
  const { t } = useLanguage()
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
    <div className="min-w-0 space-y-4">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <span className="section-label">{t('scoreboard')}</span>
          <h2 className="break-words text-2xl font-semibold tracking-[-0.05em]">
            {t('scoreboard')}
          </h2>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[1.2rem] bg-primary/10 text-primary">
          <Medal className="h-5 w-5" />
        </div>
      </div>

      <div className="min-w-0 overflow-x-auto rounded-[1.8rem] border border-border/70 bg-background/70">
        <table className="w-full border-separate border-spacing-0">
          <thead className="bg-muted/70 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">
                {t('position')}
              </th>
              <th className="px-4 py-3 text-left font-semibold">
                {t('player')}
              </th>
              <th className="px-4 py-3 text-right font-semibold">
                {t('score')}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr
                key={index}
                className={`transition-colors ${
                  index === 0 ? 'bg-primary/8' : 'bg-transparent'
                }`}
              >
                <td className="border-t border-border/60 px-4 py-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-card text-sm font-semibold">
                    {index + 1}
                  </span>
                </td>
                <td className="max-w-[10rem] break-words border-t border-border/60 px-4 py-3 font-medium">
                  {player.name}
                </td>
                <td className="border-t border-border/60 px-4 py-3 text-right font-mono font-semibold">
                  {player.score % 1 === 0
                    ? player.score
                    : player.score.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
