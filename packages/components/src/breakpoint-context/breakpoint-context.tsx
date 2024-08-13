'use client'

import { useTheme } from '@lukasbriza/theme'
import throttle from 'lodash.throttle'
import type { ReactNode, FC } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

import type { BreakpointContextValue, BreakpointValue, WidthState } from './types'

const defaultValue: BreakpointContextValue = {
  xs: false,
  sm: false,
  md: false,
  lg: false,
  xl: false,
  value: 0,
}

const BreakpointContext = createContext<BreakpointContextValue>(defaultValue)

export const BreakpointProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { breakpoints } = useTheme()

  const compare = (breakpoint: BreakpointValue) => {
    if (typeof window === 'undefined') {
      return
    }
    const width = window.innerWidth
    return width <= breakpoints.values[breakpoint]
  }

  const getActualState = (): WidthState => ({
    xs: compare('xs'),
    sm: compare('sm'),
    md: compare('md'),
    lg: compare('lg'),
    xl: compare('xl'),
    value: typeof window === 'undefined' ? undefined : window.innerWidth,
  })

  const [widthState, setWidthState] = useState<WidthState>(getActualState())
  useEffect(() => {
    const handleResize = throttle(() => {
      setWidthState(getActualState())
    }, 50)

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <BreakpointContext.Provider value={widthState}>{children}</BreakpointContext.Provider>
}

export const useBreakpointContext = () => {
  const context = useContext(BreakpointContext)
  return context
}
