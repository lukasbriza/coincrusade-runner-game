'use client'

import { styled } from '@lukasbriza/styles'

import { settingsPergamen } from '../settings-pergamen'

export const ParentElement = styled('div')(({ theme: { spacing } }) => ({
  height: `calc(100vh - ${spacing(13)})`,
  width: '100vw',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const GameUiOverlay = styled('div')(
  ({
    theme: {
      palette: { surface },
    },
  }) => ({
    display: 'none',
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    top: '0',
    left: '0',
    zIndex: '1',
    background: surface.tertiary,

    [`& .${settingsPergamen.root}`]: {
      opacity: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    },
  }),
)
