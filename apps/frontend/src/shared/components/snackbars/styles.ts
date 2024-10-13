'use client'

import { styled } from '@lukasbriza/styles'

export const SnackbarContentBase = styled('div')(({ theme: { spacing, size } }) => ({
  padding: spacing(2),
  maxWidth: size.size32 * 2,
}))
