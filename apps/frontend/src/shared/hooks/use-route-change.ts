'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'

export const useRouteChange = (callback: (path: string, previousPath: string | null) => void) => {
  const pathname = usePathname()
  const previousPathRef = useRef<string | null>(null)

  useEffect(() => {
    if (previousPathRef.current !== pathname) {
      callback(pathname, previousPathRef.current)
      previousPathRef.current = pathname
    }
  }, [pathname, callback])
}
