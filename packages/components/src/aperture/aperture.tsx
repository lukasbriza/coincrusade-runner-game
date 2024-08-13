'use client'

import type { FC } from 'react'

import { Down, Top } from './styles'
import type { ApertureProps } from './types'
import { useAperture } from './use-aperture'

export const Aperture: FC<ApertureProps> = ({ children, stage, initialStage, className }) => {
  const { top, down } = useAperture(stage, initialStage)
  return (
    <>
      <Top ref={top} className={className} />
      {children}
      <Down ref={down} className={className} />
    </>
  )
}
