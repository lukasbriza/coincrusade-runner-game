import type { GameConfiguration } from '@/shared/context'

import type { ColliderObject } from '../factories'
import type { Chances, ChangeTypes, ChunkLog, LastChunk, PlayerState, SuggestedAction } from '../types'

export type GameStateContextSingleton = {
  state: PlayerState
  lastChunk: LastChunk
  chunksData: ChunkLog[]
  chances: Chances
  config: GameConfiguration

  saveLogs: () => Promise<void>
  lifeAddAction: () => void
  leftSideCollisionAction: (knight: IKnight) => void
  onKnightHit: (knight: IKnight, obstacle: ColliderObject) => void
  onHitAction: () => void
  addSecondAction: () => void
  coinGeneratedAction: () => void
  logMapDifficultyAction: (mapDifficulty: number) => void
  chunkEndAction: () => void
  coinPickedAction: () => void
  secondsGainAction: (seconds: number) => void
  nullifyPlatformSpeedAction: () => void
  increasePlatformSpeedAction: (by?: number) => void
  decreasePlatformSpeedAction: (by?: number) => void
  changeDifficultyScoreAction: (action: SuggestedAction) => void
  setAppliedChangeAction: (change: ChangeTypes, speedChange?: number) => void
  increaseOvercomedSlopesAction: () => void
  getLastTwoChunks: () => ChunkLog[] | undefined
  getLastChunk: () => ChunkLog | undefined
  reset: () => void
}

export type GameStateContext = {
  state: PlayerState
  lastChunk: LastChunk
  chunksData: ChunkLog[]
  chances: Chances
}
