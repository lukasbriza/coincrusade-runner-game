import type { LastChunk } from '@/lib/phaser'

export const initLastChunk = (): LastChunk => ({
  lastChunkLostLives: 0,
  lastChunkElapsedSeconds: 0,
  lastChunkGainedSeconds: 0,
  lastChunkPickedCoins: 0,
  lastChunkGeneratedCoins: 0,
  lastChunkMapDifficulties: [],
  lastChunkSuggestedAction: undefined,
  lastChunkChange: undefined,
})
