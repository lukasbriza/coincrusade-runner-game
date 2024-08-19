'use client'

import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { ChunkLog, LastChunk, PlayerState } from '@/lib/phaser'
import { EventBus, EventBusEvents } from '@/lib/phaser'
import type { ColliderObject } from '@/lib/phaser/factories'
import { initLastChunk, initPlayerState } from '@/utils'

export type SuggesteAction = 'decrease' | 'increase' | 'neutral' | undefined

export type GameStateContextProps = {
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
  const [state, setState] = useState<PlayerState>(defaultValue.state)
  const [lastChunk, setLastChunk] = useState<LastChunk>(defaultValue.lastChunk)
  const [chunksData] = useState<ChunkLog[]>(defaultValue.chunksData)

  const context: GameStateContextProps = useMemo(
    () => ({
      state,
      lastChunk,
      chunksData,
    }),
    [chunksData, lastChunk, state],
  )

  // TODO dát do jednotlivých funkcí
  useEffect(() => {
    EventBus.emit(EventBusEvents.GameStateInitialization)

    // LISTENERS
    // TODO doplnit logiku pro úpravu životů na hit
    EventBus.on(EventBusEvents.KnightHit, (knight: ColliderObject, worldObject: ColliderObject) => {
      setState((state) => ({
        ...state,
        actualLives: state.actualLives - 1,
        lostLives: state.lostLives + 1,
        playerIsDead: state.actualLives === 1,
      }))
      EventBus.emit(EventBusEvents.KnightHitCallback, knight, worldObject, context)
    })
    // TODO doplnit logiku pro úpravu životů na hit
    EventBus.on(EventBusEvents.KnightLeftSideCollision, (knight: IKnight) => {
      setState((state) => ({
        ...state,
        actualLives: state.actualLives - 1,
        lostLives: state.lostLives + 1,
        playerIsDead: state.actualLives === 1,
      }))
      if (!state.playerIsDead) {
        EventBus.emit(EventBusEvents.PlayerRelocate, knight)
        return
      }
      EventBus.emit(EventBusEvents.KnightDead)
    })

    // CHUNK DATA LISTENERS
    EventBus.on(EventBusEvents.SecondPassed, () =>
      setLastChunk((lastChunk) => ({ ...lastChunk, lastChunkElapsedSeconds: lastChunk.lastChunkElapsedSeconds + 1 })),
    )
    EventBus.on(EventBusEvents.SecondsGain, (seconds: number) =>
      setLastChunk((lastChunk) => ({
        ...lastChunk,
        lastChunkElapsedSeconds: lastChunk.lastChunkElapsedSeconds + seconds,
      })),
    )

    // GAME END ACTIONS
    EventBus.on(EventBusEvents.EndGame, () => console.log('endgame'))
    EventBus.on(EventBusEvents.RestartGame, () => console.log('endgame'))

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
