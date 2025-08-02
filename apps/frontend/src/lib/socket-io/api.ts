import type { ChunkLog } from '../phaser'

export type GameLogsRto = {
  id: string
}

export type NeuralNetworkRto = {
  increase: number
  stay: number
  decrease: number
}

export type SaveGameLogsDto = {
  logs: (ChunkLog & { gameEngine: string })[]
}

export type ErrorRto = {
  message: string
}

export type NnPredictDto = {
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
  gameEngine: string
  engineSuggestedAction?: 'decrease' | 'increase' | 'neutral' | undefined
  chunkCreated: Date
}

export type MailDto = {
  subject: string
  text: string
}

export type MailRto = {
  success: boolean
  message: string
}

export type ServerToClientEvents = {
  'game-log-save-response': (data: GameLogsRto) => void
  'mail-send-response': (data: MailRto) => void
  error: (error: ErrorRto) => void
}

export type ClientToServerEvents = {
  'game-log-save': (data: SaveGameLogsDto) => void
  'nn-predict': (data: NnPredictDto) => void
  'mail-send': (data: MailDto) => void
}
