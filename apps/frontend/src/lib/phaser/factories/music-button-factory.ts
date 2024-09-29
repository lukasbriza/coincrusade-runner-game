/* eslint-disable lines-between-class-members */
/* eslint-disable func-names */
import { GameObjects } from 'phaser'

import { SOUND_KEYS, UI_KEYS } from '../assets'
import type { IScene } from '../types'

import { Button } from './button-factory'
import type { SoundObject } from './types'

export class MusicButton extends Button implements IMusicButton {
  public isEnabled: boolean = true
  public music: SoundObject

  constructor(scene: IScene, x: number, y: number) {
    super(scene, x, y, UI_KEYS.MUSIC_GREY_ON)
    this.initMusic()
    this.setOrigin(1, 0)
    this.setScale(2)
    this.setInteractive({
      useHandCursor: true,
    })

    this.on('pointerdown', () => {
      if (this.isEnabled) {
        this.mousePointerDown(UI_KEYS.MUSIC_GREY_ON_LIGHT_PRESSED)
        this.isEnabled = false
        return
      }
      if (!this.isEnabled) {
        this.mousePointerDown(UI_KEYS.MUSIC_GREY_OFF_LIGHT_PRESSED)
        this.isEnabled = true
      }
    })
    this.on('pointerup', () => {
      if (this.isEnabled) {
        this.mousePointerUp(UI_KEYS.MUSIC_GREY_ON)
        if (this.music.isPaused) {
          this.music.play()
        }
      }
      if (!this.isEnabled) {
        this.mousePointerUp(UI_KEYS.MUSIC_GREY_OFF)
        if (this.music.isPlaying) {
          this.music.pause()
        }
      }
    })
    this.on('pointerover', () => {
      if (this.isEnabled) {
        this.mouseEnter(UI_KEYS.MUSIC_GREY_ON_LIGHT)
      }
      if (!this.isEnabled) {
        this.mouseEnter(UI_KEYS.MUSIC_GREY_OFF_LIGHT)
      }
    })
    this.on('pointerout', () => {
      if (this.isEnabled) {
        this.mouseLeave(UI_KEYS.MUSIC_GREY_ON)
      }
      if (!this.isEnabled) {
        this.mouseLeave(UI_KEYS.MUSIC_GREY_OFF)
      }
    })
  }

  private initMusic() {
    this.music = this.scene.sound.add(SOUND_KEYS.BACKGORUND_MUSIC)
    this.music.play({ loop: true, volume: 0.8 })
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
