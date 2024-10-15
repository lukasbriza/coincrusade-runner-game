'use client'

import { Scale, WEBGL } from 'phaser'

import { GameScene, LoadingScene, TILE_HEIGHT, TILE_WIDTH } from '@/lib/phaser'

const screenSizes = {
  width: 15 * TILE_WIDTH,
  height: 7 * TILE_HEIGHT,
}

export const gameConfig = {
  type: WEBGL,
  scale: {
    mode: Scale.ScaleModes.FIT,
    width: screenSizes.width,
    height: screenSizes.height,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  render: {
    antialiasGL: false,
    pixelArt: true,
  },
  autoFocus: true,
  scene: [LoadingScene, GameScene],
}
