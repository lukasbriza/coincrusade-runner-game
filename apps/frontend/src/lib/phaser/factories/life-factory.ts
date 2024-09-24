/* eslint-disable func-names */
import type { Scene } from 'phaser'
import { GameObjects, Physics } from 'phaser'

import { KEYS } from '../assets'

export class Life extends Physics.Arcade.Sprite {
  constructor(scene: Scene, x?: number, y?: number) {
    super(scene, x ?? 0, y ?? 0, KEYS.HEART_FULL)
  }
}

export class EmptyLife extends Physics.Arcade.Sprite {
  constructor(scene: Scene, x?: number, y?: number) {
    super(scene, x ?? 0, y ?? 0, KEYS.HEART_EMPTY)
  }
}

export const initLifeFactory = () => {
  GameObjects.GameObjectFactory.register(
    'life',
    function (this: Phaser.GameObjects.GameObjectFactory, x?: number, y?: number) {
      const life = new Life(this.scene, x, y)
      this.displayList.add(life)
      this.updateList.add(life)
      return life
    },
  )
}

export const initEmptyLifeFactory = () => {
  GameObjects.GameObjectFactory.register(
    'emptyLife',
    function (this: Phaser.GameObjects.GameObjectFactory, x?: number, y?: number) {
      const meptyLife = new EmptyLife(this.scene, x, y)
      this.displayList.add(meptyLife)
      this.updateList.add(meptyLife)
      return meptyLife
    },
  )
}
