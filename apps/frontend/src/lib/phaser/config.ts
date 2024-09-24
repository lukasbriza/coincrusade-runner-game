'use client'

import { Scale, WEBGL, type Types } from 'phaser'

const TILE = { width: 90, height: 90 }
const screenSizes = {
  width: 15 * TILE.width,
  height: 7 * TILE.height,
}

export const phaserConfig: Types.Core.GameConfig = {
  type: WEBGL,
  scale: {
    mode: Scale.ScaleModes.NONE,
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
}
