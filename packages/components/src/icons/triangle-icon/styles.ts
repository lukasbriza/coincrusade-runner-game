'use client'

import { styled } from '@lukasbriza/styles'

import type { OwnerState } from '../../types'

import type { TriangleProps } from './types'

export const Root = styled('div')<OwnerState<Pick<TriangleProps, 'size'>>>(
  ({ theme: { size }, ownerState: { size: customSize } }) => ({
    width: customSize || size.size2,
    height: customSize || size.size2,
    borderLeft: `${size.size2 / 2}px solid transparent`,
    borderRight: `${size.size2 / 2}px solid transparent`,
    borderTop: `${size.size2}px solid black`,
    cursor: 'pointer',
  }),
)
