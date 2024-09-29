/* eslint-disable lines-between-class-members */
import type { Time, GameObjects } from 'phaser'

import { gameRestartListener, knightDeadListener, knightHitCallbackListener } from '../events'
import { TimerHelper, type ITimerHelper } from '../helpers'
import { getGameStateContext } from '../singletons'
import type { IScene } from '../types'

import type { ILifeCounter } from './types'

export class LifeCounter implements ILifeCounter {
  private scene: IScene
  private lifes: GameObjects.Image[] = []
  private lifeValue: number
  private canDecreaseLife: boolean = true
  private timerHelper: ITimerHelper
  private healTimer?: Time.TimerEvent | undefined

  constructor(scene: IScene) {
    this.scene = scene
    this.lifeValue = this.scene.gameConfig.maxPlayerLifes
    this.timerHelper = new TimerHelper(scene)
    this.initListeners()
    this.drawLifes()
  }

  private initListeners = () => {
    knightHitCallbackListener(() => {
      const stateSingleton = getGameStateContext()
      this.lifeValue = stateSingleton.state.actualLives
      this.buildLifes()
    })

    knightDeadListener(this.knightDead)
    gameRestartListener(this.reset)
  }

  private destoryHealTimer = () => {
    if (this.healTimer) {
      this.timerHelper.removeTimer(this.healTimer)
      this.healTimer = undefined
    }
  }
  private knightDead = () => {
    this.destoryHealTimer()
    this.drawLifes()
  }

  private drawLifes() {
    for (const object of this.lifes) {
      object.destroy(true)
    }

    this.lifes = []
    for (let index = 0; index < this.lifeValue; index += 1) {
      const life = this.scene.add.life(this.scene)
      const x = index * life.width + 20
      life.setOrigin(0, 0)
      life.setPosition(x + (index > 0 ? index * 5 : 0), 10)
      this.lifes.push(life)
    }
    for (let index = this.lifes.length; index < this.scene.gameConfig.maxPlayerLifes; index += 1) {
      const emptyLife = this.scene.add.emptyLife(this.scene)
      const x = index * emptyLife.width + 20
      emptyLife.setOrigin(0, 0)
      emptyLife.setPosition(x + (index > 0 ? index * 5 : 0), 10)
      this.lifes.push(emptyLife)
    }
  }

  public buildLifes() {
    if (this.lifeValue !== 0 && this.canDecreaseLife) {
      this.canDecreaseLife = false

      if (this.lifeValue < 0) {
        this.lifeValue = 0
      }

      this.drawLifes()
      this.timerHelper.timer(
        () => {
          this.canDecreaseLife = true
        },
        this.scene.gameConfig.immortalityDuration,
        this,
        undefined,
        false,
      )
      if (!this.healTimer) {
        this.healTimer = this.timerHelper.timer(this.addLife, this.scene.gameConfig.healRate, this, undefined, true)
      }
    }
  }

  public addLife = () => {
    if (this.lifeValue < this.scene.gameConfig.maxPlayerLifes) {
      this.lifeValue += 1

      this.drawLifes()
      const stateSingleton = getGameStateContext()
      stateSingleton.lifeAddAction()

      if (this.lifeValue === this.scene.gameConfig.maxPlayerLifes && this.healTimer) {
        this.timerHelper.removeTimer(this.healTimer)
        this.healTimer = undefined
      }
    }
  }

  public reset = () => {
    this.destoryHealTimer()
    this.lifeValue = this.scene.gameConfig.maxPlayerLifes
    this.drawLifes()
  }
}
