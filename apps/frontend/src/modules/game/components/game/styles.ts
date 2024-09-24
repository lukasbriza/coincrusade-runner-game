'use client'

import { styled } from '@lukasbriza/styles'

export const ParentElement = styled('div')(({ theme: { spacing } }) => ({
  height: `calc(100vh - ${spacing(13)})`,
  width: '100vw',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))
