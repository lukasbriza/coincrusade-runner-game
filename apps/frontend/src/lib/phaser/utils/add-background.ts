import type { Scene } from 'phaser'

import type { KEYS } from '../assets'

import { addImage } from './add-image'
import { spreadImageOnScene } from './spread-image-on-scene'

export const addBackgorund = (scene: Scene, key: KEYS) => {
  const background = addImage(scene, key, scene.renderer.width / 2, scene.renderer.height * 0.6)
  spreadImageOnScene(scene, background)
  return background
}
