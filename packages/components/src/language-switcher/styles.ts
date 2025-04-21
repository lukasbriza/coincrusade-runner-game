'use client'

import { styled } from '@lukasbriza/styles'

import { TriangleIcon } from '../icons'

import { languageSwitcherClasses } from './classes'

export const Root = styled('div')(({ theme: { spacing } }) => ({
  position: 'relative',
  display: 'flex',
  width: 'fit-content',
  alignItems: 'center',
  columnGap: spacing(1),
}))

export const DropDownIcon = styled(TriangleIcon)(() => ({
  transition: 'transform 0.3s ease-in-out',

  [`&.${languageSwitcherClasses.opened}`]: {
    transform: 'rotate(180deg)',
  },
}))

export const Dropdown = styled('div')(({ theme: { spacing, palette } }) => ({
  marginTop: spacing(1),
  opacity: 0,
  position: 'absolute',
  top: '100%',
  left: -5,
  display: 'flex',
  flexDirection: 'column',
  rowGap: spacing(1),
  padding: spacing(1),
  backgroundColor: palette.surface.tertiary,

  [`&.${languageSwitcherClasses.opened}`]: {
    opacity: 1,
  },
}))

export const Option = styled('div')(({ theme: { spacing, size, palette } }) => ({
  padding: spacing(1),
  maxWidth: size.size10,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',

  [`&.${languageSwitcherClasses.selected}`]: {
    backgroundColor: palette.surface.secondary,
  },

  '&:hover': {
    backgroundColor: palette.surface.secondary,
  },
}))

export const Selected = styled('div')(({ theme: { spacing, size } }) => ({
  padding: spacing(1),
  maxWidth: size.size10,
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}))
