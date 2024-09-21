import type { IScene } from '../types'

import { getAllMaps } from './get-all-maps'

export const getAvailableMapDifficultyRange = (scene: IScene) => {
  const maps = getAllMaps(scene)
  return [...new Set(maps.map((map) => map.difficulty).sort((a, b) => a - b))]
}
