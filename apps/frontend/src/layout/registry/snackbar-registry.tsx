'use client'

import dynamic from 'next/dynamic'
import type { FC, ReactNode } from 'react'

const SnacbarContextProvider = dynamic(
  () => import('@/shared/context/snackbar-context').then((module) => module.SnacbarContextProvider),
  { ssr: false },
)

export const SnackbarRegistry: FC<{ children: ReactNode }> = ({ children }) => (
  <SnacbarContextProvider>{children}</SnacbarContextProvider>
)
