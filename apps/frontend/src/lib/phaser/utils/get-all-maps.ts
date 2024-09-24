import type { Scene } from 'phaser'

import { PLATFORM_MAP_KEYS } from '../assets'

import { getPlatformMap } from './get-platform-map'

export const getAllMaps = (scene: Scene) => {
  const keys = Object.keys(PLATFORM_MAP_KEYS)
    .map((key) => PLATFORM_MAP_KEYS[key as keyof typeof PLATFORM_MAP_KEYS])
    .filter((key) => key !== PLATFORM_MAP_KEYS.BASE)
  const maps = keys.map((mapKey) => getPlatformMap(scene, mapKey))
  return maps.filter((map) => map !== undefined)
}
