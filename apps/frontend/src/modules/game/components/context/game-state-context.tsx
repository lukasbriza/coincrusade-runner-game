'use client'

import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { EventBus, EventBusEvents } from '@/lib/phaser'
import type { ChunkLog, LastChunk, PlayerState } from '@/shared'
import { initLastChunk, initPlayerState } from '@/utils'

export type SuggesteAction = 'decrease' | 'increase' | 'neutral' | undefined

type GameStateContextProps = {
  state: PlayerState
  lastChunk: LastChunk
  chunksData: ChunkLog[]
}

const defaultValue: GameStateContextProps = {
  state: initPlayerState(),
  lastChunk: initLastChunk(),
  chunksData: [],
}

const GameStateContext = createContext<GameStateContextProps>(defaultValue)

const GameStateProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state] = useState<PlayerState>(defaultValue.state)
  const [lastChunk] = useState<LastChunk>(defaultValue.lastChunk)
  const [chunksData] = useState<ChunkLog[]>(defaultValue.chunksData)

  const context: GameStateContextProps = useMemo(
    () => ({
      state,
      lastChunk,
      chunksData,
    }),
    [chunksData, lastChunk, state],
  )

  useEffect(() => {
    EventBus.emit(EventBusEvents.GameStateInitialization)
  }, [])

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>
}

export const useGameStatee = () => {
  const context = useContext(GameStateContext)
  return context
}

export default GameStateProvider
