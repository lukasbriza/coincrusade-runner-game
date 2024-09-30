/* eslint-disable class-methods-use-this */
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

    this.scene.scale.on('enterfullscreen', () => {
      this.styleGameCanvasOnFullscreen()
    })
    this.scene.scale.on('leavefullscreen', () => {
      this.resetStyleOnGameCanvas()
    })
  }

  private styleGameCanvasOnFullscreen = () => {
    const element = document.querySelectorAll('canvas')[0]
    if (element) {
      element.style.position = 'relative'
      element.style.left = '50%'
      element.style.top = '50%'
      element.style.transform = 'translate(-50%,-50%)'
    }
  }

  private resetStyleOnGameCanvas = () => {
    const element = document.querySelectorAll('canvas')[0]
    if (element) {
      element.style.position = ''
      element.style.left = ''
      element.style.top = ''
      element.style.transform = ''
    }
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
