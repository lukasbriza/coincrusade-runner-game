import type { IScene, MapTypeExtended, PlayerState, TilesResult } from '../types'

import { tileTranslationMatrix } from './tile-translation-matrix'

export const translateMapTypes = (
  scene: IScene,
  state: PlayerState,
  map: MapTypeExtended[],
  xStartPosition: number,
): TilesResult => {
  const result: TilesResult = {
    coins: [],
    platforms: [],
    decorations: [],
    obstacles: [],
    slopeTriggers: [],
  }
  let cumulativeMapWidth = 0

  const translationResult: TilesResult[] = map.map((mapType, xOffset) => {
    const isLastFromChunk = xOffset === map.length - 1 && mapType.difficulty !== 0
    const xStart = cumulativeMapWidth + xStartPosition
    cumulativeMapWidth += mapType.width
    return tileTranslationMatrix(scene, state, mapType, isLastFromChunk, xStart)
  })

  for (const translation of translationResult) {
    for (const coin of translation.coins) {
      result.coins.push(coin)
    }
    for (const decoration of translation.decorations) {
      result.decorations.push(decoration)
    }
    for (const obstacle of translation.obstacles) {
      result.obstacles.push(obstacle)
    }
    for (const platform of translation.platforms) {
      result.platforms.push(platform)
    }
    for (const slopeTrigger of translation.slopeTriggers) {
      result.slopeTriggers.push(slopeTrigger)
    }
  }

  return result
}
