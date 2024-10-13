'use client'

import { Aperture } from '@lukasbriza/components'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { APERTURE_PLAYED_STORAGE_KEY } from '@/shared'

import { apertureClasses } from './classes'

export type StageValue = 1 | 2 | 3
export type ApertureContextValue = {
  stage: StageValue | undefined
  loaded: boolean
  reset: () => void
  setStage: (value: StageValue) => void
  setInitialStage: (value: StageValue | undefined) => void
  disableAperture: () => void
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
  disableAperture: () => {
    throw new Error('No context provider')
  },
}

const disableAperture = () => {
  window.localStorage.setItem(APERTURE_PLAYED_STORAGE_KEY, 'true')
}

const ApertureContext = createContext<ApertureContextValue>(defaultValue)

export const ApertureProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [stage, setStage] = useState<StageValue | undefined>()
  const [initialStage, setInitialStage] = useState<StageValue | undefined>(1)
  const [loaded, setLoaded] = useState<boolean>(false)

  const context: ApertureContextValue = useMemo(
    () => ({
      stage,
      loaded,
      reset: () => setStage(undefined),
      setStage: (value: StageValue) => setStage(value),
      setInitialStage: (value: StageValue | undefined) => setInitialStage(value),
      disableAperture,
    }),
    [loaded, stage],
  )

  useEffect(() => setLoaded(true), [])

  const wasInited = window.localStorage.getItem(APERTURE_PLAYED_STORAGE_KEY) === 'true'

  return (
    <ApertureContext.Provider value={context}>
      <Aperture
        className={apertureClasses.root}
        initialStage={wasInited ? 3 : initialStage}
        stage={wasInited ? 3 : stage}
      >
        {children}
      </Aperture>
    </ApertureContext.Provider>
  )
}

export const useApertureContext = () => {
  const context = useContext(ApertureContext)
  return context
}
