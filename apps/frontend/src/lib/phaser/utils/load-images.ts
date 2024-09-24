import type { Scene } from 'phaser'

import { IMAGES, KEYS } from '../assets'

export const loadImages = (scene: Scene) => {
  const keys = Object.keys(KEYS).map((key) => KEYS[key as keyof typeof KEYS])
  for (const key of keys) {
    const image = IMAGES[key]
    scene.load.image(key, image.path)
  }
}
