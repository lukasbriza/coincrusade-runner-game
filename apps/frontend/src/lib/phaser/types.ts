export type SuggesteAction = 'decrease' | 'increase' | 'neutral' | undefined

export enum ChangeTypes {
  IncreasePlatformSpeed = 'IncreasePlatformSpeed',
  DecreasePlatformSpeed = 'DecreasePlatformSpeed',
  IncreaseCoinChance = 'IncreaseCoinChance',
  DecreaseCoinChance = 'DecreaseCoinChance',
  IncreaseMapDifficulty = 'IncreaseMapDifficulty',
  DecreaseMapDifficulty = 'DecreaseMapDifficulty',
  IncreaseChestChance = 'IncreaseChestChance',
  DecreaseChestChance = 'DecreaseChestChance',
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
  engineSuggestedAction: SuggesteAction
  chunkCreated: Date
}

export type LastChunk = {
  lastChunkLostLives: number
  lastChunkElapsedSeconds: number
  lastChunkGainedSeconds: number
  lastChunkPickedCoins: number
  lastChunkGeneratedCoins: number
  lastChunkMapDifficulties: number[]
  lastChunkSuggestedAction: SuggesteAction
  lastChunkChange?: ChangeTypes | undefined
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
}
