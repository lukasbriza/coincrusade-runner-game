import type { Chances, IScene } from '../types'

import { getAvailableMapDifficultyRange } from './get-available-map-difficulty-range'
import { pickBasedOnWeights } from './pick-based-on-weights'

export const weightedMapDifficultyPick = (scene: IScene, chances: Chances) => {
  const avaliableMapRange = getAvailableMapDifficultyRange(scene)
  const weights = avaliableMapRange.map((difficulty) => Math.exp(-(difficulty - 1) / chances.skillFactor))
  const preparedWeights = weights.map((weight) => Math.round(weight * 10))
  const pickIndex = pickBasedOnWeights(preparedWeights)
  return avaliableMapRange[pickIndex]
}
