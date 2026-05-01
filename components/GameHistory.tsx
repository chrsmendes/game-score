import { useState } from 'react'
import { useLanguage } from './LanguageContext'
import { GameRound } from '../app/types'
import { Check, Copy, History, Trash2, Trophy } from 'lucide-react'

interface GameHistoryProps {
  history: GameRound[]
  onClose: () => void
  onDelete: (id: string) => void
}

export default function GameHistory({
  history,
  onClose,
  onDelete,
}: GameHistoryProps) {
  const { t } = useLanguage()
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyShareLink = (round: GameRound) => {
    const encodedState = btoa(JSON.stringify(round))
    const link = `${window.location.origin}?state=${encodedState}`
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopiedId(round.id)
        setTimeout(() => setCopiedId(null), 2000)
      })
      .catch((error) => console.error('Failed to copy link:', error))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="surface-panel max-h-[90vh] w-full max-w-4xl overflow-y-auto p-5 sm:p-6"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-3">
              <span className="section-label">
                <History className="h-3.5 w-3.5" />
                {t('gameHistory')}
              </span>
              <h2 className="text-3xl font-semibold tracking-[-0.05em]">
                {t('gameHistory')}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary"
            >
              {t('close')}
            </button>
          </div>

          {history.length === 0 ? (
            <div className="metric-card">
              <p className="text-sm leading-6 text-muted-foreground">
                {t('noGameHistory')}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((round) => (
                <div
                  key={round.id}
                  className="rounded-[1.8rem] border border-border/70 bg-background/75 p-4 shadow-sm backdrop-blur sm:p-5"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1 space-y-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-[1.1rem] bg-primary/10 text-primary">
                          <Trophy className="h-5 w-5" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="text-xl font-semibold tracking-[-0.04em]">
                            {round.gameName}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(round.date).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="metric-card p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {t('targetScore')}
                          </p>
                          <p className="mt-2 font-mono text-lg font-semibold">
                            {round.targetScore}
                          </p>
                        </div>
                        <div className="metric-card p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {t('winner')}
                          </p>
                          <p className="mt-2 text-lg font-semibold">
                            {round.winner || t('noWinner')}
                          </p>
                        </div>
                        <div className="metric-card p-3">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                            {t('players')}
                          </p>
                          <p className="mt-2 font-mono text-lg font-semibold">
                            {round.players.length}
                          </p>
                        </div>
                      </div>

                      <ul className="grid gap-2 sm:grid-cols-2">
                        {round.players.map((player, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between rounded-[1.1rem] border border-border/60 bg-card/65 px-3 py-2 text-sm"
                          >
                            <span>{player.name}</span>
                            <span className="font-mono font-semibold">
                              {player.score} {t('points')}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-2 sm:pl-4">
                      <button
                        type="button"
                        onClick={() => copyShareLink(round)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/75 transition-colors hover:bg-primary/10 hover:text-primary"
                        aria-label={`${t('clickToShareGame')}: ${round.gameName}`}
                      >
                        {copiedId === round.id ? (
                          <Check className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <Copy className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(round.id)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-destructive/30 bg-destructive/10 text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground"
                        aria-label={t('deleteHistory')}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <p className="text-sm leading-6 text-muted-foreground">
                {t('clickToShareGame')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
