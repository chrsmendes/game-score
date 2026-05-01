import { useState } from 'react'
import { Player } from '../app/types'
import { useLanguage } from './LanguageContext'
import PlayerHistory from './PlayerHistory'
import { ArrowUpDown, PencilLine, Plus, Save } from 'lucide-react'

interface PlayerListProps {
  players: Player[]
  addPlayer: (name: string) => void
  updatePlayerName: (index: number, newName: string) => void
  updateAllScores: (changes: number[]) => void
}

export default function PlayerList({
  players,
  addPlayer,
  updatePlayerName,
  updateAllScores,
}: PlayerListProps) {
  const { t } = useLanguage()
  const [newPlayerName, setNewPlayerName] = useState('')
  const [roundPoints, setRoundPoints] = useState<string[]>(
    players.map(() => '')
  )

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPlayerName) {
      addPlayer(newPlayerName)
      setNewPlayerName('')
      setRoundPoints([...roundPoints, ''])
    }
  }

  const handleUpdateAllScores = () => {
    updateAllScores(
      roundPoints.map((points) => (points === '' ? 0 : parseFloat(points)))
    )
    setRoundPoints(players.map(() => ''))
  }

  return (
    <div className="min-w-0 space-y-6">
      <form
        onSubmit={handleAddPlayer}
        className="min-w-0 rounded-[1.8rem] border border-border/70 bg-background/60 p-3 backdrop-blur sm:p-4"
      >
        <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-center">
          <input
            type="text"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder={t('playerOrTeam')}
            className="input min-w-0 flex-grow"
          />
          <button
            type="submit"
            className="btn btn-primary w-full whitespace-normal md:w-auto"
          >
            <Plus className="h-4 w-4" />
            {t('addPlayerOrTeam')}
          </button>
        </div>
      </form>
      <ul className="grid min-w-0 gap-4">
        {players.map((player, index) => (
          <PlayerItem
            key={index}
            player={player}
            updatePlayerName={(newName) => updatePlayerName(index, newName)}
            roundPoints={roundPoints[index]}
            setRoundPoints={(points) => {
              const newRoundPoints = [...roundPoints]
              newRoundPoints[index] = points
              setRoundPoints(newRoundPoints)
            }}
          />
        ))}
      </ul>
      {players.length > 0 && (
        <div className="flex">
          <button
            type="button"
            onClick={handleUpdateAllScores}
            className="btn btn-success w-full"
          >
            <ArrowUpDown className="h-4 w-4" />
            {t('updateAllScores')}
          </button>
        </div>
      )}
    </div>
  )
}

interface PlayerItemProps {
  player: Player
  updatePlayerName: (newName: string) => void
  roundPoints: string
  setRoundPoints: (points: string) => void
}

function PlayerItem({
  player,
  updatePlayerName,
  roundPoints,
  setRoundPoints,
}: PlayerItemProps) {
  const [showHistory, setShowHistory] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(player.name)
  const { t } = useLanguage()

  const handleNameEdit = () => {
    updatePlayerName(editedName)
    setIsEditing(false)
  }

  const formattedScore =
    player.score % 1 === 0 ? player.score : player.score.toFixed(2)

  return (
    <li className="min-w-0 rounded-[1.8rem] border border-border/70 bg-background/70 p-4 shadow-sm backdrop-blur sm:p-5">
      <div className="flex min-w-0 flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        {isEditing ? (
          <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="input"
            />
            <button
              type="button"
              onClick={handleNameEdit}
              className="btn btn-primary sm:w-auto"
            >
              <Save className="h-4 w-4" />
              {t('save')}
            </button>
          </div>
        ) : (
          <div className="min-w-0 space-y-3">
            <span className="section-label">{t('player')}</span>
            <div className="flex flex-wrap items-center gap-3">
              <span className="min-w-0 break-words text-2xl font-semibold tracking-[-0.04em]">
                {player.name}
              </span>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="ghost-link inline-flex items-center gap-2"
              >
                <PencilLine className="h-4 w-4" />
                {t('edit')}
              </button>
            </div>
            <p className="font-mono text-3xl font-semibold text-foreground">
              {formattedScore}
            </p>
          </div>
        )}

        <div className="flex w-full min-w-0 max-w-sm flex-col gap-4">
          <div className="rounded-[1.5rem] border border-border/70 bg-card/80 p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {t('score')}
              </span>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                +/-
              </span>
            </div>
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (roundPoints !== '') {
                    const num = parseFloat(roundPoints)
                    if (!isNaN(num) && num !== 0) {
                      setRoundPoints(String(-num))
                    }
                  }
                }}
                className="btn btn-secondary h-12 min-w-12 px-0"
                aria-label="Toggle sign"
              >
                +/-
              </button>
              <input
                type="number"
                value={roundPoints}
                onChange={(e) => setRoundPoints(e.target.value)}
                className="input h-12 min-w-0 text-center font-mono text-lg"
                placeholder="0"
                step="any"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="ghost-link self-start"
          >
            {showHistory ? t('hideHistory') : t('showHistory')}
          </button>
        </div>
      </div>

      {showHistory && (
        <div className="mt-5 border-t border-border/70 pt-5">
          <PlayerHistory history={player.history} />
        </div>
      )}
    </li>
  )
}
