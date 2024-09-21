/* eslint-disable lines-between-class-members */
import type { Time, GameObjects } from 'phaser'

import { STATUS_FONT_SIZE } from '../constants'
import { coinPickedListener, gameRestartListener, knightDeadListener } from '../events'
import { TimerHelper, type ITimerHelper } from '../helpers'
import { getGameStateContext } from '../singletons'
import type { IScene } from '../types'

import type { ITimeCounter } from './types'

const formatSeconds = (seconds: number) => {
  if (seconds === 0) {
    return '00'
  }
  if (seconds < 10) {
    return `0${seconds.toString()}`
  }
  return seconds.toString()
}

export class TimeCounter implements ITimeCounter {
  private scene: IScene
  public time: Date = new Date(2000, 1, 1, 0, 0, 0, 0)
  public timeText: GameObjects.BitmapText
  public addTimeText: GameObjects.BitmapText
  public addTimeCounter: number = 0

  private secondTimer?: Time.TimerEvent | undefined
  private timeHelper: ITimerHelper

  constructor(scene: IScene, y?: number) {
    this.scene = scene
    this.timeHelper = new TimerHelper(scene)
    this.setupTime()
    this.timeText = scene.add.text(0, 0, this.getTimeStringFormat())
    this.timeText.setOrigin(1, 0)
    this.timeText.setFontSize(STATUS_FONT_SIZE)
    this.timeText.setPosition(scene.renderer.width - 25, y ?? 0)

    this.addTimeText = scene.add.text(0, 0, `+${this.scene.gameConfig.timeAdditionInSeconds}`)
    this.addTimeText.setOrigin(1, 0)
    this.addTimeText.setFontSize(STATUS_FONT_SIZE)
    this.addTimeText.setPosition(scene.renderer.width - 25, this.timeText.y + this.timeText.height)
    this.addTimeText.setAlpha(0)

    this.initListeners()
  }

  private initListeners() {
    knightDeadListener(this.stopCounter)
    coinPickedListener(this.addTime)
    gameRestartListener(this.reset)
  }

  private reset = () => {
    this.setupTime()
  }

  private setupTime() {
    const minutes = Math.floor(this.scene.gameConfig.baseTimeInSeconds / 60)
    const seconds = this.scene.gameConfig.baseTimeInSeconds - 60 * minutes
    this.time.setMinutes(minutes)
    this.time.setSeconds(seconds)
    this.secondTimer = this.timeHelper.timer(this.secondPassed, 1000, this, undefined, true)
  }

  private getTimeStringFormat() {
    const minutes = this.time.getMinutes()
    const seconds = this.time.getSeconds()
    const minutesString = minutes === 0 ? '0' : minutes.toString()
    const secondsString = formatSeconds(seconds)
    return `${minutesString}:${secondsString}`
  }

  private secondPassed = () => {
    this.time.setSeconds(this.time.getSeconds() - 1)
    this.timeText.text = this.getTimeStringFormat()
    const stateSingleton = getGameStateContext()
    stateSingleton.addSecondAction()
  }

  private stopCounter = () => {
    if (this.secondTimer) {
      this.timeHelper.removeTimer(this.secondTimer)
      this.secondTimer = undefined
    }
  }

  public addTime = () => {
    this.addTimeCounter += 1
    if (this.addTimeCounter >= this.scene.gameConfig.addTimeEveryNumberOfCoins) {
      this.time.setSeconds(this.time.getSeconds() + this.scene.gameConfig.timeAdditionInSeconds)
      this.showAdditionTextAnnouncement()
      const stateSingleton = getGameStateContext()
      stateSingleton.secondsGainAction(this.scene.gameConfig.timeAdditionInSeconds)
      this.addTimeCounter = 0
    }
  }

  public showAdditionTextAnnouncement() {
    this.addTimeText.setAlpha(1)
    this.timeHelper.timer(
      () => {
        this.addTimeText.setAlpha(0)
      },
      1250,
      this,
      undefined,
      false,
    )
  }
}
