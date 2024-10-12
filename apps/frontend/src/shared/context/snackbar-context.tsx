'use client'

import { Snackbar } from '@lukasbriza/components'
import uniqueId from 'lodash.uniqueid'
import type { FC, ReactNode } from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

export type SnackbarContext = {
  addSnackbar: (children: ReactNode) => void
}

const defaultValue: SnackbarContext = {
  addSnackbar: () => {
    throw new Error('addSnackbar is not defined.')
  },
}

const SnackbarContext = createContext<SnackbarContext>(defaultValue)

export const SnacbarContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [snacbars, setSnackbars] = useState<JSX.Element[]>([])

  const addSnackbar = (children: ReactNode) => {
    const id = uniqueId()

    const component = <Snackbar id={id}>{children}</Snackbar>
    setSnackbars((array) => [...array, component])
  }

  const context: SnackbarContext = useMemo(
    () => ({
      addSnackbar,
    }),
    [],
  )

  return (
    <SnackbarContext.Provider value={context}>
      {children}
      {window.document.body && createPortal(<div>{snacbars.map((component) => component)}</div>, window.document.body)}
    </SnackbarContext.Provider>
  )
}

export const useSnackbarContext = () => useContext(SnackbarContext)
