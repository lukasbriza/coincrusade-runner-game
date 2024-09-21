/* eslint-disable unicorn/no-array-reduce */
import { FACTOR_DISTRIBUTIONS } from '../constants'
import { getGameStateContext } from '../singletons'
import { SuggestedAction, type IScene, type MapTypeExtended } from '../types'
import { applyDifficultyDecreasePolicy, applyDifficultyIncreasePolicy, generateMap, pickBasedOnWeights } from '../utils'

import { generateFirstChunk } from './helpers/generate-first-chunk'
import type { IPlatformGenerator } from './types'

export class HamletSystemGenerator implements IPlatformGenerator {
  private scene: IScene

  constructor(scene: IScene) {
    this.scene = scene
  }

  public async generate() {
    const promise = new Promise<MapTypeExtended[]>((resolve) => {
      // SETUP
      const finalMaps: MapTypeExtended[] = []
      const stateSingleton = getGameStateContext()
      const chunks = stateSingleton.getLastTwoChunks()
      // eslint-disable-next-line prefer-const
      let lenght = 0

      // FIRST TWO CHUNKS FLOW
      if (!chunks) {
        generateFirstChunk(this.scene, stateSingleton.chances, finalMaps, lenght)
        resolve(finalMaps)
        return
      }

      // PREPARE STATISTICAL DATA
      const { lostLives, elapsedSeconds, gainedSeconds, generatedCoins, pickedCoins } = chunks
        .map((chunk) => ({
          lostLives: chunk.chunkLostLives,
          elapsedSeconds: chunk.chunkElapsedSeconds,
          gainedSeconds: chunk.chunkGainedSeconds,
          generatedCoins: chunk.chunkGeneratedCoins,
          pickedCoins: chunk.chunkPickedCoins,
        }))
        .reduce((previous, actual) => ({
          lostLives: previous.lostLives + actual.lostLives,
          elapsedSeconds: previous.elapsedSeconds + actual.elapsedSeconds,
          gainedSeconds: previous.gainedSeconds + actual.gainedSeconds,
          generatedCoins: previous.generatedCoins + actual.generatedCoins,
          pickedCoins: previous.pickedCoins + actual.pickedCoins,
        }))

      // COMPUTE NORMALIZED INVENTORY LEVEL
      const coinLevel = pickedCoins / generatedCoins

      const timePerformance = gainedSeconds / elapsedSeconds
      const timeLevel = timePerformance > 1 ? 1 : timePerformance

      const livesPerformance =
        lostLives > this.scene.gameConfig.maxPlayerLifes ? this.scene.gameConfig.maxPlayerLifes : lostLives
      const livesLevel = 1 - livesPerformance / this.scene.gameConfig.maxPlayerLifes

      const inventoryLevel = (coinLevel + timeLevel + livesLevel) / 3

      // ADJUSTMENT DISTRIBUTION CHANCES
      const pickIndex = pickBasedOnWeights(FACTOR_DISTRIBUTIONS)

      // RESOLVE DIFFICULTY ADJUSTMENT BASED ON DIFFICULTY LEVEL
      if (inventoryLevel > 0.55) {
        applyDifficultyIncreasePolicy(pickIndex, this.scene.gameConfig, 15)
      }
      if (inventoryLevel < 0.45) {
        applyDifficultyDecreasePolicy(pickIndex, this.scene.gameConfig, 15)
      }
      if (inventoryLevel >= 0.45 && inventoryLevel <= 0.55) {
        stateSingleton.changeDifficultyScoreAction(SuggestedAction.neutral)
      }

      // MAP GENERATION
      generateMap(this.scene, stateSingleton.chances, finalMaps, lenght)
      resolve(finalMaps)
    })

    return promise
  }
}
