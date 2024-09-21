import type { MapTypeExtended } from '../types'

export type IPlatformGenerator = {
  generate: () => Promise<MapTypeExtended[]>
}

export type QTableType = { [key: string]: [number, number] }

export type QState = {
  coinRatio: number
  timeRatio: number
  liveRatio: number
}
