import type { Scene } from 'phaser'

import { SOUND_KEYS, SOUNDS } from '../assets'

export const loadSounds = (scene: Scene) => {
  const keys = Object.keys(SOUND_KEYS).map((key) => SOUND_KEYS[key as keyof typeof SOUND_KEYS])
  for (const key of keys) {
    if (!scene.cache.audio.has(key)) {
      // eslint-disable-next-line no-console
      console.log(`loadSounds: loading ${key}`)
      const sound = SOUNDS[key]
      scene.load.audio(key, sound.path)
    }
  }
}
