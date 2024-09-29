import type { Scene } from 'phaser'

import { SPRITE_KEYS, SPRITES } from '../assets'

export const loadSprites = (scene: Scene) => {
  const keys = Object.keys(SPRITE_KEYS).map((key) => SPRITE_KEYS[key as keyof typeof SPRITE_KEYS])
  for (const key of keys) {
    const sprite = SPRITES[key]
    scene.load.atlas(key, sprite.sheet, sprite.atlas)
  }
}
