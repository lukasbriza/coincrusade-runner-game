import uniqueId from 'lodash.uniqueid'

import type { PlayerState, SpriteWithDynamicBody } from '../types'

export const setupAssetBase = (state: PlayerState, asset: SpriteWithDynamicBody) => {
  asset.setOrigin(0, 0)
  asset.setImmovable(true)
  asset.setCollisionCategory(1)
  asset.setFriction(0, 0)
  asset.setName(uniqueId())
  asset.setVelocityX(state.platformSpeed * -1)
}
