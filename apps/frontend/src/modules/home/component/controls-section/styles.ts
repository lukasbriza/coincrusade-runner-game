'use client'

import { styled } from '@lukasbriza/styles'
import Image from 'next/image'

import { CONTROLS_VERTICAL_PERGAMEN_BREAKPOINT, PAGE_MAX_WIDTH } from '@/shared'

export const Root = styled('div')(({ theme: { spacing, palette } }) => ({
  background: palette.surface.background,
  maxWidth: PAGE_MAX_WIDTH,
  left: '50%',
  transform: 'translateX(-50%)',
  position: 'relative',
  paddingTop: spacing(6),
  paddingBottom: spacing(6),
  overflow: 'hidden',
}))

export const ControlPartsSection = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

export const ControlPartDivider = styled(Image)(({ theme: { spacing, breakpoints } }) => ({
  position: 'relative',
  width: '60%',
  left: '50%',
  transform: 'translateX(-50%)',
  height: 'unset',
  maxWidth: 750,
  paddingTop: spacing(8),
  paddingBottom: spacing(8),

  [breakpoints.down(CONTROLS_VERTICAL_PERGAMEN_BREAKPOINT)]: {
    paddingTop: spacing(4),
    paddingBottom: spacing(4),
  },
}))
