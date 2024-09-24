import type { IScene } from '../types'

import { getAllMaps } from './get-all-maps'

export const getMapsByDifficulty = (scene: IScene, difficulty: number) => {
  const maps = getAllMaps(scene)
  return maps.filter((map) => map.difficulty === difficulty)
}
