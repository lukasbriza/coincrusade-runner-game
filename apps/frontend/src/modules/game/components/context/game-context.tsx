/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import type { Game } from 'phaser'
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { EventBus, EventBusEvents, getGameInstance } from '@/lib/phaser'

import { GameScene } from '../scenes'

export type GameContextProps = {
  game: Game | null
  gameContainer: HTMLDivElement | null
  setGameContainer: Dispatch<SetStateAction<HTMLDivElement | null>>
}

const defultValue: GameContextProps = {
  game: null,
  gameContainer: null,
  setGameContainer: () => {
    throw new Error('Method setGameContainer undefined')
  },
}

const GameContext = createContext<GameContextProps>(defultValue)

const GameProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [gameStateLoaded, setGameStateLoaded] = useState<boolean>(false)
  const [game, setGame] = useState<Game | null>(null)
  const [gameContainer, setGameContainer] = useState<HTMLDivElement | null>(null)
  const parent = document.querySelector<HTMLDivElement>('#game-container')

  useEffect(() => {
    if (gameContainer && gameStateLoaded) {
      const initPhaser = async () => {
        if (parent) {
          const scenes = [GameScene]
          const phaserGame = await getGameInstance(parent, scenes)
          setGame(phaserGame)
        }
      }
      initPhaser()
    }

    return () => {
      game?.destroy(true, true)
    }
  }, [gameContainer, gameStateLoaded])

  useEffect(() => {
    EventBus.on(EventBusEvents.GameStateInitialization, () => setGameStateLoaded(true))
  }, [])

  const context: GameContextProps = useMemo(() => ({ game, gameContainer, setGameContainer }), [game])

  return <GameContext.Provider value={context}>{children}</GameContext.Provider>
}

export const useGamecontext = () => {
  const context = useContext(GameContext)
  return context
}

export default GameProvider
