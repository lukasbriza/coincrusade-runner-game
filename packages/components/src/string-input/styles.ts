import { styled } from '@lukasbriza/styles'
import { Input } from '@mui/base'

import { LabelBase } from '../styles'
import type { OwnerState } from '../types'

export const Label = styled(LabelBase)<
  OwnerState<{
    borderWidth: number
    error?: boolean
    disabled?: boolean | undefined
    animate: boolean
    labelHeight?: number | undefined
  }>
>(({ ownerState: { animate, labelHeight, disabled, error, borderWidth }, theme: { spacing, palette } }) => {
  let background = 'white'
  let color = palette.bodyText.primary

  if (error) {
    background = 'hsl(0, 38.10%, 75.30%)'
    color = palette.state.error.primary
  }

  if (disabled || (error && disabled)) {
    background = 'rgb(119, 119, 119)'
    color = palette.bodyText.secondary
  }

  return {
    top: animate ? `calc(0px - ${(labelHeight || 0 + borderWidth) / 2}px)` : '50%',
    left: spacing(3),
    transform: animate ? 'translate(-16%, 0%) scale(0.8)' : 'translateY(-50%) scale(1)',
    background,
    color,
    transition: 'top 0.15s linear, transform 0.15s linear',
  }
})

export const StringInputStyled = styled(Input)<OwnerState<{ borderWidth: number }>>(
  ({ theme: { spacing, palette, typography }, ownerState: { borderWidth } }) => ({
    width: '100%',
    background: 'white',

    '& input': {
      fontFamily: typography.fontFamily,
      width: '100%',
      height: '100%',
      padding: spacing(2),
      paddingTop: spacing(3),
      paddingBottom: spacing(3),
      fontSize: 12,
      border: 'none',
      gridArea: 'input',
      cursor: 'text',
    },

    '& input:focus': {
      border: 'none',
      outline: 'none',
    },

    '& input:active': {
      border: 'none',
      outline: 'none',
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
      gridArea: 'input',
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
      gridArea: 'input',
    },

    '&.base--error': {
      '&:after': {
        background: palette.state.error.primary,
      },
      '&:before': {
        background: palette.state.error.primary,
      },
      '& input': {
        background: 'hsla(0, 69.40%, 42.40%, 0.39)',
        color: palette.state.error.primary,
      },
    },
    '&.base--disabled': {
      '&:after': {
        background: palette.bodyText.secondary,
      },
      '&:before': {
        background: palette.bodyText.secondary,
      },
      '& input': {
        background: palette.surface.tertiary,
        color: palette.bodyText.secondary,
        cursor: 'default',
      },
    },
  }),
)
