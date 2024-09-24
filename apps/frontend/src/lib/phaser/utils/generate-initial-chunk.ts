import cloneDeep from 'lodash.clonedeep'
import sample from 'lodash.sample'

import { grass, PLATFORM_MAP_KEYS } from '../assets'
import { CHUNK_SIZE, PLATAU_GRASS_CHANCE } from '../constants'
import type { IScene, MapTypeExtended, MapTypeMember, PlayerState } from '../types'

import { emitError } from './emit-error'
import { getPlatformMap } from './get-platform-map'
import { translateMapTypes } from './translate-map-types'

export const generateInitialChunk = (scene: IScene, state: PlayerState) => {
  const baseMap = getPlatformMap(scene, PLATFORM_MAP_KEYS.BASE)
  const iterations = Math.ceil(CHUNK_SIZE / (baseMap?.width ?? 1)) * 2
  const chunkMap: MapTypeExtended[] = []

  if (baseMap) {
    for (let index = 0; index < iterations; index += 1) {
      const localMap = cloneDeep(baseMap)

      if (PLATAU_GRASS_CHANCE > Math.random()) {
        const grassSample = sample(grass)

        if (grassSample && localMap) {
          // eslint-disable-next-line prettier/prettier
          (localMap.map.at(-2) as unknown as MapTypeMember[])[0] = grassSample ? `${grassSample.toString()}.{D}` : 0
        }
      }
      chunkMap.push({ ...localMap, coins: [null] })
    }
  }

  if (!baseMap) {
    emitError('Can´t get baseMap')
  }

  const translatedMaps = translateMapTypes(scene, state, chunkMap, 0)
  return translatedMaps
}
