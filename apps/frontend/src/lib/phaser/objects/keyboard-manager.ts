/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */
import type { Input } from 'phaser'

import { gameEndEmiter, gameRestartEmiter } from '../events'
import { getGameStateContext } from '../singletons'
import type { IScene } from '../types'

import type { IKeyboardManager } from './types'

export class KeyboardManager implements IKeyboardManager {
  public settingsButton: ISettingsButton
  public musicButton: IMusicButton
  public fullscreenButton: IFullscreenButton

  private keyR: Input.Keyboard.Key | undefined
  private keyQ: Input.Keyboard.Key | undefined

  constructor(scene: IScene) {
    this.fullscreenButton = scene.add.fulscreenButton(scene.renderer.width - 25, 20)
    this.settingsButton = scene.add.settingsButton(scene.renderer.width - 25 - 40, 20)
    this.musicButton = scene.add.musicButton(scene.renderer.width - 25 - this.settingsButton.width - 40 - 25, 20)

    this.keyR = scene.input.keyboard?.addKey('R', false, false)
    this.keyQ = scene.input.keyboard?.addKey('Q', false, false)

    this.keyR?.on('down', this.resetGame, this)
    this.keyQ?.on('down', this.quitGame, this)
  }

  private resetGame = () => {
    const gameStateSingleton = getGameStateContext()
    if (gameStateSingleton.state.playerIsDead) {
      gameRestartEmiter()
    }
  }

  private quitGame = () => {
    const gameStateSingleton = getGameStateContext()
    if (gameStateSingleton.state.playerIsDead) {
      gameEndEmiter()
    }
  }
}
