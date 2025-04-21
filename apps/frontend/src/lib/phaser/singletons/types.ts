import type { Types } from 'phaser'

import type { GameConfiguration } from '@/shared/context'

import type { SOUND_KEYS } from '../assets'
import type { ColliderObject, SoundObject } from '../factories'
import type { Chances, ChangeTypes, ChunkLog, IScene, LastChunk, PlayerState, SuggestedAction } from '../types'

export type GameStateContextSingleton = {
  state: PlayerState
  lastChunk: LastChunk
  chunksData: ChunkLog[]
  chances: Chances
  config: GameConfiguration

  saveLogsAction: () => void
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
export type SoundRecords = Map<SOUND_KEYS, SoundObject>

export type GameSoundsContextSingleton = {
  soundEnabled: boolean
  soundRecords: SoundRecords
  isPaused: (key: SOUND_KEYS) => boolean
  isPlaying: (key: SOUND_KEYS) => boolean
  playSound: (key: SOUND_KEYS, config?: Types.Sound.SoundConfig) => void
  pauseSound: (key: SOUND_KEYS) => void
  restartSound: (key: SOUND_KEYS, scene: IScene, config?: Types.Sound.SoundConfig) => void
  playPickCoinSound: () => void
}
