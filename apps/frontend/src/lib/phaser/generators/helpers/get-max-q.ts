import type { QTableType } from '../types'

export const getMaxQ = (QTableKey: string, QTable: QTableType) => {
  const actions = QTable[QTableKey]
  return actions[0] > actions[1] ? actions[0] : actions[1]
}
