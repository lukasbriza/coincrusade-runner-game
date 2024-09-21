/* eslint-disable func-names */
/* eslint-disable lines-between-class-members */
import type { Scene, GameObjects } from 'phaser'

import { STATUS_FONT_SIZE } from '../constants'
import { coinPickedListener, gameRestartListener } from '../events'

import type { ICoinCounter } from './types'

export class CoinCounter implements ICoinCounter {
  private scene: Scene

  public count: number = 0
  public textTexture: GameObjects.BitmapText
  public nearTextCoin: ICoin

  constructor(scene: Scene, y?: number) {
    this.scene = scene

    this.setCoinText(y)
    this.setNearTextcoin(y)
    this.setActualCoinPosition()
    coinPickedListener(this.incrementCounter)
    gameRestartListener(this.resetCounter)
  }

  private setCoinText(y?: number) {
    this.textTexture = this.scene.add.text(this.scene.renderer.width - 25, y ?? 0, '0')
    this.textTexture.setOrigin(1, 0)
    this.textTexture.setFontSize(STATUS_FONT_SIZE)
    // this.textTexture.setScale(2, 2)
  }

  private setNearTextcoin(y?: number) {
    this.nearTextCoin = this.scene.add.coin(0, y ?? 0, false)
    this.nearTextCoin.setOrigin(1, 0)
    this.nearTextCoin.inCoinCounter = true
  }

  private setActualCoinPosition() {
    const x = this.scene.renderer.width - 30 - this.textTexture.width
    this.nearTextCoin.setPosition(x, this.textTexture.y - 2)
  }

  public incrementCounter = () => {
    this.count += 1
    this.textTexture.setText(this.count.toString())
    this.setActualCoinPosition()
  }

  public resetCounter = () => {
    this.count = 0
    this.textTexture.setText(this.count.toString())
    this.setActualCoinPosition()
  }
}
