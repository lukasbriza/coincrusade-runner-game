import { KEYS } from '../assets'
import { CHECKER_PROPS, TILE_HEIGHT, TILE_WIDTH } from '../constants'
import type {
  ImageWithDynamicBody,
  IScene,
  MapTypeExtended,
  PlayerState,
  SpriteWithDynamicBody,
  TilesResult,
} from '../types'

import { cleanTileName } from './clean-tile-name'
import { isDecorationSprite } from './is-decoration-sprite'
import { isObstacleSprite } from './is-obstacle-sprite'
import { processDecoration } from './process-decoration'
import { processObstacle } from './process-obstacle'
import { setupAssetBase } from './setup-asset-base'
import { setupPlatform } from './setup-platform'

export const tileTranslationMatrix = (
  scene: IScene,
  state: PlayerState,
  extendedMap: MapTypeExtended,
  lastMapFromGeneratedChunk: boolean,
  xStartPosition: number = 0,
): TilesResult => {
  const coins: ICoin[] = []
  const platforms: SpriteWithDynamicBody[] = []
  const decorations: ImageWithDynamicBody[] = []
  const obstacles: SpriteWithDynamicBody[] = []
  const slopeTriggers: SpriteWithDynamicBody[] = []

  for (const [xOffset, tile] of extendedMap.coins.entries()) {
    if (tile === 'coin') {
      const x = xOffset * TILE_WIDTH + xStartPosition
      const coin = scene.add.coin(0, 0)
      coin.setPosition(x + TILE_WIDTH / 2 - (coin.body?.width ?? 0) / 2, 0)
      setupAssetBase(state, coin)
      coin.setImmovable(false)
      coins.push(coin)
    }
  }

  for (const [yOffset, row] of extendedMap.map.entries()) {
    const y = yOffset * TILE_HEIGHT

    for (const [xOffset, tile] of row.entries()) {
      const x = xOffset * TILE_WIDTH + xStartPosition
      const isBottomTile = yOffset === extendedMap.map.length - 1
      const isFirstColumn = xOffset === 0
      const chunkEnd = lastMapFromGeneratedChunk && xOffset === row.length - 1

      if (isBottomTile) {
        const slopeTrigger = scene.physics.add.sprite(x, y, KEYS.GROUND)
        setupAssetBase(state, slopeTrigger)
        slopeTrigger.resetCollisionCategory()
        slopeTrigger.setAlpha(0)
        slopeTrigger.setDataEnabled()
        slopeTrigger.setData(CHECKER_PROPS.SLOPE, true)

        // MARK FOR CHUNK END LOG
        if (chunkEnd) {
          slopeTrigger.setData(CHECKER_PROPS.CHUNK_END, true)
          slopeTrigger.setAlpha(1)
          slopeTrigger.setDepth(10)
          slopeTrigger.setTintFill(0xff_00_00) // 0xff_00_00
        }

        // MARK FOR MAP DIFFICULTY LOG
        if (isFirstColumn) {
          slopeTrigger.setData(CHECKER_PROPS.MAP_DIFFICULTY, extendedMap.difficulty)
        }

        slopeTriggers.push(slopeTrigger)
      }

      if (typeof tile === 'string') {
        // eslint-disable-next-line prefer-const
        let cleanName = cleanTileName(tile)
        const isDecoration = isDecorationSprite(tile)
        const isObstacle = isObstacleSprite(cleanName)
        // console.log({ cleanName, isDecoration, isObstacle })

        if (isDecoration) {
          const decX = x + TILE_WIDTH / 2
          const decY = y + TILE_HEIGHT
          processDecoration(scene, state, cleanName, decX, decY, decorations)
        }

        if (!isDecoration && isObstacle) {
          processObstacle(scene, state, cleanName, x, y, obstacles)
        }

        if (!isDecoration && !isObstacle) {
          setupPlatform(scene, state, cleanName, x, y, platforms)
        }
      }
    }
  }

  return { platforms, decorations, obstacles, slopeTriggers, coins }
}
