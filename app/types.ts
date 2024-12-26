export interface Player {
  name: string
  score: number
  history: { points: number; timestamp: number }[]
}

export interface GameRound {
  id: string
  date: string
  gameName: string
  targetScore: number
  initialPoints: number
  players: Player[]
  winner: string | null
}

export interface GameState {
  gameName: string
  targetScore: number
  initialPoints: number
  players: Player[]
  winner: string | null
}
