import type { QTableType } from '../types'

export const initQState = (QTable: QTableType, stateKey: string) => {
  if (QTable[stateKey] === undefined) {
    QTable[stateKey] = [0, 0]
  }
}
