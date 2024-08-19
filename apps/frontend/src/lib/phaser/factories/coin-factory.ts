/* eslint-disable lines-between-class-members */
/* eslint-disable func-names */
import type { Scene } from 'phaser'
import { GameObjects, Physics } from 'phaser'

import { SPRITE_KEYS } from '../assets'

export class Coin extends Physics.Arcade.Sprite implements ICoin {
  public isPicked: boolean = false
  public onScene: boolean = false
  public inCoinCounter: boolean = false

  constructor(scene: Scene, x: number, y: number, gravity: boolean = true) {
    super(scene, x, y, SPRITE_KEYS.SPRITE_COIN)
    console.log(gravity)
  }
}

export const initCoinFactory = () => {
  GameObjects.GameObjectFactory.register(
    'coin',
    function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, gravity?: boolean) {
      const coin = new Coin(this.scene, x, y, gravity)
      this.displayList.add(coin)
      this.updateList.add(coin)
      return coin
    },
  )
}
