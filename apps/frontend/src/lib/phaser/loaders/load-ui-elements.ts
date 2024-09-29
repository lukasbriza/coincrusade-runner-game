import type { Scene } from 'phaser'

import { UI_IMAGES, UI_KEYS } from '../assets'

export const loadUiElements = (scene: Scene) => {
  const keys = Object.keys(UI_KEYS).map((key) => UI_KEYS[key as keyof typeof UI_KEYS])
  for (const key of keys) {
    const element = UI_IMAGES[key]
    scene.load.image(key, element.path)
  }
}
