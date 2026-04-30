'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Flag,
  History,
  Link2,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  Users,
} from 'lucide-react'
import GameSetup from '../components/GameSetup'
import PlayerList from '../components/PlayerList'
import ScoreBoard from '../components/ScoreBoard'
import Confetti from '../components/Confetti'
import CookieMessage from '../components/CookieMessage'
import LanguageSelector from '../components/LanguageSelector'
import GameHistory from '../components/GameHistory'
import Footer from '../components/Footer'
import ThemeSwitcher from '../components/ThemeSwitcher'
import ClientOnly from '../components/ClientOnly'
import { useLanguage } from '../components/LanguageContext'
import { GameRound, GameState } from './types'

const initialState: GameState = {
  gameName: '',
  targetScore: 0,
  initialPoints: 0,
  players: [],
  winner: null,
}

const formatScore = (value: number) =>
  value % 1 === 0 ? value.toString() : value.toFixed(2)

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
  const [copySuccess, setCopySuccess] = useState(false)

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
      const highestScore = Math.max(...newPlayers.map((player) => player.score))
      const winner =
        prev.targetScore > 0 && highestScore >= prev.targetScore
          ? newPlayers.find((player) => player.score === highestScore)?.name ||
            null
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
    setGameState(initialState)
    setShareLink('')
  }

  const finishGame = () => {
    saveGameRound(gameState)
    resetGame()
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
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
        setShareLink('')
      })
      .catch((error) => console.error('Failed to copy link:', error))
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

    setGameHistory((prev) => {
      const updatedHistory = [newRound, ...prev].slice(0, 10)
      localStorage.setItem('gameHistory', JSON.stringify(updatedHistory))
      return updatedHistory
    })
  }

  const toggleHistory = () => {
    setShowHistory(!showHistory)
  }

  const leader =
    gameState.players.length > 0
      ? [...gameState.players].sort((a, b) => b.score - a.score)[0]
      : null

  const gameSummary = [
    {
      icon: Target,
      label: t('targetScore'),
      value:
        gameState.targetScore > 0
          ? formatScore(gameState.targetScore)
          : t('noTargetScore'),
    },
    {
      icon: Sparkles,
      label: t('initialPoints'),
      value: formatScore(gameState.initialPoints),
    },
    {
      icon: Users,
      label: t('players'),
      value: gameState.players.length.toString().padStart(2, '0'),
    },
  ]

  const latestRounds = gameHistory.slice(0, 3)

  return (
    <main className="relative min-h-screen overflow-visible px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="surface-panel relative z-30 overflow-visible px-5 py-6 sm:px-6">
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_85%_50%,_hsl(var(--primary)/0.24),_transparent_58%)]" />
          <div className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1.4rem] bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                <Trophy className="h-6 w-6" />
              </div>
              <div className="space-y-3">
                <span className="section-label">Game Score</span>
                <div className="space-y-3">
                  <h1 className="text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
                    Game Score
                  </h1>
                  <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                    <span className="rounded-full border border-border/60 bg-background/55 px-3 py-1">
                      {t('scoreboard')}
                    </span>
                    <span className="rounded-full border border-border/60 bg-background/55 px-3 py-1">
                      {t('gameHistory')}
                    </span>
                    <span className="rounded-full border border-border/60 bg-background/55 px-3 py-1">
                      {t('generateShareLink')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <ThemeSwitcher />
              <LanguageSelector />
            </div>
          </div>
        </header>

        {!gameState.gameName || showSetup ? (
          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_360px]">
            <div className="surface-panel p-5 sm:p-6 lg:p-8">
              <div className="max-w-3xl space-y-6">
                <div className="space-y-4">
                  <span className="section-label">{t('startGame')}</span>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                      Game Score
                    </h2>
                    <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                      {t('gameName')} · {t('targetScore')} ·{' '}
                      {t('initialPoints')}
                    </p>
                  </div>
                </div>
                <GameSetup
                  setGameState={(newState) => {
                    setGameState((prev) => ({
                      ...prev,
                      ...newState,
                      winner: null,
                    }))
                    setShowSetup(false)
                  }}
                  initialState={gameState}
                />
                <button
                  type="button"
                  onClick={toggleHistory}
                  className="btn btn-secondary w-full"
                >
                  <History className="h-4 w-4" />
                  {t('viewGameHistory')}
                </button>
              </div>
            </div>

            <aside className="surface-panel relative overflow-hidden p-5 sm:p-6">
              <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,_hsl(var(--accent)/0.28),_transparent_70%)]" />
              <div className="relative space-y-5">
                <div className="space-y-3">
                  <span className="section-label">
                    <History className="h-3.5 w-3.5" />
                    {t('gameHistory')}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold tracking-[-0.05em]">
                      {t('gameHistory')}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {gameHistory.length > 0
                        ? `${gameHistory.length} ${t('gameHistory').toLowerCase()}`
                        : t('noGameHistory')}
                    </p>
                  </div>
                </div>

                {latestRounds.length > 0 ? (
                  <div className="space-y-3">
                    {latestRounds.map((round) => (
                      <div key={round.id} className="metric-card space-y-3">
                        <div className="flex items-center justify-between gap-3">
                          <p className="text-lg font-semibold leading-tight">
                            {round.gameName}
                          </p>
                          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                            {formatScore(round.targetScore)}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>
                            {t('winner')}: {round.winner || t('noWinner')}
                          </p>
                          <p>{new Date(round.date).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="metric-card">
                    <p className="text-sm leading-6 text-muted-foreground">
                      {t('noGameHistory')}
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={toggleHistory}
                  className="btn btn-primary w-full"
                >
                  <History className="h-4 w-4" />
                  {t('viewGameHistory')}
                </button>
              </div>
            </aside>
          </section>
        ) : showTargetScoreUpdate ? (
          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_360px]">
            <div className="surface-panel p-5 sm:p-6 lg:p-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <span className="section-label">
                    {t('changeTargetScore')}
                  </span>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                      {gameState.gameName}
                    </h2>
                    <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                      {t('targetScore')}:{' '}
                      {gameState.targetScore > 0
                        ? formatScore(gameState.targetScore)
                        : t('noTargetScore')}
                    </p>
                  </div>
                </div>
                <GameSetup
                  setGameState={(newState) => {
                    setGameState((prev) => ({
                      ...prev,
                      ...newState,
                      winner: null,
                    }))
                    setShowTargetScoreUpdate(false)
                  }}
                  initialState={gameState}
                  isUpdating={true}
                />
              </div>
            </div>

            <aside className="flex flex-col gap-6">
              <div className="surface-panel p-5 sm:p-6">
                <ScoreBoard players={gameState.players} />
              </div>
              <div className="surface-panel p-5 sm:p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <span className="section-label">{t('gameHistory')}</span>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {leader
                        ? `${leader.name}: ${formatScore(leader.score)}`
                        : `${t('players')}: ${gameState.players.length}`}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={toggleHistory}
                    className="btn btn-secondary w-full"
                  >
                    <History className="h-4 w-4" />
                    {t('viewGameHistory')}
                  </button>
                </div>
              </div>
            </aside>
          </section>
        ) : (
          <section className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_390px]">
            <div className="surface-panel p-5 sm:p-6 lg:p-8">
              <div className="space-y-8">
                <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,290px)]">
                  <div className="space-y-4">
                    <span className="section-label">{t('scoreboard')}</span>
                    <div className="space-y-3">
                      <h2 className="text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                        {gameState.gameName}
                      </h2>
                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5">
                          {t('targetScore')}:{' '}
                          {gameState.targetScore > 0
                            ? formatScore(gameState.targetScore)
                            : t('noTargetScore')}
                        </span>
                        <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5">
                          {t('initialPoints')}:{' '}
                          {formatScore(gameState.initialPoints)}
                        </span>
                        <span className="rounded-full border border-border/70 bg-background/60 px-3 py-1.5">
                          {t('players')}: {gameState.players.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                    {gameSummary.map((item) => (
                      <div key={item.label} className="metric-card space-y-3">
                        <div className="flex items-center justify-between text-muted-foreground">
                          <span className="text-xs font-semibold uppercase tracking-[0.2em]">
                            {item.label}
                          </span>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <p className="text-lg font-semibold leading-tight">
                          {item.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <PlayerList
                  players={gameState.players}
                  addPlayer={addPlayer}
                  updatePlayerName={updatePlayerName}
                  updateAllScores={updateAllScores}
                />
              </div>
            </div>

            <aside className="flex flex-col gap-6">
              <div className="surface-panel p-5 sm:p-6">
                <ScoreBoard players={gameState.players} />
              </div>

              <div className="surface-panel relative overflow-hidden p-5 sm:p-6">
                <div className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_hsl(var(--primary)/0.2),_transparent_70%)]" />
                <div className="relative space-y-5">
                  <div className="space-y-3">
                    <span className="section-label">
                      <Link2 className="h-3.5 w-3.5" />
                      {t('generateShareLink')}
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-semibold tracking-[-0.05em]">
                        {leader ? leader.name : gameState.gameName}
                      </h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {leader
                          ? `${formatScore(leader.score)} ${t('points')}`
                          : `${t('targetScore')}: ${
                              gameState.targetScore > 0
                                ? formatScore(gameState.targetScore)
                                : t('noTargetScore')
                            }`}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <button
                      type="button"
                      onClick={changeTarget}
                      className="btn btn-secondary w-full"
                    >
                      <Target className="h-4 w-4" />
                      {t('changeTargetScore')}
                    </button>
                    <button
                      type="button"
                      onClick={generateShareLink}
                      className="btn btn-primary w-full"
                    >
                      <Link2 className="h-4 w-4" />
                      {t('generateShareLink')}
                    </button>
                    <button
                      type="button"
                      onClick={finishGame}
                      className="btn btn-secondary w-full"
                    >
                      <Flag className="h-4 w-4" />
                      {t('finishGame')}
                    </button>
                    <button
                      type="button"
                      onClick={toggleHistory}
                      className="btn btn-secondary w-full"
                    >
                      <History className="h-4 w-4" />
                      {t('viewGameHistory')}
                    </button>
                    <button
                      type="button"
                      onClick={resetGame}
                      className="btn btn-danger w-full"
                    >
                      <RotateCcw className="h-4 w-4" />
                      {t('restartGame')}
                    </button>
                  </div>

                  {shareLink && (
                    <div className="metric-card space-y-3">
                      <input
                        type="text"
                        value={shareLink}
                        readOnly
                        className="input font-mono text-sm"
                      />
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={copyShareLink}
                          className="btn btn-primary flex-1"
                        >
                          <Link2 className="h-4 w-4" />
                          {t('copy')}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShareLink('')}
                          className="btn btn-secondary flex-1"
                        >
                          {t('closeInput')}
                        </button>
                      </div>
                    </div>
                  )}

                  {copySuccess && (
                    <div className="rounded-[1.4rem] border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
                      {t('linkCopied')}
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </section>
        )}

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
              localStorage.setItem(
                'gameHistory',
                JSON.stringify(updatedHistory)
              )
            }}
          />
        )}

        <CookieMessage />
        <Footer />
      </div>
    </main>
  )
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center px-4 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Loading
        </div>
      }
    >
      <ClientOnly>
        <GameWithSearchParams />
      </ClientOnly>
    </Suspense>
  )
}
