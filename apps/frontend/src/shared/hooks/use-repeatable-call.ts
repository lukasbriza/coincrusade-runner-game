'use client'

import { useCallback, useEffect, useRef } from 'react'

export const useRepeatableCall = (callback: () => void, delay: number, repetitions: number) => {
  const repeated = useRef(0)
  const interval = useRef<NodeJS.Timeout | null>(null)

  const repetitionCallback = useCallback(() => {
    callback()

    if (repeated.current >= repetitions && interval.current) {
      clearInterval(interval.current)
    }

    repeated.current += 1
  }, [repetitions, callback])

  const startCall = useCallback(() => {
    if (interval.current === null) {
      interval.current = setInterval(repetitionCallback, delay)
    }
  }, [delay, repetitionCallback])

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      repeated.current = 0
      if (interval.current) {
        clearInterval(interval.current)
        interval.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay])

  return { startCall }
}
