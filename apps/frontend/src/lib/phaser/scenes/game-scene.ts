import { Scene } from 'phaser'

import { animationsRegistration } from '../animations'
import { KEYS } from '../assets'
import {
  initCoinFactory,
  initKnightFactory,
  initLifeFactory,
  initNoteFactory,
  initPowerBarFactory,
  initTextFactory,
} from '../factories'
import { checkersRegistration } from '../helpers'
import { addBackgorund, loadFonts, loadImages, loadPlatformMaps, loadSprites } from '../utils'

export class GameScene extends Scene {
  public knight: IKnight

  constructor() {
    super('game')
  }

  preload() {
    this.physics.world.setFPS(50)
    initKnightFactory()
    initCoinFactory()
    initLifeFactory()
    initPowerBarFactory()
    initTextFactory()
    initNoteFactory()

    loadImages(this)
    loadPlatformMaps(this)
    loadSprites(this)
    loadFonts(this)
  }

  create() {
    animationsRegistration(this)
    checkersRegistration(this)
    addBackgorund(this, KEYS.BACKGROUND)
    this.knight = this.add.knight()
  }

  update() {
    this.knight.update()
  }
}
