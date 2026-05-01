import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { PartyPopper, RotateCcw, Target, Trophy, X } from 'lucide-react'
import { useLanguage } from './LanguageContext'

interface ConfettiProps {
  winner: string
  onClose: () => void
  onChangeTarget: () => void
  onNewGame: () => void
}

export default function Confetti({
  winner,
  onClose,
  onChangeTarget,
  onNewGame,
}: ConfettiProps) {
  const { t } = useLanguage()
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  })

  const detectSize = () => {
    setWindowDimension({
      width: window.innerWidth,
      height: window.innerHeight,
    })
  }

  useEffect(() => {
    detectSize()
    window.addEventListener('resize', detectSize)

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)

    return () => {
      window.removeEventListener('resize', detectSize)
      window.removeEventListener('keydown', handleEsc)
    }
  }, [onClose])

  return (
    <>
      <ReactConfetti
        width={windowDimension.width}
        height={windowDimension.height}
        recycle={false}
        numberOfPieces={200}
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 py-6 backdrop-blur-sm"
        onClick={onClose}
      >
        <div
          className="surface-panel relative w-full max-w-md overflow-hidden p-8 text-center"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_hsl(var(--accent)/0.34),_transparent_72%)]" />
          <div className="relative space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary text-primary-foreground shadow-lg shadow-primary/25">
              <PartyPopper className="h-7 w-7" />
            </div>
            <div className="space-y-3">
              <span className="section-label justify-center">
                <Trophy className="h-3.5 w-3.5" />
                {t('congratulations')}
              </span>
              <h2 className="text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
                {winner}
              </h2>
              <p className="text-base leading-7 text-muted-foreground md:text-lg">
                {t('playerWon', { player: winner })}
              </p>
            </div>
            <div className="space-y-3">
              <button
                type="button"
                onClick={onChangeTarget}
                className="btn btn-primary w-full"
              >
                <Target className="h-4 w-4" />
                {t('changeTarget')}
              </button>
              <button
                type="button"
                onClick={onNewGame}
                className="btn btn-secondary w-full"
              >
                <RotateCcw className="h-4 w-4" />
                {t('newGame')}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn btn-danger w-full"
              >
                <X className="h-4 w-4" />
                {t('close')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
