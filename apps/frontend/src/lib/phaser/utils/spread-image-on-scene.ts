import type { GameObjects, Scene } from 'phaser'

export const spreadImageOnScene = (scene: Scene, img: GameObjects.Image) => {
  img.setPosition(scene.renderer.width / 2, scene.renderer.height / 2)
  const scaleX = scene.renderer.width / img.width
  const scaleY = scene.renderer.height / img.height
  const scale = Math.max(scaleX, scaleY)
  img.setScale(scale)
}
