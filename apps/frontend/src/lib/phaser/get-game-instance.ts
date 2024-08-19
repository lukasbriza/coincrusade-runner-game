'use client'

import { phaserConfig } from './config'
import { GameScene } from './scenes'

export const getGameInstance = async (parent: HTMLDivElement) => {
  const { Game } = await import('phaser')

  const phaserGame = new Game({
    ...phaserConfig,
    parent,
    scene: [GameScene],
  })
  return phaserGame
}
