import type { Scene } from 'phaser'

import { SPRITE_KEYS, SPRITES } from '../assets'

export const loadSprites = (scene: Scene) => {
  const keys = Object.keys(SPRITE_KEYS).map((key) => SPRITE_KEYS[key as keyof typeof SPRITE_KEYS])
  for (const key of keys) {
    if (!scene.textures.exists(key)) {
      // eslint-disable-next-line no-console
      console.log(`loadSprites: loading ${key}`)
      const sprite = SPRITES[key]
      scene.load.atlas(key, sprite.sheet, sprite.atlas)
    }
  }
}
