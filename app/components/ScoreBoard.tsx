import { Player } from '../types'
import { useLanguage } from '../contexts/LanguageContext'

export default function ScoreBoard({ players }: { players: Player[] }) {
  const { t } = useLanguage()
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{t('scoreboard')}</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">{t('position')}</th>
              <th className="p-2 text-left">{t('player')}</th>
              <th className="p-2 text-left">{t('score')}</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((player, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{player.name}</td>
                <td className="p-2">{player.score % 1 === 0 ? player.score : player.score.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

