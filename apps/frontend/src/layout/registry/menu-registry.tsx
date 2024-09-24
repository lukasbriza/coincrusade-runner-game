'use client'

import type { FC, ReactNode } from 'react'

import { MenuContextProvider } from '@/shared/components/context'

export const MenuRegistry: FC<{ children: ReactNode }> = ({ children }) => (
  <MenuContextProvider>{children}</MenuContextProvider>
)
