'use client'

import { styled } from '@lukasbriza/styles'

import { Text as PckgText } from '../text'
import type { OwnerState } from '../types'

import type { MenuItemProps } from './types'

export const Root = styled('div')(() => ({
  position: 'relative',
  display: 'flex',
  width: 'fit-content',
  flexDirection: 'column',
  cursor: 'pointer',
}))

export const Text = styled(PckgText)<OwnerState<Pick<MenuItemProps, 'color' | 'fontSize'>>>(
  ({ theme: { size, spacing }, ownerState: { fontSize, color } }) => ({
    fontSize: fontSize === undefined ? size.size7 : fontSize,
    marginBottom: spacing(1),
    color,
  }),
)

export const Underliner = styled('div')<OwnerState<Pick<MenuItemProps, 'active' | 'color'>>>(
  ({ theme: { size, palette }, ownerState: { active, color } }) => ({
    position: 'relative',
    width: active ? `calc(100% - ${size.size7}px)` : size.size0,
    height: size.size1,
    background: color || palette.bodyText.primary,
    left: '50%',
    transform: 'translate(-50%,-50%)',
    transitionProperty: 'width',
    transitionDuration: '0.7s',
    transitionTimingFunction: 'ease-in-out',
  }),
)
