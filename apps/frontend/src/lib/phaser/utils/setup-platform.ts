import { KEYS } from '../assets'
import { TILE_HEIGHT } from '../constants'
import type { IScene, PlayerState, SpriteWithDynamicBody } from '../types'

import { setupAssetBase } from './setup-asset-base'

export const setupPlatform = (
  scene: IScene,
  state: PlayerState,
  cleanName: string,
  x: number,
  y: number,
  platforms: SpriteWithDynamicBody[],
) => {
  const platform = scene.physics.add.sprite(x, y, cleanName)
  setupAssetBase(state, platform)

  if (cleanName === KEYS.SLIM_GROUND.toString()) {
    platform.setPosition(x, y + (TILE_HEIGHT - platform.body.height))
  }

  platforms.push(platform)
}
