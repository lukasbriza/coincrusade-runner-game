'use client'

import dynamic from 'next/dynamic'

const GameProvider = dynamic(() => import('../context/game-context'), { ssr: false })
const GameStateProvider = dynamic(() => import('../context/game-state-context'), { ssr: false })
const GameElement = dynamic(() => import('./game-element'))

export const Game = () => (
  <GameProvider>
    <GameStateProvider>
      <GameElement />
    </GameStateProvider>
  </GameProvider>
)
