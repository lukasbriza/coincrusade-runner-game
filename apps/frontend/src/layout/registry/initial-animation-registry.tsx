import type { FC, ReactNode } from 'react'

import { InitialAnimationContextProvider } from '@/shared/context'

export const InitialAnimationRegistry: FC<{ children: ReactNode }> = ({ children }) => (
  <InitialAnimationContextProvider>{children}</InitialAnimationContextProvider>
)
