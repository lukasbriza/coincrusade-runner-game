'use client'

import { Text } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'

import { PAGE_MAX_WIDTH } from '@/shared'

export const Root = styled('section')(({ theme: { palette, spacing } }) => ({
  background: palette.surface.background,
  maxWidth: PAGE_MAX_WIDTH,
  left: '50%',
  position: 'relative',
  paddingTop: spacing(1),
  transform: 'translateX(-50%)',
}))

export const FormRoot = styled('form')(({ theme: { spacing, palette } }) => ({
  background: palette.surface.primary,
  padding: spacing(2),
  paddingBottom: spacing(5),
  border: '5px solid black',
  borderBottom: 'none',
  maxWidth: 1400,
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
}))

export const Header = styled(Text)(({ theme: { size } }) => ({
  textAlign: 'center',
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
  paddingTop: size.size2,
  paddingBottom: size.size2,
}))

export const FormText = styled(Text)(() => ({
  textAlign: 'center',
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
  maxWidth: 500,
}))

export const FormInputsRoot = styled('div')(({ theme: { spacing } }) => ({
  paddingTop: spacing(5),
  paddingBottom: spacing(5),
  maxWidth: 500,
  position: 'relative',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  gap: spacing(2),

  '& textarea': {
    minHeight: 100,
  },

  '& button': {
    minWidth: 150,
    position: 'relative',
  },
}))

export const InfoSection = styled('div')(({ theme: { spacing } }) => ({
  display: 'flex',
  justifyContent: 'center',
  columnGap: spacing(4),
}))

export const InfoIcon = styled('a')(({ theme: { spacing } }) => ({
  display: 'flex',
  alignItems: 'center',
  columnGap: spacing(2),
  textDecoration: 'none',
}))
