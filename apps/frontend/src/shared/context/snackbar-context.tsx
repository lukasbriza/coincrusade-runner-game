'use client'

import { Snackbar } from '@lukasbriza/components'
import uniqueId from 'lodash.uniqueid'
import type { FC, ReactNode } from 'react'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'

import { SnacbarsWrapper } from './styles'

export type SnackbarContext = {
  addSnackbar: (children: ReactNode) => void
  removeSnackbar: (id: string) => void
}

const defaultValue: SnackbarContext = {
  addSnackbar: () => {
    throw new Error('addSnackbar is not defined.')
  },
  removeSnackbar: () => {
    throw new Error('removeSnackbar is not defined.')
  },
}

const SnackbarContext = createContext<SnackbarContext>(defaultValue)

export const SnacbarContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [snacbars, setSnackbars] = useState<JSX.Element[]>([])

  const removeSnackbar = (id: string) => {
    setSnackbars((state) => state.filter((component) => component.key !== id))
  }

  const addSnackbar = useCallback((children: ReactNode) => {
    const id = uniqueId()

    const component = (
      <Snackbar key={id} id={id} onClose={() => removeSnackbar(id)}>
        {children}
      </Snackbar>
    )
    setSnackbars((array) => [...array, component])
  }, [])

  const context: SnackbarContext = useMemo(
    () => ({
      addSnackbar,
      removeSnackbar,
    }),
    [addSnackbar],
  )

  const showPortal = window.document.body && snacbars.length > 0

  return (
    <SnackbarContext.Provider value={context}>
      {children}
      {showPortal &&
        createPortal(<SnacbarsWrapper>{snacbars.map((component) => component)}</SnacbarsWrapper>, window.document.body)}
    </SnackbarContext.Provider>
  )
}

export const useSnackbarContext = () => useContext(SnackbarContext)
