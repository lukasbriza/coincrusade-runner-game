import sample from 'lodash.sample'

import { POOL_CONFIG, TILE_WIDTH } from '../constants'
import type { Chances, IScene, MapTypeExtended } from '../types'

import { addRandomPlatau } from './add-random-platau'
import { computeCoinChances } from './compute-coin-chances'
import { getMapsByDifficulty } from './get-maps-by-difficulty'
import { weightedMapDifficultyPick } from './weighted-map-difficulty-pick'

export const generateMap = (scene: IScene, chances: Chances, finalMaps: MapTypeExtended[], lenght: number) => {
  const wantedDifficultyValue = weightedMapDifficultyPick(scene, chances)
  const mapsByDifficulty = getMapsByDifficulty(scene, wantedDifficultyValue)
  const map = sample(mapsByDifficulty) ?? mapsByDifficulty[0]

  const coins: (string | null)[] = computeCoinChances(map.map, chances.coinGenerationChance)
  const extendedMap = { coins, ...map } as MapTypeExtended
  const extendedMapWithPlatau = addRandomPlatau(scene, extendedMap, chances)
  finalMaps.push(extendedMapWithPlatau)
  // eslint-disable-next-line unicorn/no-array-for-each
  extendedMap.map[0].forEach(() => {
    lenght += TILE_WIDTH
  })

  if (lenght < POOL_CONFIG.MAX_PACKAGE_WIDTH) {
    generateMap(scene, chances, finalMaps, lenght)
  }
}
