'use client'

import type { OwnerState } from '@lukasbriza/components'
import { Menu } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'

import { menuWrapperClasses } from './classes'

export const Root = styled('div')<OwnerState<{ blur: boolean }>>(
  ({ theme: { spacing, palette }, ownerState: { blur } }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 9,
    width: '100%',
    background: blur ? palette.surface.tertiary : 'transparent',
    backdropFilter: blur ? 'blur(5px)' : 'blur(0px)',
    transition: 'background 0.20s ease-in',
    minHeight: spacing(17),

    [`& .${menuWrapperClasses.mobileIcon}`]: {
      top: '85% !important',
    },
  }),
)

export const PageMenu = styled(Menu)(({ theme: { spacing } }) => ({
  position: 'relative',
  left: 0,
  top: 0,
  width: '100%',
  paddingTop: spacing(3.5),
  paddingBottom: spacing(3),
}))
