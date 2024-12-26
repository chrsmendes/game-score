'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import GameSetup from '../components/GameSetup'
import PlayerList from '../components/PlayerList'
import ScoreBoard from '../components/ScoreBoard'
import Confetti from '../components/Confetti'
import CookieMessage from '../components/CookieMessage'
import LanguageSelector from '../components/LanguageSelector'
import GameHistory from '../components/GameHistory'
import Footer from '../components/Footer'
import ThemeSwitcher from '../components/ThemeSwitcher'
import { LanguageProvider, useLanguage } from '../components/LanguageContext'
import { Player, GameState, GameRound } from './types'

// Ensure winner is always string | null
const initialState: GameState = {
  gameName: '',
  targetScore: 0,
  initialPoints: 0,
  players: [],
  winner: null,
}

function GameWithSearchParams() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      const sharedState = searchParams?.get('state')
      if (sharedState) {
        try {
          return JSON.parse(atob(sharedState))
        } catch (error) {
          console.error('Failed to parse shared state:', error)
        }
      }
      const saved = localStorage.getItem('gameState')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return initialState
  })

  const [showSetup, setShowSetup] = useState(false)
  const [showTargetScoreUpdate, setShowTargetScoreUpdate] = useState(false)
  const [shareLink, setShareLink] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const [gameHistory, setGameHistory] = useState<GameRound[]>([])

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState))
  }, [gameState])

  useEffect(() => {
    const savedHistory = localStorage.getItem('gameHistory')
    if (savedHistory) {
      setGameHistory(JSON.parse(savedHistory))
    }
  }, [])

  const addPlayer = (name: string) => {
    setGameState((prev) => ({
      ...prev,
      players: [
        ...prev.players,
        { name, score: prev.initialPoints, history: [] },
      ],
    }))
  }

  const updateScore = (index: number, points: number) => {
    setGameState((prev) => {
      const newPlayers = [...prev.players]
      newPlayers[index].score = parseFloat(
        (newPlayers[index].score + points).toFixed(2)
      )
      newPlayers[index].history.push({ points, timestamp: Date.now() })
      const highestScore = Math.max(...newPlayers.map((p) => p.score))
      const winner =
        prev.targetScore > 0 && highestScore >= prev.targetScore
          ? newPlayers.find((p) => p.score === highestScore)?.name || null
          : null

      if (winner) {
        saveGameRound({ ...prev, players: newPlayers, winner })
      }

      return { ...prev, players: newPlayers, winner }
    })
  }

  const updateAllScores = (changes: number[]) => {
    setGameState((prev) => {
      const newPlayers = prev.players.map((player, index) => ({
        ...player,
        score: parseFloat((player.score + changes[index]).toFixed(2)),
        history: [
          ...player.history,
          { points: changes[index], timestamp: Date.now() },
        ],
      }))
      const highestScore = Math.max(...newPlayers.map((p) => p.score))
      const winner =
        prev.targetScore > 0 && highestScore >= prev.targetScore
          ? newPlayers.find((p) => p.score === highestScore)?.name || null
          : null

      if (winner) {
        saveGameRound({ ...prev, players: newPlayers, winner })
      }

      return { ...prev, players: newPlayers, winner }
    })
  }

  const updatePlayerName = (index: number, newName: string) => {
    setGameState((prev) => {
      const newPlayers = [...prev.players]
      newPlayers[index].name = newName
      return { ...prev, players: newPlayers }
    })
  }

  const resetGame = () => {
    setGameState({
      gameName: '',
      targetScore: 0,
      initialPoints: 0,
      players: [],
      winner: null,
    })
  }

  const changeTarget = () => {
    setShowTargetScoreUpdate(true)
  }

  const closeWinnerMessage = () => {
    setGameState((prev) => ({ ...prev, winner: null }))
  }

  const generateShareLink = () => {
    const encodedState = btoa(JSON.stringify(gameState))
    const link = `${window.location.origin}?state=${encodedState}`
    setShareLink(link)
  }

  const copyShareLink = () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => alert(t('linkCopied')))
      .catch((err) => console.error('Failed to copy link:', err))
  }

  const saveGameRound = (state: GameState) => {
    const newRound: GameRound = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      gameName: state.gameName,
      targetScore: state.targetScore,
      initialPoints: state.initialPoints,
      players: state.players,
      winner: state.winner,
    }

    const updatedHistory = [newRound, ...gameHistory].slice(0, 10) // Keep only the last 10 games
    setGameHistory(updatedHistory)
    localStorage.setItem('gameHistory', JSON.stringify(updatedHistory))
  }

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-4xl mx-auto relative">
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <ThemeSwitcher />
        <LanguageSelector />
      </div>
      <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 md:p-8 mt-12">
        {!gameState.gameName || showSetup ? (
          <>
            <GameSetup
              setGameState={(newState) => {
                setGameState((prev) => ({ ...prev, ...newState, winner: null }))
                setShowSetup(false)
              }}
              initialState={gameState}
            />
            <button
              onClick={toggleHistory}
              className="mt-4 btn btn-secondary w-full"
            >
              {t('viewGameHistory')}
            </button>
          </>
        ) : showTargetScoreUpdate ? (
          <GameSetup
            setGameState={(newState) => {
              setGameState((prev) => ({ ...prev, ...newState, winner: null }))
              setShowTargetScoreUpdate(false)
            }}
            initialState={gameState}
            isUpdating={true}
          />
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              {gameState.gameName}
            </h1>
            <p className="mb-6 text-xl text-center">
              {t('targetScore')}:{' '}
              {gameState.targetScore > 0
                ? gameState.targetScore % 1 === 0
                  ? gameState.targetScore
                  : gameState.targetScore.toFixed(2)
                : t('noTargetScore')}
            </p>
            <p className="mb-6 text-xl text-center">
              {t('initialPoints')}:{' '}
              {gameState.initialPoints % 1 === 0
                ? gameState.initialPoints
                : gameState?.initialPoints?.toFixed(2)}
            </p>
            <PlayerList
              players={gameState.players}
              addPlayer={addPlayer}
              updateScore={updateScore}
              updatePlayerName={updatePlayerName}
              updateAllScores={updateAllScores}
            />
            <ScoreBoard players={gameState.players} />
            <div className="mt-8 flex flex-col items-center gap-4">
              <button
                onClick={changeTarget}
                className="btn btn-secondary w-full"
              >
                {t('changeTargetScore')}
              </button>
              <button onClick={resetGame} className="btn btn-danger w-full">
                {t('restartGame')}
              </button>
              <button
                onClick={generateShareLink}
                className="btn btn-primary w-full"
              >
                {t('generateShareLink')}
              </button>
              <button
                onClick={toggleHistory}
                className="btn btn-secondary w-full"
              >
                {t('viewGameHistory')}
              </button>
              {shareLink && (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={shareLink}
                    readOnly
                    className="input flex-grow"
                  />
                  <button onClick={copyShareLink} className="btn btn-secondary">
                    {t('copy')}
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {gameState.winner && (
        <Confetti
          winner={gameState.winner}
          onClose={closeWinnerMessage}
          onChangeTarget={changeTarget}
          onNewGame={resetGame}
        />
      )}
      {showHistory && (
        <GameHistory
          history={gameHistory}
          onClose={() => setShowHistory(false)}
          onDelete={(id) => {
            const updatedHistory = gameHistory.filter(
              (round) => round.id !== id
            )
            setGameHistory(updatedHistory)
            localStorage.setItem('gameHistory', JSON.stringify(updatedHistory))
          }}
        />
      )}
      <CookieMessage />
      <Footer />
    </main>
  )
}

export default function Home() {
  return (
    <LanguageProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <GameWithSearchParams />
      </Suspense>
    </LanguageProvider>
  )
}
