'use client'

import { styled } from '@lukasbriza/styles'

import { Text } from '../text'
import type { OwnerState } from '../types'

export const Root = styled('div')(({ theme: { size, palette } }) => ({
  position: 'relative',
  width: '100%',
  height: size.size10,
  borderWidth: size.size1 / 2,
  borderStyle: 'solid',
  borderColor: palette.bodyText.secondary,
}))

export const Filler = styled('div')<OwnerState<{ width: number }>>(({ theme: { palette }, ownerState: { width } }) => ({
  position: 'relative',
  width: `${width}%`,
  height: '100%',
  background: palette.primary.main,
  transition: 'width 150ms ease-in',
}))

export const Percents = styled(Text)(() => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%,-50%)',
}))
