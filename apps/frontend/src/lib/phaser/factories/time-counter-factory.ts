/* eslint-disable lines-between-class-members */
import type { GameObjects, Scene, Time } from 'phaser'

import { ADD_TIME_EVERY_NUMBER_OF_COINS, BASE_TIME_IN_MINUTES, TIME_ADDITION_IN_SECONDS } from '../constants'
import { secondPassedEmiter } from '../events'
import { EventBus, EventBusEvents } from '../events/event-bus'
import type { ITimerHelper } from '../helpers'

const formatSeconds = (seconds: number) => {
  if (seconds === 0) {
    return '00'
  }
  if (seconds < 10) {
    return `0${seconds.toString()}`
  }
  return seconds.toString()
}

const scaleText = (text: GameObjects.BitmapText) => {
  text.setOrigin(1, 0)
  text.setScale(2, 2)
}

export class TimeCounter implements ITimeCounter {
  public time: Date = new Date(2000, 1, 1, 0, 0, 0, 0)
  public timeText: GameObjects.BitmapText
  public addTimeText: GameObjects.BitmapText
  public addTimeCounter: number = 0

  private secondTimer?: Time.TimerEvent | undefined
  private timeHelper: ITimerHelper

  constructor(scene: Scene, y?: number) {
    this.setupTime()
    this.timeText = scene.add.text(0, 0, this.getTimeStringFormat())
    scaleText(this.timeText)
    this.timeText.setPosition(scene.renderer.width - 25, y ?? 0)

    this.addTimeText = scene.add.text(0, 0, `+${TIME_ADDITION_IN_SECONDS}`)
    scaleText(this.addTimeText)
    this.addTimeText.setPosition(scene.renderer.width - 25, (y ?? 0) + this.timeText.height - 15)
    this.addTimeText.setAlpha(0)

    EventBus.on(EventBusEvents.KnightDead, this.stopCounter, this)
  }

  private setupTime() {
    this.time.setMinutes(BASE_TIME_IN_MINUTES)
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
    secondPassedEmiter()
  }

  private stopCounter = () => {
    if (this.secondTimer) {
      this.timeHelper.removeTimer(this.secondTimer)
      this.secondTimer = undefined
    }
  }

  public addTime() {
    this.addTimeCounter += 1
    if (this.addTimeCounter >= ADD_TIME_EVERY_NUMBER_OF_COINS) {
      this.time.setSeconds(this.time.getSeconds() + TIME_ADDITION_IN_SECONDS)
      this.showAdditionTextAnnouncement()
      EventBus.emit(EventBusEvents.SecondsGain, TIME_ADDITION_IN_SECONDS)
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
