/* eslint-disable class-methods-use-this */
import { Scene } from 'phaser'

import { loadConfigurationCallbackListener, loadConfigurationEmiter } from '../events'
import {
  initCoinFactory,
  initEmptyLifeFactory,
  initKnightFactory,
  initLifeFactory,
  initNoteFactory,
  initPowerBarFactory,
  initTextFactory,
  initWaterFactory,
} from '../factories'
import { loadFonts, loadImages, loadPlatformMaps, loadSprites } from '../utils'

export class LoadingScene extends Scene {
  constructor() {
    super({ key: 'loading' })
    loadConfigurationCallbackListener((config) => {
      this.scene.stop('loading')
      this.scene.start('game', { gameConfig: config })
    })
  }

  preload() {
    this.physics.world.setFPS(50)
    loadImages(this)
    loadPlatformMaps(this)
    loadSprites(this)
    loadFonts(this)

    initKnightFactory()
    initCoinFactory()
    initLifeFactory()
    initEmptyLifeFactory()
    initPowerBarFactory()
    initTextFactory()
    initWaterFactory()
    initNoteFactory()
  }

  create() {
    loadConfigurationEmiter()
  }
}
