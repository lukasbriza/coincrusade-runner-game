/* eslint-disable no-new-object */
import type { Scene } from 'phaser'

import type { PLATFORM_MAP_KEYS } from '../assets'
import type { MapType } from '../types'

import { emitError } from './emit-error'

export const getPlatformMap = (scene: Scene, mapKey: PLATFORM_MAP_KEYS) => {
  const json = scene.cache.json.get(mapKey) as JSON
  if (
    Object.prototype.hasOwnProperty.call(json, 'width') &&
    Object.prototype.hasOwnProperty.call(json, 'difficulty') &&
    Object.prototype.hasOwnProperty.call(json, 'map')
  ) {
    return json as unknown as MapType
  }
  emitError(`Unexpected error in getPlatformMap with key: ${mapKey}`)
}
