'use client'

import type { FC } from 'react'
import { useEffect } from 'react'

import { APERTURE_PLAYED_STORAGE_KEY, GAME_INITIATED_STORAGE_KEY } from '@/shared'
import { removeItem } from '@/utils'

export const LocalStorageCleaner: FC = () => {
  useEffect(() => {
    const removeItems = () => {
      removeItem(APERTURE_PLAYED_STORAGE_KEY)
      removeItem(GAME_INITIATED_STORAGE_KEY)
    }

    document.addEventListener('reset', removeItems)
    window.addEventListener('beforeunload', removeItems)

    return () => {
      document.removeEventListener('reset', removeItems)
      window.removeEventListener('beforeunload', removeItems)
    }
  }, [])

  return null
}
