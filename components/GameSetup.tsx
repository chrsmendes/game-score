import { useState, useEffect } from 'react'
import { GameState } from '../app/types'
import { useLanguage } from './LanguageContext'

interface GameSetupProps {
  setGameState: (state: Partial<GameState>) => void
  initialState: GameState
  isUpdating?: boolean
}

export default function GameSetup({
  setGameState,
  initialState,
  isUpdating = false,
}: GameSetupProps) {
  const { t } = useLanguage()
  const [gameName, setGameName] = useState(initialState.gameName)
  const [targetScore, setTargetScore] = useState(
    initialState.targetScore ? initialState.targetScore.toString() : ''
  )
  const [initialPoints, setInitialPoints] = useState(
    initialState.initialPoints ? initialState.initialPoints.toString() : ''
  )

  useEffect(() => {
    setGameName(initialState.gameName)
    setTargetScore(
      initialState.targetScore ? initialState.targetScore.toString() : ''
    )
    setInitialPoints(
      initialState.initialPoints ? initialState.initialPoints.toString() : ''
    )
  }, [initialState])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGameState({
      gameName,
      targetScore: targetScore === '' ? 0 : parseFloat(targetScore),
      initialPoints: initialPoints === '' ? 0 : parseFloat(initialPoints),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!isUpdating && (
        <div>
          <label htmlFor="gameName" className="block mb-2 text-xl">
            {t('gameName')}:
          </label>
          <input
            type="text"
            id="gameName"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
            className="input w-full"
          />
        </div>
      )}
      <div>
        <label htmlFor="targetScore" className="block mb-2 text-xl">
          {t('targetScore')}:
        </label>
        <input
          type="number"
          id="targetScore"
          value={targetScore}
          onChange={(e) => setTargetScore(e.target.value)}
          step="any"
          placeholder="0"
          className="input w-full"
        />
      </div>
      {!isUpdating && (
        <div>
          <label htmlFor="initialPoints" className="block mb-2 text-xl">
            {t('initialPoints')}:
          </label>
          <input
            type="number"
            id="initialPoints"
            value={initialPoints}
            onChange={(e) => setInitialPoints(e.target.value)}
            step="any"
            placeholder="0"
            className="input w-full"
          />
        </div>
      )}
      <button type="submit" className="btn btn-primary w-full">
        {isUpdating
          ? t('updateTargetScore')
          : initialState.gameName
          ? t('updateGame')
          : t('startGame')}
      </button>
    </form>
  )
}
