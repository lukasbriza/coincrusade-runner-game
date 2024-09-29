/* eslint-disable func-names */
import { GameObjects } from 'phaser'

import { UI_KEYS } from '../assets'
import type { IScene } from '../types'

import { Button } from './button-factory'

export class FullscreenButton extends Button implements IFullscreenButton {
  constructor(scene: IScene, x: number, y: number) {
    super(scene, x, y, UI_KEYS.FULLSCREEN)
    this.setOrigin(1, 0)
    this.setScale(0.2)
    this.setInteractive({
      useHandCursor: true,
    })

    this.on('pointerup', () => {
      if (scene.scale.isFullscreen) {
        scene.scale.stopFullscreen()
      } else {
        scene.scale.startFullscreen()
      }
    })
  }
}

export const initFullscreenButtonFactory = () => {
  GameObjects.GameObjectFactory.register(
    'fulscreenButton',
    function (this: GameObjects.GameObjectFactory, x: number, y: number) {
      const fulscreenButton = new FullscreenButton(this.scene as IScene, x, y)
      this.displayList.add(fulscreenButton)
      this.updateList.add(fulscreenButton)
      return fulscreenButton
    },
  )
}
