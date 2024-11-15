/* eslint-disable func-names */
import { GameObjects } from 'phaser'

import { UI_KEYS } from '../assets'
import { gamePauseEmiter, gamePauseListener, gameResumeListener } from '../events'
import type { IScene } from '../types'

import { Button } from './button-factory'

export class SettingsButton extends Button implements ISettingsButton {
  constructor(scene: IScene, x: number, y: number) {
    super(scene, x, y, UI_KEYS.GREY_BUTTON)
    this.setOrigin(1, 0)
    this.setScale(2)
    this.setInteractive({
      useHandCursor: true,
    })
    this.on('pointerdown', () => {
      if (!this.isBlocked) {
        this.mousePointerDown(UI_KEYS.GREY_BUTTON_LIGHT_PRESSED)
        gamePauseEmiter()
      }
    })
    this.on('pointerup', () => {
      if (!this.isBlocked) {
        this.mousePointerUp(UI_KEYS.GREY_BUTTON_LIGHT)
      }
    })
    this.on('pointerover', () => {
      if (!this.isBlocked) {
        this.mouseEnter(UI_KEYS.GREY_BUTTON_LIGHT)
      }
    })
    this.on('pointerout', () => {
      if (!this.isBlocked) {
        this.mouseLeave(UI_KEYS.GREY_BUTTON)
      }
    })

    gamePauseListener(() => {
      this.setTexture(UI_KEYS.GREY_BUTTON_LIGHT_PRESSED)
    })
    gameResumeListener(() => {
      this.setTexture(UI_KEYS.GREY_BUTTON)
    })
  }
}

export const initSettingsButtonFactory = () => {
  GameObjects.GameObjectFactory.register(
    'settingsButton',
    function (this: GameObjects.GameObjectFactory, x: number, y: number) {
      const settingsButton = new SettingsButton(this.scene as IScene, x, y)
      this.displayList.add(settingsButton)
      this.updateList.add(settingsButton)
      return settingsButton
    },
  )
}
