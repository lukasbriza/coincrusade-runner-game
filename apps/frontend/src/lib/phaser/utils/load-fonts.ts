import type { Scene } from 'phaser'

import { FONT_KEYS, FONTS } from '../assets'

export const loadFonts = (scene: Scene) => {
  const keys = Object.keys(FONT_KEYS).map((key) => FONT_KEYS[key as keyof typeof FONT_KEYS])
  for (const key of keys) {
    const font = FONTS[key]
    scene.load.bitmapFont(key, font.sheet, font.bitmap)
  }
}
