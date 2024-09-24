'use client'

import type { OwnerState } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'
import Image from 'next/image'

export const Root = styled('div')<OwnerState<{ height: number; width: number; show?: boolean | undefined }>>(
  ({ ownerState: { height, width, show } }) => ({
    position: 'relative',
    overflow: 'hidden',
    height,
    width,
    opacity: show === true ? 1 : 0,
    transition: 'opacity 0.5s ease-in',
  }),
)

export const ArrowImage = styled(Image)<
  OwnerState<{ show?: boolean | undefined; left?: boolean | undefined; animated?: boolean | undefined }>
>(({ ownerState: { left, animated, show } }) => ({
  '@keyframes pulsate': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.2)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },

  animation: animated ? '2s infinite pulsate' : 'unset',
  rotate: left ? '180deg' : 'unset',
  cursor: show ? 'pointer' : 'default',
  position: 'relative',
  objectFit: 'contain',
}))
