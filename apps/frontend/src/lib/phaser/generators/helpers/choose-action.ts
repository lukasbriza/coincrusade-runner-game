import sample from 'lodash.sample'

import { DIFF_POLICY } from '../../constants'
import type { QState, QTableType } from '../types'

import { stateToKey } from './state-to-key'

export const chooseAction = (state: QState, QTable: QTableType, epsilon: number) => {
  const policyArray = [DIFF_POLICY.INCREASE, DIFF_POLICY.DECREASE]
  if (Math.random() < epsilon) {
    return sample(policyArray)
  }

  const stateKey = stateToKey(state.coinRatio, state.liveRatio, state.timeRatio)
  const hasKey = Object.keys(QTable).find((k) => k === stateKey)
  if (hasKey) {
    return QTable[stateKey][0] > QTable[stateKey][1] ? DIFF_POLICY.INCREASE : DIFF_POLICY.DECREASE
  }
  return sample(policyArray)
}
