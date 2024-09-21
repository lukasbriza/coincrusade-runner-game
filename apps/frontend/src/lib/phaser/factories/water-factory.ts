/* eslint-disable func-names */
import { GameObjects, Physics } from 'phaser'

import { ANIMATION_KEYS, SPRITE_KEYS } from '../assets'
import type { IScene } from '../types'

export class Water extends Physics.Arcade.Sprite implements IWater {
  constructor(scene: IScene, x: number, y: number) {
    super(scene, x, y, SPRITE_KEYS.SPRITE_WATER)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
  }

  public playAnimation() {
    this.anims.play({ key: ANIMATION_KEYS.ANIMATION_SPRITE_WATER, repeat: -1 })
  }
}

export const initWaterFactory = () => {
  GameObjects.GameObjectFactory.register(
    'water',
    function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number) {
      const water = new Water(this.scene as IScene, x, y)
      this.displayList.add(water)
      this.updateList.add(water)
      return water
    },
  )
}
