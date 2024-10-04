'use client'

import type { OwnerState } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'

import { PAGE_MIN_HEIGHT } from '@/shared/constants'

import { engineSelectorClasses } from './classes'

export const Root = styled('div')<OwnerState<{ render: boolean; minimized: boolean }>>(
  ({ ownerState: { render, minimized }, theme: { spacing, breakpoints, palette } }) => ({
    visibility: render ? 'visible' : 'hidden',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    minHeight: PAGE_MIN_HEIGHT,
    display: 'flex',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    [`& .${engineSelectorClasses.leftArrow}`]: {
      marginRight: spacing(5),
      transition: 'background 0.25s ease-in',
      borderRadius: '50%',

      [breakpoints.down(500)]: {
        marginRight: spacing(0),
      },

      '&>img': {
        padding: spacing(2),
        paddingLeft: spacing(2.3),
        paddingRight: spacing(0.5),
      },
    },

    [`& .${engineSelectorClasses.rightArrow}`]: {
      marginLeft: spacing(5),
      transition: 'background 0.25s ease-in',
      borderRadius: '50%',

      [breakpoints.down(500)]: {
        marginLeft: spacing(0),
      },

      '&>img': {
        padding: spacing(2),
        paddingLeft: spacing(2.3),
        paddingRight: spacing(0.5),
      },
    },

    [`& .${engineSelectorClasses.leftArrow}:hover`]: {
      background: palette.surface.secondary,
    },
    [`& .${engineSelectorClasses.rightArrow}:hover`]: {
      background: palette.surface.secondary,
    },

    [`& .${engineSelectorClasses.pergamen} > img`]: {
      cursor: minimized ? 'pointer' : 'unset',
    },

    '& h3': {
      [breakpoints.down(500)]: {
        fontSize: 18,
      },
    },

    '&>h4': {
      [breakpoints.down(500)]: {
        fontSize: 15,
      },
    },
  }),
)

export const PergamenContentRoot = styled('div')(({ theme: { breakpoints, spacing } }) => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'grid',
  gridTemplateAreas: `
        "header header"
        "text text"
        "button config"
      `,
  gridTemplateRows: 'min-content 1fr min-content',
  gridTemplateColumns: '1fr 1fr',

  [breakpoints.down('md')]: {
    gridTemplateAreas: `
        "header header"
        "text text"
        "button button"
        "config config"
      `,
    gridTemplateRows: 'min-content 1fr min-content min-content',
  },

  [`& .${engineSelectorClasses.header}`]: {
    gridArea: 'header',
  },

  [`& .${engineSelectorClasses.text}`]: {
    gridArea: 'text',
  },

  [`& .${engineSelectorClasses.playButton}`]: {
    maxWidth: '70%',
    position: 'relative',
    gridArea: 'button',
    left: '50%',
    transform: 'translateX(-50%)',

    [breakpoints.down('md')]: {
      marginBottom: spacing(2),
    },
  },

  [`& .${engineSelectorClasses.configButton}`]: {
    maxWidth: '70%',
    position: 'relative',
    gridArea: 'config',
    left: '50%',
    transform: 'translateX(-50%)',
  },
}))
