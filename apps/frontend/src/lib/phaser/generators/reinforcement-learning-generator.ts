/* eslint-disable class-methods-use-this */
/* eslint-disable lines-between-class-members */
import { DIFF_POLICY, FACTOR_DISTRIBUTIONS } from '../constants'
import { getGameStateContext } from '../singletons'
import type { IScene, MapTypeExtended } from '../types'
import { applyDifficultyDecreasePolicy, applyDifficultyIncreasePolicy, generateMap, pickBasedOnWeights } from '../utils'

import { calculateReward, chooseAction, getMaxQ, getState, initQState, stateToKey } from './helpers'
import type { IPlatformGenerator, QTableType } from './types'

export class ReinforcementLearningGenerator implements IPlatformGenerator {
  private scene: IScene
  private QTable: QTableType = {}
  private alpha: number = 0.4
  private gamma: number = 0.9
  private epsilon: number = 0.2

  constructor(scene: IScene) {
    this.scene = scene
  }

  public async generate() {
    const promise = new Promise<MapTypeExtended[]>((resolve) => {
      // SETUP
      const stateSingleton = getGameStateContext()
      const chunks = stateSingleton.getLastTwoChunks()
      const finalMaps: MapTypeExtended[] = []
      // eslint-disable-next-line prefer-const
      let lenght = 0

      // INITIAL STATE
      const initialState1 = stateToKey(1, 1, 1)
      const initialState2 = stateToKey(0, 0, 0)

      if (!this.QTable[initialState1]) {
        this.QTable[initialState1] = [1, 0]
      }
      if (!this.QTable[initialState2]) {
        this.QTable[initialState2] = [0, 1]
      }

      const pickIndex = pickBasedOnWeights(FACTOR_DISTRIBUTIONS)

      if (!chunks) {
        // eslint-disable-next-line no-console
        console.log('Not enough chunks.')
        applyDifficultyIncreasePolicy(pickIndex, this.scene.gameConfig, 15)
        generateMap(this.scene, stateSingleton.chances, finalMaps, lenght)
        resolve(finalMaps)
        return
      }

      const state = getState(chunks[0], this.scene)
      const nextState = getState(chunks[1], this.scene)
      const action = chooseAction(state, this.QTable, this.epsilon)
      const reward = calculateReward(state, nextState)

      // QLEARNING
      const stateKey = stateToKey(state.coinRatio, state.liveRatio, state.timeRatio)
      const nextStateKey = stateToKey(nextState.coinRatio, nextState.liveRatio, nextState.timeRatio)
      initQState(this.QTable, stateKey)
      initQState(this.QTable, nextStateKey)

      const maxQOfNextState = getMaxQ(nextStateKey, this.QTable)
      const actionIndex = action === DIFF_POLICY.INCREASE ? 0 : 1
      this.QTable[stateKey][actionIndex] +=
        this.alpha * (reward + (this.gamma * maxQOfNextState - this.QTable[stateKey][actionIndex]))

      // ADJUSTMENT
      switch (action) {
        case DIFF_POLICY.INCREASE: {
          applyDifficultyIncreasePolicy(pickIndex, this.scene.gameConfig, 15)
          break
        }
        default: {
          applyDifficultyDecreasePolicy(pickIndex, this.scene.gameConfig, 15)
        }
      }

      // MAP GENERATION
      generateMap(this.scene, stateSingleton.chances, finalMaps, lenght)
      resolve(finalMaps)
    })
    return promise
  }
}
