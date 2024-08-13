'use client'

import { styled } from '@lukasbriza/styles'

import { keyboardClasses } from './classes'

export const Root = styled('div')(({ theme: { spacing } }) => ({
  position: 'relative',
  display: 'grid',
  alignItems: 'end',
  gridTemplateColumns: '1fr 1fr',
  columnGap: spacing(3),
  width: '100%',
  maxWidth: 420,
}))
export const MovementKeysWrapper = styled('div')(() => ({
  position: 'relative',
  display: 'grid',
  gridTemplateAreas: `
    ". up ."
    "left down right"
  `,

  [`& .${keyboardClasses.up}`]: {
    gridArea: 'up',
  },
  [`& .${keyboardClasses.left}`]: {
    gridArea: 'left',
  },
  [`& .${keyboardClasses.down}`]: {
    gridArea: 'down',
  },
  [`& .${keyboardClasses.right}`]: {
    gridArea: 'right',
  },
}))
