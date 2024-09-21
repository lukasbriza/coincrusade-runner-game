import type { Physics, Scene, Types } from 'phaser'

import type { GameConfiguration } from '@/shared/components'

import type { IPlatformManager, IPlayerStatus } from './objects'

export enum SuggestedAction {
  decrease = 'decrease',
  increase = 'increase',
  neutral = 'neutral',
}

export enum ChangeTypes {
  IncreasePlatformSpeed = 'IncreasePlatformSpeed',
  DecreasePlatformSpeed = 'DecreasePlatformSpeed',
  IncreaseCoinChance = 'IncreaseCoinChance',
  DecreaseCoinChance = 'DecreaseCoinChance',
  IncreaseMapDifficulty = 'IncreaseMapDifficulty',
  DecreaseMapDifficulty = 'DecreaseMapDifficulty',
}

export enum Generators {
  HamletSystem = 'HamletSystem',
  LinearGenerator = 'LinearGenerator',
  NeuralNetworkGenerator = 'NeuralNetworkGenerator',
  ReinforcementLearningGenerator = 'ReinforcementLearningGenerator',
}

export type ChunkLog = {
  chunkLostLives: number
  chunkElapsedSeconds: number
  chunkGainedSeconds: number
  chunkPickedCoins: number
  chunkGeneratedCoins: number
  chunkMapDifficulties: number[]
  chunkPlatformSpeed: number
  chunkDifficultySkore: number
  gameTotalElapsedSeconds: number
  gameTotalGainedSeconds: number
  engineSuggestedAction: SuggestedAction | undefined
  chunkCreated: Date
}

export type LastChunk = {
  lastChunkLostLives: number
  lastChunkElapsedSeconds: number
  lastChunkGainedSeconds: number
  lastChunkPickedCoins: number
  lastChunkGeneratedCoins: number
  lastChunkMapDifficulties: number[]
  lastChunkSuggestedAction: SuggestedAction | undefined
  lastChunkChange?: ChangeTypes | undefined
  lastChunkPlatformSpeed: number
}

export type PlayerState = {
  difficultyScore: number
  pickedCoins: number
  generatedCoins: number
  overcomedSlopes: number
  lostLives: number
  actualLives: number
  elapsedSeconds: number
  gainedSeconds: number
  playerIsDead: boolean
  platformSpeed: number
}

export type Chances = {
  maxPlatauCount: number
  minPlatauCount: number
  coinGenerationChance: number
  platauTentChance: number
  platauGrassChance: number
  platauTreeOrStumpChance: number
  maxStumpsAndTreesOnPlatau: number
  skillFactor: number
}

export type MapTypeMember = number | string
export type MapTypeExtended = MapType & { coins: (string | null)[] }

export type MapType = {
  width: number
  difficulty: number
  map: MapTypeMember[][]
}

export type IScene = Scene & {
  gameConfig: GameConfiguration
  platformManager: IPlatformManager
  playerStatus: IPlayerStatus
  knight: IKnight
}

export type SpriteWithDynamicBody = Physics.Arcade.Sprite | Types.Physics.Arcade.SpriteWithDynamicBody
export type ImageWithDynamicBody = Types.Physics.Arcade.ImageWithDynamicBody

export type TilesResult = {
  coins: ICoin[]
  platforms: SpriteWithDynamicBody[]
  obstacles: SpriteWithDynamicBody[]
  slopeTriggers: SpriteWithDynamicBody[]
  decorations: ImageWithDynamicBody[]
}
