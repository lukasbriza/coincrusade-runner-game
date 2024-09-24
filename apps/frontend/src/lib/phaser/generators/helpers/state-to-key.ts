import { stateConvert } from './state-convert'

export const stateToKey = (coinRatio: number, liveRatio: number, timeRatio: number) =>
  `${stateConvert(coinRatio)}-${stateConvert(liveRatio)}-${stateConvert(timeRatio)}`
