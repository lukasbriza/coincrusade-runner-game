'use client'

import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { ChunkLog, LastChunk, PlayerState } from '@/lib/phaser'
import { EventBus, EventBusEvents } from '@/lib/phaser'
import {
  chunkEndListener,
  coinGeneratedListener,
  knightDeadEmiter,
  knightHitCallbackEmiter,
  knightHitListener,
  knightLeftSideCollisionListener,
  lifeAddedListener,
  logMapDifficultyListener,
  playerRelocateEmiter,
  secondPassedListener,
  secondsGainListener,
} from '@/lib/phaser/events'
import type { ColliderObject } from '@/lib/phaser/factories'
import { initLastChunk, initPlayerState } from '@/utils'

import {
  createAddSecondAction,
  createChunkEndAction,
  createCoinGeneratedAction,
  createLifeAddedAction,
  createLogMapDifficultyAction,
  createOnHitAction,
  createSecondsGainAction,
} from './game-state-context-methods'
import type { GameStateContextProps } from './types'

const defaultValue: GameStateContextProps = {
  state: initPlayerState(),
  lastChunk: initLastChunk(),
  chunksData: [],
}

const GameStateContext = createContext<GameStateContextProps>(defaultValue)

const GameStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PlayerState>(defaultValue.state)
  const [lastChunk, setLastChunk] = useState<LastChunk>(defaultValue.lastChunk)
  const [chunksData, setChunksData] = useState<ChunkLog[]>(defaultValue.chunksData)

  const context: GameStateContextProps = useMemo(
    () => ({
      state,
      lastChunk,
      chunksData,
    }),
    [chunksData, lastChunk, state],
  )

  const lifeAdded = createLifeAddedAction(setState, setLastChunk)
  const onHit = createOnHitAction(setState, setLastChunk)
  const addSecond = createAddSecondAction(setState, setLastChunk)
  const coinGenerated = createCoinGeneratedAction(setState, setLastChunk)
  const logMapDifficulty = createLogMapDifficultyAction(setLastChunk)
  const chunkEnd = createChunkEndAction(setLastChunk, setChunksData)
  const gainSeconds = createSecondsGainAction(setLastChunk)

  const onKnightHit = (knight: IKnight, worldObject: ColliderObject) => {
    if (!knight.immortalAnimation) {
      onHit()
      knightHitCallbackEmiter(knight, worldObject, context)
    }
  }

  const onLeftSideCollision = (knight: IKnight) => {
    if (!knight.immortalAnimation) {
      onHit()
    }
    if (!state.playerIsDead) {
      playerRelocateEmiter(knight, context)
      return
    }
    knightDeadEmiter(knight, context)
  }

  const resetContext = () => {
    setState(initPlayerState())
    setLastChunk(initLastChunk())
    setChunksData([])
  }

  useEffect(() => {
    EventBus.emit(EventBusEvents.GameStateInitialization)

    // LISTENERS
    knightHitListener(onKnightHit)
    knightLeftSideCollisionListener(onLeftSideCollision)
    coinGeneratedListener(coinGenerated)
    lifeAddedListener(lifeAdded)
    secondsGainListener(gainSeconds)
    // CHUNK DATA LISTENERS
    secondPassedListener(addSecond)
    logMapDifficultyListener(logMapDifficulty)
    chunkEndListener(() => chunkEnd(lastChunk, state))

    // GAME END ACTIONS
    EventBus.on(EventBusEvents.EndGame, () => console.log('endgame'))
    EventBus.on(EventBusEvents.RestartGame, resetContext)

    return () => {
      EventBus.removeAllListeners()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>
}

export const useGameStatee = () => {
  const context = useContext(GameStateContext)
  return context
}

export default GameStateProvider
