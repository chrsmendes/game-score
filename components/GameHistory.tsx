import React, { useState } from 'react'
import { useLanguage } from './LanguageContext'
import { GameRound } from '../app/types'
import { Copy, Check, Trash2 } from 'lucide-react'

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
      .catch((err) => console.error('Failed to copy link:', err))
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-white text-black dark:text-black p-6 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">{t('gameHistory')}</h2>
        {history.length === 0 ? (
          <p>{t('noGameHistory')}</p>
        ) : (
          <div className="space-y-4">
            {history.map((round) => (
              <div
                key={round.id}
                className="border border-gray-200 dark:border-gray-600 p-4 rounded-lg relative"
              >
                <div
                  className="cursor-pointer"
                  onClick={() => copyShareLink(round)}
                >
                  <h3 className="font-bold">{round.gameName}</h3>
                  <p>
                    {t('date')}: {new Date(round.date).toLocaleString()}
                  </p>
                  <p>
                    {t('targetScore')}: {round.targetScore}
                  </p>
                  <p>
                    {t('winner')}: {round.winner || t('noWinner')}
                  </p>
                  <h4 className="font-semibold mt-2">{t('players')}:</h4>
                  <ul>
                    {round.players.map((player, index) => (
                      <li key={index}>
                        {player.name}: {player.score} {t('points')}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="absolute top-2 right-2 flex space-x-2">
                  {copiedId === round.id ? (
                    <Check className="text-green-500" size={20} />
                  ) : (
                    <Copy className="text-gray-500" size={20} />
                  )}
                  <button
                    onClick={() => onDelete(round.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={t('deleteHistory')}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            <p className="text-sm text-gray-500 mt-4">
              {t('clickToShareGame')}
            </p>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white dark:bg-blue-600 dark:text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-700"
        >
          {t('close')}
        </button>
      </div>
    </div>
  )
}
