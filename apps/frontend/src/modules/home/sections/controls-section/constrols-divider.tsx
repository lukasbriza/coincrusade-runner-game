'use client'

import type { FC } from 'react'
import { useEffect, useRef } from 'react'

import { ControlPartDivider } from './styles'
import type { ControlsDividerProps } from './types'

export const ControlsDivider: FC<ControlsDividerProps> = ({ sizes }) => {
  const ref = useRef<HTMLImageElement>(null)
  useEffect(() => {
    ref.current?.style.removeProperty('position')
    ref.current?.style.removeProperty('width')
    ref.current?.style.removeProperty('left')
    ref.current?.style.removeProperty('transform')
    ref.current?.style.removeProperty('height')
  }, [ref])

  return <ControlPartDivider ref={ref} alt="flourish" fill sizes={sizes} src="/flourish.png" />
}
