/* eslint-disable prettier/prettier */
import type { Dispatch, SetStateAction } from 'react'

import type { ChunkLog, LastChunk, PlayerState } from '@/lib/phaser'
import { initLastChunk } from '@/utils'

type SetPlayerStateAction = Dispatch<SetStateAction<PlayerState>>
type SetLastChunkAction = Dispatch<SetStateAction<LastChunk>>
type SetChunksDataAction = Dispatch<SetStateAction<ChunkLog[]>>

export const createLifeAddedAction = (setState: SetPlayerStateAction, setLastChunk: SetLastChunkAction) => () => {
  setState((state) => ({
    ...state,
    actualLives: state.actualLives + 1,
    lostLives: state.lostLives - 1,
  }))
  setLastChunk((lastChunk) => ({
    ...lastChunk,
    lastChunkLostLives: lastChunk.lastChunkLostLives - 1,
  }))
}

export const createOnHitAction = (setState: SetPlayerStateAction, setLastChunk: SetLastChunkAction) => () => {
  setState((state) => ({
    ...state,
    actualLives: state.actualLives - 1,
    lostLives: state.lostLives + 1,
    playerIsDead: state.actualLives === 1,
  }))
  setLastChunk((lastChunk) => ({
    ...lastChunk,
    lastChunkLostLives: lastChunk.lastChunkLostLives + 1,
  }))
}

export const createAddSecondAction = (setState: SetPlayerStateAction, setLastChunk: SetLastChunkAction) => () => {
  setState((state) => ({ ...state, elapsedSeconds: state.elapsedSeconds + 1 }))
  setLastChunk((lastChunk) => ({ ...lastChunk, lastChunkElapsedSeconds: lastChunk.lastChunkElapsedSeconds + 1 }))
}

export const createCoinGeneratedAction = (setState: SetPlayerStateAction, setLastChunk: SetLastChunkAction) => () => {
  setState((state) => ({ ...state, generatedCoins: state.generatedCoins + 1 }))
  setLastChunk((lastChunk) => ({ ...lastChunk, lastChunkGeneratedCoins: lastChunk.lastChunkGeneratedCoins + 1 }))
}

export const createLogMapDifficultyAction = (setLastChunk: SetLastChunkAction) => (mapDifficulty: number) => {
  setLastChunk((lastChunk) => ({
    ...lastChunk,
    lastChunkMapDifficulties: [...lastChunk.lastChunkMapDifficulties, mapDifficulty],
  }))
}

export const createChunkEndAction =
  (setLastChunk: SetLastChunkAction, setChunksData: SetChunksDataAction) =>
    (lastChunk: LastChunk, state: PlayerState) => {
      setChunksData((chunksData) => [
        ...chunksData,
        {
          chunkCreated: new Date(),
          chunkElapsedSeconds: lastChunk.lastChunkElapsedSeconds,
          chunkGainedSeconds: lastChunk.lastChunkGainedSeconds,
          chunkPickedCoins: lastChunk.lastChunkPickedCoins,
          chunkGeneratedCoins: lastChunk.lastChunkGeneratedCoins,
          chunkMapDifficulties: lastChunk.lastChunkMapDifficulties,
          chunkPlatformSpeed: lastChunk.lastChunkPlatformSpeed,
          chunkLostLives: lastChunk.lastChunkLostLives,
          engineSuggestedAction: lastChunk.lastChunkSuggestedAction,
          chunkDifficultySkore: state.difficultyScore,
          gameTotalElapsedSeconds: state.elapsedSeconds,
          gameTotalGainedSeconds: state.gainedSeconds,
        },
      ])
      setLastChunk(initLastChunk())
    }

export const createSecondsGainAction = (setLastChunk: SetLastChunkAction) => (seconds: number) => {
  setLastChunk((lastChunk) => ({
    ...lastChunk,
    lastChunkElapsedSeconds: lastChunk.lastChunkElapsedSeconds + seconds,
  }))
}
