/* eslint-disable func-names */
import { GameObjects } from 'phaser'

import { FONT_KEYS } from '../assets'
import { TimerHelper, type ITimerHelper } from '../helpers'
import type { IScene } from '../types'

export class Text extends GameObjects.BitmapText implements IText {
  public scene: IScene

  private timerHelper: ITimerHelper

  constructor(scene: IScene, x: number, y: number, text: string) {
    super(scene, x, y, FONT_KEYS.MAIN, text)
    this.timerHelper = new TimerHelper(scene)
  }

  public destroyAfterTime(time: number, callback: () => void) {
    this.timerHelper.timer(callback, time, this, undefined, false)
  }
}

export const initTextFactory = () => {
  GameObjects.GameObjectFactory.register(
    'text',
    function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, text: string) {
      const textClass = new Text(this.scene as IScene, x, y, text)
      this.displayList.add(textClass)
      this.updateList.add(textClass)
      return textClass
    },
  )
}
