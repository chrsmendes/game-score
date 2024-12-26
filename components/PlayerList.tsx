import { useState } from 'react'
import { Player } from '../app/types'
import { useLanguage } from './LanguageContext'
import PlayerHistory from './PlayerHistory'

interface PlayerListProps {
  players: Player[]
  addPlayer: (name: string) => void
  updateScore: (index: number, change: number) => void
  updatePlayerName: (index: number, newName: string) => void
  updateAllScores: (changes: number[]) => void
}

export default function PlayerList({
  players,
  addPlayer,
  updateScore,
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
    <div className="space-y-6">
      <form
        onSubmit={handleAddPlayer}
        className="flex flex-col md:flex-row items-center gap-2"
      >
        <input
          type="text"
          value={newPlayerName}
          onChange={(e) => setNewPlayerName(e.target.value)}
          placeholder={t('playerOrTeam')}
          className="input flex-grow w-full md:w-auto"
        />
        <button type="submit" className="btn btn-primary w-full md:w-auto">
          {t('addPlayerOrTeam')}
        </button>
      </form>
      <ul className="space-y-4">
        {players.map((player, index) => (
          <PlayerItem
            key={index}
            player={player}
            updateScore={(points) => updateScore(index, points)}
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
        <div className="flex justify-end">
          <button onClick={handleUpdateAllScores} className="btn btn-secondary">
            {t('updateAllScores')}
          </button>
        </div>
      )}
    </div>
  )
}

interface PlayerItemProps {
  player: Player
  updateScore: (points: number) => void
  updatePlayerName: (newName: string) => void
  roundPoints: string
  setRoundPoints: (points: string) => void
}

function PlayerItem({
  player,
  updateScore,
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

  return (
    <li className="bg-card p-4 rounded-lg shadow">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="input"
            />
            <button onClick={handleNameEdit} className="btn btn-primary">
              {t('save')}
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold">
              {player.name}:{' '}
              {player.score % 1 === 0 ? player.score : player.score.toFixed(2)}
            </span>
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-500 hover:underline"
            >
              {t('edit')}
            </button>
          </div>
        )}
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={roundPoints}
            onChange={(e) => setRoundPoints(e.target.value)}
            className="input w-20"
            placeholder="0"
            step="any"
          />
        </div>
      </div>
      <div className="mt-2">
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="text-blue-500 hover:underline"
        >
          {showHistory ? t('hideHistory') : t('showHistory')}
        </button>
      </div>
      {showHistory && <PlayerHistory history={player.history} />}
    </li>
  )
}
