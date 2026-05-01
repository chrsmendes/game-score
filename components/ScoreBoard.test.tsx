import React from 'react'
import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ScoreBoard from './ScoreBoard'
import { renderWithLanguage } from '../test-utils/render-with-language'

describe('ScoreBoard', () => {
  it('renders players ordered by score descending', () => {
    renderWithLanguage(
      <ScoreBoard
        players={[
          { name: 'Alice', score: 9, history: [] },
          { name: 'Bruno', score: 14.5, history: [] },
          { name: 'Carla', score: 11, history: [] },
        ]}
      />
    )

    const rows = screen.getAllByRole('row')

    expect(rows[1]).toHaveTextContent('Bruno')
    expect(rows[1]).toHaveTextContent('14.50')
    expect(rows[2]).toHaveTextContent('Carla')
    expect(rows[3]).toHaveTextContent('Alice')
  })
})
