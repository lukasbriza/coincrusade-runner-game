'use client'

import { type FC } from 'react'

import { useApertureContext } from '../context'

import { backgroundClasses } from './classes'
import { BackgroundFull, Clouds, Root } from './styles'

export const Background: FC = () => {
  const { loaded } = useApertureContext()

  if (!loaded) {
    return null
  }
  return (
    <Root>
      <Clouds />
      <BackgroundFull
        alt="background and utilities front"
        className={backgroundClasses.background}
        ownerState={{ zIndex: 1 }}
        src="bg_main.png"
      />
    </Root>
  )
}
