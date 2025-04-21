/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import type { NeuralNetworkRto } from '@/lib/socket-io'
import { getSocketContext } from '@/lib/socket-io'

import { DIFF_POLICY, FACTOR_DISTRIBUTIONS } from '../constants'
import { getGameStateContext } from '../singletons'
import { SuggestedAction, type IScene, type MapTypeExtended } from '../types'
import { applyDifficultyDecreasePolicy, applyDifficultyIncreasePolicy, generateMap, pickBasedOnWeights } from '../utils'

import { generateFirstChunk } from './helpers/generate-first-chunk'
import type { IPlatformGenerator } from './types'

export class NeuralNetworkGenerator implements IPlatformGenerator {
  private scene: IScene

  constructor(scene: IScene) {
    this.scene = scene
  }

  public async generate() {
    // SETUP
    const context = getSocketContext()
    const stateSingleton = getGameStateContext()
    const lastChunk = stateSingleton.getLastChunk()
    const finalMaps: MapTypeExtended[] = []
    // eslint-disable-next-line prefer-const
    let lenght = 0

    if (!context?.socket) {
      // eslint-disable-next-line no-console
      console.error('Unable to retrieve socket.')
    }

    if (!lastChunk || !context?.socket) {
      generateFirstChunk(this.scene, stateSingleton.chances, finalMaps, lenght)
      return finalMaps
    }

    const request = {
      chunkLostLives: lastChunk.chunkLostLives,
      chunkElapsedSeconds: lastChunk.chunkElapsedSeconds,
      chunkGainedSeconds: lastChunk.chunkGainedSeconds,
      chunkPickedCoins: lastChunk.chunkPickedCoins,
      chunkGeneratedCoins: lastChunk.chunkGeneratedCoins,
      chunkMapDifficulties: lastChunk.chunkMapDifficulties,
      chunkPlatformSpeed: lastChunk.chunkPlatformSpeed,
      chunkDifficultySkore: lastChunk.chunkDifficultySkore,
      gameTotalElapsedSeconds: lastChunk.gameTotalElapsedSeconds,
      gameTotalGainedSeconds: lastChunk.gameTotalGainedSeconds,
      gameEngine: stateSingleton.config.currentGenerator,
      engineSuggestedAction: lastChunk.engineSuggestedAction,
      chunkCreated: lastChunk.chunkCreated,
    }

    // NN PREDICT
    const data = await context.socket.emitWithAck<NeuralNetworkRto>('nn-predict', request)

    // ADJUSTMENT
    const pickIndex = pickBasedOnWeights(FACTOR_DISTRIBUTIONS)
    const array = [data.decrease, data.stay, data.increase]
    let indexOfHighestValue = 0

    for (const [index, p] of array.entries()) {
      if (p >= array[indexOfHighestValue]) {
        indexOfHighestValue = index
      }
    }

    switch (indexOfHighestValue) {
      case DIFF_POLICY.DECREASE: {
        applyDifficultyDecreasePolicy(pickIndex, stateSingleton.config, 15)
        break
      }
      case DIFF_POLICY.NOTHING: {
        stateSingleton.changeDifficultyScoreAction(SuggestedAction.neutral)
        break
      }
      case DIFF_POLICY.INCREASE: {
        applyDifficultyIncreasePolicy(pickIndex, stateSingleton.config, 15)
        break
      }
    }

    generateMap(this.scene, stateSingleton.chances, finalMaps, lenght)
    return finalMaps
  }
}
