import { styled } from '@lukasbriza/styles'

import type { OwnerState } from '../types'

export const RootBase = styled('div')<OwnerState<{ fullWidth: boolean }>>(({ ownerState: { fullWidth } }) => ({
  width: fullWidth ? '100%' : 'fit-content',
  position: 'relative',
  display: 'grid',
  gridTemplateAreas: `
    "input"
    "helper"
  `,
}))

export const RequiredBase = styled('div')(({ theme: { palette, spacing } }) => ({
  position: 'absolute',
  width: 'fit-content',
  height: 'fit-content',
  margin: 0,
  color: palette.state.error.primary,
  top: 0,
  right: 0,
  paddingTop: spacing(1),
  paddingRight: spacing(2),
  cursor: 'default',
  gridArea: 'input',
}))

export const LabelBase = styled('label')(({ theme: { palette, typography } }) => ({
  fontFamily: typography.fontFamily,
  fontSize: 12,
  color: palette.bodyText.primary,
  paddingLeft: 2,
  paddigRight: 2,
  position: 'absolute',
  gridArea: 'input',
  pointerEvents: 'none',
  cursor: 'text',
}))

export const HelperBase = styled('div')<OwnerState<{ disabled?: boolean | undefined; error: boolean }>>(({
  theme: { palette, spacing, typography },
  ownerState: { error, disabled },
}) => {
  let color = palette.bodyText.primary

  if (error) {
    color = palette.state.error.primary
  }

  if (disabled || (error && disabled)) {
    color = palette.bodyText.secondary
  }

  return {
    color,
    fontFamily: typography.fontFamily,
    fontSize: 8,
    gridArea: 'helper',
    paddingTop: spacing(2),
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    minHeight: 23,
  }
})
