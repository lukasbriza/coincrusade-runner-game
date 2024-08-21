/* eslint-disable lines-between-class-members */
import type { GameObjects, Scene, Time } from 'phaser'

import { HEAL_RATE, IMMORTALITY_DURATION, MAX_PLAYER_LIFES } from '../constants'
import { knightHitCallbackListener, knightLeftSideCollisionListener, lifeAddedEmiter } from '../events'
import { EventBus, EventBusEvents } from '../events/event-bus'
import { TimerHelper, type ITimerHelper } from '../helpers'

export class LifeCounter implements ILifeCounter {
  private scene: Scene
  private lifes: GameObjects.Image[] = []
  private lifeValue: number = MAX_PLAYER_LIFES
  private canDecreaseLife: boolean = true
  private timerHelper: ITimerHelper
  private healTimer?: Time.TimerEvent | undefined

  constructor(scene: Scene) {
    this.scene = scene
    this.timerHelper = new TimerHelper(scene)
    this.initListeners()
  }

  private initListeners = () => {
    knightHitCallbackListener((_knight, _object, context) => {
      if (context) {
        this.lifeValue = context.state.actualLives
      }
      this.decreaseLife()
    })
    knightLeftSideCollisionListener((knight: IKnight) => {
      if (!knight.immortalAnimation) {
        this.decreaseLife()
      }
    })

    EventBus.on(EventBusEvents.RestartGame, this.reset, this)
  }

  private drawLifes() {
    for (const object of this.lifes) {
      object.destroy(true)
    }

    this.lifes = []

    for (let index = 0; index < this.lifeValue; index += 1) {
      const life = this.scene.add.life(this.scene, undefined, undefined, true)
      const x = index * life.width + 20
      life.setOrigin(0, 0)
      life.setPosition(x + (index > 0 ? index * 5 : 0), 10)
      this.lifes.push(life)
    }
    for (let index = this.lifes.length; index < MAX_PLAYER_LIFES; index += 1) {
      const emptyLife = this.scene.add.life(this.scene, undefined, undefined, false)
      const x = index * emptyLife.width + 20
      emptyLife.setOrigin(0, 0)
      emptyLife.setPosition(x + (index > 0 ? index * 5 : 0), 10)
      this.lifes.push(emptyLife)
    }
  }

  public decreaseLife() {
    if (this.lifeValue !== 0 && this.canDecreaseLife) {
      this.canDecreaseLife = false
      this.lifeValue -= 1

      if (this.lifeValue < 0) {
        this.lifeValue = 0
      }

      this.drawLifes()
      this.timerHelper.timer(
        () => {
          this.canDecreaseLife = true
        },
        IMMORTALITY_DURATION,
        this,
        undefined,
        false,
      )
      if (!this.healTimer) {
        this.healTimer = this.timerHelper.timer(this.addLife, HEAL_RATE, this, undefined, true)
      }
    }
  }

  public addLife = () => {
    if (this.lifeValue < MAX_PLAYER_LIFES) {
      this.lifeValue += 1

      this.drawLifes()
      lifeAddedEmiter()

      if (this.lifeValue === MAX_PLAYER_LIFES && this.healTimer) {
        this.timerHelper.removeTimer(this.healTimer)
        this.healTimer = undefined
      }
    }
  }

  public reset = () => {
    this.lifeValue = MAX_PLAYER_LIFES
    if (this.healTimer) {
      this.timerHelper.removeTimer(this.healTimer)
    }
    this.drawLifes()
  }
}
