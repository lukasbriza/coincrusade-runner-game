/* eslint-disable no-new-object */
import type { Scene } from 'phaser'

import type { PLATFORM_MAP_KEYS } from '../assets'

import { emitError } from './emit-error'

export const getPlatformMap = (scene: Scene, mapKey: PLATFORM_MAP_KEYS) => {
  const json = scene.cache.json.get(mapKey) as JSON
  const control = new Object(json)

  if (
    Object.prototype.hasOwnProperty.call(control, 'width') &&
    Object.prototype.hasOwnProperty.call(control, 'difficulty') &&
    Object.prototype.hasOwnProperty.call(control, 'map')
  ) {
    return json
  }
  emitError(`Unexpected error in AssetLoader.getPlatformMap with key: ${mapKey}`)
}
