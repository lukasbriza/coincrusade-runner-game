import { possibleParameterStates, qBorders } from './constants'

export const stateConvert = (number: number) => {
  if (number <= qBorders[0]) {
    return possibleParameterStates[0]
  }
  if (number > qBorders[1]) {
    return possibleParameterStates[2]
  }
  return possibleParameterStates[1]
}
