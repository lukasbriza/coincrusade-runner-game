import type { GameObjects } from 'phaser'

import { coinPickedEmiter, playerRelocateEmiter } from '../events'
import type { ColliderObject } from '../factories'
import { Water } from '../factories/water-factory'
import { getGameStateContext } from '../singletons'
import type { IScene } from '../types'

export const collidersRegistration = (scene: IScene) => {
  const { platformManager, playerStatus, knight } = scene
  const { activeGroup, coinGroup, obstacleGroup } = platformManager
  const { coinCounter } = playerStatus
  const stateSingleton = getGameStateContext()

  scene.physics.add.collider(knight, activeGroup, knight.onCollideWithWorld, undefined, knight)
  scene.physics.add.collider(knight, obstacleGroup, (_: ColliderObject, obstacle: ColliderObject) => {
    stateSingleton.onKnightHit(knight, obstacle)

    if (obstacle instanceof Water) {
      playerRelocateEmiter(knight)
    }
  })
  scene.physics.add.collider(coinGroup, activeGroup, undefined, (coin: ColliderObject) => !(coin as ICoin).isPicked)
  scene.physics.add.collider(knight, coinGroup, undefined, (_: ColliderObject, coin: ColliderObject) => {
    const element = coin as ICoin
    element.pickCoin(coinCounter, coin)
    return false
  })
  scene.physics.add.collider(
    coinCounter.nearTextCoin,
    coinGroup,
    undefined,
    (_: ColliderObject, coin: ColliderObject) => {
      coinPickedEmiter(coin as GameObjects.GameObject)
      stateSingleton.coinPickedAction()
      coin.destroy()
      return false
    },
  )
}
