/* eslint-disable func-names */
/* eslint-disable lines-between-class-members */
import type { Time } from 'phaser'
import { GameObjects, Physics } from 'phaser'

import { KEYS } from '../assets'
import { TimerHelper, type ITimerHelper } from '../helpers'
import type { IScene } from '../types'
import { emitError } from '../utils'

export class PowerBar extends Physics.Arcade.Sprite implements IPowerbar {
  public id: number
  public jumpPower: number = 0

  private timerHelper: ITimerHelper
  private timer: Time.TimerEvent

  private barWidth: number
  private boundMargin: number

  constructor(parent: Physics.Arcade.Sprite, id: number) {
    super(parent.scene, 0, 0, KEYS.KNIGHT_POWERBAR)
    this.id = id
    this.timerHelper = new TimerHelper(parent.scene as IScene)

    const bodyWidth = (parent.body?.width ?? parent.width) + 20
    this.barWidth = (bodyWidth / 100) * 60
    this.boundMargin = (bodyWidth - 20 - this.barWidth) / 2

    this.setOrigin(0, 0)
    this.setCrop(0, 0, this.barWidth, 4)

    const powerBarX = parent.body?.x ?? parent.x
    const powerBarY = parent.body?.y ?? parent.y
    this.setBarPosition(powerBarX, powerBarY, true)
    this.setPercents(0)
    this.setDepth(1)
  }

  public startCollecting() {
    this.timer = this.timerHelper.timer(this.increaseJumpPower, 5, this, undefined, true)
  }

  public stopCollecting() {
    this.timerHelper.removeTimer(this.timer)
    this.jumpPower = 0
  }

  public setPercents(percent: number) {
    if (percent < 0 || percent > 100) {
      emitError('Wrong percent property')
    }
    const width = (this.barWidth / 100) * percent
    this.setOrigin(0, 0)
    this.setCrop(0, 0, width, 4)
  }

  private increaseJumpPower = () => {
    if (this.jumpPower < 60) {
      this.jumpPower += 1
      this.setPercents((100 / 60) * this.jumpPower)
    }
  }

  public setBarPosition(x: number, y: number, center: boolean = true): void {
    this.setPosition(x + (center ? this.boundMargin : 0), y)
  }
}

export const initPowerBarFactory = () => {
  GameObjects.GameObjectFactory.register(
    'powerbar',
    function (this: Phaser.GameObjects.GameObjectFactory, parent: Physics.Arcade.Sprite, id: number) {
      const powerBar = new PowerBar(parent, id)
      this.displayList.add(powerBar)
      this.updateList.add(powerBar)
      return powerBar
    },
  )
}
