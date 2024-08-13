'use client'

import type { FC, ReactNode } from 'react'
import { createContext, useMemo } from 'react'

type GameConfigurationContextProps = object

const defaultValue: GameConfigurationContextProps = {}

const GameConfigurationContext = createContext<GameConfigurationContextProps>(defaultValue)

export const GameConfigurationProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const constext = useMemo(() => ({}), [])

  return <GameConfigurationContext.Provider value={constext}>{children}</GameConfigurationContext.Provider>
}
