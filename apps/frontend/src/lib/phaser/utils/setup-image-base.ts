import uniqueId from 'lodash.uniqueid'

import type { IScene, PlayerState } from '../types'

export const setupImageBase = (scene: IScene, state: PlayerState, tileName: string, x: number, y: number) => {
  const image = scene.physics.add.image(x, y, tileName)
  image.setOrigin(0.5, 1)
  image.setImmovable(true)
  image.setCollideWorldBounds(false)
  image.setFriction(0, 0)
  image.setName(uniqueId())
  image.setVelocityX(state.platformSpeed * -1)
  return image
}
