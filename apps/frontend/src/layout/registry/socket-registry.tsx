import type { FC, ReactNode } from 'react'

import { SocketContextProvider } from '@/shared/context'

export const SocketRegistry: FC<{ children: ReactNode }> = ({ children }) => (
  <SocketContextProvider>{children}</SocketContextProvider>
)
