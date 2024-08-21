import type { ChunkLog, LastChunk, PlayerState } from '@/lib/phaser'

export type SuggesteAction = 'decrease' | 'increase' | 'neutral' | undefined

export type GameStateContextProps = {
  state: PlayerState
  lastChunk: LastChunk
  chunksData: ChunkLog[]
}
