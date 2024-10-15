/* eslint-disable lines-between-class-members */
/* eslint-disable no-new */
import type { GameObjects } from 'phaser'
import { Scene } from 'phaser'

import type { GameConfiguration } from '@/shared/context'

import { animationsRegistration } from '../animations'
import { gamePauseListener, gameRestartListener, gameResumeListener } from '../events'
import { checkersRegistration, collidersRegistration } from '../helpers'
import type { IKeyboardManager, IPlatformManager, IPlayerStatus } from '../objects'
import { KeyboardManager, PlatformManager, PlayerStatus } from '../objects'
import { getGameStateContext } from '../singletons'
import type { IScene } from '../types'
import { addBackgorund } from '../utils'

export class GameScene extends Scene implements IScene {
  public knight: IKnight
  public platformManager: IPlatformManager
  public playerStatus: IPlayerStatus
  public gameConfig: GameConfiguration
  public keyboardManager: IKeyboardManager

  public background: GameObjects.TileSprite
  public hills: GameObjects.TileSprite
  public clouds: GameObjects.TileSprite

  constructor() {
    super({ key: 'game' })

    gamePauseListener(() => {
      this.game.pause()
    })
    gameResumeListener(() => {
      if (this.game.isPaused) {
        this.game.resume()
      }
    })
    gameRestartListener(() => {
      if (this.game.isPaused) {
        this.game.resume()
      }
    })
  }

  init(data: { gameConfig: GameConfiguration }) {
    this.gameConfig = data.gameConfig
  }

  create() {
    animationsRegistration(this)
    checkersRegistration(this)
    const { background, hills, clouds } = addBackgorund(this)
    this.background = background
    this.hills = hills
    this.clouds = clouds

    this.platformManager = new PlatformManager(this)
    this.keyboardManager = new KeyboardManager(this)
    this.playerStatus = new PlayerStatus(this)
    this.knight = this.add.knight()
    collidersRegistration(this)
  }

  update() {
    const gameStateSingleton = getGameStateContext()

    this.knight.update()

    if (!gameStateSingleton.state.playerIsDead) {
      this.background.tilePositionX += 0.8
      this.hills.tilePositionX += 0.4
    }
    this.clouds.tilePositionX += gameStateSingleton.state.playerIsDead ? 0.1 : 0.25
  }
}
