import sample from 'lodash.sample'

import { TILE_WIDTH } from '../../constants'
import type { Chances, IScene, MapTypeExtended } from '../../types'
import { addRandomPlatau, computeCoinChances, getMapsByDifficulty } from '../../utils'

export const generateFirstChunk = (scene: IScene, chances: Chances, finalMaps: MapTypeExtended[], length: number) => {
  const maps = [...getMapsByDifficulty(scene, 1), ...getMapsByDifficulty(scene, 2)]
  const map = sample(maps) ?? maps[0]
  const coinArray = computeCoinChances(map.map, chances.coinGenerationChance)
  const extendedMap = { coins: coinArray, ...map }
  const extendedMapWithPlatau = addRandomPlatau(scene, extendedMap, chances)
  finalMaps.push(extendedMapWithPlatau)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, unused-imports/no-unused-vars
  length += TILE_WIDTH * extendedMap.map[0].length
}
