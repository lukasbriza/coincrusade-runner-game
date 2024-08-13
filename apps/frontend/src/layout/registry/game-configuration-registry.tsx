import type { FC, ReactNode } from 'react'

import { GameConfigurationProvider } from '@/shared/components'

export const GameConfigurationRegistry: FC<{ children: ReactNode }> = ({ children }) => (
  <GameConfigurationProvider>{children}</GameConfigurationProvider>
)
