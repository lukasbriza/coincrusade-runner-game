import type { Scene, Time } from 'phaser'

import type { IScene } from '../types'

import type { ITimerHelper } from './types'

export class TimerHelper implements ITimerHelper {
  public scene: Scene

  constructor(scene: IScene) {
    this.scene = scene
  }

  public timer(callback: () => void, delay: number, scope: unknown, repeat: number | undefined, loop: boolean = false) {
    const args = { delay, callback, loop, callbackScope: scope, ...(repeat ? { repeat } : {}) }
    return this.scene.time.addEvent(args)
  }

  public removeTimer(timer: Time.TimerEvent) {
    this.scene.time.removeEvent(timer)
  }
}
