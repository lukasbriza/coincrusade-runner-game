/* eslint-disable no-continue */
import cloneDeep from 'lodash.clonedeep'
import sample from 'lodash.sample'

import type { KEYS } from '../assets'
import { grass, PLATFORM_MAP_KEYS, stumpAndTrees, tents } from '../assets'
import { TILE_WIDTH } from '../constants'
import type { Chances, IScene, MapType, MapTypeExtended } from '../types'

import { getChance } from './get-chance'
import { getPlatformMap } from './get-platform-map'
import { randomNumber } from './random-number'

export const addRandomPlatau = (scene: IScene, map: MapTypeExtended, chances: Chances) => {
  // eslint-disable-next-line prefer-const
  let clonedMap = cloneDeep(map)
  const plataus = randomNumber(chances.minPlatauCount, chances.maxPlatauCount, true)
  const baseMap = getPlatformMap(scene, PLATFORM_MAP_KEYS.BASE) as MapType

  let tentAdded = false
  let treeOrStumpCount = 0

  for (let index = 0; index < plataus; index += 1) {
    const tentChance = getChance(chances.platauTentChance)
    const grassChance = getChance(chances.platauGrassChance)
    const stumpOrTreeChance = getChance(chances.platauTreeOrStumpChance)

    clonedMap.coins.push(null)
    clonedMap.width += TILE_WIDTH

    for (const [index, row] of clonedMap.map.entries()) {
      let decoration: KEYS | number = 0

      if (clonedMap.map.length - 2 === index) {
        if (tentAdded === false && tentChance) {
          const tent = sample(tents)
          if (tent) {
            decoration = tent
          }
          tentAdded = true
        }

        if (!decoration && chances.maxStumpsAndTreesOnPlatau > treeOrStumpCount && stumpOrTreeChance) {
          const stumpOrTree = sample(stumpAndTrees)
          if (stumpOrTree) {
            decoration = stumpOrTree
          }
          treeOrStumpCount += 1
        }

        if (!decoration && grassChance) {
          const grasSample = sample(grass)
          if (grasSample) {
            decoration = grasSample
          }
        }

        clonedMap.map[index] = [...row, decoration ? `${decoration.toString()}.{D}` : 0]
        continue
      }

      clonedMap.map[index] = [...row, ...baseMap.map[index]]
    }
  }
  return clonedMap
}
