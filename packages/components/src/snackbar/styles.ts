'use client'

import { styled } from '@lukasbriza/styles'
import { Snackbar } from '@mui/base'

import { CloseIcon } from '../icons'

export const Root = styled(Snackbar)(({ theme: { palette, spacing, size } }) => ({
  background: palette.surface.primary,
  width: 'fit-content',
  padding: spacing(2),
  border: `solid ${palette.border.primary} ${size.size1 / 2}px`,
  display: 'flex',
  columnGap: spacing(2),
  alignItems: 'center',
  opacity: 0,
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  willChange: 'transform',
}))

export const Cross = styled(CloseIcon)(({ theme: { spacing, palette } }) => ({
  cursor: 'pointer',
  padding: spacing(1),
  background: 'transparent',
  transition: 'background 80ms ease-in',
  borderRadius: '50%',

  '&:hover': {
    background: palette.surface.secondary,
  },

  '&:active': {
    background: 'transparent',
  },
}))

export const SnackbarContent = styled('div')(() => ({}))
