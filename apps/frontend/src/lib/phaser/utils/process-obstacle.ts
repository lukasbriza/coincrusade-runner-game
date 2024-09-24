import { obstacles, SPRITE_KEYS } from '../assets'
import { TILE_HEIGHT } from '../constants'
import type { IScene, PlayerState, SpriteWithDynamicBody } from '../types'

import { setupAssetBase } from './setup-asset-base'

export const processObstacle = (
  scene: IScene,
  state: PlayerState,
  cleanName: string,
  x: number,
  y: number,
  obstacleArray: SpriteWithDynamicBody[],
) => {
  const filteredObstacles = obstacles
    .filter((value) => value.toString() !== SPRITE_KEYS.SPRITE_WATER.toString())
    .map((value) => value.toString())

  if (cleanName === SPRITE_KEYS.SPRITE_WATER.toString()) {
    const water = scene.add.water(x, y)
    setupAssetBase(state, water)
    water.setPosition(x, y + (TILE_HEIGHT - water.height))
    obstacleArray.push(water)
  }

  if (filteredObstacles.includes(cleanName)) {
    const sprite = scene.physics.add.sprite(x, y, cleanName)
    setupAssetBase(state, sprite)
    sprite.setPosition(x, y + (TILE_HEIGHT - sprite.body.height))
    sprite.setSize(sprite.width, sprite.height - 1)
    sprite.setOffset(0, 10)
    obstacleArray.push(sprite)
  }
}
