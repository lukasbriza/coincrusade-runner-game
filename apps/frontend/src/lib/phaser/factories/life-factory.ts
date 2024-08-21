/* eslint-disable func-names */
import type { Scene } from 'phaser'
import { GameObjects, Physics } from 'phaser'

import { KEYS } from '../assets'

export class Life extends Physics.Arcade.Sprite {
  constructor(scene: Scene, x?: number, y?: number, full: boolean = true) {
    super(scene, x ?? 0, y ?? 0, full ? KEYS.HEART_FULL : KEYS.HEART_EMPTY)
  }
}

export const initLifeFactory = () => {
  GameObjects.GameObjectFactory.register(
    'life',
    function (this: Phaser.GameObjects.GameObjectFactory, x?: number, y?: number, full?: boolean) {
      const life = new Life(this.scene, x, y, full)
      this.displayList.add(life)
      this.updateList.add(life)
      return life
    },
  )
}
