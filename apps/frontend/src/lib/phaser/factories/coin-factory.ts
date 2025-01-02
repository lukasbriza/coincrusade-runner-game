/* eslint-disable func-names */
/* eslint-disable lines-between-class-members */
import { GameObjects, Physics } from 'phaser'

import { ANIMATION_KEYS, SPRITE_KEYS } from '../assets'
import { TimerHelper } from '../helpers/timer-helper'
import type { ICoinCounter } from '../objects'
import { getGameSoundContext } from '../singletons/sound-context'
import type { IScene } from '../types'

export class Coin extends Physics.Arcade.Sprite implements ICoin {
  public isPicked: boolean = false
  public onScene: boolean = false
  public inCoinCounter: boolean = false

  private timerHelper: TimerHelper
  private pickCoinSoundplaying: boolean = false

  constructor(scene: IScene, x: number, y: number, gravity: boolean = true) {
    super(scene, x, y, SPRITE_KEYS.SPRITE_COIN)
    this.timerHelper = new TimerHelper(scene)
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)

    if (gravity) {
      this.setGravityY(350)
    }

    this.setDepth(10)
    this.anims.play({ key: ANIMATION_KEYS.ANIMATION_SPRITE_COIN, repeat: -1 })
  }

  public pickCoin(coinCounter: ICoinCounter) {
    if (this.pickCoinSoundplaying === false) {
      const soundContext = getGameSoundContext()
      soundContext.playPickCoinSound()
      this.pickCoinSoundplaying = true
    }

    this.timerHelper.timer(
      () => {
        this.setGravityY(0)
        this.setImmovable(false)
        this.setCollideWorldBounds(false)
        this.setVelocityX(0)
        this.isPicked = true
        const b = (this.scene.renderer.width - (this.body?.x ?? 0)) ** 2
        const a = (this.scene.renderer.height - (coinCounter.nearTextCoin.y ?? 0)) ** 2
        const speed = Math.sqrt(a + b)
        this.scene.physics.moveToObject(this, coinCounter.nearTextCoin, speed * 0.8)
      },
      300,
      this,
      undefined,
      false,
    )
  }
}

export const initCoinFactory = () => {
  GameObjects.GameObjectFactory.register(
    'coin',
    function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, gravity: boolean = true) {
      const coin = new Coin(this.scene as IScene, x, y, gravity)
      this.displayList.add(coin)
      this.updateList.add(coin)
      return coin
    },
  )
}
