import { useState, useEffect } from 'react'
import { GameState } from '../app/types'
import { useLanguage } from './LanguageContext'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Gamepad2, Info, Sparkles, Target } from 'lucide-react'

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

  const renderTooltip = (content: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            className="rounded-full border border-border/70 bg-background/70 p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={content}
          >
            <Info className="h-3.5 w-3.5" />
          </button>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs rounded-2xl border border-border/70 bg-popover/95 px-3 py-2 text-xs leading-5 text-popover-foreground shadow-lg backdrop-blur-xl">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {!isUpdating && (
        <div className="space-y-2">
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <label
              htmlFor="gameName"
              className="inline-flex items-center gap-2"
            >
              <Gamepad2 className="h-4 w-4" />
              {t('gameName')}
            </label>
            {renderTooltip(t('gameNameTooltip'))}
          </div>
          <input
            type="text"
            id="gameName"
            value={gameName}
            onChange={(e) => setGameName(e.target.value)}
            required
            className="input"
          />
        </div>
      )}
      <div className={`grid gap-5 ${isUpdating ? '' : 'md:grid-cols-2'}`}>
        <div className="space-y-2">
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            <label
              htmlFor="targetScore"
              className="inline-flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              {t('targetScore')}
            </label>
            {renderTooltip(t('targetScoreTooltip'))}
          </div>
          <input
            type="number"
            id="targetScore"
            value={targetScore}
            onChange={(e) => setTargetScore(e.target.value)}
            step="any"
            placeholder="0"
            className="input"
          />
        </div>
        {!isUpdating && (
          <div className="space-y-2">
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              <label
                htmlFor="initialPoints"
                className="inline-flex items-center gap-2"
              >
                <Sparkles className="h-4 w-4" />
                {t('initialPoints')}
              </label>
              {renderTooltip(t('initialPointsTooltip'))}
            </div>
            <input
              type="number"
              id="initialPoints"
              value={initialPoints}
              onChange={(e) => setInitialPoints(e.target.value)}
              step="any"
              placeholder="0"
              className="input"
            />
          </div>
        )}
      </div>
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
