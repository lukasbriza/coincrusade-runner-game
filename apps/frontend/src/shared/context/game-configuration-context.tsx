'use client'

import type { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { Locale } from '@/i18n/config'
import { engines } from '@/shared'

export type GameConfiguration = {
  healRate: number
  immortalityDuration: number
  maxPlayerLifes: number
  addTimeEveryNumberOfCoins: number
  timeAdditionInSeconds: number
  baseTimeInSeconds: number
  knightLeftSpeed: number
  knightRightSpeed: number
  playerGravity: number
  currentGenerator: string
  lng: keyof typeof Locale | undefined
}

export type GameConfigurationContextProps = {
  config: GameConfiguration
  changeConfiguration: Dispatch<SetStateAction<GameConfiguration>>
  changeGenerator: (generator: string) => void
  resetConfiguration: () => void
}

export const defaultConfig: GameConfiguration = {
  healRate: 20_000,
  immortalityDuration: 4000,
  maxPlayerLifes: 3,
  addTimeEveryNumberOfCoins: 5,
  timeAdditionInSeconds: 20,
  baseTimeInSeconds: 120,
  knightLeftSpeed: -480,
  knightRightSpeed: 300,
  playerGravity: 1000,
  currentGenerator: engines[0],
  lng: undefined,
}
const defaultValue: GameConfigurationContextProps = {
  config: { ...defaultConfig },
  changeConfiguration: () => {
    throw new Error('changeConfiguration is not defined')
  },
  changeGenerator: () => {
    throw new Error('changeGenerator is not defined')
  },
  resetConfiguration: () => {
    throw new Error('resetConfiguration is not defined')
  },
}

const GameConfigurationContext = createContext<GameConfigurationContextProps>(defaultValue)

export const GameConfigurationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const locale = 'cs' // useLocale()
  const [gameConfig, setGameConfig] = useState<GameConfiguration>(defaultConfig)

  const context: GameConfigurationContextProps = useMemo(
    () => ({
      config: gameConfig,
      changeConfiguration: setGameConfig,
      changeGenerator: (generator) => setGameConfig({ ...gameConfig, currentGenerator: generator }),
      resetConfiguration: () =>
        setGameConfig((state) => ({
          ...defaultConfig,
          currentGenerator: state.currentGenerator,
        })),
    }),
    [gameConfig],
  )

  useEffect(() => {
    setGameConfig((config) => ({ ...config, lng: locale as keyof typeof Locale }))
  }, [locale])

  return <GameConfigurationContext.Provider value={context}>{children}</GameConfigurationContext.Provider>
}

export const useGameConfiguration = () => {
  const context = useContext(GameConfigurationContext)
  return context
}

export default GameConfigurationProvider
