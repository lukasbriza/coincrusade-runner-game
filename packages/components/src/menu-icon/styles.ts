'use client'

import { styled } from '@lukasbriza/styles'

import type { OwnerState } from '../types'

import { menuIconClasses } from './classes'
import type { MenuIconProps } from './types'

export const Root = styled('div')<OwnerState<Pick<MenuIconProps, 'color' | 'height' | 'width'>>>(
  ({ theme: { size, palette }, ownerState: { color, width, height } }) => ({
    display: 'flex',
    flexDirection: 'column',
    width: width || size.size7,
    height: height || size.size6,
    position: 'relative',
    cursor: 'pointer',

    [`& .${menuIconClasses.line}`]: {
      opacity: 1,
      transformOrigin: 'center',
      position: 'absolute',
      width: '100%',
      height: size.size1,
      background: color || palette.bodyText.primary,
    },

    [`& .${menuIconClasses.a1}`]: {
      transform: `translateY(0px)`,
    },
    [`& .${menuIconClasses.a2}`]: {
      transform: `translateY(${(height || size.size6) / 2 - size.size1 / 2}px)`,
    },
    [`& .${menuIconClasses.a3}`]: {
      transform: `translateY(${(height || size.size6) - size.size1}px)`,
    },
  }),
)
