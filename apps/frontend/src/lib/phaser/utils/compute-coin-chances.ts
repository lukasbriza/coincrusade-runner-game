/* eslint-disable no-continue */
import type { MapTypeMember } from '../types'

import { canRenderCoin } from './can-render-coin'
import { getChance } from './get-chance'

export const computeCoinChances = (mapType: MapTypeMember[][], coinDropChance: number) => {
  const coinArray = []

  for (const [column] of mapType[0].entries()) {
    if (canRenderCoin(mapType, column)) {
      const isCoinChance = getChance(coinDropChance)
      coinArray.push(isCoinChance ? 'coin' : null)
      continue
    }
    coinArray.push(null)
  }

  return coinArray
}
