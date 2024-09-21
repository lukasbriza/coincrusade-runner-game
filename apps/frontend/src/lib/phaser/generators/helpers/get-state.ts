import type { ChunkLog, IScene } from '../../types'

export const getState = (chunk: ChunkLog, scene: IScene) => {
  const coinTemporary = chunk.chunkPickedCoins / chunk.chunkGeneratedCoins
  const coinRatio = coinTemporary > 1 ? 1 : coinTemporary
  const timeTemporary = chunk.chunkGainedSeconds / chunk.chunkElapsedSeconds
  const timeRatio = timeTemporary > 1 ? 1 : timeTemporary
  const liveRatio = 1 - chunk.chunkLostLives / scene.gameConfig.maxPlayerLifes
  return { coinRatio, timeRatio, liveRatio }
}
