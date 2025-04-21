'use client'

import { styled } from '@lukasbriza/styles'
import { Button } from '@mui/base'

import type { OwnerState } from '../types'

export const Root = styled('div')(() => ({
  position: 'relative',
}))

export const ButtonStyled = styled(Button)<OwnerState<{ borderWidth: number; disabled: boolean }>>(
  ({ theme: { spacing, typography, palette }, ownerState: { borderWidth, disabled } }) => ({
    width: '100%',
    border: 0,
    background: disabled ? palette.bodyText.secondary : palette.primary.light,
    boxShadow: `
    inset -${borderWidth}px ${borderWidth / 2}px 1px 1px grey,
    inset -${borderWidth}px -${borderWidth / 2}px 1px 1px lightgray,
    inset ${borderWidth}px 0px 1px 1px lightgray;
    `,
    cursor: disabled ? 'progress' : 'pointer',
    padding: `${spacing(3)} ${spacing(5)}`,
    fontFamily: typography.fontFamily,

    '&:disabled': {
      color: palette.bodyText.contrast,
    },

    '&:hover': {
      backgroundColor: disabled ? palette.bodyText.secondary : palette.border.activeHover,
    },

    '&:after': {
      content: '" "',
      background: palette.border.primary,
      position: 'absolute',
      left: -borderWidth,
      top: 0,
      width: `calc(100% + ${borderWidth * 2}px)`,
      height: '100%',
      zIndex: -1,
    },

    '&:before': {
      content: '" "',
      background: palette.border.primary,
      position: 'absolute',
      left: 0,
      top: -borderWidth,
      width: '100%',
      height: `calc(100% + ${borderWidth * 2}px)`,
      zIndex: -1,
    },

    '&:active': disabled
      ? {}
      : {
          inset: `5px -3px`,
          boxShadow: `
      -${borderWidth}px ${borderWidth / 2}px 1px 1px grey,
      -${borderWidth}px -${borderWidth}px 1px 1px lightgray,
        ${borderWidth}px 0px 1px 1px lightgray 
      `,
        },
  }),
)
