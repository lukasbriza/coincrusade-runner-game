'use client'

import type { OwnerState } from '@lukasbriza/components'
import { styled } from '@lukasbriza/styles'

import { PAGE_MAX_WIDTH } from '@/shared'

export const Root = styled('div')<
  OwnerState<{ blurLevel?: number | undefined; height: number; top: boolean; zIndex?: number | undefined }>
>(({ ownerState: { height, top, zIndex, blurLevel = 1.5 }, theme: { spacing } }) => ({
  height,
  width: '100%',
  maxWidth: PAGE_MAX_WIDTH,
  left: '50%',
  transform: 'translateX(-50%)',
  position: 'absolute',
  zIndex,
  marginTop: top ? `calc(0px - ${height / 2}px)` : `calc(100% - ${height / 2}px)`,
  backdropFilter: `blur(${spacing(blurLevel)})`,
}))
