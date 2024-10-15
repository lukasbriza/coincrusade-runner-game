'use client'

import { styled } from '@lukasbriza/styles'

export const SettingsPergamenContent = styled('div')(({ theme: { spacing } }) => ({
  opacity: '0',
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  display: 'flex',
  rowGap: spacing(5),
  flexDirection: 'column',
  maxWidth: 200,
}))

export const Root = styled('div')(() => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  maxHeight: '800px',
  top: '50%',
  transform: 'translateY(-50%)',
}))
