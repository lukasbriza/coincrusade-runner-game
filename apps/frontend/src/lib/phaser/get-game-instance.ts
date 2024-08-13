'use client'

import type { Types } from 'phaser'

import { phaserConfig } from './config'

export const getGameInstance = async (parent: HTMLDivElement, scenes: Types.Scenes.SceneType[]) => {
  const { Game } = await import('phaser')

  const phaserGame = new Game({
    ...phaserConfig,
    parent,
    scene: scenes,
  })
  return phaserGame
}
