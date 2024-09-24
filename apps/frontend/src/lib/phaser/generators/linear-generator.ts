/* eslint-disable class-methods-use-this */
import { FACTOR_DISTRIBUTIONS } from '../constants'
import { getGameStateContext } from '../singletons'
import type { IScene, MapTypeExtended } from '../types'
import { applyDifficultyIncreasePolicy, generateMap, pickBasedOnWeights } from '../utils'

import type { IPlatformGenerator } from './types'

export class LinearGenerator implements IPlatformGenerator {
  private scene: IScene

  constructor(scene: IScene) {
    this.scene = scene
  }

  public async generate() {
    const promise = new Promise<MapTypeExtended[]>((resolve) => {
      const stateSingleton = getGameStateContext()
      const pickIndex = pickBasedOnWeights(FACTOR_DISTRIBUTIONS)
      applyDifficultyIncreasePolicy(pickIndex, this.scene.gameConfig, 15)

      const finalMaps: MapTypeExtended[] = []
      // eslint-disable-next-line prefer-const
      let lenght = 0

      generateMap(this.scene, stateSingleton.chances, finalMaps, lenght)
      resolve(finalMaps)
    })
    return promise
  }
}
