/* eslint-disable lines-between-class-members */
/* eslint-disable func-names */
import { GameObjects } from 'phaser'

import { gamePauseListener, gameRestartListener, gameResumeListener, knightDeadListener } from '../events'
import type { IScene } from '../types'

export class Button extends Phaser.Physics.Arcade.Sprite implements IButton {
  public scene: IScene
  public isBlocked: boolean = false

  constructor(scene: IScene, x: number, y: number, key: string) {
    super(scene, x, y, key)
    this.scene = scene

    this.setInteractive({
      useHandCursor: true,
    })

    gameRestartListener(() => {
      this.isBlocked = false
    })
    knightDeadListener(() => {
      this.isBlocked = true
    })
    gamePauseListener(() => {
      this.isBlocked = true
    })
    gameResumeListener(() => {
      this.isBlocked = false
    })
  }

  public mouseEnter = (key: string, callback?: () => void) => {
    this.setTexture(key)
    callback?.()
  }

  public mouseLeave = (key: string, callback?: () => void) => {
    this.setTexture(key)
    callback?.()
  }

  public mousePointerUp = (key: string, callback?: () => void) => {
    this.setTexture(key)
    callback?.()
  }

  public mousePointerDown = (key: string, callback?: () => void) => {
    this.setTexture(key)
    callback?.()
  }
}

export const initButtonFactory = () => {
  GameObjects.GameObjectFactory.register(
    'button',
    function (this: GameObjects.GameObjectFactory, x: number, y: number, key: string) {
      const button = new Button(this.scene as IScene, x, y, key)
      this.displayList.add(button)
      this.updateList.add(button)
      return button
    },
  )
}
