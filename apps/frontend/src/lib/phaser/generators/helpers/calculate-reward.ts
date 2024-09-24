import type { QState } from '../types'

export const calculateReward = (state: QState, nextState: QState) => {
  const stateValue = (state.coinRatio + state.liveRatio + state.timeRatio) / 3
  const nextStateValue = (nextState.coinRatio + nextState.liveRatio + nextState.timeRatio) / 3

  const diffFromOptimalState = stateValue < 0.5 ? 0.5 - stateValue : stateValue - 0.5
  const diffFromOptimalNextState = nextStateValue < 0.5 ? 0.5 - nextStateValue : nextStateValue - 0.5

  // REWARD
  if (diffFromOptimalState >= diffFromOptimalNextState) {
    return (diffFromOptimalState - diffFromOptimalNextState) * 10
  }
  // PUNISHMENT
  return -(diffFromOptimalNextState - diffFromOptimalState) * 10
}
