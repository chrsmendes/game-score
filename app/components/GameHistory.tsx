import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GameRound } from '../types';

interface GameHistoryProps {
  history: GameRound[];
  onClose: () => void;
}

export default function GameHistory({ history, onClose }: GameHistoryProps) {
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">{t('gameHistory')}</h2>
        {history.length === 0 ? (
          <p>{t('noGameHistory')}</p>
        ) : (
          <div className="space-y-4">
            {history.map((round) => (
              <div key={round.id} className="border p-4 rounded-lg">
                <h3 className="font-bold">{round.gameName}</h3>
                <p>{t('date')}: {new Date(round.date).toLocaleString()}</p>
                <p>{t('targetScore')}: {round.targetScore}</p>
                <p>{t('winner')}: {round.winner || t('noWinner')}</p>
                <h4 className="font-semibold mt-2">{t('players')}:</h4>
                <ul>
                  {round.players.map((player, index) => (
                    <li key={index}>
                      {player.name}: {player.score} {t('points')}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {t('close')}
        </button>
      </div>
    </div>
  );
}

