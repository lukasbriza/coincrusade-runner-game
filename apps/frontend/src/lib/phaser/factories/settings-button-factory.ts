/* eslint-disable func-names */
import { GameObjects } from 'phaser'

import { UI_KEYS } from '../assets'
import { pauseGameEmiter } from '../events'
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
      this.mousePointerDown(UI_KEYS.GREY_BUTTON_LIGHT_PRESSED)
      pauseGameEmiter()
    })
    this.on('pointerup', () => this.mousePointerUp(UI_KEYS.GREY_BUTTON_LIGHT))
    this.on('pointerover', () => this.mouseEnter(UI_KEYS.GREY_BUTTON_LIGHT))
    this.on('pointerout', () => this.mouseLeave(UI_KEYS.GREY_BUTTON))
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
