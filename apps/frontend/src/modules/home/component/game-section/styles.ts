'use client'

import { styled } from '@lukasbriza/styles'

import { PAGE_MIN_HEIGHT } from '@/shared'

export const Root = styled('div')(() => ({
  width: '100vw',
  height: '100vh',
  overflow: 'hidden',
  minHeight: PAGE_MIN_HEIGHT,
}))
