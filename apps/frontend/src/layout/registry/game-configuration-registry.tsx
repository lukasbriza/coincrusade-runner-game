'use client'

import type { FC, ReactNode } from 'react'

import GameConfigurationProvider from '@/shared/context/game-configuration-context'

export const GameConfigurationRegistry: FC<{ children: ReactNode }> = ({ children }) => (
  <GameConfigurationProvider>{children}</GameConfigurationProvider>
)
