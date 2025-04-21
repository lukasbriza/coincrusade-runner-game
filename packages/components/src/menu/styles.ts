'use client'

import { styled } from '@lukasbriza/styles'
import { Modal } from '@mui/base'

import type { OwnerState } from '../types'

import { menuClasses } from './classes'

export const Root = styled('div')<OwnerState<{ maxWidth?: number | undefined }>>(
  ({ theme: { spacing, breakpoints }, ownerState: { maxWidth } }) => ({
    position: 'fixed',
    display: 'grid',
    gridTemplateAreas: `
    "icons"
    "items"
  `,
    gridTemplateRows: `min-content min-content`,
    justifyItems: 'center',
    alignItems: 'center',

    width: '100%',
    maxWidth: maxWidth || '100%',
    left: '50%',
    transform: 'translateX(-50%)',

    [`& .${menuClasses.icon}`]: {
      position: 'absolute',
      right: spacing(2),
      top: spacing(4),
      zIndex: 100,
    },

    [`& .${menuClasses.desktopMenuItem}`]: {
      marginLeft: 'min(3vw, 60px)',
      marginRight: 'min(3vw, 60px)',
    },

    [`& .${menuClasses.isDesktop}`]: {
      [breakpoints.down(750)]: {
        display: 'none',
      },
    },

    [`& .${menuClasses.isMobile}`]: {
      [breakpoints.up(750)]: {
        display: 'none',
      },
    },
  }),
)

export const MenuItemsWrapper = styled('div')(({ theme: { palette } }) => ({
  gridArea: 'items',
  display: 'flex',

  [`&>.${menuClasses.isDesktop}:hover`]: {
    '& *': {
      color: palette.bodyText.contrast,
    },
  },
}))

export const IconsMenuSection = styled('div')(() => ({
  gridArea: 'icons',
  display: 'flex',
}))

export const LanguageSwitcherWrapper = styled('div')(({ theme: { spacing, breakpoints } }) => ({
  position: 'absolute',
  right: spacing(4),
  top: spacing(5),

  [breakpoints.down(750)]: {
    left: spacing(4),
    right: 'unset',
  },
}))

export const MobileMenuWrapper = styled('div')(({ theme: { spacing, palette } }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: spacing(2),
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',

  [`& > .${menuClasses.menuItem}`]: {
    width: '100%',
    textAlign: 'center',
    paddingTop: spacing(1),
    transition: 'background 0.25s ease-in',

    '&:hover': {
      background: palette.surface.secondary,
    },
  },
}))

export const MobileMenuIconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
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
