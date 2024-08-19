/* eslint-disable func-names */
import type { Scene } from 'phaser'
import { GameObjects } from 'phaser'

import { FONT_KEYS } from '../assets'
import type { ITimerHelper } from '../helpers'

export class Text extends GameObjects.BitmapText implements IText {
  public scene: Scene

  private timerHelper: ITimerHelper

  constructor(scene: Scene, x: number, y: number, text: string) {
    super(scene, x, y, FONT_KEYS.MAIN, text)
  }

  public destroyAfterTime(time: number, callback: () => void) {
    this.timerHelper.timer(callback, time, this, undefined, false)
  }
}

export const initTextFactory = () => {
  GameObjects.GameObjectFactory.register(
    'text',
    function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, text: string) {
      const textClass = new Text(this.scene, x, y, text)
      this.displayList.add(textClass)
      this.updateList.add(textClass)
      return textClass
    },
  )
}
