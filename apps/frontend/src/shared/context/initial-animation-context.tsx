'use client'

import type { Dispatch, FC, ReactNode, SetStateAction } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'

export type InitialAnimationContext = {
  initialised: boolean
  setInitialised: Dispatch<SetStateAction<boolean>>
}

const defaultValue: InitialAnimationContext = {
  initialised: false,
  setInitialised: () => {
    throw new Error('setInitialised is not defined.')
  },
}

const InitialAnimationContext = createContext<InitialAnimationContext>(defaultValue)

export const InitialAnimationContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [initialised, setInitialised] = useState<boolean>(defaultValue.initialised)

  const context = useMemo(
    () => ({
      initialised,
      setInitialised,
    }),
    [initialised],
  )

  return <InitialAnimationContext.Provider value={context}>{children}</InitialAnimationContext.Provider>
}

export const useInitialAnimationContext = () => useContext(InitialAnimationContext)
