import type { Scene } from 'phaser'

import { KEYS } from '../assets'

import { addImage } from './add-image'
import { spreadImageOnScene } from './spread-image-on-scene'

export const addBackgorund = (scene: Scene) => {
  const sky = addImage(scene, KEYS.SKY, 0, 0)
  spreadImageOnScene(scene, sky)

  const background = scene.add.tileSprite(
    0,
    0,
    scene.renderer.width,
    scene.renderer.height * 0.55,
    KEYS.BACKGROUND_MAIN,
  )
  background.setScrollFactor(0)
  spreadImageOnScene(scene, background)

  const hills = scene.add.tileSprite(0, 0, scene.renderer.width, scene.renderer.height * 0.6, KEYS.HILLS)
  hills.setScrollFactor(0)
  spreadImageOnScene(scene, hills)

  const clouds = scene.add.tileSprite(0, 0, scene.renderer.width, scene.renderer.height * 0.6, KEYS.CLOUDS)
  clouds.setScrollFactor(0)
  spreadImageOnScene(scene, clouds)

  sky.setDepth(-10)
  clouds.setDepth(-9)
  hills.setDepth(-8)
  background.setDepth(-7)
  return { background, hills, clouds }
}
