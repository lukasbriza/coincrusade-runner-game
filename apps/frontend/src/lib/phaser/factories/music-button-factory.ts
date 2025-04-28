/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */
/* eslint-disable func-names */
import { GameObjects } from 'phaser'

import { SOUND_KEYS, UI_KEYS } from '../assets'
import { SOUND_CONFIG } from '../constants'
import { gameEndListener, gameRestartListener } from '../events'
import { getGameSoundContext } from '../singletons/sound-context'
import type { IScene } from '../types'

import { Button } from './button-factory'

export class MusicButton extends Button implements IMusicButton {
  constructor(scene: IScene, x: number, y: number) {
    super(scene, x, y, UI_KEYS.MUSIC_GREY_ON)
    this.initMusic()
    this.setOrigin(1, 0)
    this.setScale(2)
    this.setInteractive({
      useHandCursor: true,
    })

    this.on('pointerdown', () => {
      if (!this.isBlocked) {
        const soundContext = getGameSoundContext()

        if (soundContext.soundEnabled) {
          this.mousePointerDown(UI_KEYS.MUSIC_GREY_ON_LIGHT_PRESSED)
          soundContext.soundEnabled = false
          return
        }
        if (!soundContext.soundEnabled) {
          this.mousePointerDown(UI_KEYS.MUSIC_GREY_OFF_LIGHT_PRESSED)
          soundContext.soundEnabled = true
        }
      }
    })
    this.on('pointerup', () => {
      if (!this.isBlocked) {
        const soundContext = getGameSoundContext()
        if (soundContext.soundEnabled) {
          this.mousePointerUp(UI_KEYS.MUSIC_GREY_ON)

          const soundContext = getGameSoundContext()
          if (soundContext.isPaused(SOUND_KEYS.BACKGORUND_MUSIC)) {
            soundContext.playSound(SOUND_KEYS.BACKGORUND_MUSIC, SOUND_CONFIG.BACKGROUND)
          }
          if (soundContext.isPaused(SOUND_KEYS.RUN_SOUND)) {
            soundContext.playSound(SOUND_KEYS.RUN_SOUND, SOUND_CONFIG.RUN)
          }
        }
        if (!soundContext.soundEnabled) {
          this.mousePointerUp(UI_KEYS.MUSIC_GREY_OFF)

          if (soundContext.isPlaying(SOUND_KEYS.BACKGORUND_MUSIC)) {
            soundContext.pauseSound(SOUND_KEYS.BACKGORUND_MUSIC)
          }
          if (soundContext.isPlaying(SOUND_KEYS.RUN_SOUND)) {
            soundContext.pauseSound(SOUND_KEYS.RUN_SOUND)
          }
        }
      }
    })
    this.on('pointerover', () => {
      if (!this.isBlocked) {
        const soundContext = getGameSoundContext()
        if (soundContext) {
          this.mouseEnter(UI_KEYS.MUSIC_GREY_ON_LIGHT)
        }
        if (!soundContext) {
          this.mouseEnter(UI_KEYS.MUSIC_GREY_OFF_LIGHT)
        }
      }
    })
    this.on('pointerout', () => {
      if (!this.isBlocked) {
        const soundContext = getGameSoundContext()
        if (soundContext.soundEnabled) {
          this.mouseLeave(UI_KEYS.MUSIC_GREY_ON)
        }
        if (!soundContext.soundEnabled) {
          this.mouseLeave(UI_KEYS.MUSIC_GREY_OFF)
        }
      }
    })

    gameEndListener(() => {
      const soundContext = getGameSoundContext()
      soundContext.pauseSound(SOUND_KEYS.BACKGORUND_MUSIC)
      soundContext.pauseSound(SOUND_KEYS.RUN_SOUND)
    })

    gameRestartListener(() => {
      const soundContext = getGameSoundContext()
      if (soundContext.soundEnabled) {
        soundContext.restartSound(SOUND_KEYS.BACKGORUND_MUSIC, this.scene, SOUND_CONFIG.BACKGROUND)
        soundContext.restartSound(SOUND_KEYS.RUN_SOUND, this.scene, SOUND_CONFIG.RUN)
      }
    })
  }

  private initMusic() {
    const soundContext = getGameSoundContext()
    soundContext.playSound(SOUND_KEYS.BACKGORUND_MUSIC, SOUND_CONFIG.BACKGROUND)
    soundContext.playSound(SOUND_KEYS.RUN_SOUND, SOUND_CONFIG.RUN)
  }
}

export const initMusicButtonFactory = () => {
  GameObjects.GameObjectFactory.register(
    'musicButton',
    function (this: GameObjects.GameObjectFactory, x: number, y: number) {
      const musicButton = new MusicButton(this.scene as IScene, x, y)
      this.displayList.add(musicButton)
      this.updateList.add(musicButton)
      return musicButton
    },
  )
}
