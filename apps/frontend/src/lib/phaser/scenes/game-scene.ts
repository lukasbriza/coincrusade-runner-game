/* eslint-disable lines-between-class-members */
/* eslint-disable no-new */
import { Scene } from 'phaser'

import type { GameConfiguration } from '@/shared/components'

import { animationsRegistration } from '../animations'
import { KEYS } from '../assets'
import { checkersRegistration, collidersRegistration } from '../helpers'
import type { IKeyboardManager, IPlatformManager, IPlayerStatus } from '../objects'
import { KeyboardManager, PlatformManager, PlayerStatus } from '../objects'
import type { IScene } from '../types'
import { addBackgorund } from '../utils'

export class GameScene extends Scene implements IScene {
  public knight: IKnight
  public platformManager: IPlatformManager
  public playerStatus: IPlayerStatus
  public gameConfig: GameConfiguration
  public keyboardManager: IKeyboardManager

  constructor() {
    super({ key: 'game' })
  }

  init(data: { gameConfig: GameConfiguration }) {
    this.gameConfig = data.gameConfig
  }

  create() {
    animationsRegistration(this)
    checkersRegistration(this)
    addBackgorund(this, KEYS.BACKGROUND)

    this.platformManager = new PlatformManager(this)
    this.keyboardManager = new KeyboardManager(this)
    this.playerStatus = new PlayerStatus(this)
    this.knight = this.add.knight()
    collidersRegistration(this)
  }

  update() {
    this.knight.update()
  }
}
