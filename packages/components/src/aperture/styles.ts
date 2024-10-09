'use client'

import { styled } from '@lukasbriza/styles'

export const Top = styled('div')(({ theme: { palette } }) => ({
  zIndex: 1000,
  top: 0,
  left: 0,
  position: 'absolute',
  width: '100vw',
  background: palette.common.black,
}))

export const Down = styled('div')(({ theme: { palette } }) => ({
  zIndex: 1000,
  bottom: 0,
  left: 0,
  position: 'absolute',
  width: '100vw',
  background: palette.common.black,
}))
