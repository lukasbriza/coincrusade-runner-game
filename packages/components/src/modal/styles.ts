'use client'

import { styled } from '@lukasbriza/styles'
import { Modal } from '@mui/base'

export const Root = styled(Modal)(({ theme: { zIndex, palette } }) => ({
  position: 'fixed',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
  width: '100vw',
  height: '100vh',
  zIndex: zIndex.modal - 1,
  background: palette.surface.tertiary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}))

export const ModalContent = styled('div')(({ theme: { palette, spacing, size, zIndex } }) => ({
  background: palette.surface.primary,
  width: 'fit-content',
  color: palette.bodyText.primary,
  padding: spacing(2),
  border: `${palette.border.primary} solid  ${size.size1}px`,
  borderRadius: 0,
  zIndex: zIndex.modal,
  overflowY: 'auto',
}))
