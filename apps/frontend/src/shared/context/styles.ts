'use client'

import { styled } from '@lukasbriza/styles'

export const SnacbarsWrapper = styled('div')(({ theme: { zIndex, spacing } }) => ({
  position: 'fixed',
  zIndex: zIndex.snackbar,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: spacing(3),
  top: 0,
  left: 0,
}))
