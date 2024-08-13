'use client'

import type { OwnerState } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'

import { PAGE_MAX_WIDTH, PAGE_MIN_HEIGHT, SKY_COLOR } from '@/shared/constants'

import type { BackgroundProps } from './types'

export const Root = styled('div')(() => ({
  position: 'absolute',
  overflow: 'hidden',
  top: 0,
  left: '50%',
  transform: 'translateX(-50%)',
  maxWidth: PAGE_MAX_WIDTH,
  minHeight: PAGE_MIN_HEIGHT,
  height: '100vh',
  width: '100%',
  background: SKY_COLOR,
  zIndex: 0,
}))

export const BackgroundFull = styled('img')<OwnerState<BackgroundProps>>(({ ownerState: { zIndex, bottom } }) => ({
  position: 'absolute',
  overflow: 'hidden',
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  zIndex,
  bottom,
}))

export const Clouds = styled('div')(() => ({
  '@keyframes slide': {
    from: {
      transform: 'translate3d(0, 0, 0)',
    },
    to: {
      transform: 'translate3d(-2880px, 0, 0)' /* The image width */,
    },
  },

  background: 'url(bg_clouds.webp) repeat-x',
  position: 'absolute',
  overflow: 'hidden',
  left: 0,
  top: 0,
  width: 2880,
  height: '60%',
  objectFit: 'contain',
  zIndex: 0,
  animation: 'slide 260s linear infinite',
}))
