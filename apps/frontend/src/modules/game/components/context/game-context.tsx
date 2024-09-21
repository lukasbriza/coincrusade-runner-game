'use client'

/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */

import type { Game } from 'phaser'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { EventBus, EventBusEvents, getGameInstance } from '@/lib/phaser'

export type GameContextProps = {
  game: Game | null
}

const defultValue: GameContextProps = {
  game: null,
}

const GameContext = createContext<GameContextProps>(defultValue)

const GameProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [gameStateLoaded, setGameStateLoaded] = useState<boolean>(false)
  const [gameElementLoaded, setGameElementLoaded] = useState<boolean>(false)
  const [game, setGame] = useState<Game | null>(null)
  const parent = document.querySelector<HTMLDivElement>('#game-container')

  useEffect(() => {
    if (gameElementLoaded && gameStateLoaded) {
      const initPhaser = async () => {
        if (parent) {
          const phaserGame = await getGameInstance(parent)
          setGame(phaserGame)
        }
      }
      initPhaser()
    }

    return () => {
      game?.destroy(true, true)
    }
  }, [gameElementLoaded, gameStateLoaded])

  useEffect(() => {
    // GAME STATE INITILIZED
    EventBus.on(EventBusEvents.GameStateInitialization, () => setGameStateLoaded(true))
    EventBus.on(EventBusEvents.GameElementInitialization, () => setGameElementLoaded(true))

    EventBus.on(EventBusEvents.ThrowError, (message: string) => console.log(message))
  }, [])

  const context: GameContextProps = useMemo(() => ({ game }), [game])

  return <GameContext.Provider value={context}>{children}</GameContext.Provider>
}

export const useGamecontext = () => {
  const context = useContext(GameContext)
  return context
}

export default GameProvider
