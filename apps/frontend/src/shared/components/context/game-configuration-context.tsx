'use client'

import { useLocale } from 'next-intl'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import type { Locale } from '@/i18n/config'
import { Generators } from '@/lib/phaser'

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
  currentGenerator: Generators
  lng: keyof typeof Locale | undefined
}

export type GameConfigurationContextProps = {
  config: GameConfiguration
  changeConfiguration: (config: GameConfiguration) => void
  changeGenerator: (generator: Generators) => void
}

const defaultConfig: GameConfiguration = {
  healRate: 20_000,
  immortalityDuration: 4000,
  maxPlayerLifes: 3,
  addTimeEveryNumberOfCoins: 5,
  timeAdditionInSeconds: 20,
  baseTimeInSeconds: 120,
  knightLeftSpeed: -480,
  knightRightSpeed: 300,
  playerGravity: 1000,
  currentGenerator: Generators.LinearGenerator,
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
}

const GameConfigurationContext = createContext<GameConfigurationContextProps>(defaultValue)

export const GameConfigurationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const locale = useLocale()
  const [gameConfig, setGameConfig] = useState<GameConfiguration>(defaultConfig)

  const context: GameConfigurationContextProps = useMemo(
    () => ({
      config: gameConfig,
      changeConfiguration: (configuration) => setGameConfig(configuration),
      changeGenerator: (generator) => setGameConfig({ ...gameConfig, currentGenerator: generator }),
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
