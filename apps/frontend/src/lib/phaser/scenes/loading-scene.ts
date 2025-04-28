/* eslint-disable class-methods-use-this */
import { Scene } from 'phaser'

import { getSocketContext } from '@/lib/socket-io'

import { EventBus, EventBusEvents, loadConfigurationCallbackListener, loadProgressEmiter } from '../events'
import {
  initCoinFactory,
  initEmptyLifeFactory,
  initFullscreenButtonFactory,
  initKnightFactory,
  initLifeFactory,
  initMusicButtonFactory,
  initNoteFactory,
  initPowerBarFactory,
  initSettingsButtonFactory,
  initTextFactory,
  initWaterFactory,
} from '../factories'
import { loadFonts, loadImages, loadPlatformMaps, loadSounds, loadSprites, loadUiElements } from '../loaders'

export class LoadingScene extends Scene {
  constructor() {
    super({ key: 'loading' })
    const context = getSocketContext()
    if (context?.socket === null) {
      EventBus.emit(EventBusEvents.PrematureGameEnd)
      this.scene.stop('loading')
    }

    loadConfigurationCallbackListener((config) => {
      this.scene.stop('loading')
      this.scene.start('game', { gameConfig: config })
    })
  }

  preload() {
    this.physics.world.setFPS(50)
    this.load.on('progress', loadProgressEmiter)
    loadImages(this)
    loadUiElements(this)
    loadPlatformMaps(this)
    loadSprites(this)
    loadFonts(this)
    loadSounds(this)

    initKnightFactory()
    initCoinFactory()
    initLifeFactory()
    initEmptyLifeFactory()
    initPowerBarFactory()
    initTextFactory()
    initWaterFactory()
    initNoteFactory()
    initSettingsButtonFactory()
    initMusicButtonFactory()
    initFullscreenButtonFactory()
  }
}
