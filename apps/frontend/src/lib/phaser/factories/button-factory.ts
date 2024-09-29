/* eslint-disable func-names */
import { GameObjects } from 'phaser'

import type { IScene } from '../types'

export class Button extends Phaser.Physics.Arcade.Sprite implements IButton {
  public scene: IScene

  constructor(scene: IScene, x: number, y: number, key: string) {
    super(scene, x, y, key)
    this.scene = scene

    this.setInteractive({
      useHandCursor: true,
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
