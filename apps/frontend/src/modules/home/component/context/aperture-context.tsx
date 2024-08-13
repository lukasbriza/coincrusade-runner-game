'use client'

import { Aperture } from '@lukasbriza/components'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { apertureClasses } from './classes'

export type StageValue = 1 | 2 | 3
export type ApertureContextValue = {
  stage: StageValue | undefined
  loaded: boolean
  reset: () => void
  setStage: (value: StageValue) => void
  setInitialStage: (value: StageValue | undefined) => void
}

const defaultValue: ApertureContextValue = {
  stage: undefined,
  loaded: false,
  reset: () => {
    throw new Error('No context provider')
  },
  setStage: () => {
    throw new Error('No context provider')
  },
  setInitialStage: () => {
    throw new Error('No context provider')
  },
}

const ApertureContext = createContext<ApertureContextValue>(defaultValue)

export const ApertureProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [stage, setStage] = useState<StageValue | undefined>()
  const [initialStage, setInitialStage] = useState<StageValue | undefined>(1)
  const [loaded, setLoaded] = useState<boolean>(false)

  const value: ApertureContextValue = useMemo(
    () => ({
      stage,
      loaded,
      reset: () => setStage(undefined),
      setStage: (value: StageValue) => setStage(value),
      setInitialStage: (value: StageValue | undefined) => setInitialStage(value),
    }),
    [loaded, stage],
  )

  useEffect(() => setLoaded(true), [])

  return (
    <ApertureContext.Provider value={value}>
      <Aperture className={apertureClasses.root} initialStage={initialStage} stage={stage}>
        {children}
      </Aperture>
    </ApertureContext.Provider>
  )
}

export const useApertureContext = () => {
  const context = useContext(ApertureContext)
  return context
}
