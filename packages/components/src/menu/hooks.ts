'use client'

import { useCallback, useEffect, useState } from 'react'

import { closeAnimation, openAnimation } from './animation'
import type { OnItemClickHandler } from './types'

export const useMobileMenu = (
  onItemClick?: OnItemClickHandler,
  onModalStateChange?: ((open: boolean) => void) | undefined,
) => {
  const [open, setOpen] = useState<boolean>(false)

  const onItemClickHandler = (item: { path: string; name: string }) => () => onItemClick?.(item)
  const trigger = () => setOpen((value) => !value)

  const handleResize = useCallback(() => {
    if (open) {
      setOpen(false)
    }
  }, [open])

  useEffect(() => {
    const rootelement = document.querySelectorAll('html')[0]

    if (open) {
      rootelement.style.setProperty('overflow', 'hidden')
      onModalStateChange?.(open)
      openAnimation()
      return
    }
    closeAnimation(() => {
      onModalStateChange?.(open)
      rootelement.style.removeProperty('overflow')
    })
  }, [onModalStateChange, open])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleResize])

  return { open, trigger, onItemClickHandler }
}

export const useMenu = (onItemClick?: ((item: { name: string; path: string }) => void) | undefined) => {
  const onItemClickHandler = (item: { path: string; name: string }) => () => onItemClick?.(item)

  return { onItemClickHandler }
}
