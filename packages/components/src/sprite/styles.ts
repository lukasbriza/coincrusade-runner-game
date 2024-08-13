'use client'

import { styled } from '@lukasbriza/styles'

import type { OwnerState } from '../types'

import type { SpriteProps } from './types'

export const SpriteImage = styled('div')<OwnerState<SpriteProps>>(
  ({ ownerState: { width, height, image, columns, duration, rows, xOffset } }) => ({
    '@keyframes playx': {
      // '100%': { backgroundPosition: `-${offset}px` },
      from: { backgroundPositionX: xOffset ? -xOffset : 0 },
      to: { backgroundPositionX: `-${width * columns + (xOffset || 0)}px` },
    },

    '@keyframes playy': {
      from: { backgroundPositionY: 0 },
      to: { backgroundPositionY: `-${height * rows}` },
    },
    display: 'inline-block',
    width: `${width}px`,
    height: `${height}px`,
    backgroundSize: `${width * columns}px ${height * rows}px`,
    background: `url(${image})`,

    animation: `playx ${duration / rows}s steps(${columns}) infinite, playy ${duration}s steps(${rows}) infinite`,
  }),
)
