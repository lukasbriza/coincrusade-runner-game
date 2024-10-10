'use client'

import { styled } from '@lukasbriza/styles'
import Image from 'next/image'

export const Root = styled('div')(({ theme: { palette } }) => ({
  position: 'absolute',
  width: '100vw',
  height: '100vh',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: palette.surface.primary,
}))

export const RunAnimation = styled(Image)(({ theme: { spacing } }) => ({
  marginLeft: spacing(11),
}))

export const LoadingAnimationWrapper = styled('div')(({ theme: { spacing, breakpoints } }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  flexFlow: 'column',
  rowGap: spacing(3),
  width: '60%',

  [breakpoints.down('sm')]: {
    width: '80%',
  },

  paddingBottom: spacing(20),
}))
