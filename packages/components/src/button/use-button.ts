'use client'

import { useRef } from 'react'

export const useButton = () => {
  const ref = useRef<HTMLButtonElement>(null)

  return { ref }
}
