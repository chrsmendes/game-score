import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import GameSetup from './GameSetup'
import { GameState } from '../app/types'
import { renderWithLanguage } from '../test-utils/render-with-language'

const initialState: GameState = {
  gameName: '',
  targetScore: 0,
  initialPoints: 0,
  players: [],
  winner: null,
}

describe('GameSetup', () => {
  it('submits parsed game configuration values', () => {
    const setGameState = vi.fn()

    renderWithLanguage(
      <GameSetup setGameState={setGameState} initialState={initialState} />
    )

    fireEvent.change(screen.getByRole('textbox', { name: 'Game Name' }), {
      target: { value: 'Uno' },
    })
    fireEvent.change(screen.getByRole('spinbutton', { name: 'Target Score' }), {
      target: { value: '12.5' },
    })
    fireEvent.change(
      screen.getByRole('spinbutton', { name: 'Initial Points' }),
      {
        target: { value: '3' },
      }
    )
    fireEvent.click(screen.getByRole('button', { name: 'Start Game' }))

    expect(setGameState).toHaveBeenCalledWith({
      gameName: 'Uno',
      targetScore: 12.5,
      initialPoints: 3,
    })
  })

  it('keeps hidden fields out of the target update flow', () => {
    const setGameState = vi.fn()

    renderWithLanguage(
      <GameSetup
        setGameState={setGameState}
        initialState={{
          ...initialState,
          gameName: 'Truco',
          targetScore: 12,
          initialPoints: 1,
        }}
        isUpdating={true}
      />
    )

    expect(
      screen.queryByRole('textbox', { name: 'Game Name' })
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('spinbutton', { name: 'Initial Points' })
    ).not.toBeInTheDocument()

    fireEvent.change(screen.getByRole('spinbutton', { name: 'Target Score' }), {
      target: { value: '15' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Update Target Score' }))

    expect(setGameState).toHaveBeenCalledWith({
      gameName: 'Truco',
      targetScore: 15,
      initialPoints: 1,
    })
  })
})
