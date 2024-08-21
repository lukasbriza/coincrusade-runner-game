import type { Scene } from 'phaser'

import { PLATFORM_MAP_KEYS, PLATFORMS_MAPS } from '../assets'

export const loadPlatformMaps = (scene: Scene) => {
  const keys = Object.keys(PLATFORM_MAP_KEYS).map((key) => PLATFORM_MAP_KEYS[key as keyof typeof PLATFORM_MAP_KEYS])
  for (const key of keys) {
    const map = PLATFORMS_MAPS[key]
    scene.load.json(key, map.path)
  }
}