import { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'
import { useLanguage } from '../contexts/LanguageContext'

interface ConfettiProps {
  winner: string;
  onClose: () => void;
  onChangeTarget: () => void;
  onNewGame: () => void;
}

export default function Confetti({ winner, onClose, onChangeTarget, onNewGame }: ConfettiProps) {
  const { t } = useLanguage()
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 })

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
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        onClick={onClose}
      >
        <div 
          className="bg-white text-center p-8 rounded-lg shadow-lg max-w-sm w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-600">{t('congratulations')}</h2>
          <p className="text-xl md:text-2xl mb-6">{t('playerWon', { player: winner })}</p>
          <div className="space-y-4">
            <button onClick={onChangeTarget} className="btn btn-primary w-full">
              {t('changeTarget')}
            </button>
            <button onClick={onNewGame} className="btn btn-secondary w-full">
              {t('newGame')}
            </button>
            <button onClick={onClose} className="btn btn-danger w-full">
              {t('close')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

