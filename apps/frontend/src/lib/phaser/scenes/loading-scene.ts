/* eslint-disable class-methods-use-this */
import { Scene } from 'phaser'

import type { GameConfiguration } from '@/shared/components'

import { EventBus, EventBusEvents } from '../events'
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

    EventBus.on(EventBusEvents.LoadConfigurationCallback, (config: GameConfiguration) => {
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
    EventBus.emit(EventBusEvents.LoadConfiguration)
  }
}
