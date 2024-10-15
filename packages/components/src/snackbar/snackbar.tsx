'use client'

import { useEffect, useRef, useState, type FC } from 'react'

import { hideSnackbar, showSnackbar, snackbarMouseEnter, snackbarMouseLeave } from './animation'
import { Cross, Root, SnackbarContent } from './styles'
import type { SnackbarProps } from './types'

export const Snackbar: FC<SnackbarProps> = ({ children, autoHideDuration = 5000, onClose, id }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(true)
  const [exited, setExited] = useState<boolean>(false)

  const handleClose = (reason: string) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
    if (ref.current) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      hideSnackbar(ref.current).then(() => {
        setExited(true)
        onClose?.(id)
      })
    }
  }

  const handleMouseEnter = () => {
    if (ref.current) {
      snackbarMouseEnter(ref.current)
    }
  }

  const handleMouseLeave = () => {
    if (ref.current) {
      snackbarMouseLeave(ref.current)
    }
  }

  useEffect(() => {
    if (ref.current) {
      showSnackbar(ref.current)
    }
  }, [ref])

  return (
    <Root
      autoHideDuration={autoHideDuration}
      exited={exited}
      id={id}
      open={open}
      slotProps={{ root: { ref, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave } }}
      onClose={(_, reason) => handleClose(reason)}
    >
      <SnackbarContent>{children}</SnackbarContent>
      <Cross size={31} onClick={() => handleClose('cross')} />
    </Root>
  )
}
