'use client'

import { styled } from '@lukasbriza/styles'
import { Modal } from '@mui/base'

import type { OwnerState } from '../types'

import { menuClasses } from './classes'

export const Root = styled('div')(({ theme: { spacing, breakpoints } }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',

  [`& .${menuClasses.icon}`]: {
    position: 'absolute',
    right: spacing(4),
    top: spacing(4),
    zIndex: 100,
  },

  [`& .${menuClasses.isDesktop}`]: {
    marginLeft: 'min(3vw, 60px)',
    marginRight: 'min(3vw, 60px)',
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },

  [`& .${menuClasses.isMobile}`]: {
    [breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}))

export const MobileMenuWrapper = styled('div')(({ theme: { spacing } }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: spacing(2),
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}))

export const MenuModal = styled(Modal)<OwnerState<{ background?: string | undefined }>>(
  ({ theme: { breakpoints }, ownerState: { background } }) => ({
    background: background || 'red',
    position: 'fixed',
    width: '0vw',
    height: '100vh',
    top: 0,
    right: 0,
    zIndex: 10,

    [`& .${menuClasses.menuItem}`]: {
      opacity: 0,
      display: 'none',
    },

    [`& .${menuClasses.isMobile}`]: {
      [breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  }),
)
