/* eslint-disable lines-between-class-members */
/* eslint-disable no-console */
import type { Types } from 'phaser'

import { SOUND_KEYS } from '../assets'
import { SOUND_CONFIG } from '../constants'
import type { IScene } from '../types'

import type { GameSoundsContextSingleton, SoundRecords } from './types'

class GameSoundsContext implements GameSoundsContextSingleton {
  private scene: IScene
  public soundEnabled: boolean = true
  public soundRecords: SoundRecords = new Map()

  constructor(scene: IScene) {
    this.scene = scene

    const keys = Object.keys(SOUND_KEYS)
    for (const key of keys) {
      const enumKey = key as keyof typeof SOUND_KEYS
      if (enumKey !== 'COIN_PICK_SOUND') {
        this.soundRecords.set(
          SOUND_KEYS[key as keyof typeof SOUND_KEYS] as SOUND_KEYS,
          scene.sound.add(SOUND_KEYS[key as keyof typeof SOUND_KEYS]),
        )
      }
    }
  }

  public isPaused = (key: SOUND_KEYS) => this.soundRecords.get(key)?.isPaused as boolean

  public isPlaying = (key: SOUND_KEYS) => this.soundRecords.get(key)?.isPlaying as boolean

  public playSound = (key: SOUND_KEYS, config?: Types.Sound.SoundConfig) => {
    if (this.soundEnabled) {
      if (this.isPaused(key)) {
        this.soundRecords.get(key)?.resume()
        return
      }
      this.soundRecords.get(key)?.play(config)
    }
  }

  public pauseSound = (key: SOUND_KEYS) => this.soundRecords.get(key)?.pause()

  public restartSound = (key: SOUND_KEYS, scene: IScene, config?: Types.Sound.SoundConfig) => {
    if (this.soundEnabled) {
      this.soundRecords.get(key)?.destroy()
      this.soundRecords.set(key, scene.sound.add(key))
      this.soundRecords.get(key)?.play(config)
    }
  }

  public playPickCoinSound = () => {
    if (this.soundEnabled) {
      const sound = this.scene.sound.add(SOUND_KEYS.COIN_PICK_SOUND)
      sound.play(SOUND_CONFIG.COIN)
      sound.once('complete', () => {
        sound.destroy()
      })
    }
  }
}

// eslint-disable-next-line prefer-const
let gameSoundContext: GameSoundsContextSingleton

export const initGameSoundContext = (scene: IScene) => {
  if (gameSoundContext) {
    return
  }
  gameSoundContext = new GameSoundsContext(scene)
}

export const getGameSoundContext = () => gameSoundContext
